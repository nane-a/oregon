import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { AppDispatch } from '../../../redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { useEnter } from '../../../setup/hooks/enter';
import { getExitPoints, getStartPoints, selectExitPointsData, selectStartPointsData } from '../../../redux/slices/pointsSlice';
import { getDistanceAddPrice, selectDistanceAddPrice } from '../../../redux/slices/distanceSlice';
import { resetData } from '../../../redux/slices/distanceSlice';
import { fetchRouteFormData, selectFormData } from '../../../redux/slices/formSlice';
import { RouteFormT } from '../models/calculatingForms';
import { Button } from '../../../components/Button'
import { Select } from '../../../components/Select';
import { RemoveButton } from '../../../components/RemoveButton';
import { Stops } from '../models/models';
import { AddButton } from '../../../components/AddButton';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { ReactComponent as Exiting } from '../../../assets/images/exiting.svg'
import { ReactComponent as Distance } from '../../../assets/images/distance.svg'
import { ReactComponent as Entering } from '../../../assets/images/entering.svg'
import { ReactComponent as Calc } from '../../../assets/images/calc.svg'
import './style.scss'

export const RouteForm: React.FC = (): JSX.Element => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();
    const exitPoints = useSelector(selectExitPointsData)
    const startPoints = useSelector(selectStartPointsData)
    const distanceAndPrice = useSelector(selectDistanceAddPrice)
    const select = useSelector(selectFormData)

    const { register, handleSubmit, formState: { errors }, reset } = useForm<RouteFormT>({ defaultValues: select?.route?.data || { trip_type: 'round trip' } })

    const [route_type, setRoute_type] = useState<string>()
    const [step, setStep] = useState<boolean>(true)
    const [stops, setStops] = useState<Array<Stops>>([{ city_or_zip: '', service_type: 'delivery' }])

    const [statrPoint, setStartPoint] = useState<string>('')
    const [startPointError, setStartPointError] = useState<boolean>(false)

    const [exitPointBool, setExitPointBool] = useState<boolean>(false)
    const [calculateBool, setCalculateBool] = useState<boolean>(false)

    useEnter(() => setStep(false), route_type !== '')
    useEnter(() => navigate('/calculating-form/payment'), !!distanceAndPrice?.success)

    useEffect(() => {
        if (select?.route?.data) {
            setRoute_type(select?.route?.data.route_type)
            setStep(false)
        } else {
            setRoute_type('')
        }
        dispatch(getStartPoints())
        dispatch(getExitPoints())
        dispatch(resetData())
    }, [])

    const addStop = () => {
        setStops([...stops, { city_or_zip: '', service_type: 'delivery' }])
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
        if (statrPoint || route_type == 'ENTERING OREGON') {
            setStartPointError(false)
            if (route_type && usdot_id && usdot)
                dispatch(fetchRouteFormData({
                    ...data,
                    route_type,
                    stops: [...stops.filter(e => e.city_or_zip !== '')],
                    usdot_id,
                    exit_point: exitPointBool ? data.exit_point : '',
                    entrance_point: statrPoint ? statrPoint : data.entrance_point
                }))
                    .then((res: any) => res.payload.data.success ? dispatch(getDistanceAddPrice({ usdot: usdot_id })) : {})
        } else {
            setStartPointError(true)
        }
    }

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
                    <Button variant='main' type='button' onClick={() => route_type ? setStep(false) : setStep(true)} disabled={!route_type}>Next</Button>
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
                    <input type="radio" id='roundTrip' value='round trip' {...register('trip_type', { required: true })} />
                    <label htmlFor="roundTrip">Round trip</label>
                    <input type="radio" id='oneWay' value='oneway trip' {...register('trip_type', { required: true })} />
                    <label htmlFor="oneWay">One way trip</label>
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
                        {startPoints?.startPoints?.map((e: any, i: number) => {
                            return <optgroup label={e.label} key={i}>
                                {e.options.map((opt: any, ind: number) => {
                                    return <option value={opt.value} key={ind}>{opt.label}</option>
                                })}
                            </optgroup>
                        })}
                    </Select>
                    :
                    <div className='starting__inp'>
                        <label htmlFor="">Start point:</label>
                        <ReactGoogleAutocomplete
                            apiKey={'AIzaSyD-Work-rCSEpWMY_uzULiTe_THPGigNcQ'}
                            onPlaceSelected={(place) => { setStartPoint(`${place.geometry.location.lat()}, ${place.geometry.location.lng()}`) }}
                            placeholder='City or zip code'
                            options={{
                                componentRestrictions: { country: "us" }
                            }}
                            language='en'
                            className={startPointError ? 'error' : ''}
                        />
                        {startPointError && <p>Require</p>}
                    </div>
                }

                <p>Stops</p>

                <div className='stops-container'>
                    {stops.map((e: any, i: number) => {
                        return (
                            <div key={i} className='stops-container__item'>
                                <p>{i + 1} location in Oregon</p>

                                <div className='stops-container__item__radio'>
                                    <input
                                        type="radio"
                                        id={'delivery' + i}
                                        name={'service_type' + i}
                                        value='delivery'
                                        onChange={(ev) => handleChange(ev, i)}
                                        checked={e['service_type'] === 'delivery'}
                                    />
                                    <label htmlFor={'delivery' + i}>Delivery</label>
                                    <input
                                        type="radio"
                                        id={'pick' + i}
                                        name={'service_type' + i}
                                        value='pick' onChange={(ev) => handleChange(ev, i)}
                                    />
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
                                        language='en'
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
                            <Button variant='main' width='auto' padding='16px 32px' onClick={() => setCalculateBool(true)} type='button'>Calculate<Calc /></Button>
                            {calculateBool && <div className='distance-container__distance__price'>
                                <div>
                                    <p>Total Miles: {Math.round(distanceAndPrice.data.distance)} mi</p>
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
                    <Button
                        variant='secondary'
                        type='button'
                        onClick={() => { setStep(true); setRoute_type(''); setStops([{ city_or_zip: '', service_type: '' }]); reset(); dispatch(resetData()) }}
                    >Back</Button>
                    <Button
                        variant='main'
                        type='button'
                        onClick={() => distanceAndPrice?.success ? navigate('/calculating-form/payment') : ''}
                        disabled={!distanceAndPrice?.success}
                    >Next</Button>
                </div>
            </form>
        }
    </div>)
}