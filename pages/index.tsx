import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
// import AnimateLayout from '../components/Layouts/AnimateLayout';
import { useRouter } from 'next/router'

const HomePage = ({props}) => {
    const growBox = {
        initial: {
            opacity: 0,
            scale: 0.8
        },
        animate: {
            opacity: 1,
            scale: 1,
        },
        exit:{
            opacity: 0, 
            scale: 10,
            // rotate: 360,
            transition:{
                duration: 0.5,
            }
        }
    }

    const router = useRouter();

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-start pt-10 bg-yellow-100">
            <Head>
                <title>Experiments with ThreeJs, React3Fiber & Framer Motion</title>
            </Head>
            <motion.h1
                initial={{scale: 0.8, opacity: 0}}
                animate={{scale: 1, opacity: 1, transition: {delay: 0.1}}}
                exit={{opacity: 0, y: -100}}
                className="text-yellow-600 mb-10"
            >
                Experiments with Three Js, React3Fiber & Framer Motion
            </motion.h1>
            <ul className="grid grid-cols-2 gap-20">
                <motion.li 
                    key={"/shapes"}
                    layoutId={"shapes"}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{
                        scale: 1.2
                    }}
                    variants={growBox}
                    className="h-32 w-32 grid place-items-center no-underline p-3 bg-yellow-300 hover:bg-yellow-400 rounded-xl border-none outline-none cursor-pointer text-white text-lg shadow"
                >
                    <Link href="/shapes" as="/shapes">
                            Shapes
                    </Link>
                </motion.li>
                <motion.li 
                    key={"/textures"}
                    layoutId={"/textures"}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{
                        scale: 1.2
                    }}
                    variants={growBox}
                    className="h-32 w-32 grid place-items-center no-underline p-3 bg-yellow-300 hover:bg-yellow-400 rounded-xl border-none outline-none cursor-pointer text-white text-lg shadow"
                >
                    <Link href="/textures" as="/textures">
                        Textures
                    </Link>
                </motion.li>
                <motion.li 
                    key={"/table"}
                    layoutId={"/table"}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    whileHover={{
                        scale: 1.2
                    }}
                    variants={growBox}
                    className="h-32 w-32 grid place-items-center no-underline p-3 bg-yellow-300 hover:bg-yellow-400 rounded-xl border-none outline-none cursor-pointer text-white text-lg shadow"
                >
                    <Link href="/table" as="/table">
                        Custom Geometry
                    </Link>
                </motion.li>
            </ul>
        </div>
    )
}

export default HomePage;
