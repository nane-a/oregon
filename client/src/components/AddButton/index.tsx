import { ReactComponent as Add } from '../../assets/images/plus.svg'
import './style.scss'

interface AddButtonI {
    onClick?: any;
    type?: "button" | "submit" | "reset" | undefined;
}

export const AddButton: React.FC<AddButtonI> = (props: AddButtonI) => {
    return <button className={`buttonAdd`} {...props}><Add /></button>
}