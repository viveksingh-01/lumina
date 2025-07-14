import { useState } from "react";
import { IFormData } from "../../types/form-data";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  setValue: (data: any) => void;
};

const InputField: React.FC<InputFieldProps> = ({ name, type, placeholder, value, setValue }) => {
  const [focused, setFocused] = useState(false);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue((formData: IFormData) => ({ ...formData, [name]: e.target?.value }));
  };
  return (
    <div className="mb-7 relative">
      <input
        type={type}
        name={name}
        value={value}
        className="w-[360px] px-4 py-3 border-2 border-gray-300 rounded-full text-lg"
        onChange={handleInput}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-4 px-1 transition-all duration-200
          ${focused || value ? "-top-2.5 text-sm bg-gray-50" : "top-3.5 text-gray-400"}
          ${focused ? "text-blue-800" : "text-gray-500"}
          pointer-events-none
        `}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputField;
