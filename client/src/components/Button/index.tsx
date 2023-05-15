import { ReactNode } from "react";
import './style.scss'

interface ButtonI {
    variant: 'main' | 'secondary';
    width?: string;
    padding?: string;
    height?: string;
    children: ReactNode;
    onClick?: any;
    type?: "button" | "submit" | "reset" | undefined;
}

export const Button: React.FC<ButtonI> = (props: ButtonI) => {
    return <button type={props.type} className={`button ${props.variant}`} style={{ width: props.width, height: props.height, padding: props.padding }} {...props}>{props.children}</button>
}