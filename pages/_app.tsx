import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import '../styles/global.sass'

function MyApp({ Component, pageProps, router }) {
  return (
    <AnimatePresence exitBeforeEnter>
        <motion.div
          key={router.route}
        >
        <AnimateSharedLayout>
          <Component {...pageProps} route={router.route}/>
        </AnimateSharedLayout>
      </motion.div>
    </AnimatePresence>
  )
}

export default MyApp;