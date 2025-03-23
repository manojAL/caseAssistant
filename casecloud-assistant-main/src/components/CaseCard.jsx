
import React from 'react';
import { Clock, Calendar, MoreVertical, AlertCircle, CheckCircle } from 'lucide-react';

const CaseCard = ({ 
  caseNumber,
  title,
  status,
  date,
  dueDate,
  priority,
  category,
  onClick
}) => {
  const getStatusColor = () => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-blue-50 text-blue-600';
      case 'closed':
        return 'bg-gray-50 text-gray-600';
      case 'pending':
        return 'bg-yellow-50 text-yellow-600';
      case 'urgent':
        return 'bg-red-50 text-red-600';
      default:
        return 'bg-gray-50 text-gray-600';
    }
  };

  const getPriorityIcon = () => {
    switch (priority.toLowerCase()) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-elegant hover:shadow-elegant-lg transition-all cursor-pointer p-5"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <span className="text-xs font-medium text-gray-500">Case #{caseNumber}</span>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {status}
          </span>
          <button className="mt-1 text-gray-400 hover:text-gray-600">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-3">
        <span className="px-2.5 py-1 bg-gray-50 rounded-md text-xs font-medium text-gray-600">
          {category}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center">
          <Calendar className="w-4 h-4 mr-1" />
          <span>{date}</span>
        </div>
        
        <div className="flex items-center">
          {getPriorityIcon()}
          <span className="ml-1">{priority}</span>
        </div>

        {dueDate && (
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Due: {dueDate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CaseCard;
