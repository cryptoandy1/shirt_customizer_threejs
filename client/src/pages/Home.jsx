import { motion, AnimatePresence } from 'framer-motion'
import { useSnapshot } from 'valtio'
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from '../config/motion'
import state from '../store'
import { CustomButton, Header, Cart } from '../components'

const Home = () => {
  const snap = useSnapshot(state)
  return (
    <AnimatePresence>
      {snap.intro && (
        <>
          <Header />
          <AnimatePresence>
            {snap.isCartOpen && snap.cartInside.length && (
              <Cart cartInside={snap.cartInside} />
            )}
          </AnimatePresence>
          <motion.div className="home" {...slideAnimation('left')}>
            <motion.div className="home-content" {...headContainerAnimation}>
              <motion.div {...headTextAnimation} className="head-text">
                <h1>
                  Let's go <br /> style it !
                </h1>
              </motion.div>
              <div className="text-and-button">
                <motion.div {...headContentAnimation} className="home-p">
                  <div>
                    <p>
                      Create your unique and exclusive shirt with our brand-new
                      customization tool:
                    </p>
                    <ul>
                      <li>
                        <strong>Unleash your imagination</strong>{' '}
                      </li>
                      <li>
                        <strong>Define your own style</strong>{' '}
                      </li>
                      <li>
                        <strong>Order your shirt in a couple of clicks</strong>{' '}
                      </li>
                    </ul>
                  </div>
                </motion.div>
                <CustomButton
                  type="filled"
                  title="Start styling"
                  handleClick={() => (state.intro = false)}
                  customStyles="flex-initial w-fit px-4 py-2.5 font-bold text-sm"
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Home
