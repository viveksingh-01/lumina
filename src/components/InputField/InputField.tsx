import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  register: UseFormRegisterReturn;
  error?: string;
  autoFocus?: boolean;
};

const InputField: React.FC<InputFieldProps> = ({
  register,
  name,
  type,
  placeholder,
  value,
  error,
  autoFocus = false,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mb-7 relative">
      <input
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        {...register}
        className={`w-[360px] px-4 py-3 border-2 border-gray-300 rounded-full text-lg
          ${error && "border-red-600 outline-red-600"}`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoFocus={autoFocus}
      />
      {type === "password" && (
        <span
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-2 right-2 text-md flex items-center px-3 text-gray-600 hover:text-gray-800 hover:cursor-pointer outline-0"
          tabIndex={-1}
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </span>
      )}
      <label
        htmlFor={name}
        className={`
          absolute left-4 px-1 transition-all duration-200
          ${focused || value ? "-top-2.5 text-sm bg-gray-50" : "top-3.5 text-gray-300"}
          ${focused ? "text-blue-800" : "text-gray-400"}
          ${focused && error && "text-red-600"}
          pointer-events-none
        `}
      >
        {placeholder}
      </label>
      {error && <p className="text-sm text-red-600 ml-5 mt-2">{error}</p>}
    </div>
  );
};

export default InputField;
