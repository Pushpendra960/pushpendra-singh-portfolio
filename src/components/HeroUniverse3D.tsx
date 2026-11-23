import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

interface HeroUniverse3DProps {
  className?: string;
}

// Pre-allocated math helpers outside render loop to guarantee zero per-frame GC
const _dummy = new THREE.Object3D();
const _vecA = new THREE.Vector3();
const _vecB = new THREE.Vector3();

function detectSoftwareWebGL(): boolean {
  if (typeof document === 'undefined') return true;
  const probeCanvas = document.createElement('canvas');
  const gl = probeCanvas.getContext('webgl2');
  if (!gl) return true;
  const ext = gl.getExtension('WEBGL_debug_renderer_info');
  const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
  const rendererStr = String(gl.getParameter(param) || '');
  gl.getExtension('WEBGL_lose_context')?.loseContext();
  return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(rendererStr);
}

/**
 * Interactive Three.js Spatial Hero Environment:
 * - Composite 3D Gyroscopic Cloud Core Assembly
 * - Stepped Architectural Compute Cluster Nodes (ExtrudeGeometry)
 * - Connected 3D Cloud/Network Graph with Instanced Data Packets
 * - Ambient Orbital Particle Shards + Pointer/Scroll Damped Camera Movement
 */
export function HeroUniverse3D({ className = '' }: HeroUniverse3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const isMobile = window.innerWidth < 768;
    const isSoftwareGl = detectSoftwareWebGL();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090d, 0.042);

    const camera = new THREE.PerspectiveCamera(46, width / height, 0.1, 100);
    camera.position.set(0, 0.35, isMobile ? 12.2 : 10.2);

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
    renderer.toneMappingExposure = 1.12;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x08090d, 0);
    container.appendChild(renderer.domElement);

    // Mandatory procedural studio environment reflections for brushed metals & crystal parts
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const roomEnv = new RoomEnvironment();
    const envTarget = pmremGenerator.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmremGenerator.dispose();

    // Warm/cool balanced 3-point studio lighting
    const hemiLight = new THREE.HemisphereLight(0x7dd3fc, 0x0b0e16, 0.75);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff4e0, 1.8);
    keyLight.position.set(6, 7, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.5);
    rimLight.position.set(-7, -2, -4);
    scene.add(rimLight);

    const accentPoint = new THREE.PointLight(0x38bdf8, 3.2, 22, 1.6);
    accentPoint.position.set(2.8, 1.2, 3.5);
    scene.add(accentPoint);

    // Track geometries & materials for strict cleanup
    const disposableGeometries: THREE.BufferGeometry[] = [];
    const disposableMaterials: THREE.Material[] = [];

    const trackGeo = <T extends THREE.BufferGeometry>(g: T): T => {
      disposableGeometries.push(g);
      return g;
    };
    const trackMat = <T extends THREE.Material>(m: T): T => {
      disposableMaterials.push(m);
      return m;
    };

    const cyanMetalMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x162238,
        metalness: 0.88,
        roughness: 0.2,
        emissive: 0x07263d,
        emissiveIntensity: 0.45,
      })
    );
    const brightCyanMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.4,
        roughness: 0.25,
        emissive: 0x38bdf8,
        emissiveIntensity: 0.85,
      })
    );
    const titaniumMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0x94a3b8,
        metalness: 0.92,
        roughness: 0.22,
      })
    );
    const goldAccentMat = trackMat(
      new THREE.MeshStandardMaterial({
        color: 0xe2b76e,
        metalness: 0.9,
        roughness: 0.18,
        emissive: 0x422a08,
        emissiveIntensity: 0.35,
      })
    );
    const wireCyanMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        wireframe: true,
        transparent: true,
        opacity: 0.26,
      })
    );

    const worldRoot = new THREE.Group();
    scene.add(worldRoot);

    // =========================================================
    // 1. COMPOSITE 3D GYROSCOPIC CLOUD CORE ASSEMBLY (Right-back)
    // =========================================================
    const gyroGroup = new THREE.Group();
    gyroGroup.position.set(isMobile ? 0 : 2.9, isMobile ? 1.4 : 0.25, -1.6);
    worldRoot.add(gyroGroup);

    const innerKernel = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(0.68, 0)), cyanMetalMat);
    const kernelWire = new THREE.Mesh(trackGeo(new THREE.IcosahedronGeometry(0.84, 1)), wireCyanMat);
    const collarRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(1.18, 0.032, 16, 72)), titaniumMat);
    collarRing.rotation.x = Math.PI * 0.36;

    const outerRing = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(1.62, 0.024, 14, 84)), goldAccentMat);
    outerRing.rotation.y = Math.PI * 0.28;
    outerRing.rotation.x = -Math.PI * 0.22;

    const orbitalRing3 = new THREE.Mesh(trackGeo(new THREE.TorusGeometry(2.05, 0.016, 12, 96)), brightCyanMat);
    orbitalRing3.rotation.x = Math.PI * 0.55;
    orbitalRing3.rotation.z = Math.PI * 0.18;

    // Orbital satellite hubs attached to ring planes
    const satelliteGeo = trackGeo(new THREE.OctahedronGeometry(0.11, 0));
    const satA = new THREE.Mesh(satelliteGeo, brightCyanMat);
    satA.position.set(1.62, 0, 0);
    outerRing.add(satA);

    const satB = new THREE.Mesh(satelliteGeo, goldAccentMat);
    satB.position.set(0, 2.05, 0);
    orbitalRing3.add(satB);

    gyroGroup.add(innerKernel, kernelWire, collarRing, outerRing, orbitalRing3);

    // =========================================================
    // 2. COMPOSITE STEPPED COMPUTE CLUSTER NODES (Beveled Extrude)
    // =========================================================
    const bladeShape = new THREE.Shape();
    bladeShape.moveTo(-0.42, -0.24);
    bladeShape.lineTo(0.42, -0.24);
    bladeShape.lineTo(0.48, 0);
    bladeShape.lineTo(0.42, 0.24);
    bladeShape.lineTo(-0.42, 0.24);
    bladeShape.lineTo(-0.48, 0);
    bladeShape.closePath();

    const bladeGeo = trackGeo(
      new THREE.ExtrudeGeometry(bladeShape, {
        depth: 0.12,
        bevelEnabled: true,
        bevelThickness: 0.025,
        bevelSize: 0.025,
        bevelSegments: 2,
      })
    );
    bladeGeo.center();

    const buildComputeCluster = (x: number, y: number, z: number, scale: number) => {
      const cluster = new THREE.Group();
      cluster.position.set(x, y, z);
      cluster.scale.setScalar(scale);

      const bladeBottom = new THREE.Mesh(bladeGeo, cyanMetalMat);
      bladeBottom.position.y = -0.28;
      bladeBottom.rotation.x = Math.PI * 0.5;

      const bladeMid = new THREE.Mesh(bladeGeo, titaniumMat);
      bladeMid.position.y = 0;
      bladeMid.rotation.x = Math.PI * 0.5;

      const bladeTop = new THREE.Mesh(bladeGeo, cyanMetalMat);
      bladeTop.position.y = 0.28;
      bladeTop.rotation.x = Math.PI * 0.5;

      const corePillar = new THREE.Mesh(
        trackGeo(new THREE.CylinderGeometry(0.11, 0.11, 0.88, 12)),
        brightCyanMat
      );
      const haloFrame = new THREE.Mesh(
        trackGeo(new THREE.OctahedronGeometry(0.86, 0)),
        wireCyanMat
      );

      cluster.add(bladeBottom, bladeMid, bladeTop, corePillar, haloFrame);
      worldRoot.add(cluster);
      return cluster;
    };

    const clusterLeft = buildComputeCluster(isMobile ? -2.3 : -4.4, 2.0, -2.8, 0.85);
    const clusterBottomRight = buildComputeCluster(isMobile ? 2.1 : 4.5, -2.1, -3.2, 0.72);

    // =========================================================
    // 3. CONNECTED CLOUD / NETWORK TOPOLOGY & DATA PACKETS
    // =========================================================
    const nodePositions = [
      new THREE.Vector3(-5.2, 2.5, -3.5),
      new THREE.Vector3(-3.3, 1.2, -2.3),
      new THREE.Vector3(-4.1, -1.5, -2.9),
      new THREE.Vector3(-1.8, 2.7, -3.8),
      new THREE.Vector3(-1.4, -2.2, -2.6),
      new THREE.Vector3(0.4, 2.3, -3.2),
      new THREE.Vector3(1.2, -2.4, -3.4),
      new THREE.Vector3(2.9, 2.4, -2.8),
      new THREE.Vector3(3.1, 0.1, -2.1),
      new THREE.Vector3(4.9, 1.7, -3.5),
      new THREE.Vector3(4.5, -1.9, -2.7),
      new THREE.Vector3(0.2, 0.3, -4.4),
    ];

    const edgePairs: [number, number][] = [
      [0, 1],
      [1, 2],
      [1, 3],
      [2, 4],
      [3, 5],
      [4, 6],
      [5, 7],
      [5, 11],
      [11, 8],
      [7, 8],
      [7, 9],
      [8, 10],
      [6, 10],
      [6, 8],
      [4, 11],
      [0, 3],
    ];

    // Network nodes via InstancedMesh
    const netNodeGeo = trackGeo(new THREE.OctahedronGeometry(0.085, 1));
    const netNodeMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x7dd3fc,
        transparent: true,
        opacity: 0.85,
      })
    );
    const networkNodesMesh = new THREE.InstancedMesh(netNodeGeo, netNodeMat, nodePositions.length);
    networkNodesMesh.frustumCulled = false;
    nodePositions.forEach((pos, idx) => {
      _dummy.position.copy(pos);
      _dummy.rotation.set(0, 0, 0);
      _dummy.scale.setScalar(idx % 3 === 0 ? 1.25 : 0.9);
      _dummy.updateMatrix();
      networkNodesMesh.setMatrixAt(idx, _dummy.matrix);
    });
    networkNodesMesh.instanceMatrix.needsUpdate = true;
    networkNodesMesh.computeBoundingSphere();
    worldRoot.add(networkNodesMesh);

    // Network edge lines
    const lineCoords = new Float32Array(edgePairs.length * 6);
    edgePairs.forEach(([a, b], idx) => {
      const pa = nodePositions[a];
      const pb = nodePositions[b];
      lineCoords[idx * 6] = pa.x;
      lineCoords[idx * 6 + 1] = pa.y;
      lineCoords[idx * 6 + 2] = pa.z;
      lineCoords[idx * 6 + 3] = pb.x;
      lineCoords[idx * 6 + 4] = pb.y;
      lineCoords[idx * 6 + 5] = pb.z;
    });
    const lineGeo = trackGeo(new THREE.BufferGeometry());
    lineGeo.setAttribute('position', new THREE.BufferAttribute(lineCoords, 3));
    const lineMat = trackMat(
      new THREE.LineBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.2,
      })
    );
    const networkLines = new THREE.LineSegments(lineGeo, lineMat);
    worldRoot.add(networkLines);

    // Data transmission packets streaming along network edges
    const packetCount = edgePairs.length;
    const packetGeo = trackGeo(new THREE.SphereGeometry(0.042, 8, 8));
    const packetMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0xe2b76e,
        transparent: true,
        opacity: 0.92,
      })
    );
    const packetMesh = new THREE.InstancedMesh(packetGeo, packetMat, packetCount);
    packetMesh.frustumCulled = false;
    worldRoot.add(packetMesh);

    const packetOffsets = edgePairs.map((_, idx) => (idx * 0.23) % 1);
    const packetSpeeds = edgePairs.map((_, idx) => 0.22 + (idx % 4) * 0.06);

    // =========================================================
    // 4. ORBITAL AMBIENT PARTICLE FIELD (InstancedMesh)
    // =========================================================
    const particleCount = isMobile ? 42 : 84;
    const shardGeo = trackGeo(new THREE.OctahedronGeometry(0.032, 0));
    const shardMat = trackMat(
      new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.6,
      })
    );
    const particlesMesh = new THREE.InstancedMesh(shardGeo, shardMat, particleCount);
    particlesMesh.frustumCulled = false;
    worldRoot.add(particlesMesh);

    const particleMeta = Array.from({ length: particleCount }, (_, i) => {
      const radius = 2.4 + ((i * 19) % 45) * 0.14;
      const angle = (i / particleCount) * Math.PI * 2;
      const y = ((i * 37) % 100) * 0.065 - 3.2;
      const z = -1.5 - ((i * 23) % 40) * 0.1;
      const speed = (i % 2 === 0 ? 1 : -1) * (0.045 + (i % 5) * 0.015);
      const scale = 0.65 + (i % 4) * 0.35;
      return { radius, angle, y, z, speed, scale };
    });

    // Pointer & Scroll damping targets
    let pointerX = 0;
    let pointerY = 0;
    let scrollFraction = 0;

    const onPointerMove = (e: PointerEvent) => {
      pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      pointerY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      const heroH = Math.max(container.clientHeight, 600);
      scrollFraction = Math.min(1, Math.max(0, window.scrollY / heroH));
    };

    const onResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    // Pre-warm shaders when hardware GPU is active
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    const updateSceneState = (elapsed: number, delta: number) => {
      // Smooth exponential camera damping from pointer + scroll depth
      const targetCamX = pointerX * 0.65;
      const targetCamY = 0.35 + pointerY * 0.42 - scrollFraction * 0.65;
      const targetCamZ = (isMobile ? 12.2 : 10.2) + scrollFraction * 1.4;

      camera.position.x = THREE.MathUtils.damp(camera.position.x, targetCamX, 3.2, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, targetCamY, 3.2, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, targetCamZ, 3.2, delta);
      camera.lookAt(pointerX * 0.25, pointerY * 0.15, -1.6);

      // Composite gyroscopic core rotations
      innerKernel.rotation.y = elapsed * 0.38;
      innerKernel.rotation.x = elapsed * 0.22;
      kernelWire.rotation.y = -elapsed * 0.24;
      kernelWire.rotation.z = elapsed * 0.16;
      collarRing.rotation.z = elapsed * 0.34;
      outerRing.rotation.z = -elapsed * 0.26;
      orbitalRing3.rotation.y = elapsed * 0.22;
      gyroGroup.position.y = (isMobile ? 1.4 : 0.25) + Math.sin(elapsed * 0.9) * 0.18;

      // Compute clusters floating & slow axis spin
      clusterLeft.rotation.y = elapsed * 0.28;
      clusterLeft.rotation.x = Math.sin(elapsed * 0.5) * 0.18;
      clusterLeft.position.y = 2.0 + Math.sin(elapsed * 0.75 + 1.2) * 0.22;

      clusterBottomRight.rotation.y = -elapsed * 0.32;
      clusterBottomRight.rotation.z = Math.cos(elapsed * 0.45) * 0.14;
      clusterBottomRight.position.y = -2.1 + Math.cos(elapsed * 0.8) * 0.2;

      // Pulsing network nodes & travelling data packets
      nodePositions.forEach((pos, idx) => {
        const pulse = (idx % 3 === 0 ? 1.2 : 0.9) + Math.sin(elapsed * 2.2 + idx * 0.7) * 0.18;
        _dummy.position.copy(pos);
        _dummy.rotation.y = elapsed * 0.6 + idx;
        _dummy.scale.setScalar(pulse);
        _dummy.updateMatrix();
        networkNodesMesh.setMatrixAt(idx, _dummy.matrix);
      });
      networkNodesMesh.instanceMatrix.needsUpdate = true;

      edgePairs.forEach(([a, b], idx) => {
        const t = (packetOffsets[idx] + elapsed * packetSpeeds[idx]) % 1;
        _vecA.copy(nodePositions[a]);
        _vecB.copy(nodePositions[b]);
        _dummy.position.lerpVectors(_vecA, _vecB, t);
        _dummy.rotation.set(0, 0, 0);
        _dummy.scale.setScalar(0.85 + Math.sin(elapsed * 4 + idx) * 0.2);
        _dummy.updateMatrix();
        packetMesh.setMatrixAt(idx, _dummy.matrix);
      });
      packetMesh.instanceMatrix.needsUpdate = true;

      // Orbital particles
      for (let i = 0; i < particleCount; i++) {
        const p = particleMeta[i];
        const a = p.angle + elapsed * p.speed;
        _dummy.position.set(
          Math.cos(a) * p.radius * 0.75,
          p.y + Math.sin(elapsed * 0.65 + i) * 0.18,
          p.z + Math.sin(a) * 1.15
        );
        _dummy.rotation.set(elapsed * 0.4 + i, elapsed * 0.5, 0);
        _dummy.scale.setScalar(p.scale);
        _dummy.updateMatrix();
        particlesMesh.setMatrixAt(i, _dummy.matrix);
      }
      particlesMesh.instanceMatrix.needsUpdate = true;
    };

    const afterDraw = (cb: () => void) => {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync?.(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    };

    if (reducedMotion) {
      updateSceneState(1.2, 0.016);
      renderer.render(scene, camera);
    } else {
      const tick = () => {
        if (disposed) return;
        const delta = Math.min(clock.getDelta(), 0.05);
        const elapsed = clock.getElapsedTime();
        updateSceneState(elapsed, delta);
        renderer.render(scene, camera);
        if (isSoftwareGl) {
          afterDraw(tick);
        } else {
          frameId = window.requestAnimationFrame(tick);
        }
      };
      tick();
    }

    return () => {
      disposed = true;
      window.cancelAnimationFrame(frameId);
      window.clearTimeout(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);

      disposableGeometries.forEach((g) => g.dispose());
      disposableMaterials.forEach((m) => m.dispose());
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
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}
