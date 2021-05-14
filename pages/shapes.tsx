import React, { FC, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimateLayout from '../components/Layouts/AnimateLayout';

const Box:FC<any> = (props) => {
    const mesh: any = useRef();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [position, setposition] = useState(props.position);

    const handleClick = (event) => {
        setActive(!active);
    }

    useFrame(({clock}) => (mesh.current.rotation.y = Math.sin(clock.getElapsedTime())));

    return (
        <mesh
            {...props}
            ref={mesh}
            position={position}
            onClick={(event) => handleClick(event)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <boxGeometry args={[1.5,1.5,1.5]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const Sphere:FC<any> = (props) => {
    const mesh: any = useRef();

    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const [position, setposition] = useState(props.position);

    const handleClick = (event) => {
        setActive(!active);
    }

    useFrame(({clock}) => (mesh.current.rotation.y = Math.sin(clock.getElapsedTime())));

    return (
        <mesh
            {...props}
            ref={mesh}
            position={position}
            onClick={(event) => handleClick(event)}
            onPointerOver={(event) => setHover(true)}
            onPointerOut={(event) => setHover(false)}
        >
            <sphereGeometry args={[1,100,100]} />
            <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
        </mesh>
    )
}

const Shapes = () => {

    const growBox = {
        initial: {
            opacity: 0, 
            scale: [10,0.8,1],
        },
        animate: {
            opacity: 1,
            scale: 1,
            transition:{
                duration: 0.5,
                bounce: "spring"
            }
        },
        exit:{
            opacity: 0, 
            scale: 10,
            rotate: -360,
            transition:{
                duration: 0.5,
                bounce: "spring"
            }
        }
    }

    return (
        <motion.div className="w-screen h-screen flex flex-col items-center justify-center bg-yellow-100">
            <Link href="/">
                <button 
                    className="z-50 absolute top-2 p-2 no-underline border-none outline-none cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded"
                >
                    Home
                </button>
            </Link>
            <motion.div
                key={"/shapes"}
                layoutId={"shapes"}
                initial="initial"
                animate="animate"
                exit="exit"
                whileHover={{
                    scale: 1.2
                }}
                variants={growBox}
                className="h-20 w-20 absolute top-20 grid place-items-center no-underline p-3 bg-yellow-300 hover:bg-yellow-400 rounded-xl border-none outline-none cursor-pointer text-white text-lg shadow"
            >
                Shapes
            </motion.div>
            <Canvas>
                <ambientLight/>
                <directionalLight color="red" position={[5, 0, 0]} intensity={1.5}/>
                <pointLight position={[10,10,10]} />
                <OrbitControls autoRotate={false} />
                <Box position={[-1.2, 0, 0]} />
                <Sphere position={[1.2, 0, 0]} />
            </Canvas>
        </motion.div>
    )
}

export default Shapes;
