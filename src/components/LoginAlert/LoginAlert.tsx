interface ILoginAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginAlert: React.FC<ILoginAlertProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="relative bg-white rounded-lg shadow-lg p-6 w-[360px]">
        <button
          onClick={onClose}
          className="absolute py-2 px-4 top-2 right-2 text-2xl text-gray-500 hover:text-gray-700 hover:cursor-pointer hover:bg-gray-100 rounded-full"
          aria-label="Close"
        >
          &times;
        </button>

        <h2 className="text-lg text-center text-sky-700 mb-6">Login Required</h2>
        <p className="text-center mb-6">Please login to use Lumina.</p>

        <div className="flex justify-center">
          <button
            onClick={() => alert("Login Alert!")}
            className="mb-2 py-3 px-8 rounded-full text-sm tracking-wide text-gray-50 bg-gray-900 hover:bg-gray-800 hover:cursor-pointer transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;
