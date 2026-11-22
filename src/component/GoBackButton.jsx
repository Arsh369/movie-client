import { ArrowLeft } from "lucide-react";

const GoBackButton = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <button
      onClick={handleGoBack}
      className="flex items-center mb-4 gap-2 px-4 py-2 
      bg-gray-900 text-white rounded-lg
      hover:bg-gray-700 transition-all duration-200
      active:scale-95"
    >
      <ArrowLeft size={18} />
      <span>Go Back</span>
    </button>
  );
};

export default GoBackButton;