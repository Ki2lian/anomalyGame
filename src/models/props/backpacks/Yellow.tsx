/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Modelified (https://sketchfab.com/modelified)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/backpack-6fd4bb3048624b83a96bc53ff546730d
Title: Backpack
*/

import { Clone, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Euler, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTF } from "three-stdlib";

export const BackpackYellow = () => {
    const model = useGLTF("/models/props/backpacks/yellow.glb") as GLTFResult;

    const backpackRef = useRef<Group>(null);

    const backpacks = useMemo(() => {
        return [ { position: new Vector3(-9.3, -0.255, -3.8), rotation: new Euler(0, -Math.PI / 1.5, Math.PI / 6) } ];
    }, []);

    return (
        <>
            {backpacks.map((backpack, index) => (
                <Clone key={index} ref={backpackRef} object={model.scene} scale={2} rotation={backpack.rotation} position={backpack.position} />
            ))}
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        g0: Mesh;
    };
    materials: {
        material: MeshStandardMaterial;
    };
};

useGLTF.preload("//models/props/backpacks/yellow.glb");
