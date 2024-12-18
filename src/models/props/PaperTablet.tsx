/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: NameSsis (https://sketchfab.com/NameSsis)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/paper-tablet-f2b7978367164eb38167dd4832978288
Title: Paper Tablet
*/

import { useGLTF } from "@react-three/drei";
import { Mesh, MeshStandardMaterial } from "three";
import { GLTF } from "three-stdlib";

import { IAnomalyProps } from "@/models/props/props-interface";
import useGame from "@/store/useGame";

export const PaperTablet = ({ isAnomaly, anomalyType }: IAnomalyProps) => {
    const { difficulty } = useGame();

    const model = useGLTF("/models/props/paper_tablet.glb") as GLTFResult;

    const isAnomalyHard1 = isAnomaly && difficulty === "hard" && anomalyType === 1;

    return (
        <>
            <primitive
                object={ model.scene }
                position={ isAnomalyHard1 ? [ -19.25, 0.4, -0.4 ] : [ -19.25, 0.4, -0.6 ] }
                rotation={ [ -Math.PI / 2, 0, -Math.PI / 1.9 ] }
            />
        </>
    );
};

type GLTFResult = GLTF & {
    nodes: {
        Plane_Material_0: Mesh;
        Plane005_Material002_0: Mesh;
    };
    materials: {
        Material: MeshStandardMaterial;
        ["Material.002"]: MeshStandardMaterial;
    };
};

useGLTF.preload("/models/props/paper_tablet.glb");
