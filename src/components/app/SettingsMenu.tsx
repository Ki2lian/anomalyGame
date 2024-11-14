import { motion } from "framer-motion";
import { Undo2 } from "lucide-react";
import { useTranslation } from "react-i18next";

import ControlsTab from "@/components/app/settings/controls/ControlsTab";
import GeneralTab from "@/components/app/settings/general/GeneralTab";
import GraphicsTab from "@/components/app/settings/graphics/GraphicsTab";
import SettingsActions from "@/components/app/settings/SettingsActions";
import { GreyRectangleDepthFlat } from "@/components/assets/sprites/grey/RectangleDepthFlat";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useGame from "@/store/useGame";


const SettingsMenu = () => {
    const { t } = useTranslation("settingsMenu");

    const { toggleSettingMenu } = useGame();

    const tabVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 },
    };

    return <>
        <div className="absolute inset-0 z-10 bg-black/30 backdrop-blur-lg"></div>
        <GreyRectangleDepthFlat className="absolute left-1/2 top-1/2 z-10 h-auto min-h-40 -translate-x-1/2 -translate-y-1/2 md:w-3/4 lg:w-1/2">
            <div className="flex flex-col">
                <div className="relative mb-5 flex items-center">
                    <Button className="absolute left-0" variant="secondary" onClick={() => toggleSettingMenu()}>
                        <Undo2 />
                    </Button>
                    <h1 className="w-full select-none text-center text-xl font-bold text-foreground md:text-3xl">{t("title")}</h1>
                </div>
                <SettingsActions />
                <div className="overflow-hidden">
                    <Tabs defaultValue="general">
                        <TabsList className="w-full justify-around">
                            <TabsTrigger value="general" className="w-full uppercase">{t("general.title")}</TabsTrigger>
                            <TabsTrigger value="graphics" className="w-full uppercase">{t("graphics.title")}</TabsTrigger>
                            <TabsTrigger value="controls" className="w-full uppercase">{t("controls.title")}</TabsTrigger>
                            <TabsTrigger disabled value="audio" className="w-full uppercase">audio</TabsTrigger>
                        </TabsList>
                        <TabsContent value="general" key="general">
                            <motion.div
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <GeneralTab />
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="graphics">
                            <motion.div
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <GraphicsTab />
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="controls" key="controls">
                            <motion.div
                                variants={tabVariants}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ duration: 0.5 }}
                            >
                                <ControlsTab />
                            </motion.div>
                        </TabsContent>
                        <TabsContent value="audio"></TabsContent>
                    </Tabs>
                </div>
            </div>
        </GreyRectangleDepthFlat>
    </>;
};

export default SettingsMenu;