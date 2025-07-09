type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value }) => {
  return (
    <div className="mb-4">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-[300px] px-4 py-3 border-2 border-gray-300 rounded-full text-lg"
      />
    </div>
  );
};

export default InputField;
