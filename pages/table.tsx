import React, {Suspense} from "react";
import { Canvas, useLoader } from "@react-three/fiber";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import Link from "next/link";
import { OrbitControls } from "@react-three/drei";
// import table from '../public/static/glTF/Table.glb';

let GLTFLoader;

export const TableMesh = () => {
    GLTFLoader = require('three/examples/jsm/loaders/GLTFLoader').GLTFLoader;
    const { nodes } = useLoader(GLTFLoader, "/static/glTF/Table.glb");
    console.log({nodes})
    return(
        <group>
            <mesh 
                visible 
                geometry={nodes.Table.geometry}
                material={nodes.Table.material}
                scale={1}
            />
        </group>
    )
}

const Table = () => {

    const isServer = typeof window === "undefined";

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-center">
            {
                !isServer ?
                <Suspense fallback={<p>Loading...</p>}>
                    <Link href="/">
                        <button 
                            className="z-50 absolute top-2 p-2 no-underline border-none outline-none cursor-pointer bg-red-500 hover:bg-red-600 text-white rounded"
                        >
                            Home
                        </button>
                    </Link>
                    <Canvas className="bg-gray-900">
                        <ambientLight intensity={0.5}/>
                        <directionalLight intensity={1} position={[5,0,0]}/>
                        <OrbitControls autoRotate/>
                        <TableMesh />
                    </Canvas>
                </Suspense>
                    :
                <p>Loading...</p>
            }
        </div>
    )
}

Table.getInitialProps = () => {
    return {
        props: {
            window: false
        }
    }
}

export default Table;
