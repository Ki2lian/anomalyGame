/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Kroko.blend (https://sketchfab.com/jaromir.ternavskiy)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/sharpener-3a58aefba1cc4e019d96b61a066d2c9f
Title: Sharpener
*/

import { Clone, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Euler, Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTF } from "three-stdlib";

import { IAnomalyProps } from "@/models/props/props-interface";
import useGame from "@/store/useGame";

export const Sharpener = ({ isAnomaly, anomalyType }: IAnomalyProps) => {
    const { difficulty } = useGame();

    const model = useGLTF("/models/props/sharpener.glb") as GLTFResult;

    const isAnomalyHard1 = isAnomaly && difficulty === "hard" && anomalyType === 1;

    const sharpenerRef = useRef<Group>(null);

    const sharpeners = useMemo(() => {
        return [
            { position: new Vector3(1.4, 0.4595, -1.35), rotation: new Euler(0, isAnomalyHard1 ? -Math.PI / 5 : -Math.PI / 3, 0) },
            { position: new Vector3(-12.8, 0.4595, -3.3), rotation: new Euler(0, Math.PI / 3, 0) },
        ];
    }, [ isAnomalyHard1 ]);

    return (
        <>
            {sharpeners.map((sharpener, index) => (
                <Clone key={ index } ref={ sharpenerRef } object={ model.scene } scale={ 0.03 } rotation={ sharpener.rotation } position={ sharpener.position } />
            ))}
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        Roundcube001_Material_0: Mesh;
        Cube_Material002_0: Mesh;
        Sphere_Material003_0: Mesh;
        Cylinder001_Material001_0: Mesh;
    };
    materials: {
        Material: MeshStandardMaterial;
        ["Material.002"]: MeshStandardMaterial;
        ["Material.003"]: MeshStandardMaterial;
        ["Material.001"]: MeshStandardMaterial;
    };
};

useGLTF.preload("/models/props/sharpener.glb");
