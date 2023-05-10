import { ReactNode } from "react";
import './style.scss'

interface StepperI {
    variant: 'main-stepper' | 'secondary-stepper'
    disabled: boolean;
    children: ReactNode;
}

export const Stepper: React.FC<StepperI> = (props: StepperI) => {
    return <div className={`stepper ${props.variant} ${props.disabled?'disabled':''}`}>{props.children}</div>
}