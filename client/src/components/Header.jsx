import { motion } from 'framer-motion'
import state from '../store'
import { useSnapshot } from 'valtio'
import { CartButton, Cart } from '../components'
import { slideAnimation } from '../config/motion'
import { getContrastingColor } from '../config/helpers'

const Header = () => {
  const snap = useSnapshot(state)
  const numItemsInCart = snap.cartInside.length
  return (
    <motion.div className="motion-header" {...slideAnimation('down')}>
      <h2
        className="glassmorphism p-3 rounded-lg"
        style={{
          backgroundColor: snap.color,
          color: getContrastingColor(snap.color),
        }}
        onClick={() => (state.intro = true)}
      >
        Style shirt
      </h2>
      <motion.div
        className="glassmorphism p-2.5 rounded-lg cart-button"
        {...slideAnimation('right')}
        style={{ backgroundColor: '#ddcc77' }}
      >
        <CartButton
          handleCartClick={() => {
            if (numItemsInCart) {
              state.isCartOpen = !snap.isCartOpen
            }
          }}
        />
      </motion.div>
    </motion.div>
  )
}

export default Header
