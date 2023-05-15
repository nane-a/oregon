import { ReactComponent as Remove } from '../../assets/images/delete.svg'
import { ReactComponent as Minus } from '../../assets/images/minus.svg'
import './style.scss'

interface RemoveButtonI {
    onClick?: any;
    variant?: 'min';
    type?: "button" | "submit" | "reset" | undefined;
}

export const RemoveButton: React.FC<RemoveButtonI> = (props: RemoveButtonI) => {
    return <button className={`buttonRemove`} {...props}>{props.variant === 'min' ? <Minus /> : <Remove />}</button>
}