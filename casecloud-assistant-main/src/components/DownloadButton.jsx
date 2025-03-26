import { Download } from 'lucide-react';

const DownloadButton = ({ 
  document, 
  iconSize = 16, 
  className = 'p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-50',
  baseUrl = 'http://localhost:5000'
}) => {
  const handleDownload = () => {
    const filename = document.location.split('/').pop();
    const link = document.createElement('a');
    link.href = `${baseUrl}${document.location}`;
    link.download = filename || document.title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button 
      className={className}
      onClick={handleDownload}
      aria-label="Download document"
    >
      <Download size={iconSize} />
    </button>
  );
};

export default DownloadButton;