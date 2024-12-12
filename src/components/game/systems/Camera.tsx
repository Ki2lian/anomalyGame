import { useThree } from "@react-three/fiber";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useEffect } from "react";
import { PerspectiveCamera } from "three";
import { Camera as CameraThree } from "three";

import { defaultSettings, ISettings } from "@/components/app/settings/defaultsSettings";
import { getAspectRatio } from "@/lib/utils";

export let globalCamera: CameraThree | null = null;

const Camera = () => {
    const [ settings ] = useLocalStorage<ISettings>("settings", defaultSettings);
    const { camera, gl } = useThree();

    useEffect(() => {
        globalCamera = camera;
    }, [ camera ]);

    useEffect(() => {
        const onWindowResize = () => {
            if (camera instanceof PerspectiveCamera) {
                camera.aspect = getAspectRatio(settings.graphics.aspectRatio);
                camera.fov = settings.graphics.fov;
                camera.far = 1 + settings.graphics.renderDistance;
                camera.updateProjectionMatrix();
            }
            gl.setSize(window.innerWidth, window.innerHeight);
        };

        onWindowResize();

        window.addEventListener("resize", onWindowResize);

        return () => window.removeEventListener("resize", onWindowResize);
    }, [ camera, gl, settings?.graphics?.aspectRatio, settings?.graphics?.fov, settings?.graphics?.renderDistance ]);

    return null;
};

export default Camera;
