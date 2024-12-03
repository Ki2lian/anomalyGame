import { ComponentPropsWithoutRef } from "react";

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ISettingRowProps {
    label: string;
    children: React.ReactNode;
    description: string;
}

const SettingRow = ({ label, children, description, ...props }: ComponentPropsWithoutRef<"div"> & ISettingRowProps) => {
    return (
        <div className="mb-2 hover:bg-secondary" { ...props }>
            <TooltipProvider delayDuration={ 350 }>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="flex w-full cursor-pointer flex-col items-center justify-between p-2 lg:flex-row">
                            <p className="mb-1 select-none uppercase md:mb-0">{label}</p>
                            <div className="flex w-full select-none items-center justify-center gap-2 lg:w-1/3">{children}</div>
                        </div>
                    </TooltipTrigger>
                    <TooltipContent className="select-none">
                        <p>{description}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </div>
    );
};

export default SettingRow;
