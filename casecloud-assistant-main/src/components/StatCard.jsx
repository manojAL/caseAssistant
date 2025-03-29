
import React from 'react';

const StatCard = ({ icon: Icon, title, value, trend, trendValue, loading }) => {
  const getTrendColor = () => {
    if (trend === 'up') return 'text-green-500';
    if (trend === 'down') return 'text-red-500';
    return 'text-gray-500';
  };

  const getTrendIcon = () => {
    if (trend === 'up') return '↑';
    if (trend === 'down') return '↓';
    return '-';
  };

  if (loading) {
    return (
      <div className="bg-white shadow-elegant rounded-xl p-6 animate-pulse">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-elegant rounded-xl p-6 transition-all hover:shadow-elegant-lg">
      <div className="flex items-center">
        <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
        {Icon && <Icon className="w-6 h-6" />}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
          {trendValue && (
            <p className={`text-xs ${getTrendColor()} flex items-center mt-1`}>
              <span>{getTrendIcon()}</span>
              <span className="ml-1">{trendValue} from last month</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
