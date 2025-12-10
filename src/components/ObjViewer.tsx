import { useEffect, useRef } from 'react'
import {
  AmbientLight,
  Box3,
  BoxGeometry,
  Color,
  DirectionalLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
  Object3D,
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { Installation } from '../data/installations'

type ObjViewerProps = {
  installation: Installation | null
  onLoading: () => void
  onProgress: (value: number) => void
  onReady: () => void
  onError: (message: string) => void
  isMobile?: boolean
  cameraHint?: Installation['cameraHint']
}

const isWebGLAvailable = () => {
  try {
    const canvas = document.createElement('canvas')
    return !!window.WebGLRenderingContext && !!canvas.getContext('webgl')
  } catch {
    return false
  }
}

export function ObjViewer({
  installation,
  onLoading,
  onProgress,
  onReady,
  onError,
  isMobile,
  cameraHint,
}: ObjViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)
  const rendererRef = useRef<WebGLRenderer | null>(null)
  const controlsRef = useRef<OrbitControls | null>(null)

  useEffect(() => {
    if (!installation) return
    if (!mountRef.current) return
    if (!isWebGLAvailable()) {
      onError('webgl-unavailable')
      return
    }

    const container = mountRef.current
    const scene = new Scene()
    scene.background = new Color('#f7f7f7')

    const camera = new PerspectiveCamera(50, 1, 0.1, 5000)
    camera.position.set(0, 1.8, 3.2)

    const renderer = new WebGLRenderer({ antialias: true, alpha: true })
    renderer.outputColorSpace = SRGBColorSpace
    renderer.toneMappingExposure = 1.0
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.6 : 2))
    renderer.setClearColor('#ffffff', 0)
    rendererRef.current = renderer

    const resize = () => {
      const { clientWidth, clientHeight } = container
      const width = Math.max(clientWidth, 200)
      const height = Math.max(clientHeight, 200)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height, false)
    }

    container.appendChild(renderer.domElement)
    resize()
    window.addEventListener('resize', resize)

    const ambient = new AmbientLight(0xffffff, 1.1)
    scene.add(ambient)

    const dir = new DirectionalLight(0xffffff, 0.7)
    dir.position.set(5, 10, 8)
    scene.add(dir)

    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.minDistance = 0.5
    controls.maxDistance = 24
    controls.maxPolarAngle = Math.PI * 0.48
    controlsRef.current = controls

    const stop = startRenderLoop(renderer, scene, camera, controls)

    const glbUrl = installation.model
      ? isMobile && installation.model.mobileGlb
        ? installation.model.mobileGlb
        : installation.model.glb
      : null
    const objUrl = installation.model
      ? isMobile && installation.model.mobileObj
        ? installation.model.mobileObj
        : installation.model.obj
      : null

    const modelUrl = glbUrl ?? objUrl
    const useGlb = Boolean(glbUrl)

    if (!modelUrl) {
      onLoading()
      const placeholder = createPlaceholderMesh()
      scene.add(placeholder)
      centerAndFrame(placeholder, camera, controls, cameraHint)
      onReady()
    } else {
      onLoading()
      const handleProgress = (xhr: ProgressEvent<EventTarget>) => {
        if (xhr.total) {
          const pct = (xhr.loaded / xhr.total) * 100
          onProgress(Number.isFinite(pct) ? Math.min(100, Math.max(0, pct)) : 0)
        } else {
          onProgress(20)
        }
      }

      if (useGlb) {
        const loader = new GLTFLoader()
        loader.load(
          modelUrl,
          (gltf) => {
            const object = gltf.scene || gltf.scenes?.[0] || new Object3D()
            scene.add(object)
            centerAndFrame(object, camera, controls, cameraHint)
            onReady()
          },
          handleProgress,
          (error: unknown) => {
            console.error('GLB load error', error)
            onError('load-error')
          },
        )
      } else {
        const loader = new OBJLoader()
        loader.load(
          modelUrl,
          (object: Object3D) => {
            scene.add(object)
            centerAndFrame(object, camera, controls, cameraHint)
            onReady()
          },
          handleProgress,
          (error: unknown) => {
            console.error('OBJ load error', error)
            onError('load-error')
          },
        )
      }
    }

    return () => cleanup(container, renderer, controls, stop, resize)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [installation?.id, isMobile])

  if (!installation) return null
  return <div ref={mountRef} className="viewer-canvas" aria-label="3D model viewer" />
}

function startRenderLoop(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: PerspectiveCamera,
  controls: OrbitControls,
) {
  let frameId = 0
  const renderLoop = () => {
    controls.update()
    renderer.render(scene, camera)
    frameId = requestAnimationFrame(renderLoop)
  }
  renderLoop()
  return () => cancelAnimationFrame(frameId)
}

function centerAndFrame(
  object: any,
  camera: PerspectiveCamera,
  controls: OrbitControls,
  cameraHint?: Installation['cameraHint'],
) {
  const box = new Box3().setFromObject(object)
  const size = box.getSize(new Vector3())
  const center = box.getCenter(new Vector3())

  object.position.x += object.position.x - center.x
  object.position.y += object.position.y - center.y
  object.position.z += object.position.z - center.z

  const maxDim = Math.max(size.x, size.y, size.z)
  const fitHeightDistance = maxDim / (2 * Math.tan((Math.PI * camera.fov) / 360))
  const fitWidthDistance = fitHeightDistance / camera.aspect
  const distance = Math.max(fitHeightDistance, fitWidthDistance) * 1.6

  const target = cameraHint?.target ? new Vector3(...cameraHint.target) : center

  camera.position.copy(
    cameraHint?.position
      ? new Vector3(...cameraHint.position)
      : new Vector3(center.x, center.y + maxDim * 0.35, center.z + distance),
  )
  controls.target.copy(target)
  controls.update()
}

function cleanup(
  container: HTMLDivElement,
  renderer: WebGLRenderer | null,
  controls: OrbitControls | null,
  stop: () => void,
  resize: () => void,
) {
  stop()
  window.removeEventListener('resize', resize)
  controls?.dispose()
  renderer?.dispose()
  if (renderer?.domElement && container.contains(renderer.domElement)) {
    container.removeChild(renderer.domElement)
  }
}

function createPlaceholderMesh() {
  const geometry = new BoxGeometry(1.2, 0.4, 1.2)
  const material = new MeshStandardMaterial({
    color: '#e6007a',
    roughness: 0.35,
    metalness: 0.05,
  })
  const mesh = new Mesh(geometry, material)
  mesh.position.y = 0.2
  return mesh
}

