type SubmitButtonProps = {
  label: string;
  isSubmitting: boolean;
  processingText?: string;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ label, isSubmitting, processingText = "Submitting..." }) => {
  return (
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
          {processingText}
        </>
      ) : (
        label
      )}
    </button>
  );
};

export default SubmitButton;
