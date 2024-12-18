interface ICreditItemProps {
    label: string;
    link?: string;
    text: string;
    target?: string;
}

const CreditItem = ({ label, link, text, target = "_blank" }: ICreditItemProps) => (
    <div className="flex items-center justify-between text-sm md:text-lg lg:text-2xl">
        <span className="font-bold">{label} :</span>
        {link ? (
            <a href={ link } target={ target } rel="noreferrer" className="text-blue-600">
                {text}
            </a>
        ) : (
            <span>{text}</span>
        )}
    </div>
);

export default CreditItem;