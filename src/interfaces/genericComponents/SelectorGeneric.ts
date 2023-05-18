export interface SelectorProps {
    options: string[];
    label: string;
    height?: number;
    width?: number;
    value?: string;
    className?: string;
    name?: string;
    handleSelector(val: object): void;
}
