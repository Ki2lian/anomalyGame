// import { Sky, useHelper } from "@react-three/drei";
import { AmbientLightProps } from "@react-three/fiber";
// import { useRef } from "react";
// import { DirectionalLight, DirectionalLightHelper } from "three";

interface ILightsProps {
    propsAmbientLight?: AmbientLightProps;
}

const Lights = ({ propsAmbientLight }: ILightsProps) => {


    // const directionalLightRef = useRef<DirectionalLight>();
    // useHelper(directionalLightRef, DirectionalLightHelper);
    return <>
        {/* <directionalLight
            ref={directionalLightRef}
            castShadow
            shadow-normalBias={0.04}
            position={[ 1, 0, 1 ]}
            intensity={1.5}
        /> */}
        <ambientLight intensity={0.3} {...propsAmbientLight} />
    </>;
};

export default Lights;