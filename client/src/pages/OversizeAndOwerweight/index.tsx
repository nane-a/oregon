import { useEffect } from 'react'
import { Box } from '../../components/Box'
import './style.scss'


export const OversizeAndOwerweight: React.FC = (): JSX.Element => {

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    return (<div className='oversize'>
        <Box variant='main' title='Oregon Oversize Permits'>
            <div className='box_one'>
                <p><span className='bold'>PERMITS:</span>  Oregon oversize permits are valid for 10 days. Must have permit prior to entering the state.</p>
                <p><span className='bold'>OPERATING TIME:</span>  One-half hour before sunrise to one-half hour after sunset seven days a week from Labor Day to Memorial Day. Memorial Day to Labor Day, Saturday travel only until noon and none on Sunday, except not exceeding 14 feet wide can travel weekend, daytime hours only on Interstate highways west of the summit of the Cascade Mountains, and on any authorized highway east of the summit of the Cascade Mountains. (See Oregon Attachment H). Up to 10 feet wide on “green” routes and up to 12 feet wide on Interstates are allowed night travel.</p>
                <p><span className='bold'>RESTRICTED TRAVEL:</span>  One-half hour before sunrise to one-half hour after sunset seven days a week from Labor Day to Memorial Day. Memorial Day to Labor Day, Saturday travel only until noon and none on Sunday, except not exceeding 14 feet wide can travelweekend, daytime hours only on Interstate highways west of the summit of the CascadeMountains, and on any authorized highway east of the summit of the Cascade Mountains. (See Oregon Attachment H). Up to 10 feet wide on “green” routes and up to 12 feet wide on Interstates are allowed night travel.</p>
            </div>
        </Box>
        <Box variant='main' title='LEGAL DIMENSIONS'>
            <div className='box_two'>
                <p><span className="bold">Length:</span></p>
                <ul className='custom-ul'>
                    <li>53′ semitrailer</li>
                    <li>No overall limit on designated routes</li>
                    <li>Group 1 routes – 60′</li>
                </ul>
                <p><span className="bold">Overhang:</span>5’</p>
                <p><span className="bold">Note:</span> Trailers exceeding 53′ in length are not allowed unless they must be stretched for a load, and can be reduced to 53′ when unladen, or are in a combination with jeeps or boosters</p>
                <p><span className="bold">Width:</span> 8’6′′</p>
                <p><span className="bold">Height:</span> 14’</p>
                <p><span className="bold">Width:</span> 80,000</p>
                <ul className='custom-ul'>
                    <li>Single – 20,000</li>
                    <li>Tandem – 34,000</li>
                    <li>Tridem – Depends on spacings</li>
                </ul>
            </div>
        </Box>
        <Box variant='main' title='ROUTINE PERMIT LIMITS'>
            <div className='box_two'>
                <p><span className="bold">Length:</span> 105’</p>
                <p><span className="bold">Overhang:</span> Rear overhang not to exceed 1/3 of wheelbase of the tractor/trailer combination.</p>
                <p><span className="bold">Width:</span>  16’</p>
                <p><span className="bold">Height:</span> Depends on routes</p>
                <p><span className="bold">Width: </span> </p>
                <ul>
                    <li>Single – 21,500</li>
                    <li>Tandem – 43,000</li>
                    <li>Tridem </li>
                    <li>8’6′′ or less 57600</li>
                    <li>9′: 58,800</li>
                    <li>10′: 64,500</li>
                    <li>Steer – 600 pounds per inch of tire width (13,200 on 11′′ tires)Register for 105,500 pounds to permit that much or more.</li>
                </ul>
                <p><span className="bold">Loads exceeding the following are considered superloads, and may take extra time for approval:</span></p>
                <ul className='custom-ul'>
                    <li>16′ wide on the Interstate</li>
                    <li>14′ wide on 2-lane highways</li>
                    <li>Tridem </li>
                    <li>Over 17′ high</li>
                    <li>150′ long</li>
                </ul>
                <p className='custom-p'>Over 16′ wide not granted on many routes, district must decide.</p>
            </div>
        </Box>
        <Box variant='main' title='ESCORTS'>
            <div className='box_two'>
                <p><span className="bold">On Interstate and multi-lane highways:</span></p>
                <p><span className="bold">Overhang:</span> Rear overhang not to exceed 1/3 of wheelbase of the tractor/trailer combination.</p>
                <p><span className="bold">Length:</span></p>
                <ul className='custom-ul'>
                    <li>Over 120′ – 1 escort</li>
                    <li>Over 140′ – as required on permit</li>
                </ul>
                <p><span className="bold">Width:</span></p>
                <ul className='custom-ul'>
                    <li>Over 14′ – 1 escort</li>
                    <li>Over 16′ – as required on permit</li>
                </ul>
                <div className='custom-div'>
                    <p><span className="bold">Height:</span> Over 14’6” – 1 escort</p>
                    <p><span className="bold">On 2-lane “green” routes:</span></p>
                    <p><span className="bold">Length:</span></p>
                </div>
                <ul className='custom-ul'>
                    <li>Over 105′ – 1 escort</li>
                    <li>Over 120′ – 2 escorts</li>
                    <li>Over 140′ – as required on permit</li>
                </ul>
                <p><span className="bold">Width:</span></p>
                <ul className='custom-ul'>
                    <li>Over 12′ – 1 escort,</li>
                    <li>Over 14′ – 2 escorts</li>
                    <li>Over 16′ – as required on permit</li>
                </ul>
                <div className='custom-div'>
                    <p><span className="bold">Height:</span> Over 14’6” – 1 escort</p>
                    <p><span className="bold">Most other 2-lane routes:</span></p>
                    <p><span className="bold">Length:</span></p>
                </div>
                <ul className='custom-ul'>
                    <li>Over 95′ – 1 escort</li>
                    <li>Over 120′ – 2 escorts</li>
                    <li>Over 140′ – as specified by permit Extra restrictions and pilot cars are required on a few secondary routes</li>
                </ul>
                <div className='custom-div'>
                    <p><span className="bold">Width:</span> Over 9′ – 1 escort</p>
                    <p><span className="bold">Height:</span> Over 14’6” – 1 escort</p>
                    <p><span className="bold">MISCELLANEOUS:</span> Extended length & weight annuals will allow 48′ trailers on some limited length highways, including 395 Pendleton to John Day and 25 across Oregon, and divisible loads exceeding 80,000 pounds gross. These can be purchased for $8.00 in person at DMV offices, or permit office can order over the phone for the driver to pick up at a specified DMV office or POE. Dozer blade can be detached and hauled with the dozer on same trailer if the load would be overweight with or without the blade. Permit must state “dozer with blade removed and reloaded.”</p>
                    <p><span className="bold">SIGNS, FLAGS & LIGHTS: </span> “Oversize Load” are required on front of tractor and rear of load or trailer on all wide loads and vehicle/loads over 80′ long. The sign must be reflectorized if operating at night. Flags are required on the outermost extremities of all wide loads. Traveling at night with a wide load, the outermost extremities must be illuminated by lamps or marker lights (amber forward and intermediate side markers, red rearward markers). Rear overhang of 4′ or more must be marked with a flag or, in darkness or visibility less than 500, with red end load lights. When width exceeds 10′ on a two-lane highway, or 12′ on a multi-lane highway, amber warning lights are required, on the cab, unless operating with a minimum of two pilot cars. See the Oregon provision sheet 82A for specifications.</p>
                </div>
            </div>
        </Box>
    </div>)
}