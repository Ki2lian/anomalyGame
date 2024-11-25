import { CapsuleGeometryProps } from "@react-three/fiber";
import { Suspense } from "react";

import { Simon } from "@/models/entities/Simon";

interface ICapsuleGeometryProps {
    args?: CapsuleGeometryProps["args"];
}

const CharacterModel = ({ args }: ICapsuleGeometryProps) => {
    return (
        <Suspense fallback={<capsuleGeometry args={args} />}>
            <Simon isPlayer position={[ 0, -0.8, -0.2 ]} />
        </Suspense>
    );
};

export default CharacterModel;
