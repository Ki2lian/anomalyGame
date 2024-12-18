import { Pause, Play, Undo2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import CreditItem from "@/components/app/credits/CreditItem";
import CreditSection from "@/components/app/credits/CreditSection";
import { Button } from "@/components/ui/button";
import { playSound } from "@/lib/utils";
import useGame from "@/store/useGame";

const Credits = () => {
    const { t } = useTranslation("credits");

    const { setActiveMenu, isTransitioning } = useGame();

    const [ isScrolling, setIsScrolling ] = useState(true);
    const [ isPaused, setIsPaused ] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);


    const handleUndo = () => {
        setActiveMenu("main");
        playSound("/audio/click.wav", "ui");
    };

    const handlePause = () => {
        setIsPaused(!isPaused);
        playSound("/audio/click.wav", "ui");
    };

    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === "hidden") {
                setIsScrolling(false);
            } else if (document.visibilityState === "visible") {
                setIsScrolling(true);
            }
        };

        document.addEventListener("visibilitychange", handleVisibilityChange);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        let scrollInterval: NodeJS.Timeout | null = null;

        if (isScrolling && !isPaused) {
            scrollInterval = setInterval(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop += 1;
                }
            }, 16);
        }

        return () => {
            if (scrollInterval) {
                clearInterval(scrollInterval);
            }
        };
    }, [ isScrolling, isPaused ]);

    return (
        <>
            <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-lg"></div>
            <div className="absolute left-5 top-5 z-[11] flex flex-col space-y-2 opacity-40 md:opacity-100">
                <Button variant="secondary" onClick={ handleUndo } disabled={ isTransitioning }>
                    <Undo2 />
                </Button>
                <Button variant="secondary" onClick={ handlePause } disabled={ isTransitioning }>
                    {isPaused ? <Play /> : <Pause />}
                </Button>
            </div>
            <div ref={ scrollRef } className="relative z-10 flex h-screen w-full select-none flex-col items-center space-y-10 overflow-y-scroll py-20 lg:space-y-16">
                <h1 className="text-center text-3xl font-bold uppercase lg:text-5xl">{t("title")}</h1>
                <CreditSection title={ t("sections.development.title") }>
                    <CreditItem label={ t("sections.development.leadDeveloper") } link="https://github.com/Ki2lian" text="Ki2lian" />
                    <CreditItem label={ t("sections.development.githubProject") } link="https://github.com/Ki2lian/anomalyGame" text="GitHub" />
                    <CreditItem
                        label={ t("sections.development.inspiration") }
                        link="https://store.steampowered.com/app/2653790/8/"
                        text="The Exit 8"
                    />
                    <CreditItem label={ t("sections.development.story") } link="https://github.com/Ki2lian" text="Ki2lian" />
                </CreditSection>
                <CreditSection title={ t("sections.resources.title") }>
                    <CreditItem label={ t("sections.resources.charactersAndAnimations") } link="https://www.mixamo.com/" text="Mixamo" />
                    <CreditItem label={ t("sections.resources.charactersAndAnimationsAssembly") } link="https://github.com/Ki2lian" text="Ki2lian" />
                    <CreditItem
                        label={ t("sections.resources.props.schoolCorridor") }
                        link="https://sketchfab.com/3d-models/school-corridor-38bccd81e8bf416b8bccf7a2f595a916"
                        text="Sketchfab"
                    />
                    <CreditItem label={ t("sections.resources.props.schoolCorridorEdited") } link="https://github.com/Ki2lian" text="Ki2lian" />
                    <CreditItem
                        label={ t("sections.resources.props.elevator") }
                        link="https://sketchfab.com/3d-models/simple-elevator-with-animation-770488a2f94a453fb90a7445bda63cd0"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.brownBackpack") }
                        link="https://sketchfab.com/3d-models/backpack-942d8c56ceeb43b585df40702875a9d8"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.redBackpack") }
                        link="https://sketchfab.com/3d-models/kanken-backpack-3c47af8b6a3e413f94c74f86d4c396ed"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.yellowBackpack") }
                        link="https://sketchfab.com/3d-models/backpack-6fd4bb3048624b83a96bc53ff546730d"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.plasticRoundBin") }
                        link="https://sketchfab.com/3d-models/plastic-round-bin-cf7c9f627f344138a291a431c42beaae"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.steelBin") }
                        link="https://sketchfab.com/3d-models/steel-bin-fa1519af612e41ec9f1710820cd3b243"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.pictureFrame") }
                        link="https://polyhaven.com/a/fancy_picture_frame_01"
                        text="Poly Haven"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.paintingFourColors") }
                        link="https://sketchfab.com/3d-models/painting-four-colors-b3f9d0e1bb72484d8a5c9d9c0f55a827"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.paintingShadesofBlue") }
                        link="https://sketchfab.com/3d-models/painting-shades-of-blue-abfe2954057544098f815ba5c0cfa47e"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.sunPainting") }
                        link="https://sketchfab.com/3d-models/sun-painting-d594e9d5b5914d538b2457daa9c6d738"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.bluePencilcase") }
                        link="https://sketchfab.com/3d-models/pencil-case-800ebd443bf643ad8f2a48b045cbb65f"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.dakinePencilcase") }
                        link="https://sketchfab.com/3d-models/pencil-case-b8f3220d778b4877940897759d194664"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.bench") }
                        link="https://sketchfab.com/3d-models/bench-343ea60382e241f4aadd38ea52299914"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.blackBoard") }
                        link="https://sketchfab.com/3d-models/black-board-2557ab6898ac47ba9bfdfdb607454825"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.burger") }
                        link="https://sketchfab.com/3d-models/stylized-burger-78c2e8cba66e4f5294cec5aa05c9d431"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.ceilingLight") }
                        link="https://sketchfab.com/3d-models/ceiling-light-880da42a3951442095cd2c4dd1c069a3"
                        text="Sketchfab"
                    />
                    <CreditItem label={ t("sections.resources.props.chessSet") } link="https://polyhaven.com/a/chess_set" text="Poly Haven" />
                    <CreditItem
                        label={ t("sections.resources.props.clock") }
                        link="https://sketchfab.com/3d-models/clock-cd0e6a816e6942b587846dd1e866d59e"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.antiqueGlobe") }
                        link="https://sketchfab.com/3d-models/antique-globe-78b47132c6be42bcb664545a69b380d9"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.paperTablet") }
                        link="https://sketchfab.com/3d-models/paper-tablet-f2b7978367164eb38167dd4832978288"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.pencil") }
                        link="https://sketchfab.com/3d-models/pencil-b8db4648d0fa4a5ba6a565c463940c1e"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.pigeon") }
                        link="https://sketchfab.com/3d-models/gascogne-pigeon-bird-lowpoly-free-10d7975688f740fa9ba34c874da2b9d2"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.plants") }
                        link="https://sketchfab.com/3d-models/plants-69352f0a90e94a0a9173b989e41acfc9"
                        text="Sketchfab"
                    />
                    <CreditItem label={ t("sections.resources.props.streetRat") } link="https://polyhaven.com/a/street_rat" text="Poly Haven" />
                    <CreditItem
                        label={ t("sections.resources.props.schoolDesk") }
                        link="https://sketchfab.com/3d-models/school-desk-a74180ee97bb4917b24cd48580663b44"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.schoolDiary") }
                        link="https://sketchfab.com/3d-models/school-diary-2bc1d870be71432581735272757d7e03"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.schoolHat") }
                        link="https://sketchfab.com/3d-models/school-hat-8b5b2609abd14c5fba58d53aeebfdaeb"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.securityCamera") }
                        link="https://polyhaven.com/a/security_camera_01"
                        text="Poly Haven"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.sharpener") }
                        link="https://sketchfab.com/3d-models/sharpener-3a58aefba1cc4e019d96b61a066d2c9f"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.teacherDesk") }
                        link="https://sketchfab.com/3d-models/teachers-desk-9ee8608e76704de7aa67d022c81e42cc"
                        text="Sketchfab"
                    />
                    <CreditItem
                        label={ t("sections.resources.props.woodHookRack") }
                        link="https://sketchfab.com/3d-models/wooden-hook-rack-b7928bccdd1344b79c0b67e7a9878016"
                        text="Sketchfab"
                    />
                </CreditSection>
                <CreditSection title={ t("sections.audio.title") }>
                    <CreditItem
                        label={ t("sections.audio.bgm") }
                        link="https://suno.com/song/a4d7ebe4-05bb-4269-833e-13a428992d47"
                        text="Suno (prompt by Ki2lian)"
                    />
                    <CreditItem
                        label={ t("sections.audio.bgmElevator") }
                        link="https://suno.com/song/59cbdc6c-6139-476e-817a-f5d6acc08aa7"
                        text="Suno (prompt by Ki2lian)"
                    />
                    <CreditItem
                        label={ t("sections.audio.sfxElevatorOpenClose") }
                        link="https://samplefocus.com/samples/elevator-door-open-close-fx"
                        text="Sample Focus"
                    />
                    <CreditItem
                        label={ t("sections.audio.sfxTickingClock") }
                        link="https://pixabay.com/sound-effects/ticking-clock-sound-effect-1-mp3-edition-264451/"
                        text="Pixabay (by WingsoarStudio)"
                    />
                    <CreditItem
                        label={ t("sections.audio.sfxTickingClock") }
                        link="https://audiobox.metademolab.com/capabilities/text_to_audio"
                        text="Metademolab"
                    />
                    <CreditItem label={ `"Select click"` } link="https://mixkit.co/free-sound-effects/click/" text="Mixkit" />
                    <CreditItem label={ `"Cool interface click tone"` } link="https://mixkit.co/free-sound-effects/click/" text="Mixkit" />
                </CreditSection>
                <CreditSection title={ t("sections.fonts.title") }>
                    <CreditItem label={ `"Future"` } link="https://kenney.nl/assets/ui-pack" text="Kenney" />
                    <CreditItem label={ `"Whatever it takes"` } link="https://www.dafont.com/fr/whatever-it-takes.font" text="Dafont" />
                </CreditSection>
                <CreditSection title={ t("sections.texturesAndEnvironment.title") }>
                    <CreditItem label={ `${ t("sections.texturesAndEnvironment.hdrTexture") } "Autumn Field"` } link="https://polyhaven.com/a/autumn_field" text="Poly Haven" />
                </CreditSection>
                <CreditSection title={ t("sections.uiAndButtons.title") }>
                    <CreditItem label={ `UI Pack 2.0` } link="https://kenney.nl/assets/ui-pack" text="Kenney" />
                    <CreditItem label={ t("sections.uiAndButtons.xboxButtons") } link="https://arks.itch.io/xbox-buttons" text="Mikkel Julian 'Arks' Petersen" />
                    <CreditItem label={ t("sections.uiAndButtons.playstationButtons") } link="https://arks.itch.io/ps4-buttons" text="Mikkel Julian 'Arks' Petersen" />
                </CreditSection>
                <CreditSection title={ t("sections.softwareResourcesAndLibraries.title") }>
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.3dRenderingEngine") } link="https://github.com/pmndrs/react-three-fiber" text="React Three Fiber" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.3dRenderingEngine") } link="https://github.com/mrdoob/three.js" text="Three.js" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.rapierPhysicsEngine") } link="https://github.com/pmndrs/react-three-rapier" text="React Three Rapier" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.design") } link="https://github.com/tailwindlabs/tailwindcss" text="Tailwind CSS" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.stateManagement") } link="https://github.com/pmndrs/zustand" text="Zustand" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.animations") } link="https://github.com/motiondivision/motion" text="Framer Motion" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.animations") } link="https://github.com/greensock/GSAP" text="GSAP" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.internationalization") } link="https://github.com/i18next/i18next" text="i18next" />
                    <CreditItem label={ t("sections.resources.charactersAndAnimationsAssembly") } link="https://blender.org/" text="Blender" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.conversionGLTF") } link="https://github.com/pmndrs/gltfjsx" text="GLTFJSX" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.characterController") } link="https://github.com/pmndrs/ecctrl" text="Ecctrl" />
                    <CreditItem label={ t("sections.softwareResourcesAndLibraries.characterControllerForked") } link="https://github.com/Ki2lian/ecctrl" text="Ecctrl (forked by Ki2lian)" />
                </CreditSection>
                <CreditSection title={ t("sections.specialMentions.title") }>
                    <CreditItem label={ t("sections.specialMentions.poimandresCommunity") } link="https://discord.com/invite/poimandres" text="Discord Poimandres" />
                    <CreditItem label={ t("sections.specialMentions.betaTester") } link="https://github.com/rickil" text="Rickil" />
                </CreditSection>
                <CreditSection title={ t("sections.contact.title") }>
                    <CreditItem label="Email" link="mailto:killian@ki2lian.fr" text="killian@ki2lian.fr" target="" />
                    <CreditItem label="GitHub" link="https://github.com/ki2lian" text="Ki2lian" />
                    <CreditItem label="Discord" link="https://discord.com/invite/n6vjPEQW4F" text="Ki2lian" />
                </CreditSection>
            </div>
        </>
    );
};

export default Credits;
