import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/Button'
import { Input } from '../../../components/Input';
import { Select } from '../../../components/Select';
import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { TruckFormT } from '../models/calculatingForms';
import { getWeights, selectWeightData } from '../../../redux/slices/weightsSlice';
import { fetchTruckFormData, selectFormData } from '../../../redux/slices/formSlice';
import { AddButton } from '../../../components/AddButton';
import { RemoveButton } from '../../../components/RemoveButton';
import { getStatesCanada, getStatesUS, selectStatesDataCanada, selectStatesDataUS } from '../../../redux/slices/statesSlice';
import './style.scss'

export const TruckDriverForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const select = useSelector(selectFormData)
    const weights = useSelector(selectWeightData)
    const statesUS = useSelector(selectStatesDataUS)
    const statesCanada = useSelector(selectStatesDataCanada)

    const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm<TruckFormT>({ defaultValues: { purchased_by_company: 'owned', name_of_second_driver: '', axels: 5 } });

    const [secondDriver, setSecondDriver] = useState<boolean>(false)

    useEffect(() => {
        dispatch(getWeights())
        dispatch(getStatesUS())
        dispatch(getStatesCanada())
    }, [])

    const handleClickBack = (): void => {
        navigate('/')
    }

    const onSubmit = (data: TruckFormT): void => {
        const usdot_id = localStorage.getItem('usdot_id')
        if (usdot_id) dispatch(fetchTruckFormData({ ...data, usdot_id })).then((res: any) => res.payload.data.success ? navigate('/calculating-form/route') : '')
    }

    return (<div className='truck-form-container'>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={`input-group ${secondDriver ? '' : 'second'}`}>
                <Input
                    type="text"
                    name="name_of_first_driver"
                    label="Name Of Driver:"
                    errors={errors}
                    errorsBack={select?.error}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                />
                {secondDriver ?
                    <div className='second-driver-group'>
                        <Input
                            type="text"
                            name="name_of_second_driver"
                            label="Name of Second Driver:"
                            errors={errors}
                            errorsBack={select?.error}
                            register={register}
                            validationSchema={{
                                required: "Required"
                            }}
                        />
                        <div className='button-delete'>
                            <RemoveButton onClick={() => setSecondDriver(false)} type='button' />
                        </div>
                    </div>
                    :
                    <div className='button-plus'>
                        <AddButton onClick={() => setSecondDriver(true)} type='button'></AddButton>
                    </div>
                }
            </div>
            <p>Truck Info</p>
            <div className='input-group'>
                <div className='input-group'>
                    <Input
                        type="number"
                        name="year"
                        label="Truck year:"
                        errors={errors}
                        errorsBack={select?.error}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    />
                    <Input
                        type="text"
                        name="make"
                        label="Make:"
                        errors={errors}
                        errorsBack={select?.error}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    />
                </div>
                <Input
                    type="text"
                    name="unit"
                    label="Unit number#:"
                    errors={errors}
                    errorsBack={select?.error}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                />
            </div>
            <div className='input-group'>
                <Input
                    type="text"
                    name="vin"
                    label="VIN number (17 digits):"
                    errors={errors}
                    errorsBack={select?.error}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                />
                <Input
                    type="text"
                    name="license_plate_number"
                    label="License plate Number:"
                    errors={errors}
                    errorsBack={select?.error}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                />
            </div>
            <div className='input-group'>
                <Select
                    name="license_plate_issue_state"
                    label="License plate Issue state:"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                >
                    <option value="" hidden>Select one</option>
                    <optgroup label='US'>
                        {statesUS}
                    </optgroup>
                    <optgroup label='Canada'>
                        {statesCanada}
                    </optgroup>
                    <option value="d">d</option>
                </Select>
                <div className='second-driver-group'>
                    <Select
                        name="apportioned_with_oregon"
                        label="License plate type "
                        errors={errors}
                        span='(Is your truck apportioned with Oregon?)'
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                        inf={watch().apportioned_with_oregon === 'no' && <div className='tax'>50$</div>}
                    >
                        <option value="" hidden>Select one</option>
                        <option value='yes'>Yes</option>
                        <option value='no'>No</option>
                    </Select>
                </div>
            </div>
            <div className='input-group'>
                <Select
                    name="registered_weight"
                    label="What is your registered weight with Oregon?"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                >
                    <option value="" hidden>Select one</option>
                    {weights?.data?.map((e: any, i: number) => {
                        return <option value={e.weight} key={i}>{e.weight}</option>
                    })}
                </Select>
                {+watch().registered_weight?.split(' ')[0].replaceAll(',', '') > 80000 ?
                    <Input
                        type="number"
                        name="axels"
                        label="How many axles do you have?"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    /> :
                    <Select
                        name="purchased"
                        label="Truck is purchased by the company or leased?"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    >
                        <option value="" hidden>Select one</option>
                        <option value="leased">Leased</option>
                        <option value="owned">Owned</option>
                    </Select>
                }
            </div>

            {+watch().registered_weight?.split(' ')[0].replaceAll(',', '') > 80000 &&
                <Select
                    name="purchased"
                    label="Truck is purchased by the company or leased?"
                    errors={errors}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                >
                    <option value="" hidden>Select one</option>
                    <option value="leased">Leased</option>
                    <option value="owned">Owned</option>
                </Select>
            }

            {watch().purchased === 'leased' &&
                <Input
                    type="text"
                    name="purchased_by_company"
                    label="Leasing company name"
                    errors={errors}
                    errorsBack={select?.error}
                    register={register}
                    validationSchema={{
                        required: "Required"
                    }}
                    required
                />
            }
            <Input
                type="text"
                name="your_commodity"
                label="What is your Commodity?"
                errors={errors}
                errorsBack={select?.error}
                register={register}
                validationSchema={{
                    required: "Required"
                }}
                required
            />
            <div className='button-container'>
                <Button variant='secondary' type='button' onClick={() => handleClickBack()}>Back</Button>
                <Button variant='main' type='submit' disabled={!isValid}>Next</Button>
            </div>
        </form>
    </div>)
}

