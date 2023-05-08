import "./InputGeneric.css"
import {FC} from "react";
interface InputProps {
  placeholder: string;
  name?: string;
  height?: number;
  width?: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number';
  value?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputGeneric: FC<InputProps> = ({
  placeholder,
  name,
  height = 30,
  width = 300,
  label,
  type = 'text',
  value,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        style={{ height, width }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
  
