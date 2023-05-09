interface SelectorProps {
    options: string[];
    label: string;
    height?: number;
    width?: number;
    value?: string;
    className?: string;
    name?: string;
    handleSelector(val:object):void;
}

export const SelectorGeneric: React.FC<SelectorProps> = ({
    options,
    label,
    value,
    height = 30,
    width = 150,
    handleSelector,
    className,
    name
}) => {

    const onSelectorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const {name, value} = event.target;
        handleSelector({name: name, value: value});
    };
    
    return (
        <div className={className}>
            <label>{label}</label>
            <select
                name={name}
                onChange={onSelectorChange}
                style={{ height, width }}
            >
                {options.map((option, i) => (
                    <option key={i} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
};