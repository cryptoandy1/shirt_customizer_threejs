import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'
import { useSnapshot } from 'valtio'
import state from '../store'
import { useRef } from 'react'

const CameraRig = ({ children }) => {
  const group = useRef()
  const snap = useSnapshot(state)

  useFrame((state, delta) => {
    const isWide = window.innerWidth > 1023
    const isBreakpoint = window.innerWidth <= 1023
    const isMobile = window.innerWidth <= 600

    //set the initial position of the model
    let targetPosition = [0.4, 0, 2]
    if (snap.intro) {
      if (isWide) targetPosition = [-0.2, 0, 2]
      if (isBreakpoint) targetPosition = [0, 0.1, 2.5]
      if (isMobile) targetPosition = [0, -0.02, 3.5]
    } else {
      if (isWide) targetPosition = [0, 0, 2]
      if (isBreakpoint) targetPosition = [0, 0.07, 2.5]
      if (isMobile) targetPosition = [0, 0.07, 3.5]
    }

    //set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 5, -state.pointer.x / 2, 0],
      0.25,
      delta
    )
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
