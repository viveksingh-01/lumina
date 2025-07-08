type InputFieldProps = {
  name: string;
  type: string;
  label: string;
  value: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, label, value }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} value={value} />
    </div>
  );
};

export default InputField;
