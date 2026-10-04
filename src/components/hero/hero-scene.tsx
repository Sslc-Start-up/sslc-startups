"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type * as THREE from "three";

/**
 * Hero 3D scene — the SSLC mark rebuilt as two glossy, extruded ribbons
 * (cyan→blue and violet→magenta, as in the logo), floating in a particle
 * field with orbit rings and bloom.
 *
 * three.js is imported only once the page is idle (or on first interaction),
 * so it never competes with first paint; until then a static mark is shown.
 * Rendering pauses off-screen and in background tabs; reduced-motion users
 * get a single still frame. Phones get a lighter scene (no bloom, fewer
 * particles, capped pixel ratio).
 */
export function HeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let disposed = false;
    let started = false;
    let cleanup = () => {};

    const init = async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const { EffectComposer } = await import("three/examples/jsm/postprocessing/EffectComposer.js");
      const { RenderPass } = await import("three/examples/jsm/postprocessing/RenderPass.js");
      const { UnrealBloomPass } = await import("three/examples/jsm/postprocessing/UnrealBloomPass.js");
      const { OutputPass } = await import("three/examples/jsm/postprocessing/OutputPass.js");
      if (disposed) return;

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const small = window.innerWidth < 768;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        return; // no WebGL — the static fallback stays visible
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.25 : 1.75));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.0;
      renderer.setClearColor(0x04040a, 1);
      renderer.domElement.setAttribute("aria-hidden", "true");
      // Bloom output is opaque, so the canvas is feathered into the page with a mask.
      renderer.domElement.style.cssText =
        "position:absolute;inset:0;width:100%;height:100%;-webkit-mask-image:radial-gradient(ellipse 62% 58% at 55% 50%,#000 55%,transparent 100%);mask-image:radial-gradient(ellipse 62% 58% at 55% 50%,#000 55%,transparent 100%);";
      host.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
      scene.environment = envTex;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
      camera.position.set(0, 0, 8);

      // ── Ribbon geometry ──────────────────────────────────────────────
      const V = (x: number, y: number) => new THREE.Vector3(x, y, 0);

      /** Straight run → rounded corner → straight run, like one chevron of the S. */
      function chevron(a: THREE.Vector3, corner: THREE.Vector3, b: THREE.Vector3, round = 0.42) {
        const c1 = corner.clone().lerp(a, round / corner.distanceTo(a));
        const c2 = corner.clone().lerp(b, round / corner.distanceTo(b));
        const path = new THREE.CurvePath<THREE.Vector3>();
        path.add(new THREE.LineCurve3(a, c1));
        path.add(new THREE.QuadraticBezierCurve3(c1, corner, c2));
        path.add(new THREE.LineCurve3(c2, b));
        return path;
      }

      /** Sweep a rounded-rectangle profile along a planar path, with end caps and a colour ramp. */
      function ribbon(path: THREE.CurvePath<THREE.Vector3>, colors: string[], width = 0.44, depth = 0.3, radius = 0.12) {
        const segs = small ? 90 : 160;
        const profile: [number, number][] = [];
        const hw = width / 2;
        const hd = depth / 2;
        const corners: [number, number, number][] = [
          [hw - radius, hd - radius, 0],
          [-hw + radius, hd - radius, Math.PI / 2],
          [-hw + radius, -hd + radius, Math.PI],
          [hw - radius, -hd + radius, (3 * Math.PI) / 2],
        ];
        for (const [cx, cy, start] of corners) {
          for (let k = 0; k <= 6; k++) {
            const ang = start + (k / 6) * (Math.PI / 2);
            profile.push([cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius]);
          }
        }
        const P = profile.length;
        const pts = path.getSpacedPoints(segs);
        const ramp = colors.map((c) => new THREE.Color(c));
        const colorAt = (t: number) => {
          const x = t * (ramp.length - 1);
          const i = Math.min(Math.floor(x), ramp.length - 2);
          return ramp[i].clone().lerp(ramp[i + 1], x - i);
        };

        const positions: number[] = [];
        const cols: number[] = [];
        const index: number[] = [];
        const zAxis = new THREE.Vector3(0, 0, 1);

        for (let i = 0; i <= segs; i++) {
          const p = pts[i];
          const next = pts[Math.min(i + 1, segs)];
          const prev = pts[Math.max(i - 1, 0)];
          const tangent = next.clone().sub(prev).normalize();
          const n = new THREE.Vector3(-tangent.y, tangent.x, 0);
          const c = colorAt(i / segs);
          for (let j = 0; j <= P; j++) {
            const [u, v] = profile[j % P];
            const pos = p.clone().addScaledVector(n, u).addScaledVector(zAxis, v);
            positions.push(pos.x, pos.y, pos.z);
            cols.push(c.r, c.g, c.b);
          }
        }
        const row = P + 1;
        for (let i = 0; i < segs; i++) {
          for (let j = 0; j < P; j++) {
            const a = i * row + j;
            const b = (i + 1) * row + j;
            index.push(a, b, a + 1, b, b + 1, a + 1);
          }
        }
        // end caps (fan from the path point)
        for (const [i, flip] of [
          [0, true],
          [segs, false],
        ] as const) {
          const p = pts[i];
          const tangent = (i === 0 ? pts[1].clone().sub(pts[0]) : pts[segs].clone().sub(pts[segs - 1])).normalize();
          const n = new THREE.Vector3(-tangent.y, tangent.x, 0);
          const c = colorAt(i / segs);
          const centre = positions.length / 3;
          positions.push(p.x, p.y, p.z);
          cols.push(c.r, c.g, c.b);
          for (let j = 0; j < P; j++) {
            const [u, v] = profile[j];
            const pos = p.clone().addScaledVector(n, u).addScaledVector(zAxis, v);
            positions.push(pos.x, pos.y, pos.z);
            cols.push(c.r, c.g, c.b);
          }
          for (let j = 0; j < P; j++) {
            const a = centre + 1 + j;
            const b = centre + 1 + ((j + 1) % P);
            if (flip) index.push(centre, b, a);
            else index.push(centre, a, b);
          }
        }

        const g = new THREE.BufferGeometry();
        g.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
        g.setAttribute("color", new THREE.Float32BufferAttribute(cols, 3));
        g.setIndex(index);
        g.computeVertexNormals();
        return g;
      }

      // Two chevrons, point-symmetric — the SSLC mark.
      const upper = chevron(V(0.82, 1.08), V(-1.02, 0.24), V(-0.05, -0.39));
      const lower = chevron(V(0.05, 0.39), V(1.02, -0.24), V(-0.82, -1.08));

      const material = new THREE.MeshPhysicalMaterial({
        vertexColors: true,
        side: THREE.DoubleSide,
        metalness: 0.15,
        roughness: 0.28,
        clearcoat: 1,
        clearcoatRoughness: 0.12,
        iridescence: 0.2,
        iridescenceIOR: 1.3,
        envMapIntensity: 0.55,
      });

      const logo = new THREE.Group();
      const meshA = new THREE.Mesh(ribbon(upper, ["#22d3ff", "#2f7bff", "#2140e8", "#1a1fb8"]), material);
      const meshB = new THREE.Mesh(ribbon(lower, ["#2a3cff", "#6a2bff", "#a83dff", "#ea45ff"]), material);
      meshA.position.z = 0.12;
      meshB.position.z = -0.12;
      logo.add(meshA, meshB);
      scene.add(logo);

      // ── Glow halo behind the mark ───────────────────────────────────
      const haloCanvas = document.createElement("canvas");
      haloCanvas.width = haloCanvas.height = 256;
      const hctx = haloCanvas.getContext("2d")!;
      const grad = hctx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(120,90,255,0.32)");
      grad.addColorStop(0.4, "rgba(70,90,255,0.18)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      hctx.fillStyle = grad;
      hctx.fillRect(0, 0, 256, 256);
      const haloTex = new THREE.CanvasTexture(haloCanvas);
      const halo = new THREE.Mesh(
        new THREE.PlaneGeometry(7, 7),
        new THREE.MeshBasicMaterial({ map: haloTex, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
      );
      halo.position.z = -1.6;
      scene.add(halo);

      // ── Orbit rings ─────────────────────────────────────────────────
      const rings = new THREE.Group();
      const ringDefs = [
        { r: 2.15, color: "#3d6bff", tilt: [1.2, 0.3], speed: 0.18 },
        { r: 2.55, color: "#a83dff", tilt: [1.35, -0.5], speed: -0.12 },
        { r: 2.95, color: "#19c4ff", tilt: [1.05, 0.9], speed: 0.08 },
      ];
      const ringMeshes = ringDefs.map((d) => {
        const m = new THREE.Mesh(
          new THREE.TorusGeometry(d.r, 0.006, 8, 220),
          new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending }),
        );
        m.rotation.set(d.tilt[0], d.tilt[1], 0);
        // a bright "satellite" riding each ring
        const sat = new THREE.Mesh(new THREE.SphereGeometry(0.035, 12, 12), new THREE.MeshBasicMaterial({ color: "#ffffff" }));
        sat.position.x = d.r;
        m.add(sat);
        rings.add(m);
        return { mesh: m, speed: d.speed };
      });
      scene.add(rings);

      // ── Particle field ──────────────────────────────────────────────
      const count = small ? 500 : 2200;
      const pPos = new Float32Array(count * 3);
      const pCol = new Float32Array(count * 3);
      const palette = ["#19c4ff", "#3d6bff", "#8a3dff", "#e03bff", "#ffffff"].map((c) => new THREE.Color(c));
      for (let i = 0; i < count; i++) {
        const r = 2.2 + Math.pow(Math.random(), 0.6) * 5.5;
        const th = Math.random() * Math.PI * 2;
        const ph = Math.acos(2 * Math.random() - 1);
        pPos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pPos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th) * 0.7;
        pPos[i * 3 + 2] = r * Math.cos(ph) - 1.5;
        const c = palette[Math.floor(Math.random() * palette.length)];
        pCol.set([c.r, c.g, c.b], i * 3);
      }
      const dotCanvas = document.createElement("canvas");
      dotCanvas.width = dotCanvas.height = 64;
      const dctx = dotCanvas.getContext("2d")!;
      const dg = dctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      dg.addColorStop(0, "rgba(255,255,255,1)");
      dg.addColorStop(0.35, "rgba(255,255,255,0.5)");
      dg.addColorStop(1, "rgba(255,255,255,0)");
      dctx.fillStyle = dg;
      dctx.fillRect(0, 0, 64, 64);
      const pGeo = new THREE.BufferGeometry();
      pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
      pGeo.setAttribute("color", new THREE.BufferAttribute(pCol, 3));
      const particles = new THREE.Points(
        pGeo,
        new THREE.PointsMaterial({
          size: 0.05,
          map: new THREE.CanvasTexture(dotCanvas),
          vertexColors: true,
          transparent: true,
          opacity: 0.85,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        }),
      );
      scene.add(particles);

      // ── Moving coloured lights for animated reflections ─────────────
      scene.add(new THREE.AmbientLight(0x6060ff, 0.25));
      const lightA = new THREE.PointLight(0x19c4ff, 18, 20);
      const lightB = new THREE.PointLight(0xe03bff, 18, 20);
      scene.add(lightA, lightB);

      // ── Post-processing (bloom) on capable screens ──────────────────
      const useBloom = !small;
      const composer = useBloom ? new EffectComposer(renderer) : null;
      let bloom: InstanceType<typeof UnrealBloomPass> | null = null;
      if (composer) {
        composer.addPass(new RenderPass(scene, camera));
        bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.42, 0.55, 0.82);
        composer.addPass(bloom);
        composer.addPass(new OutputPass());
      }

      // ── Sizing ──────────────────────────────────────────────────────
      let stageOffset = 0;
      const resize = () => {
        const w = host.clientWidth;
        const h = host.clientHeight;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        composer?.setSize(w, h);
        bloom?.setSize(w, h);
        camera.aspect = w / h;
        // keep the mark fully in frame on narrow/tall containers
        camera.position.z = w / h < 1 ? 8 + (1 - w / h) * 6 : 8;
        // on wide stages, push the mark right so it never sits under the headline
        stageOffset = w / h > 1 ? 0.85 : 0;
        camera.updateProjectionMatrix();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(host);
      resize();

      // ── Interaction ─────────────────────────────────────────────────
      const pointer = { x: 0, y: 0 };
      const smooth = { x: 0, y: 0, scroll: 0 };
      const onPointer = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener("pointermove", onPointer, { passive: true });

      // ── Loop ────────────────────────────────────────────────────────
      const clock = new THREE.Clock();
      let raf = 0;
      let visible = true;

      const renderFrame = (t: number, dt: number) => {
        const intro = reduceMotion ? 1 : Math.min(t / 1.8, 1);
        const ease = 1 - Math.pow(1 - intro, 4);
        const scroll = Math.min(window.scrollY / window.innerHeight, 1.2);

        smooth.x += (pointer.x - smooth.x) * Math.min(dt * 3, 1);
        smooth.y += (pointer.y - smooth.y) * Math.min(dt * 3, 1);
        smooth.scroll += (scroll - smooth.scroll) * Math.min(dt * 6, 1);

        const s = (0.7 + 0.3 * ease) * (1 - smooth.scroll * 0.15);
        logo.scale.setScalar(s);
        logo.rotation.y = (1 - ease) * -1.6 + Math.sin(t * 0.45) * 0.38 + smooth.x * 0.45 + smooth.scroll * 1.4;
        logo.rotation.x = Math.sin(t * 0.3) * 0.08 + smooth.y * 0.22;
        logo.rotation.z = Math.sin(t * 0.25) * 0.04;
        logo.position.y = Math.sin(t * 0.8) * 0.08 + smooth.scroll * 0.9;
        logo.position.x = stageOffset;
        halo.position.x = stageOffset;
        rings.position.x = stageOffset;

        halo.material.opacity = 0.8 + Math.sin(t * 1.2) * 0.2;
        for (const r of ringMeshes) r.mesh.rotation.z += r.speed * dt * 2;
        rings.rotation.y = smooth.x * 0.2;
        particles.rotation.y = t * 0.03 + smooth.x * 0.1;
        particles.rotation.x = smooth.y * 0.05;

        lightA.position.set(Math.cos(t * 0.7) * 4, 2.2, Math.sin(t * 0.7) * 4 + 2);
        lightB.position.set(Math.cos(t * 0.7 + Math.PI) * 4, -2.2, Math.sin(t * 0.7 + Math.PI) * 4 + 2);

        if (composer) composer.render();
        else renderer.render(scene, camera);
      };

      const tick = () => {
        raf = requestAnimationFrame(tick);
        if (!visible || document.hidden) return;
        const dt = Math.min(clock.getDelta(), 0.05);
        renderFrame(clock.elapsedTime, dt);
      };

      const io = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) clock.getDelta();
      });
      io.observe(host);

      if (reduceMotion) renderFrame(2, 0.016);
      else tick();
      requestAnimationFrame(() => !disposed && setReady(true));

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        ro.disconnect();
        window.removeEventListener("pointermove", onPointer);
        scene.traverse((o) => {
          const mesh = o as THREE.Mesh;
          mesh.geometry?.dispose?.();
          const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
          (Array.isArray(mat) ? mat : mat ? [mat] : []).forEach((m) => {
            (m as THREE.MeshBasicMaterial).map?.dispose();
            m.dispose();
          });
        });
        envTex.dispose();
        pmrem.dispose();
        composer?.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    };

    // ── Deferred start: idle after load, or the first user interaction ──
    const interactions = ["pointerdown", "pointermove", "touchstart", "keydown", "wheel", "scroll"] as const;
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const start = () => {
      if (started || disposed) return;
      started = true;
      interactions.forEach((ev) => window.removeEventListener(ev, start));
      void init();
    };
    interactions.forEach((ev) => window.addEventListener(ev, start, { once: true, passive: true }));
    // Phones wait for the first touch/scroll (the static mark shows until then);
    // desktops also start on their own once the page has been idle for a moment.
    const touchFirst = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
    const scheduleIdle = () => {
      if (touchFirst) return;
      timer = setTimeout(() => {
        if ("requestIdleCallback" in window) idleHandle = window.requestIdleCallback(start, { timeout: 3000 });
        else start();
      }, 2500);
    };
    if (document.readyState === "complete") scheduleIdle();
    else window.addEventListener("load", scheduleIdle, { once: true });

    return () => {
      disposed = true;
      clearTimeout(timer);
      if (idleHandle !== undefined) window.cancelIdleCallback?.(idleHandle);
      window.removeEventListener("load", scheduleIdle);
      interactions.forEach((ev) => window.removeEventListener(ev, start));
      cleanup();
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {/* Static fallback until WebGL is up (and for no-WebGL browsers) */}
      <div
        aria-hidden
        className={`absolute inset-0 grid place-items-center transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}
      >
        <div className="relative">
          <div className="absolute inset-[-40%] rounded-full bg-[radial-gradient(closest-side,rgb(120_90_255/0.35),transparent)]" />
          <Image src="/brand/sslc-mark.png" alt="" width={256} height={256} priority className="relative size-48 animate-[float-y_6s_ease-in-out_infinite] sm:size-60" />
        </div>
      </div>
    </div>
  );
}
