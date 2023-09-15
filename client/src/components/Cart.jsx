import { motion } from 'framer-motion'
import { slideAnimation } from '../config/motion'
import { CartItem } from './'
import { useOutsideClick } from '../config/helpers'
import state from '../store'
import { useSnapshot } from 'valtio'

const Cart = ({ cartInside }) => {
  const snap = useSnapshot(state)
  const handleClickOutside = () => {
    state.isCartOpen = false
  }

  const ref = useOutsideClick(handleClickOutside)

  const getTotal = () => {
    let counter = 0
    cartInside.forEach((item) => {
      counter += item.num * 119
    })
    return counter
  }
  if (!snap.cartInside.length) {
    state.isCartOpen = false
  }
  return (
    <motion.div
      ref={ref}
      className="cart glassmorphism"
      {...slideAnimation('right')}
    >
      <h1
        className="px-3 py-4"
        style={{ marginBottom: '2rem', textAlign: 'left', fontWeight: 'bold' }}
      >
        Your items:
      </h1>
      {cartInside.map((item) => (
        <CartItem key={item.id} {...item} />
      ))}
      <div className="total-cart">
        <h2>{`Total: ${getTotal()} $`}</h2>
        <button className="checkout-button">Checkout</button>
      </div>
    </motion.div>
  )
}

export default Cart
