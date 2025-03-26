import { Eye } from 'lucide-react';

const EyeButton = ({ 
  document, 
  iconSize = 16, 
  className = 'p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50',
  baseUrl = 'http://localhost:5000'
}) => {
  const handleView = () => {
    window.open(`${baseUrl}${document.location}`, '_blank');
  };

  return (
    <button 
      className={className}
      onClick={handleView}
      aria-label="View document"
    >
      <Eye size={iconSize} />
    </button>
  );
};

export default EyeButton;