import './style.scss'

export const ChatSceleton:React.FC = ():JSX.Element =>{
    return(<div className="skeleton-container">
        <div className="skeleton skeleton-header"></div>
        <div className="skeleton skeleton-body"></div>
    </div>)
}