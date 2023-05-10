import { Input } from "../../components/Input"
import { useForm } from 'react-hook-form';
import { MainFormT } from './models/form';
import { Button } from "../../components/Button";
import { useDispatch } from "react-redux";
import { fetchFormData } from "../../redux/slices/formSlice";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

export const Form: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MainFormT>();

    const onSubmit = (data: MainFormT): void => {
        console.log({ ...data, phone_number: phoneFormat(data.phone_number) });
        dispatch(fetchFormData({ ...data, phone_number: phoneFormat(data.phone_number) }))
    }

    const phoneFormat = (phone: string): string => {
        phone = phone.replace(/\D/g, '')
        const areaCode = phone.substring(0, 3)
        const middle = phone.substring(3, 6)
        const end = phone.substring(6, 10)
        return `(${areaCode}) ${middle}-${end}`
    }

    return (<div className="form-container">
        <div className="form-container__cont">
            <div className="form-container__cont__label">
                <h2>ISSUE A TEMPORARY PERMIT</h2>
                <p>(Temporary permits valid for 10 days)</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <Input
                    type="text"
                    name="usdot"
                    label="Your USDOT#:"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "USDOT is required"
                    }}
                    required
                    placeholder="Your USDOT number"
                />
                <div className="input-group">
                    <div>
                        <Input
                            type="date"
                            name="permit_starting_date"
                            label="Permit starting date"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Permit starting date is required"
                            }}
                            placeholder=""
                            required
                        />
                    </div>
                    <div>
                        <Input
                            type="text"
                            name="local_business_name"
                            label="Local business name:"
                            errors={errors}
                            register={register}
                            validationSchema={{
                                required: "Local business name is required"
                            }}
                            required
                            placeholder="Company name"
                        />
                    </div>
                </div>
                <Input
                    type="email"
                    name="email_adress"
                    label="Email adress"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "USDOT is required"
                    }}
                    required
                    placeholder="e. g. example@example.com"
                />
                <Input
                    type="text"
                    name="phone_number"
                    label="Phone number"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "USDOT is required"
                    }}
                    required
                    placeholder="e. g. (307) 721-8848"
                />

                <Button variant="main">Send</Button>
            </form>
        </div>
    </div>)
}