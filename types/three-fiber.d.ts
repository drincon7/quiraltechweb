import { ReactThreeFiber } from '@react-three/fiber'
import { Object3D, Mesh, DirectionalLight, AmbientLight } from 'three'

declare module '@react-three/fiber' {
  interface ThreeElements {
    mesh: ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>
    primitive: { object: Object3D; ref?: React.RefObject<Object3D> }
    ambientLight: ReactThreeFiber.Object3DNode<AmbientLight, typeof AmbientLight>
    directionalLight: ReactThreeFiber.Object3DNode<DirectionalLight, typeof DirectionalLight>
  }
}