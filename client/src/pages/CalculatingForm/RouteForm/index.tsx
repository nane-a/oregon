import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { getExitPoints, getStartPoints, selectExitPointsData, selectStartPointsData } from '../../../redux/slices/pointsSlice';
import { RouteFormT } from '../models/calculatingForms';
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select';
import { AppDispatch } from '../../../redux/store';
import { RemoveButton } from '../../../components/RemoveButton';
import { AddButton } from '../../../components/AddButton';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { ReactComponent as Exiting } from '../../../assets/images/exiting.svg'
import { ReactComponent as Distance } from '../../../assets/images/distance.svg'
import { ReactComponent as Entering } from '../../../assets/images/entering.svg'
import { ReactComponent as Calc } from '../../../assets/images/calc.svg'
import { fetchRouteFormData } from '../../../redux/slices/formSlice';
import { getDistanceAddPrice, selectDistanceAddPrice } from '../../../redux/slices/distanceSlice';
import './style.scss'

export const RouteForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const exitPoints = useSelector(selectExitPointsData)
    const startPoints = useSelector(selectStartPointsData)
    const distanceAndPrice = useSelector(selectDistanceAddPrice)

    const { register, handleSubmit, formState: { errors }, watch } = useForm<RouteFormT>();

    const [route_type, setRoute_type] = useState<string>()
    const [step, setStep] = useState<boolean>(true)
    const [stops, setStops] = useState<Array<{ city_or_zip: string, service_type: string }>>([{ city_or_zip: '', service_type: '' }])

    const [exitPointBool, setExitPointBool] = useState<boolean>(false)
    const [calculateBool, setCalculateBool] = useState<boolean>(false)

    const addStop = () => {
        const newStops = [...stops]
        newStops.push({ city_or_zip: '', service_type: '' })
        setStops(newStops)
    }

    const removeStop = (i: number) => {
        const newStops = [...stops]
        newStops.splice(i, 1)
        setStops(newStops)
    }

    const handleChange = (e: any, i: number) => {
        let newStops = [...stops]
        newStops[i]['service_type'] = e.target.value
        setStops(newStops)
    }

    const handleInputChange = (e: any, i: number) => {
        const newStops = [...stops]
        newStops[i]['city_or_zip'] = `${e.geometry.location.lat()}, ${e.geometry.location.lng()}`
        setStops(newStops)
    }

    const onSubmit = (data: RouteFormT) => {
        const usdot_id = Number(localStorage.getItem('usdot_id'))
        const usdot = localStorage.getItem('usdot')
        if (route_type && usdot_id && usdot)
            dispatch(fetchRouteFormData({ ...data, route_type, stops, usdot_id })).then((res: any) => res.payload.data.success ? dispatch(getDistanceAddPrice({ usdot })) : {})
    }

    useEffect(() => {
        setRoute_type('')
        dispatch(getStartPoints())
        dispatch(getExitPoints())
    }, [])

    const handleClickBack = (): void => {
        navigate('/calculating-form/truck')
    }

    return (<div className='route'>
        {step ?
            <div className='step_one'>
                <p>Please select from below</p>
                <div className='route__select-container'>
                    <div className={`select ${route_type == 'ENTERING OREGON' ? 'selected' : ''}`} onClick={() => setRoute_type('ENTERING OREGON')}>
                        <Entering />
                        ENTERING OREGON
                    </div>
                    <div className={`select ${route_type == 'EXITING OREGON' ? 'selected' : ''}`} onClick={() => setRoute_type('EXITING OREGON')}>
                        <Exiting />
                        EXITING OREGON
                    </div>
                </div>
                <div className='button-container'>
                    <Button variant='secondary' type='button' onClick={() => handleClickBack()}>Back</Button>
                    <Button variant='main' type='button' onClick={() => route_type ? setStep(false) : setStep(true)}>Next</Button>
                </div>
            </div>
            :
            <form onSubmit={handleSubmit(onSubmit)}>

                {route_type === 'ENTERING OREGON' ?
                    <h2>Entering Oregon</h2>
                    :
                    <h2>Starting from Oregon</h2>
                }

                <div className='trip_type_container'>
                    <input type="radio" id='roundTrip' value='round' {...register('trip_type', { required: true })} />
                    <label htmlFor="roundTrip">Round trip</label>
                    <input type="radio" id='oneWay' value='oneway' {...register('trip_type', { required: true })} />
                    <label htmlFor="oneWay">One way trip</label>
                    {errors && errors.trip_type?.type === "required" && (
                        <span className="error">Required</span>
                    )}
                </div>

                {route_type === 'ENTERING OREGON' ?
                    <Select
                        name="entrance_point"
                        label="Entrance point:"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    >
                        <option value="" hidden>Select one</option>
                        {startPoints.startPoints.map((e: any, i: number) => {
                            return <optgroup label={e.label} key={i}>
                                {e.options.map((opt: any, ind: number) => {
                                    return <option value={opt.value} key={ind}>{opt.label}</option>
                                })}
                            </optgroup>
                        })}
                    </Select>
                    :
                    <Select
                        name="exit_point"
                        label="Start point:"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Required"
                        }}
                        required
                    >
                        <option value="" hidden>Select one</option>
                        {exitPoints.exitPoints.map((e: any, i: number) => {
                            return <optgroup label={e.label} key={i}>
                                {e.options.map((opt: any, ind: number) => {
                                    return <option value={opt.value} key={ind}>{opt.label}</option>
                                })}
                            </optgroup>
                        })}
                    </Select>
                }

                <p>Stops</p>

                <div className='stops-container'>
                    {stops.map((e: any, i) => {
                        return (
                            <div key={i} className='stops-container__item'>
                                <p>{i + 1} location in Oregon</p>

                                <div className='stops-container__item__radio'>
                                    <input type="radio" id={'delivery' + i} name={'service_type' + i} value='delivery' onChange={(e) => handleChange(e, i)} />
                                    <label htmlFor={'delivery' + i}>Delivery</label>
                                    <input type="radio" id={'pick' + i} name={'service_type' + i} value='pick' onChange={(e) => handleChange(e, i)} />
                                    <label htmlFor={'pick' + i}>Pick</label>
                                </div>

                                <div className='stops-container__item__inp'>
                                    <ReactGoogleAutocomplete
                                        apiKey={'AIzaSyD-Work-rCSEpWMY_uzULiTe_THPGigNcQ'}
                                        onPlaceSelected={(place) => handleInputChange(place, i)}
                                        placeholder='City or zip code'
                                        options={{
                                            componentRestrictions: { country: "us" },
                                        }}
                                    />
                                    {i !== 0 && <RemoveButton type='button' onClick={() => removeStop(i)} />}
                                    {i === stops.length - 1 && <AddButton type='button' onClick={() => addStop()} />}
                                </div>
                            </div>)
                    })}
                </div>

                <div className={`distance-container ${exitPointBool || distanceAndPrice?.success ? 'column' : ''}`}>
                    <div className='dis'>
                        <div className='distance-container__distance'>
                            <Button variant='main' width='auto' padding='16px 32px'>yOUR distance<Distance /></Button>
                            {distanceAndPrice?.success && <div className='distance-container__distance__div'>
                                <p>Total miles</p>
                                <span>{Math.round(distanceAndPrice.data.distance)} MI</span>
                            </div>}
                        </div>
                        {distanceAndPrice?.success && <div className='distance-container__distance'>
                            <Button variant='main' width='auto' padding='16px 32px' onClick={() => setCalculateBool(true)}>Calculate<Calc /></Button>
                            {calculateBool && <div className='distance-container__distance__price'>
                                <div>
                                    <p>Total Miles: {Math.round(distanceAndPrice.data.distance)}</p>
                                    <span>${distanceAndPrice.data.price}</span>
                                </div>
                            </div>}
                        </div>}
                    </div>
                    <div className='distance-container__exit-point'>
                        <div className='distance-container__exit-point__btns'>
                            {exitPointBool ?
                                <>
                                    <p>Remove Exit/FWY Point</p>
                                    <RemoveButton variant='min' onClick={() => setExitPointBool(false)} />
                                </>
                                :
                                <>
                                    <p>Add Exit/FWY point</p>
                                    <AddButton onClick={() => setExitPointBool(true)} />
                                </>
                            }
                        </div>
                        {exitPointBool &&
                            <div className='distance-container__exit-point__select'>
                                <Select
                                    name="exit_point"
                                    errors={errors}
                                    register={register}
                                    validationSchema={{
                                        required: "Required"
                                    }}
                                    required
                                >
                                    <option value="" hidden>Select one</option>
                                    {exitPoints.exitPoints.map((e: any, i: number) => {
                                        return <optgroup label={e.label} key={i}>
                                            {e.options.map((opt: any, ind: number) => {
                                                return <option value={opt.value} key={ind}>{opt.label}</option>
                                            })}
                                        </optgroup>
                                    })}
                                </Select>
                            </div>
                        }
                    </div>
                </div>
                <div className='button-container'>
                    <Button variant='secondary' type='button' onClick={() => { setStep(true); setRoute_type(''); setStops([{ city_or_zip: '', service_type: '' }]) }}>Back</Button>
                    <Button variant='main' type='submit'>Next</Button>
                </div>
            </form>
        }
    </div>)
}