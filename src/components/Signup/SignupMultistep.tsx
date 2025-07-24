import { AxiosError } from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createAccount } from "../../services/auth";
import { ISignupFormData } from "../../types/form-data";
import { IErrorResponse, ISuccessResponse } from "../../types/response";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";

const SignupMultistep = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ISignupFormData>();

  const [step, setStep] = useState(1);

  const next = () => setStep((s) => s + 1);

  const handleContinue = (e: any) => {
    e.preventDefault();
    next();
  };

  const submitForm: SubmitHandler<ISignupFormData> = async (formValues) => {
    try {
      const res = await createAccount(formValues);
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
          <div className="w-full max-w-md rounded-lg p-4 relative overflow-hidden">
            {step === 1 && (
              <div>
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
              </div>
            )}

            {step === 2 && (
              <div key="step2">
                <InputField
                  type="text"
                  name="name"
                  placeholder="Full name"
                  register={register("name", {
                    required: "Name is required",
                  })}
                  value={watch("name")}
                  error={errors.name?.message}
                />
              </div>
            )}

            {step === 3 && (
              <div key="step3">
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
              </div>
            )}
            {step === 3 ? (
              <SubmitButton label="Create account" isSubmitting={isSubmitting} />
            ) : (
              <button
                  onClick={(e) => handleContinue(e)}
                className="w-full flex items-center justify-center p-4 rounded-full bg-gray-900 text-white tracking-wide hover:cursor-pointer hover:bg-gray-800 transition-colors"
              >
                Continue
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupMultistep;
