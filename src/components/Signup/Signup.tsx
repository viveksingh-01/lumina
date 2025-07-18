import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ISignupFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignupFormData>();

  const submitForm: SubmitHandler<ISignupFormData> = (data) => {
    console.log("Form data:", data);
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Create an account</h1>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <InputField
            type="email"
            name="email"
            placeholder="Email address"
            register={register("email", {
              required: "Email is required",
            })}
            value={watch("email")}
            error={errors.email?.message}
            autoFocus={true}
          />
          <InputField
            type="password"
            name="password"
            placeholder="Password"
            register={register("password", {
              required: "Password is required",
            })}
            value={watch("password")}
            error={errors.password?.message}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            register={register("confirmPassword", {
              required: "Confirm password is required",
            })}
            value={watch("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <button
            type="submit"
            className="w-full p-4 rounded-full bg-gray-900 text-white tracking-wide hover:cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Submit
          </button>
        </form>
        <div className="my-7 text-center text-gray-600 tracking-wide">
          <p>
            Already have an account?{" "}
            <span className="text-blue-800 hover:underline">
              <Link to="/auth/log-in">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
