import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import './style.scss'
import { HashLink } from 'react-router-hash-link'

export const Footer: React.FC = (): JSX.Element => {
    return (<div className='footer'>
        <div className='footer__container container'>
            <div className='info'>
                <Logo className='logo' />
                <div className='info__number'>
                    <p className='number'>503 8626399</p>
                    <p className='hotline'>24/7 Hotline</p>
                </div>
            </div>
            <div className='footer-navigation'>
                <div className='footer-navigation__item'>
                    <Link to={'/'} onClick={()=>{ window.scrollTo(0,0)}}>Home</Link>
                </div>
                <div className='footer-navigation__item two'>
                    <p className='opacity'>oVERSIZE AND extended PERMITS</p>
                    <Link to={'/oversize-and-overweight-permit'} className='small'>fOR oversize AND OVERWEIGHT PERMIT</Link>
                    <Link to={'/extended-permit'} className='small'>fOR EXTENDED PERMIT</Link>
                </div>
                <div className='footer-navigation__item'>
                    <HashLink smooth to={'/#good_to_know'} className='header-link'>good to know</HashLink>
                </div>
                <div className='footer-navigation__item'>
                    <Link to={'/'}>Contact US</Link>
                </div>
                <div className='footer-navigation__item'>
                    <Link to={'/terms-and-conditions'}>Terms and conditions</Link>
                </div>
            </div>
        </div>
    </div>)
}