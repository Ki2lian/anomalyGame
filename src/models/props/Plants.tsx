/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Anom Purple Modelling (https://sketchfab.com/Anom404)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/plants-69352f0a90e94a0a9173b989e41acfc9
Title: Plants
*/

import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";

export const Plants = () => {
    const model = useGLTF("/models/props/plants.glb") as GLTFResult;

    return (
        <>
            <RigidBody type="fixed" colliders="hull" position={[ -25.5, -0.53, 0.6 ]} rotation={[ 0, -Math.PI / 1.3, 0 ]}>
                <primitive object={model.scene} scale={12} />

            </RigidBody>
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        Plano002_Materiais001_0: Mesh;
        Plano001_Materiais004_0: Mesh;
    };
    materials: {
        ["Materiais.001"]: MeshStandardMaterial;
        ["Materiais.004"]: MeshStandardMaterial;
    };
};

useGLTF.preload("/models/props/plants");
