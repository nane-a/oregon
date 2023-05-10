import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../Button'
import { Sidebar } from '../Sidebar'
import { ReactComponent as Icon } from '../../assets/images/side-bar-icon.svg'
import phoneIcon from '../../assets/images/phone-icon.png'
import logo from '../../assets/images/logo.svg'
import './style.scss'

export const Navbar: React.FC = (): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    const toggle = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = isOpen?'scroll':'hidden'
    };

    return (<div className='header'>
        <div className='header__container container'>
            <div className='header__container__info'>
                <div className='logo'>
                    <img src={logo} alt="logo" onClick={()=>navigate('/')}/>
                </div>
                <div className='info'>
                    <div className='info__number'>
                        <div className='number'>
                            <div className='number__icon'>
                                <img src={phoneIcon} alt="icon" />
                            </div>
                            <p>503 8626399</p>
                        </div>
                        <p className='hotline'>24/7 Hotline</p>
                    </div>
                    <Button variant='secondary' width='158px' height='53px'>LIVE CHAT</Button>
                </div>
            </div>
            <div className='header__container__nav'>
                <ul className='nav'>
                    <li>
                        <Link to={'/'} className='header-link'>Home</Link>
                    </li>
                    <li className='dropdown-link'>
                        <Link to={'/'} className='header-link'>oVERSIZE AND extended PERMITS</Link>
                        <ul className='dropdown'>
                            <li>
                                <Link to={'/oversize-and-overweight-permit'} className='header-link'>fOR oversize AND OVERWEIGHT PERMIT</Link>
                            </li>
                            <li>
                                <Link to={'/extended-permit'} className='header-link'>fOR EXTENDED PERMIT</Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to={'/'} className='header-link'>good to know</Link>
                    </li>
                    <li>
                        <Link to={'/'} className='header-link'>Contact US</Link>
                    </li>
                    <li>
                        <Link to={'/terms-and-conditions'} className='header-link'>Terms and conditions</Link>
                    </li>
                </ul>
            </div>
            <Sidebar isOpen={isOpen} toggle={toggle} />
            <button onClick={() => toggle()} className="sidebar-btn">
                <Icon/>
            </button>
        </div>
    </div>)
}