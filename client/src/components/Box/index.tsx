import { ReactNode, useState } from "react";
import { ReactComponent as Plus } from '../../assets/images/plus.svg'
import { ReactComponent as Minus } from '../../assets/images/minus.svg'
import './style.scss'

interface BoxI {
    variant: 'main' | 'accordion';
    title: string;
    children: ReactNode;
}

export const Box: React.FC<BoxI> = (props: BoxI) => {
    const [isActive, setIsActive] = useState(false)

    return <div className={`box ${props.variant}`}>
        <div className={`title ${props.variant == 'accordion' && 'click'}`} onClick={() => props.variant == 'accordion' && setIsActive(!isActive)}>
            <p>{props.title}</p>
            {props.variant == 'accordion' ?
                <>
                    <button>
                        {isActive ? <Minus /> : <Plus />}
                    </button>
                </>
                :
                <></>
            }
        </div>

        {props.variant == 'main' && <div className="content">
            {props.children}
        </div>}

        {isActive && <div className="content scale-in-ver-top">
            {props.children}
        </div>}
    </div>
}