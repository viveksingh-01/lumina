import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ILoginFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<ILoginFormData>();

  const submitForm: SubmitHandler<ILoginFormData> = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Welcome back!</h1>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            register={register("email")}
            value={watch("email")}
            autoFocus={true}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            register={register("password")}
            value={watch("password")}
          />
          <SubmitButton label="Log in" isSubmitting={isSubmitting} />
        </form>
        <div className="my-7 text-center text-gray-600 tracking-wide">
          <p>
            Don't have an account?{" "}
            <span className="text-sky-600 hover:underline">
              <Link to="/auth/create-account">Sign up</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
