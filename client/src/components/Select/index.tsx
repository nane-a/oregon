import React, { ReactNode } from "react";
import './style.scss'
interface SelectI {
    name: string;
    value?: string;
    register: any;
    errors: any;
    required: any;
    validationSchema: any;
    label: any;
    children: ReactNode;
    span?: any;
    handleOnChange?: any;
    inf?: any;
}

export const Select: React.FC<SelectI> = ({ name, label, register, errors, required, validationSchema, children, span, inf }: SelectI): JSX.Element => {
    return <div className="form-control-select">
        <label htmlFor={name}>
            {label}
            <span className="small">{span}</span>
            {required && "*"}
        </label>
        <div className="select-group">
            <select
                onChange={(e) => console.log('fgdfg')}
                id={name}
                name={name}
                {...register(name, validationSchema)}
                className='input'
                style={errors[name]?.type === "required" ? { border: '1px solid #F11212' } : {}}
            >{children}</select>
            {errors && errors[name]?.type === "required" && (
                <span className="error">{errors[name]?.message}</span>
            )}
            {inf}   
        </div>
    </div>
}