import { Environment } from "@react-three/drei";

import { Prof } from "@/models/entities/Prof";
import { SchoolCorridor } from "@/models/map/SchoolCorridor";
import { BlackBoard } from "@/models/props/BlackBoard";
import { CellingLight } from "@/models/props/CellingLight";
import { Elevator } from "@/models/props/Elevator";
import { Globe } from "@/models/props/Globe";
import { PaperTablet } from "@/models/props/PaperTablet";
import { PencilCaseDakine } from "@/models/props/pencil_cases/Dakine";
import { PencilCaseFallravenKanken } from "@/models/props/pencil_cases/FallravenKanken";
import { SchoolDesk } from "@/models/props/SchoolDesk";
import { SchoolDiary } from "@/models/props/SchoolDiary";
import { TeacherDesk } from "@/models/props/TeacherDesk";

const Level = () => {
    return <>
        <Environment files={"/textures/autumn_field_4k.hdr"} background environmentIntensity={0.3} />
        <SchoolCorridor position={[ 0, 0, 0 ]} scale={0.5} visible={true} />
        <CellingLight />
        <TeacherDesk />
        <Prof position={[ -20, -0.554, -3 ]} rotation={[ 0, Math.PI / 3, 0 ]} scale={1.3}/>
        <BlackBoard text="2+2=4" />
        <Globe />
        <SchoolDesk />
        <PencilCaseFallravenKanken />
        <PencilCaseDakine />
        <PaperTablet />
        <SchoolDiary />
        <Elevator position={[ -22.5, -0.53, -6.7 ]} rotation={[ 0, -Math.PI / 2, 0 ]} scale={0.8} />
    </>;
};

export default Level;