/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: Sousinho (https://sketchfab.com/sousinho)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/wooden-hook-rack-b7928bccdd1344b79c0b67e7a9878016
Title: Wooden hook rack
*/

import { Clone, useGLTF } from "@react-three/drei";
import { useMemo, useRef } from "react";
import { Group, Mesh, MeshStandardMaterial, Vector3 } from "three";
import { GLTF } from "three-stdlib";

import { IAnomalyProps } from "@/models/props/props-interface";
import useGame from "@/store/useGame";

export const WoodenHookRack = ({ isAnomaly, anomalyType }: IAnomalyProps) => {
    const { difficulty } = useGame();

    const model = useGLTF("/models/props/wooden_hook_rack.glb") as GLTFResult;

    const isAnomalyMedium1 = isAnomaly && difficulty === "medium" && anomalyType === 1;

    const hookRackRef = useRef<Group>(null);

    const positions = useMemo(() => {
        return [
            new Vector3(3, isAnomalyMedium1 ? 1 : 1.2, 0.01),
            new Vector3(-3, isAnomalyMedium1 ? 1 : 1.2, 0.01),
            new Vector3(-9, isAnomalyMedium1 ? 1 : 1.2, 0.01),
            new Vector3(-15, isAnomalyMedium1 ? 1 : 1.2, 0.01),
        ];
    }, [ isAnomalyMedium1 ]);

    return (
        <>
            {positions.map((position, index) => (
                <Clone key={ index } ref={ hookRackRef } object={ model.scene } position={ position } />
            ))}
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        Object_4: Mesh;
    };
    materials: {
        M_small_plank_hooks: MeshStandardMaterial;
    };
};

useGLTF.preload("/models/props/wooden_hook_rack.glb");
