import { AxiosError } from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { createAccount } from "../../services/auth";
import { ISignupFormData } from "../../types/form-data";
import { IErrorResponse, ISuccessResponse } from "../../types/response";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ISignupFormData>();

  const submitForm: SubmitHandler<ISignupFormData> = async (formValues) => {
    const { email, password } = formValues;
    try {
      const res = await createAccount({ email, password });
      const { message } = res as ISuccessResponse;
      console.log("Response: ", message);
    } catch (err: unknown) {
      const apiError = (err as AxiosError).response?.data;
      const { error } = apiError as IErrorResponse;
      console.log("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center pt-20 bg-gray-50 p-4">
      <h1 className="text-3xl p-2 mb-9">Create an account</h1>
      <div>
        <form onSubmit={handleSubmit(submitForm)}>
          <InputField
            type="text"
            name="email"
            placeholder="Email address"
            register={register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
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
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            value={watch("password")}
            error={errors.password?.message}
          />
          <InputField
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            register={register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            })}
            value={watch("confirmPassword")}
            error={errors.confirmPassword?.message}
          />
          <SubmitButton label="Sign up" isSubmitting={isSubmitting} />
        </form>
        <div className="my-7 text-center text-gray-600 tracking-wide">
          <p>
            Already have an account?{" "}
            <span className="text-sky-600 hover:underline">
              <Link to="/auth/log-in">Log in</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
