type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value }) => {
  return (
    <div className="mb-4">
      <input type={type} name={name} value={value} placeholder={placeholder} />
    </div>
  );
};

export default InputField;
