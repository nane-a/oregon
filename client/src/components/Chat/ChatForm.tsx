import { useForm } from 'react-hook-form';
import { Input } from '../Input'
import { Button } from '../Button';
import './style.scss'

type ChatFormT = {
    usdot: string;
}

type chatFormT = {
    open: Function
}

export const ChatForm: React.FC<chatFormT> = ({ open }: chatFormT): JSX.Element => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ChatFormT>();

    const onSubmit = (data: ChatFormT): void => {
        localStorage.setItem("usdot", data.usdot)
        open()
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Input
                type="text"
                name="usdot"
                label="USDOT:"
                errors={errors}
                register={register}
                validationSchema={{
                    required: "Usdot is required"
                }}
                required
            />
            <Button variant="main" disabled={!isValid}>Send</Button>
        </form>
    )
}