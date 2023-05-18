import { Link } from 'react-router-dom';
import phoneIcon from '../../assets/images/phone-icon.png'
import './style.scss'
import { HashLink } from 'react-router-hash-link';

interface SidebarI {
    isOpen: boolean;
    toggle: Function
}

export const Sidebar: React.FC<SidebarI> = (props: SidebarI): JSX.Element => {
    return (
        <div className={props.isOpen ? "sidebar is-open" : "sidebar"}>
            <div className="sidebar__header">
                <button onClick={() => props.toggle()}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 2.79083L21.2092 0L12 9.20917L2.79083 0L0 2.79083L9.20917 12L0 21.2092L2.79083 24L12 14.7908L21.2092 24L24 21.2092L14.7908 12L24 2.79083Z" fill="#39979C"></path></svg>
                </button>
            </div>
            <div className='sidebar__navigation'>
                <div className='sidebar__navigation__item'>
                    <Link to={'/'} onClick={() => props.toggle()}>Home</Link>
                </div>
                <div className='sidebar__navigation__item two'>
                    <p className='opacity'>oVERSIZE AND extended PERMITS</p>
                    <Link to={'/oversize-and-overweight-permit'} className='small' onClick={() => props.toggle()}>fOR oversize AND OVERWEIGHT PERMIT</Link>
                    <Link to={'/extended-permit'} className='small' onClick={() => props.toggle()}>fOR EXTENDED PERMIT</Link>
                </div>
                <div className='sidebar__navigation__item'>
                    <HashLink smooth to={'/#good_to_know'} onClick={() => props.toggle()}>good to know</HashLink>
                </div>
                <div className='sidebar__navigation__item'>
                    <Link to={'/terms-and-conditions'} onClick={() => props.toggle()}>Terms and conditions</Link>
                </div>
            </div>

            <div className='info__number'>
                <div className='number'>
                    <div className='number__icon'>
                        <img src={phoneIcon} alt="icon" />
                    </div>
                    <p>503 8626399</p>
                </div>
                <p className='hotline'>24/7 Hotline</p>
            </div>
        </div>
    )
}