import { InputHTMLAttributes } from 'react'
import { IconProps } from 'react-feather'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    name: string
    text: string
    icon?: React.ComponentType<IconProps>
}
