import { RigidBody } from "@react-three/rapier";

const Floor = ({ ...props }) => {
    return (
        <RigidBody type="fixed">
            <mesh receiveShadow {...props}>
                <boxGeometry args={[ 10, 0.1, 10 ]} />
                <meshStandardMaterial color="green" />
            </mesh>
        </RigidBody>
    );
};

export default Floor;