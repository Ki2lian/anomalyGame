/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { AnimationClip, Bone, Group, MeshPhysicalMaterial, SkinnedMesh } from "three";
import { GLTF, SkeletonUtils } from "three-stdlib";

export function Amy(props: React.JSX.IntrinsicElements["group"]) {
    const group = useRef<Group>(null);

    const { scene, animations } = useGLTF("/models/entities/amy.glb") as GLTFResult;
    const clone = useMemo(() => SkeletonUtils.clone(scene), [ scene ]);

    const { nodes, materials } = useGraph(clone) as GLTFResult;

    const { actions } = useAnimations(animations, group);

    useEffect(() => {
        actions.Sitting_idle && actions.Sitting_idle.play();
    }, [ actions.Sitting_idle ]);

    return (
        <group ref={group} {...props} dispose={null} position={[ 2.2, -0.4, -3.3 ]} rotation={[ 0, -Math.PI / 2, 0 ]} scale={1.2}>
            <group name="Scene">
                <group name="Armature" rotation={[ Math.PI / 2, 0, 0 ]} scale={0.01}>
                    <primitive object={nodes.mixamorigHips} />
                </group>
                <skinnedMesh name="Ch46" geometry={nodes.Ch46.geometry} material={materials.Ch46_body} skeleton={nodes.Ch46.skeleton} rotation={[ Math.PI / 2, 0, 0 ]} scale={0.01} />
            </group>
        </group>
    );
}

type TActionName = "Sitting_idle" | "T-pose";

interface IGLTFAction extends AnimationClip {
    name: TActionName;
}

type GLTFResult = GLTF & {
    nodes: {
        Ch46: SkinnedMesh;
        mixamorigHips: Bone;
    };
    materials: {
        Ch46_body: MeshPhysicalMaterial;
    };
    animations: IGLTFAction[];
};

useGLTF.preload("/models/entities/amy.glb");