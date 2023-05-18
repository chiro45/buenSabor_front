import { SelectorProps } from  '../../../interfaces/genericComponents/SelectorGeneric'

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