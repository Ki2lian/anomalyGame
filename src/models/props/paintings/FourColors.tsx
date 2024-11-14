/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Anom Purple Modelling (https://sketchfab.com/Anom404)
License: SKETCHFAB Standard (https://sketchfab.com/licenses)
Source: https://sketchfab.com/3d-models/painting-four-colors-b3f9d0e1bb72484d8a5c9d9c0f55a827
Title: Painting Four Colors
*/

import { useGLTF } from "@react-three/drei";
import { Mesh, MeshPhysicalMaterial } from "three";
import { GLTF } from "three-stdlib";

import { IAnomalyProps } from "@/models/props/props-interface";
import useGame from "@/store/useGame";

export const FourColorsPainting = ({ isAnomaly, anomalyType }: IAnomalyProps) => {
    const { difficulty } = useGame();

    const model = useGLTF("/models/props/paintings/four_colors.glb") as GLTFResult;

    const isAnomalyMedium1 = isAnomaly && difficulty === "medium" && anomalyType === 1;

    return (
        <>
            <primitive object={model.scene} position={isAnomalyMedium1 ? [ -20.84, 1.8, -1.73 ] : [ -20.84, 1.5, -2 ]} rotation={[ 0, -Math.PI / 2, isAnomalyMedium1 ? Math.PI / 2 : 0 ]} />
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        Plano001_Materiais003_0: Mesh;
    };
    materials: {
        ["Materiais.003"]: MeshPhysicalMaterial;
    };
};

useGLTF.preload("/models/props/paintings/four_colors.glb");
