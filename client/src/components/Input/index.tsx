import './style.scss'

interface InputI {
  type: string;
  placeholder?: string;
  name: string;
  register: any;
  errors: any;
  required?: any;
  validationSchema: any;
  label: any;
}
export const Input: React.FC<InputI> = ({ name, label, register, errors, required, type, validationSchema, placeholder }: InputI): JSX.Element => (
  <div className="form-control-input">
    <label htmlFor={name}>
      {label}
      {required && "*"}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      {...register(name, validationSchema)}
      className='input'
      placeholder={placeholder}
      style={errors[name]?.type === "required" ? { border: '1px solid #F11212' } : {}}
    />
    {errors && errors[name]?.type === "required" && (
      <span className="error">{errors[name]?.message}</span>
    )}
  </div>
);