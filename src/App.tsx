import { useProgress } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { Suspense } from "react";

import ElementsLoader from "@/components/ElementsLoader";
import Experience from "@/components/Experience";


const App = () => {
    const { progress } = useProgress();

    const { pointerLock } = useControls("Camera", {
        pointerLock: { value: false },
    });

    return <>
        <div className="absolute z-50 top-2.5 right-2.5">
            <Leva hideCopyButton fill />
        </div>
        <ElementsLoader />
        <Canvas
            shadows
            camera={{
                fov: 70,
                near: 0.1,
                far: 200,
                aspect: window.innerWidth / window.innerHeight,
            }}
            dpr={[ 1, 2 ]}
            onPointerDown={(e) => {
                if (!pointerLock) return;
                if (e.pointerType === "mouse" && progress === 100) {
                    (e.target as HTMLCanvasElement).requestPointerLock();
                }
            }}
        >
            <Suspense fallback={null}>
                <Experience />
            </Suspense>
        </Canvas>
    </>;
};

export default App;
