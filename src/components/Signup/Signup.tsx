import { FormEvent, useState } from "react";
import { IFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState<IFormData>({
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
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            setValue={setFormData}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            setValue={setFormData}
          />
          <button
            type="submit"
            className="w-full p-4 rounded-full bg-black text-white text-lg hover:cursor-pointer hover:bg-gray-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
