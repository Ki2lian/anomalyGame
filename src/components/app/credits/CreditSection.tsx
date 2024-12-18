interface ICreditSectionProps {
    title: string;
    children: React.ReactNode;
}


const CreditSection = ({ title, children }: ICreditSectionProps) => (
    <div className="w-full px-5 md:px-20 lg:w-1/2 lg:px-0">
        <h2 className="text-center text-lg font-bold uppercase lg:text-3xl">{title}</h2>
        {children}
    </div>
);

export default CreditSection;