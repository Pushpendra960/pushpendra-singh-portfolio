import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return true;
  const c = document.createElement('canvas');
  const gl = c.getContext('webgl2');
  if (!gl) return true;
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
  const s = String(gl.getParameter(param) || '');
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(s);
}

/**
 * Composite 3-part metallic 3D Achievement Emblem (Beveled Gold Prism + Orbital Halo + Pedestal Ring)
 * Rendered via Three.js with procedural RoomEnvironment studio reflections.
 */
export function AchievementTrophy3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const isSoftwareGl = detectSoftwareWebGL();
    const width = container.clientWidth || 160;
    const height = container.clientHeight || 160;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(0, 0.4, 5.2);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    const pmrem = new THREE.PMREMGenerator(renderer);
    const room = new RoomEnvironment();
    const envTarget = pmrem.fromScene(room, 0.04);
    scene.environment = envTarget.texture;
    room.dispose();
    pmrem.dispose();

    const hemi = new THREE.HemisphereLight(0x7dd3fc, 0x11141d, 0.8);
    const key = new THREE.DirectionalLight(0xfff0d6, 1.9);
    key.position.set(4, 5, 5);
    const rim = new THREE.DirectionalLight(0x38bdf8, 1.4);
    rim.position.set(-4, -2, -3);
    scene.add(hemi, key, rim);

    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xe2b76e,
      metalness: 0.92,
      roughness: 0.18,
    });
    const cyanMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.55,
      roughness: 0.22,
      emissive: 0x0a344c,
      emissiveIntensity: 0.7,
    });
    const steelMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.26,
    });

    const trophyGroup = new THREE.Group();
    scene.add(trophyGroup);

    const prismGeo = new THREE.OctahedronGeometry(0.9, 0);
    const prism = new THREE.Mesh(prismGeo, goldMat);

    const haloGeo = new THREE.TorusGeometry(1.32, 0.04, 14, 64);
    const halo = new THREE.Mesh(haloGeo, cyanMat);
    halo.rotation.x = Math.PI * 0.35;

    const baseGeo = new THREE.CylinderGeometry(0.55, 0.72, 0.22, 8);
    const base = new THREE.Mesh(baseGeo, steelMat);
    base.position.y = -1.15;

    const ringGeo = new THREE.TorusGeometry(1.55, 0.02, 12, 72);
    const outerRing = new THREE.Mesh(ringGeo, goldMat);
    outerRing.rotation.y = Math.PI * 0.3;

    trophyGroup.add(prism, halo, base, outerRing);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const st = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (st === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    if (reducedMotion) {
      trophyGroup.rotation.y = 0.5;
      renderer.render(scene, camera);
    } else {
      const tick = () => {
        if (disposed) return;
        const t = clock.getElapsedTime();
        prism.rotation.y = t * 0.65;
        prism.position.y = Math.sin(t * 1.4) * 0.1;
        halo.rotation.z = t * 0.5;
        outerRing.rotation.x = t * 0.38;
        outerRing.rotation.z = -t * 0.25;
        renderer.render(scene, camera);
        if (isSoftwareGl) afterDraw(tick);
        else frameId = window.requestAnimationFrame(tick);
      };
      tick();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      prismGeo.dispose();
      haloGeo.dispose();
      baseGeo.dispose();
      ringGeo.dispose();
      goldMat.dispose();
      cyanMat.dispose();
      steelMat.dispose();
      envTarget.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="h-28 w-28 shrink-0 sm:h-32 sm:w-32"
    />
  );
}
