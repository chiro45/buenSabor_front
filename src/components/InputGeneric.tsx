interface Props {
  placeholder: string;
  name?: string;
  height?: number;
  width?: number;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputGeneric: React.FC<Props> = ({
  placeholder,
  name,
  height = 40,
  width = 200,
  label,
  type = 'text',
  value,
  onChange,
}) => {
  return (
    <div>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ height, width }}
        //id={label}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
  
