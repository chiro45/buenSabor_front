import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

export interface IButtonStandard {
    backgroundColor?: string
    colorText?: string
    fontSize?: string
    width?: string
    height?: string
    text?: string
    disabled?: boolean
    icon?: IconDefinition
    handleClick: Function
}