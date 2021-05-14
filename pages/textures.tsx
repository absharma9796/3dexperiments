import React, { FC, Suspense, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useTexture } from "@react-three/drei";
import * as THREE from 'three';
import Link from 'next/link';

interface SceneProps {
    geometry: "box" | "sphere", 
    args: Array<number>,
    position?: Array<number>,
    spin: number
}

const Scene:FC<SceneProps> = (props) => {

    const mesh: any = useRef();

    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useTexture([
        '/static/images/PavingStones093_1K_Color.jpg',
        '/static/images/PavingStones093_1K_Displacement.jpg',
        '/static/images/PavingStones093_1K_Normal.jpg',
        '/static/images/PavingStones093_1K_Roughness.jpg',
        '/static/images/PavingStones093_1K_AmbientOcclusion.jpg',
    ])
    
    const shape = {
        box: <boxGeometry args={props.args}/>,
        sphere: <sphereGeometry args={props.args}/>
    }

    useFrame(({clock}) => (mesh.current.rotation.y = props.spin*Math.sin(clock.getElapsedTime())))

    return(
        <mesh ref={mesh} position={props.position}>
            {shape[props.geometry]}
            <meshStandardMaterial 
                displacementScale={0}
                map={colorMap}
                displacementMap={displacementMap}
                normalMap={normalMap}
                roughnessMap={roughnessMap}
                aoMap={aoMap}
            />
        </mesh>
    )
}

const Textures = (props) => {

    const isServer = typeof window === "undefined";

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-yellow-100">
        {
            !isServer ?
            <Suspense fallback={<p>Loading...</p>}>
                <Link href="/">
                    <button className="z-50 absolute top-2 p-2 no-underline border-none outline-none cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded">
                        Home
                    </button>
                </Link>
                <Canvas>
                    <ambientLight intensity={0.2} />
                    <directionalLight position={[5,5,5]}/>
                    <OrbitControls autoRotate />
                    <Scene 
                        geometry="box"
                        args={[1.5,1.5,1.5]}
                        position={[-1.5,0,0]}
                        spin={1}
                    />
                    <Scene 
                        geometry="sphere"
                        args={[1,100,100]}
                        position={[1.5,0,0]}
                        spin={-1}
                    />
                </Canvas>
            </Suspense>
                :
            <p>Loading...</p>
        }
        </div>
    )
}

Textures.getInitialProps = () => {
    return {
        props: {
            window: false
        }
    }
}

export default Textures;
