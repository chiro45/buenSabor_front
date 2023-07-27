export interface IInputProps {
  placeholder?: string;
  name?: string;
  height?: number;
  width?: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox';
  value?: string;
  checked?: boolean;
  className?: string;
  readOnly?: boolean;
  required?: boolean;
  onChange?: any;
}
