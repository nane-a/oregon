import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/Button'
import './style.scss'

export const PaymentForm: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const handleClickNext = (): void => {
        navigate('/calculating-form/accept')
    }
    const handleClickBack = (): void => {
        navigate('/calculating-form/route')
    }
    return (<div className=''>
        <form action="">
            <div className='button-container'>
                <Button variant='secondary' onClick={() => handleClickBack()}>Back</Button>
                <Button variant='main' onClick={() => handleClickNext()}>Next</Button>
            </div>
        </form>
    </div>)
}