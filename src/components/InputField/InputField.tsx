import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  autoFocus: boolean;
  register: UseFormRegisterReturn;
};

const InputField: React.FC<InputFieldProps> = ({ register, name, type, placeholder, value, autoFocus }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div className="mb-7 relative">
      <input
        type={type}
        {...register}
        className="w-[360px] px-4 py-3 border-2 border-gray-300 rounded-full text-lg"
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
      />
      <label
        htmlFor={name}
        className={`
          absolute left-4 px-1 transition-all duration-200
          ${focused || value ? "-top-2.5 text-sm bg-gray-50" : "top-3.5 text-gray-300"}
          ${focused ? "text-blue-800" : "text-gray-400"}
          pointer-events-none
        `}
      >
        {placeholder}
      </label>
    </div>
  );
};

export default InputField;
