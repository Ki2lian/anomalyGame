import { CapsuleGeometryProps } from "@react-three/fiber";
import { Suspense } from "react";

interface ICapsuleGeometryProps {
    args?: CapsuleGeometryProps["args"];
}

const CharacterModel = ({ args }: ICapsuleGeometryProps) => {
    return (
        <Suspense fallback={<capsuleGeometry args={args} />}>
            <mesh castShadow>
                <capsuleGeometry args={args} />
                <meshStandardMaterial color="mediumpurple" />
            </mesh>
        </Suspense>
    );
};

export default CharacterModel;
