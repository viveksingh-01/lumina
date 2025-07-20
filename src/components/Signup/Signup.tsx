import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { ISignupFormData } from "../../types/form-data";
import InputField from "../InputField/InputField";

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
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
          <button
            type="submit"
            className="w-full flex items-center justify-center p-4 rounded-full bg-gray-900 text-white tracking-wide hover:cursor-pointer hover:bg-gray-800 transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
                Submitting...
              </>
            ) : (
              "Sign up"
            )}
          </button>
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
