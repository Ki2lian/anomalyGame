import { useProgress } from "@react-three/drei";


const ElementsLoader = () => {
    const { progress } = useProgress();

    if (progress === 100) return <></>;
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200">
            <div className="w-64">
                <div className="h-4 overflow-hidden rounded-full bg-gray-300">
                    <div
                        className="h-full bg-blue-500"
                        style={{ width: `${ (progress) }%` }}
                    ></div>
                </div>
                <p className="mt-2 text-center text-gray-700">Chargement des éléments...</p>
            </div>
        </div>
    );
};

export default ElementsLoader;