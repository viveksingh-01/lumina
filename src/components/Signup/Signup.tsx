import { FormEvent, useState } from "react";
import { ISignupFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<ISignupFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Create an account</h1>
      <div>
        <form onSubmit={handleSubmit}>
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            setValue={setFormData}
            autoFocus={true}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            setValue={setFormData}
            autoFocus={false}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            setValue={setFormData}
            autoFocus={false}
          />
          <button
            type="submit"
            className="w-full p-4 rounded-full bg-gray-900 text-white tracking-wide hover:cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
