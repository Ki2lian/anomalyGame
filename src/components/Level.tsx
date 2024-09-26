import { Environment } from "@react-three/drei";

import { Prof } from "@/models/entities/Prof";
import { SchoolCorridor } from "@/models/map/SchoolCorridor";
import { BackpackBrown } from "@/models/props/backpacks/Brown";
import { BackpackRed } from "@/models/props/backpacks/Red";
import { BackpackYellow } from "@/models/props/backpacks/Yellow";
import { Bench } from "@/models/props/Bench";
import { PlasticRoundBin } from "@/models/props/bins/PlasticRound";
import { SteelBin } from "@/models/props/bins/Steel";
import { BlackBoard } from "@/models/props/BlackBoard";
import { Burger } from "@/models/props/Burger";
import { CellingLight } from "@/models/props/CellingLight";
import { ChessSet } from "@/models/props/ChessSet";
import { Clock } from "@/models/props/Clock";
import { Elevator } from "@/models/props/Elevator";
import { Globe } from "@/models/props/Globe";
import { FancyPictureFramePainting } from "@/models/props/paintings/FancyPictureFrame";
import { FourColorsPainting } from "@/models/props/paintings/FourColors";
import { ShadesOfBluePainting } from "@/models/props/paintings/ShadesOfBlue";
import { SunPainting } from "@/models/props/paintings/Sun";
import { PaperTablet } from "@/models/props/PaperTablet";
import { Pencil } from "@/models/props/Pencil";
import { PencilCaseBlue } from "@/models/props/pencil_cases/Blue";
import { PencilCaseDakine } from "@/models/props/pencil_cases/Dakine";
import { Pigeon } from "@/models/props/Pigeon";
import { Plants } from "@/models/props/Plants";
import { Rat } from "@/models/props/Rat";
import { SchoolDesk } from "@/models/props/SchoolDesk";
import { SchoolDiary } from "@/models/props/SchoolDiary";
import { SchoolHat } from "@/models/props/SchoolHat";
import { SecurityCamera } from "@/models/props/SecurityCamera";
import { Sharpener } from "@/models/props/Sharpener";
import { TeacherDesk } from "@/models/props/TeacherDesk";
import { WoodenHookRack } from "@/models/props/WoodenHookRack";

const Level = () => {
    return <>
        <Environment files={"/textures/autumn_field_4k.hdr"} background environmentIntensity={0.3} />
        <>
            <SchoolCorridor position={[ 0, 0, 0 ]} scale={0.5} visible={true} />
            <WoodenHookRack />
            <Bench />
            <Elevator position={[ -22.5, -0.5135, -6.67 ]} rotation={[ 0, -Math.PI / 2, 0 ]} scale={0.8} />
            <SunPainting />
            <FourColorsPainting />
            <ShadesOfBluePainting />
            <Pigeon />
            <PlasticRoundBin />
            <Plants />
            <SchoolHat />
            <SecurityCamera />
            <Rat />
        </>
        <>
            <CellingLight />
            <TeacherDesk />
            <Prof position={[ -20, -0.554, -3 ]} rotation={[ 0, Math.PI / 3, 0 ]} scale={1.3}/>
            <BlackBoard text="2+2=4" />
            <Globe />
            <SchoolDesk />
            <Pencil />
            <Sharpener />
            <PencilCaseBlue />
            <PencilCaseDakine />
            <BackpackRed />
            <BackpackBrown />
            <BackpackYellow />
            <PaperTablet />
            <SchoolDiary />
            <Clock scale={0.1} position={[ 2.955, 2, -2.2 ]} rotation={[ Math.PI / 2, 0, Math.PI / 2 ]} />
            <SteelBin />
            <Burger />
            <FancyPictureFramePainting />
            <ChessSet />
        </>
    </>;
};

export default Level;