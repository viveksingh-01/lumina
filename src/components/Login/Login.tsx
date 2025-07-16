import { useState } from "react";
import { ILoginFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";

const Login: React.FC = () => {
  const [formData, setFormData] = useState<ILoginFormData>({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Welcome back!</h1>
      <div>
        <form>
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
        </form>
      </div>
    </div>
  );
};

export default Login;
