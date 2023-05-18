export interface InputProps {
  placeholder?: string;
  name?: string;
  height?: number;
  width?: string;
  label?: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'checkbox';
  value?: string;
  checked?: boolean;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
