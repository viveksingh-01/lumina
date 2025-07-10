import { IFormData } from "../../types/form-data";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: (data: any) => void;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value, setValue }) => {
  const handleInput = (e: any) => {
    setValue((formData: IFormData) => ({ ...formData, [name]: e.target?.value }));
  };
  return (
    <div className="mb-7">
      <input
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        className="w-[360px] px-4 py-3 border-2 border-gray-300 rounded-full text-lg"
        onChange={handleInput}
      />
    </div>
  );
};

export default InputField;
