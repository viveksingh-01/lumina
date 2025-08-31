interface ILoginAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginAlert: React.FC<ILoginAlertProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Login Required</h2>
        <p className="text-center mb-4">Please login to use Lumina.</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => alert("Login Alert!")}
            className="bg-sky-600 text-white px-4 py-2 rounded-md hover:bg-sky-700 transition"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginAlert;
