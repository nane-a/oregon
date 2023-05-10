import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button'
import { ReactComponent as Entering } from '../../../assets/images/entering.svg'
import { ReactComponent as Exiting } from '../../../assets/images/exiting.svg'
import './style.scss'

export const RouteForm: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const handleClickNext = (): void => {
        navigate('/calculating-form/payment')
    }
    const handleClickBack = (): void => {
        navigate('/calculating-form/truck')
    }
    return (<div className='route'>
        <p>Please select from below</p>
        <div className='route__select-container'>
            <div className='select'>
                <Entering />
                ENTERING OREGON
            </div>
            <div className='select'>
                <Exiting />
                EXITING OREGON
            </div>
        </div>
        <form action="">
        </form>
            <div className='button-container'>
                <Button variant='secondary' onClick={() => handleClickBack()}>Back</Button>
                <Button variant='main' onClick={() => handleClickNext()}>Next</Button>
            </div>
    </div>)
}