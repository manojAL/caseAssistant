import React from 'react';
import { Clock, AlertTriangle, Check, HelpCircle } from 'lucide-react';

const statusIcons = {
  Open: <HelpCircle className="w-4 h-4 text-blue-500" />,
  Pending: <Clock className="w-4 h-4 text-yellow-500" />,
  Closed: <Check className="w-4 h-4 text-green-500" />,
  Urgent: <AlertTriangle className="w-4 h-4 text-red-500" />
};

const priorityColors = {
  High: 'bg-red-100 text-red-800',
  Medium: 'bg-yellow-100 text-yellow-800',
  Low: 'bg-green-100 text-green-800'
};

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
  return (
    <div 
      className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-elegant transition-all cursor-pointer p-5"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
            {caseNumber}
          </span>
        </div>
        <div className="flex items-center gap-1">
          {statusIcons[status]}
          <span className="text-xs font-medium">{status}</span>
        </div>
      </div>
      
      <h3 className="text-base font-semibold text-gray-900 mb-3 line-clamp-2">
        {title}
      </h3>
      
      <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
        <span>Filed: {date}</span>
        {dueDate && (
          <span className="flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            Due: {dueDate}
          </span>
        )}
      </div>
      
      <div className="flex items-center justify-between">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority} Priority
        </span>
        <span className="text-xs text-gray-500">{category}</span>
      </div>
    </div>
  );
};

export default CaseCard;