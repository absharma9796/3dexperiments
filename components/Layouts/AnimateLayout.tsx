import { AnimatePresence } from "framer-motion";

const AnimateLayout = ({children}) => {
    return (
        <AnimatePresence exitBeforeEnter>
            {children}
        </AnimatePresence>
    )
}

export default AnimateLayout;
