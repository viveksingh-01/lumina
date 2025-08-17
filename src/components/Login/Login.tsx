import { AxiosError } from "axios";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { login } from "../../services/auth";
import { ILoginFormData } from "../../types/form-data";
import { IErrorResponse, ISuccessResponse } from "../../types/response";
import InputField from "../InputField/InputField";
import SubmitButton from "../SubmitButton/SubmitButton";

const Login: React.FC = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting },
  } = useForm<ILoginFormData>();

  const submitForm: SubmitHandler<ILoginFormData> = async (formValues) => {
    try {
      const res = await login(formValues);
      const { data } = res as ISuccessResponse;
      setUser(data);
      navigate("/");
    } catch (err: unknown) {
      const apiError = (err as AxiosError).response?.data;
      const { error } = apiError as IErrorResponse;
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl lg:text-3xl p-2 mb-9">Welcome back!</h1>
      <section className="w-full max-w-[320px] lg:max-w-[360px]">
        <h2 className="mb-7 lg:text-lg text-center text-gradient-lumina">Enter your email and password to continue.</h2>
        <form onSubmit={handleSubmit(submitForm)}>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
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
          </motion.div>
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
      </section>
    </div>
  );
};

export default Login;
