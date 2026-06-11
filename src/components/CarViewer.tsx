import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js'
import type { VehiclePartId } from '../data/models'

type Marker = {
  id: VehiclePartId
  label: string
  x: number
  y: number
}

const markers: Marker[] = [
  { id: 'screen', label: 'หน้าจอ', x: 51, y: 38 },
  { id: 'charging', label: 'ชาร์จ', x: 75, y: 52 },
  { id: 'exterior', label: 'ภายนอก', x: 24, y: 47 },
  { id: 'safety', label: 'Safety', x: 62, y: 64 },
  { id: 'care', label: 'ดูแล', x: 35, y: 70 },
]

type CarViewerProps = {
  activePart: VehiclePartId
  onPartChange: (part: VehiclePartId) => void
}

export function CarViewer({ activePart, onPartChange }: CarViewerProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(34, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.set(4.6, 2.4, 6.2)
    camera.lookAt(0, 0.35, 0)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mount.appendChild(renderer.domElement)

    const ambient = new THREE.HemisphereLight(0xbfd7ff, 0x07080d, 1.9)
    scene.add(ambient)

    const key = new THREE.DirectionalLight(0xffffff, 3.8)
    key.position.set(3.5, 5, 4)
    key.castShadow = true
    scene.add(key)

    const blue = new THREE.PointLight(0x246cff, 8, 10)
    blue.position.set(-2.8, 0.8, 2.2)
    scene.add(blue)

    const group = new THREE.Group()
    scene.add(group)

    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: 0xe9edf4,
      metalness: 0.38,
      roughness: 0.24,
      clearcoat: 0.85,
      clearcoatRoughness: 0.18,
    })
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x142036,
      metalness: 0.1,
      roughness: 0.12,
      transmission: 0.1,
      transparent: true,
      opacity: 0.72,
    })
    const accentMat = new THREE.MeshStandardMaterial({ color: 0x2367ff, metalness: 0.4, roughness: 0.25 })
    const trimMat = new THREE.MeshStandardMaterial({ color: 0x05070c, metalness: 0.5, roughness: 0.42 })
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x08090d, roughness: 0.62 })
    const rimMat = new THREE.MeshStandardMaterial({ color: 0xaeb8c8, metalness: 0.8, roughness: 0.22 })

    const body = new THREE.Mesh(new RoundedBoxGeometry(3.9, 0.76, 1.54, 8, 0.14), bodyMat)
    body.position.set(0, 0.62, 0)
    body.castShadow = true
    group.add(body)

    const cabin = new THREE.Mesh(new RoundedBoxGeometry(2.05, 0.72, 1.2, 8, 0.12), glassMat)
    cabin.position.set(-0.24, 1.18, -0.02)
    cabin.scale.set(1, 0.76, 1)
    cabin.castShadow = true
    group.add(cabin)

    const hood = new THREE.Mesh(new RoundedBoxGeometry(1.28, 0.24, 1.46, 6, 0.08), bodyMat)
    hood.position.set(1.34, 0.94, 0)
    hood.castShadow = true
    group.add(hood)

    const rear = new THREE.Mesh(new RoundedBoxGeometry(0.82, 0.48, 1.5, 6, 0.09), bodyMat)
    rear.position.set(-1.68, 0.94, 0)
    rear.castShadow = true
    group.add(rear)

    const bluePanel = new THREE.Mesh(new RoundedBoxGeometry(1.15, 0.58, 0.04, 4, 0.03), accentMat)
    bluePanel.position.set(-0.5, 0.69, 0.79)
    group.add(bluePanel)

    const grille = new THREE.Mesh(new RoundedBoxGeometry(0.08, 0.34, 1.04, 4, 0.02), trimMat)
    grille.position.set(1.94, 0.63, 0)
    group.add(grille)

    const lightMat = new THREE.MeshBasicMaterial({ color: 0x93c7ff })
    const leftHeadlight = new THREE.Mesh(new RoundedBoxGeometry(0.04, 0.08, 0.38, 4, 0.02), lightMat)
    leftHeadlight.position.set(1.99, 0.75, 0.43)
    const rightHeadlight = leftHeadlight.clone()
    rightHeadlight.position.z = -0.43
    group.add(leftHeadlight, rightHeadlight)

    const beltLine = new THREE.Mesh(new RoundedBoxGeometry(2.4, 0.045, 0.04, 3, 0.015), accentMat)
    beltLine.position.set(-0.04, 0.86, 0.81)
    group.add(beltLine)

    const makeWheel = (x: number, z: number) => {
      const wheel = new THREE.Group()
      const tire = new THREE.Mesh(new THREE.CylinderGeometry(0.39, 0.39, 0.32, 48), tireMat)
      tire.rotation.z = Math.PI / 2
      tire.castShadow = true
      wheel.add(tire)
      const rim = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.34, 32), rimMat)
      rim.rotation.z = Math.PI / 2
      wheel.add(rim)
      wheel.position.set(x, 0.24, z)
      return wheel
    }

    group.add(makeWheel(1.18, 0.76), makeWheel(-1.22, 0.76), makeWheel(1.18, -0.76), makeWheel(-1.22, -0.76))

    const floor = new THREE.Mesh(
      new THREE.CircleGeometry(3.8, 80),
      new THREE.MeshBasicMaterial({ color: 0x1c4fff, transparent: true, opacity: 0.13 }),
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -0.02
    scene.add(floor)

    let animationFrame = 0
    const animate = () => {
      group.rotation.y += 0.004
      group.rotation.x = Math.sin(Date.now() * 0.0008) * 0.025
      renderer.render(scene, camera)
      animationFrame = requestAnimationFrame(animate)
    }

    const resize = () => {
      if (!mount.clientWidth || !mount.clientHeight) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', resize)
    animate()

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      mount.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <div className="car-viewer" aria-label="Interactive Nevo Q05 car viewer">
      <div className="car-canvas" ref={mountRef} />
      <button className="overview-hotspot" type="button" onClick={() => onPartChange('overview')}>
        Q05
      </button>
      {markers.map((marker) => (
        <button
          key={marker.id}
          type="button"
          className={`part-marker ${activePart === marker.id ? 'is-active' : ''}`}
          style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          onClick={() => onPartChange(marker.id)}
        >
          <span />
          {marker.label}
        </button>
      ))}
    </div>
  )
}
