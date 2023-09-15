import { useSnapshot } from 'valtio'
import state from '../store'

const CartItem = ({ id, image, isLogo, isFullTexture, num }) => {
  const snap = useSnapshot(state)

  const increaseDecrease = (add) => {
    const currItem = snap.cartInside.find((el) => el.id === id)
    const currItemIndex = snap.cartInside.indexOf(currItem)
    if (snap.cartInside[currItemIndex].num + add === 0) {
      state.cartInside = snap.cartInside.filter(
        (_, index) => index != currItemIndex
      )
      return null
    }
    state.cartInside[currItemIndex].num += add
  }

  let shirtType = ''
  if (isLogo) {
    shirtType = `Logo shirt`
  }
  if (isFullTexture && !isLogo) {
    shirtType = `Patterned shirt`
  }

  if (isFullTexture && isLogo) {
    shirtType = `Patterned logo shirt`
  }

  if (!isFullTexture && !isLogo) {
    shirtType = `Basic shirt`
  }

  const itemPrice = 119
  return (
    <div className="cart-item">
      <img src={image} alt="shirt-preview" />
      <h4>{`${num} x ${shirtType}`}</h4>
      <h4>{`${num * itemPrice} $`}</h4>
      <div className="num-counter">
        <button className="counter-button" onClick={() => increaseDecrease(-1)}>
          -
        </button>
        <span>{num}</span>
        <button className="counter-button" onClick={() => increaseDecrease(1)}>
          +
        </button>
      </div>
    </div>
  )
}

export default CartItem
