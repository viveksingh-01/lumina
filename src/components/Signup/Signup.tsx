import { useState } from "react";
import InputField from "../InputField/InputField";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Create an account</h1>
      <div>
        <form>
          <InputField type="email" name="email" placeholder="Email" value={formData.email} />
          <InputField type="password" name="password" placeholder="Password" value={formData.password} />
        </form>
      </div>
    </div>
  );
};

export default Signup;
