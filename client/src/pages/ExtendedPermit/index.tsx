import { useEffect } from 'react'
import { Box } from '../../components/Box'
import './style.scss'


export const ExtendedPermit: React.FC = (): JSX.Element => {

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    return (<div className='extended'>
        <Box variant='main' title='Over-Dimension Permit'>
            <div className='extended__box'>
                <p className='extended__box__title'>Extended weight permit</p>
                <p>Unlike most renewals, annual over-dimension permits are valid for 365 days, not necessarily a calendar year. The most common annual over-dimension permit is the extended weight permit, which allows up to 105,500 pounds gross weight on legal axle and group axle weights. The permit covers the weight only, not registration and tax credentials.</p>
                <p>Extended Weight and/or Overlength Permit . Authorizes operations to exceed the maximum legal weight of 80,000 pounds up to a maximum of 105,500 pounds provided the combination has the proper axles and spacing to haul the weight. Axle weights must be legal. This permit is also issued for certain type of combinations to exceed legal length on some county roads. Splash and spray devices are required on combinations exceeding 80,000 pounds when operating on highways that are wet, including those surfaces that have rain, frost, ice, sleet or snow.</p>
                <p>You’ll get 2 permits, 1 will be emailed and will be valid for 30 days, the other one will be mailed to your company’s address   with the validation  of  1 year.</p>
                <p>The price is 60$ only for highways, and each county will add 60$, but all counties included the price will be 320$.</p>
            </div>
        </Box>
    </div>)
}