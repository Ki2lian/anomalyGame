/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import { useAnimations, useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { AnimationClip, Group } from "three";
import { GLTF } from "three-stdlib";

export const Amy = (props: React.JSX.IntrinsicElements["group"]) => {
    const group = useRef<Group>(null);

    const model = useGLTF("/models/entities/amy.glb") as GLTFResult;

    const { actions } = useAnimations(model.animations, group);

    useEffect(() => {
        actions.Sitting_idle && actions.Sitting_idle.play();
    }, [ actions.Sitting_idle ]);

    return (
        <primitive ref={group} object={model.scene} position={[ 2.2, -0.4, -3.3 ]} rotation={[ 0, -Math.PI / 2, 0 ]} scale={1.2} {...props} />
    );
};

type TActionName = "Sitting_idle" | "T-pose";

interface IGLTFAction extends AnimationClip {
    name: TActionName;
}

type GLTFResult = GLTF & {
    animations: IGLTFAction[];
};

useGLTF.preload("/models/entities/amy.glb");
