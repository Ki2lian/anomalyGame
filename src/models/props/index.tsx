import { ComponentType } from "react";

import { SchoolCorridor } from "@/models/map/SchoolCorridor";
import { IAnomalyProps } from "@/models/props//props-interface";
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

export interface IAnomalyConfig {
    component: ComponentType<IAnomalyProps>;
    anomalyType: number;
}

const allProps: ComponentType[] = [
    BackpackBrown,
    BackpackRed,
    BackpackYellow,
    Bench,
    BlackBoard,
    Burger,
    CellingLight,
    ChessSet,
    Clock,
    FancyPictureFramePainting,
    FourColorsPainting,
    Globe,
    PaperTablet,
    Pencil,
    PencilCaseBlue,
    PencilCaseDakine,
    Pigeon,
    Plants,
    PlasticRoundBin,
    Rat,
    SchoolDesk,
    SchoolDiary,
    SchoolHat,
    SecurityCamera,
    ShadesOfBluePainting,
    Sharpener,
    SteelBin,
    SunPainting,
    SchoolCorridor,
    TeacherDesk,
    WoodenHookRack,
];

const easyProps: IAnomalyConfig[] = [
    { component: SecurityCamera, anomalyType: 1 },
    { component: SchoolCorridor, anomalyType: 1 },
    { component: SchoolCorridor, anomalyType: 2 },
    { component: SchoolCorridor, anomalyType: 3 },
    { component: SchoolCorridor, anomalyType: 4 },
    { component: SchoolCorridor, anomalyType: 5 },
    { component: PlasticRoundBin, anomalyType: 1 },
    { component: Clock, anomalyType: 1 },
    { component: FancyPictureFramePainting, anomalyType: 1 },
    { component: SchoolDesk, anomalyType: 1 },
];

const mediumProps: IAnomalyConfig[] = [
    { component: Bench, anomalyType: 1 },
    { component: BlackBoard, anomalyType: 1 },
    { component: BackpackRed, anomalyType: 1 },
    { component: WoodenHookRack, anomalyType: 1 },
    { component: FourColorsPainting, anomalyType: 1 },
    { component: Pencil, anomalyType: 1 },
    { component: PencilCaseBlue, anomalyType: 1 },
    { component: CellingLight, anomalyType: 1 },
    { component: ChessSet, anomalyType: 1 },
];

const hardProps: IAnomalyConfig[] = [
    { component: SchoolCorridor, anomalyType: 1 },
    { component: SteelBin, anomalyType: 1 },
    { component: BlackBoard, anomalyType: 1 },
    { component: PaperTablet, anomalyType: 1 },
    { component: Burger, anomalyType: 1 },
    { component: Pigeon, anomalyType: 1 },
    { component: Pigeon, anomalyType: 2 },
    { component: Rat, anomalyType: 1 },
    { component: SchoolHat, anomalyType: 1 },
];

export { allProps, easyProps, hardProps, mediumProps };