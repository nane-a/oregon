import './style.scss'

interface InputI {
  type: string;
  placeholder?: string;
  name: string;
  register: any;
  errors: any;
  errorsBack?: any;
  required?: any;
  validationSchema: any;
  label: any;
}

const calculateDate = () => {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()

  return `${year}-${month > 9 ? month : '0' + month}-${day > 9 ? day : '0' + day}`
}

export const Input: React.FC<InputI> = ({ name, label, register, errors, required, type, validationSchema, placeholder, errorsBack }: InputI): JSX.Element => (
  <div className="form-control-input">
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>

    <input
      id={name}
      name={name}
      type={type}
      min={type==='date' ? calculateDate() : ''}
      {...register(name, validationSchema)}
      className='input'
      placeholder={placeholder}
      style={
        errors[name]?.type === "required" ||
          errors[name]?.type === "min" ||
          errors[name]?.type === "max"
          ? { border: '1px solid #F11212' } : errorsBack
            ? errorsBack[name] ? { border: '1px solid #F11212' } : {} : {}}
    />

    {errors && errors[name]?.type === "required" && (
      <span className="error">{errors[name]?.message}</span>
    )}
    {errors[name]?.type === "min" && (
      <span className="error">Must be bigger than {validationSchema.min}</span>
    )}
    {errors[name]?.type === "max" && (
      <span className="error">Can't be higher than {validationSchema.max}</span>
    )}
    {errorsBack &&
      <span className="error">{errorsBack[name]}</span>
    }
  </div>
);