import { useEffect, useRef } from "react";
import * as THREE from "three";

/** Fixed 3D background: drifting particles + wireframe shapes that react to mouse and scroll. */
const Scene3D = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    } catch {
      return; // WebGL not available: page still works without the background
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, small ? 1.5 : 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
    camera.position.z = 9;

    // particles
    const count = small ? 700 : 1800;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ color: 0x2ee6d6, size: 0.05, transparent: true, opacity: 0.8 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // wireframe shapes
    const wire = (color: number, opacity: number) =>
      new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity });
    const knot = new THREE.Mesh(new THREE.TorusKnotGeometry(1.5, 0.4, small ? 64 : 128, 16), wire(0x2ee6d6, 0.35));
    const ico = new THREE.Mesh(new THREE.IcosahedronGeometry(1.2, 1), wire(0x4da3ff, 0.4));
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2, 0.05, 8, 100), wire(0x2ee6d6, 0.5));
    const cube = new THREE.Mesh(new THREE.BoxGeometry(1.4, 1.4, 1.4), wire(0xffc857, 0.4));
    const shapes = [knot, ico, ring, cube];
    shapes.forEach((s) => scene.add(s));

    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();

    let mx = 0, my = 0, sp = 0, target = 0, raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / window.innerWidth) * 2 - 1;
      my = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      target = window.scrollY / max;
      if (reduce) render();
    };

    const clock = new THREE.Clock();
    const render = () => {
      const t = clock.getElapsedTime();
      sp += (target - sp) * 0.05;

      knot.position.set(5 * Math.cos(sp * 5), Math.sin(sp * 6) * 2.5, -3);
      ico.position.set(-5 * Math.cos(sp * 4 + 1), 3 * Math.sin(sp * 5 + 2), -4);
      ring.position.set(4 * Math.sin(sp * 3), -3 * Math.cos(sp * 4), -6);
      cube.position.set(-4 * Math.sin(sp * 6 + 1), 2 * Math.cos(sp * 3), -5);

      shapes.forEach((s, i) => {
        s.rotation.x = t * (0.15 + i * 0.05);
        s.rotation.y = t * (0.2 + i * 0.04);
      });
      stars.rotation.y = t * 0.02 + mx * 0.15;
      stars.rotation.x = my * 0.08;
      camera.position.x += (mx * 0.6 - camera.position.x) * 0.05;
      camera.position.y += (-my * 0.4 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      if (!reduce) raf = requestAnimationFrame(render);
    };

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
      starGeo.dispose();
      starMat.dispose();
      shapes.forEach((s) => {
        s.geometry.dispose();
        (s.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="fixed inset-0 z-0 w-full h-full pointer-events-none" />;
};

export default Scene3D;
