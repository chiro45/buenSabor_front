import {FC} from "react";
import { InputProps } from "../../../interfaces/genericComponents/InputGeneric";
import "./InputGeneric.css"

export const InputGeneric: FC<InputProps> = ({
  placeholder,
  name,
  height = 30,
  width = 300,
  label,
  type = 'text',
  value,
  checked,
  onChange,
  className,
}) => {
  return (
    <div className={className}>
      {label && <label htmlFor={label}>{label}</label>}
      <input
        name={name}
        type={type}
        checked={checked}
        placeholder={placeholder}
        style={{ height, width }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
  
