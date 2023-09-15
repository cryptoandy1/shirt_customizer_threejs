import { proxy } from 'valtio'

const state = proxy({
  intro: true,
  color: '#a3b18a',
  isLogoTexture: true,
  isFullTexture: false,
  logoDecal: './threejs.png',
  fullDecal: './threejs.png',
  isCartOpen: false,
  cartInside: [],
})

export default state
