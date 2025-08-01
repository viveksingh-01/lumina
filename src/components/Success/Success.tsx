import Lottie from "lottie-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import successAnimation from "../../animations/success-check.json";
import { UserContext } from "../../context/UserContext";

const Success: React.FC = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const { user } = userContext;
  const [firstName] = user?.name.split(" ");

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="p-5 mt-12 flex flex-col items-center text-center">
      <div className="p-4 max-w-md w-full">
        <section className="h-[240px]">
          <Lottie animationData={successAnimation} loop={false} />
        </section>
        <h1 className="text-3xl font-semibold mb-8 text-gradient-lumina">Welcome aboard, {firstName}!</h1>
        <h3 className="text-gray-600 text-lg mb-6">Your account has been created. Let’s get started!</h3>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button
            onClick={handleClick}
            className="w-full flex items-center justify-center p-4 rounded-full bg-gray-900 text-white tracking-wide hover:cursor-pointer hover:bg-gray-800 transition-colors"
          >
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
