import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCanvasProps {
  className?: string;
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;
    const isMobile = W < 768;

    // ── Renderer ─────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 55;

    // ── Particles ─────────────────────────────────────────────────────────
    const PARTICLE_COUNT = isMobile ? 90 : 240;
    const SPREAD = 70;

    const pGeo = new THREE.BufferGeometry();
    const pPositions  = new Float32Array(PARTICLE_COUNT * 3);
    const pColors     = new Float32Array(PARTICLE_COUNT * 3);
    const pVelocities = new Array<{ x: number; y: number; z: number }>(PARTICLE_COUNT);

    const palette = [
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0x8b5cf6), // violet
      new THREE.Color(0xa78bfa), // light violet
      new THREE.Color(0x22d3ee), // cyan
      new THREE.Color(0x7c3aed), // deep violet
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      pPositions[i * 3]     = (Math.random() - 0.5) * SPREAD;
      pPositions[i * 3 + 1] = (Math.random() - 0.5) * SPREAD * 0.7;
      pPositions[i * 3 + 2] = (Math.random() - 0.5) * SPREAD * 0.5;

      const c = palette[Math.floor(Math.random() * palette.length)];
      pColors[i * 3]     = c.r;
      pColors[i * 3 + 1] = c.g;
      pColors[i * 3 + 2] = c.b;

      pVelocities[i] = {
        x: (Math.random() - 0.5) * 0.012,
        y: (Math.random() - 0.5) * 0.012,
        z: (Math.random() - 0.5) * 0.006,
      };
    }

    pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
    pGeo.setAttribute('color',    new THREE.BufferAttribute(pColors, 3));

    const pMat = new THREE.PointsMaterial({
      size: 0.3,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // ── Connection Lines ──────────────────────────────────────────────────
    const MAX_LINES = isMobile ? 0 : 450;
    const lPositions = new Float32Array(MAX_LINES * 6);
    const lColors    = new Float32Array(MAX_LINES * 6);

    const lGeo = new THREE.BufferGeometry();
    const lPosAttr = new THREE.BufferAttribute(lPositions, 3);
    const lColAttr = new THREE.BufferAttribute(lColors, 3);
    lPosAttr.setUsage(THREE.DynamicDrawUsage);
    lColAttr.setUsage(THREE.DynamicDrawUsage);
    lGeo.setAttribute('position', lPosAttr);
    lGeo.setAttribute('color',    lColAttr);

    const lMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const lineMesh = new THREE.LineSegments(lGeo, lMat);
    if (!isMobile) scene.add(lineMesh);

    // ── Central TorusKnot ─────────────────────────────────────────────────
    const tkGeo = new THREE.TorusKnotGeometry(8, 2.2, 128, 14);
    const tkMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const torusKnot = new THREE.Mesh(tkGeo, tkMat);
    scene.add(torusKnot);

    // ── Floating Icosahedra ───────────────────────────────────────────────
    type IcoData = { size: number; pos: [number, number, number]; speed: number; color: number };
    const icoData: IcoData[] = [
      { size: 3,   pos: [ 22,  12, -12], speed: 0.38, color: 0x8b5cf6 },
      { size: 2,   pos: [-24,  -9,  -6], speed: 0.55, color: 0x22d3ee },
      { size: 3.5, pos: [  6, -20, -18], speed: 0.28, color: 0x6366f1 },
      { size: 1.7, pos: [-16,  17, -10], speed: 0.48, color: 0xa78bfa },
      { size: 2.5, pos: [ 30,  -5,   0], speed: 0.33, color: 0x7c3aed },
    ];

    const icoMeshes: THREE.Mesh[] = icoData.map(({ size, pos, color }) => {
      const geo  = new THREE.IcosahedronGeometry(size, 0);
      const mat  = new THREE.MeshBasicMaterial({ color, wireframe: true, transparent: true, opacity: 0.22 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(...pos);
      scene.add(mesh);
      return mesh;
    });

    // ── Glowing Orbs ─────────────────────────────────────────────────────
    const orbGeo = new THREE.SphereGeometry(1, 16, 16);
    const orbData = [
      { pos: [14,  8,  8] as [number, number, number], color: 0x6366f1 },
      { pos: [-14, -10, 4] as [number, number, number], color: 0x22d3ee },
      { pos: [0,  20, -5] as [number, number, number], color: 0x8b5cf6 },
    ];

    orbData.forEach(({ pos, color }) => {
      const mat = new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.5 });
      const orb = new THREE.Mesh(orbGeo, mat);
      orb.position.set(...pos);
      scene.add(orb);
      const light = new THREE.PointLight(color, 1.8, 40);
      light.position.set(...pos);
      scene.add(light);
    });

    // ── Mouse tracking ────────────────────────────────────────────────────
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // ── Resize ────────────────────────────────────────────────────────────
    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // ── Animation loop ────────────────────────────────────────────────────
    let raf: number;
    const clock = new THREE.Clock();

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse lerp
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;

      // Update particle positions (drift + bounce)
      const pPos = pGeo.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        pPos[i * 3]     += pVelocities[i].x;
        pPos[i * 3 + 1] += pVelocities[i].y;
        pPos[i * 3 + 2] += pVelocities[i].z;
        if (Math.abs(pPos[i * 3])     > SPREAD / 2)     pVelocities[i].x *= -1;
        if (Math.abs(pPos[i * 3 + 1]) > SPREAD * 0.35)  pVelocities[i].y *= -1;
        if (Math.abs(pPos[i * 3 + 2]) > SPREAD * 0.25)  pVelocities[i].z *= -1;
      }
      pGeo.attributes.position.needsUpdate = true;

      // Update connection lines
      if (!isMobile && MAX_LINES > 0) {
        let lineCount = 0;
        const THRESH = 13;
        const THRESH2 = THRESH * THRESH;

        outer:
        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ax = pPos[i * 3], ay = pPos[i * 3 + 1], az = pPos[i * 3 + 2];
          for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            if (lineCount >= MAX_LINES) break outer;
            const bx = pPos[j * 3], by = pPos[j * 3 + 1], bz = pPos[j * 3 + 2];
            const dx = ax - bx, dy = ay - by, dz = az - bz;
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < THRESH2) {
              const alpha = (1 - Math.sqrt(d2) / THRESH) * 0.8;
              const b = lineCount * 6;
              lPositions[b]   = ax; lPositions[b+1] = ay; lPositions[b+2] = az;
              lPositions[b+3] = bx; lPositions[b+4] = by; lPositions[b+5] = bz;
              // indigo-ish color per segment
              lColors[b]   = alpha * 0.39; lColors[b+1] = alpha * 0.40; lColors[b+2] = alpha;
              lColors[b+3] = alpha * 0.39; lColors[b+4] = alpha * 0.40; lColors[b+5] = alpha;
              lineCount++;
            }
          }
        }
        lGeo.setDrawRange(0, lineCount * 2);
        lGeo.attributes.position.needsUpdate = true;
        lGeo.attributes.color.needsUpdate    = true;
      }

      // Rotate scene objects
      points.rotation.y = t * 0.025;
      torusKnot.rotation.x = t * 0.22;
      torusKnot.rotation.y = t * 0.16;

      icoMeshes.forEach((ico, i) => {
        const s = icoData[i].speed;
        ico.rotation.x = t * s * 0.7;
        ico.rotation.y = t * s;
        ico.position.y = icoData[i].pos[1] + Math.sin(t * 0.45 + i * 1.3) * 1.8;
      });

      // Camera parallax from mouse
      camera.position.x += (mouse.x  *  9 - camera.position.x) * 0.025;
      camera.position.y += (-mouse.y * 6 - camera.position.y)  * 0.025;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      pGeo.dispose();  pMat.dispose();
      lGeo.dispose();  lMat.dispose();
      tkGeo.dispose(); tkMat.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className={`absolute inset-0 ${className}`} />;
};
