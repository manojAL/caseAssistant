
import React, { useState, useEffect } from 'react';
import { BarChart3, FileText, Briefcase, Clock, AlertTriangle, RefreshCw } from 'lucide-react';
import * as icons from 'lucide-react';

import StatCard from '../components/StatCard';
import CaseCard from '../components/CaseCard';
import SearchBar from '../components/SearchBar';
import api from '../config/axios'; // Import the configured axios instance

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [recentCases, setRecentCases] = useState([]);
  const [stats, setStats] = useState([]);
  const [caseDistribution, setCaseDistribution] = useState({
    total: 0,
    activeCases: 0,
    closedCases: 0,
    pendingReview: 0
  });
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [statsRes, recentCasesRes, distributionRes] = await Promise.all([
        api.get('/dashboard/stats'),
        api.get('/dashboard/recent-cases'),
        api.get('/dashboard/case-distribution')
      ]);
      const statsWithIcons = statsRes.data.stats?.map(stat => ({
        ...stat,
        icon: icons[stat.icon] || icons.AlertTriangle // Fallback icon
      })) || [];
      setStats(statsWithIcons);
      setRecentCases(recentCasesRes.data.cases || []);
      setCaseDistribution(distributionRes.data || {
        total: 0,
        activeCases: 0,
        closedCases: 0,
        pendingReview: 0
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      // Fallback to mock data if API fails
      setStats([
        { 
          title: 'Active Cases', 
          value: activeCases.toString(), 
          trend: 'up', 
          trendValue: '+12%', 
          icon: icons.Briefcase 
        },
        { 
          title: 'Total Documents', 
          value: totalDocuments.toString(), 
          trend: 'up', 
          trendValue: '+8%', 
          icon: icons.FileText
        },
        { 
          title: 'Pending Actions', 
          value: pendingActions.toString(), 
          trend: 'down', 
          trendValue: '-6%', 
          icon: icons.Clock 
        },
        { 
          title: 'High Priority', 
          value: highPriority.toString(), 
          trend: 'up', 
          trendValue: '+0%', 
          icon: icons.AlertTriangle
        },
      ]);
      
      setRecentCases([]);
      
      setCaseDistribution({
        total: 0,
        activeCases: 0,
        closedCases: 0,
        pendingReview:0
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Calculate stroke dash offsets for the pie chart
  const calculateDashOffsets = () => {
    const totalCircumference = 251.2; // 2 * π * r (where r=40)
    const activeOffset = totalCircumference - (totalCircumference * caseDistribution.activeCases / caseDistribution.total);
    const closedOffset = activeOffset - (totalCircumference * caseDistribution.closedCases / caseDistribution.total);
    
    return {
      activeOffset,
      closedOffset
    };
  };

  const { activeOffset, closedOffset } = calculateDashOffsets();


  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500">Welcome back, here's what's happening today.</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-600 mr-2">
              <RefreshCw className="w-4 h-4 mr-2" />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        <div className="mb-8">
          <SearchBar placeholder="Search cases, documents, or legal records..." fullWidth onSearch={(query) => console.log(query)} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              title={stat.title}
              value={stat.value}
              trend={stat.trend}
              trendValue={stat.trendValue}
              loading={loading}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-elegant p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Case Activity</h2>
                <select className="border border-gray-200 rounded-md text-sm py-1.5 px-3">
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                </select>
              </div>
              <div className="h-64 w-full">
                <div className="flex h-full items-end justify-between px-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex flex-col items-center">
                      <div 
                        className="w-10 bg-blue-600 rounded-t-md transition-all hover:bg-blue-700"
                        style={{ 
                          height: `${Math.floor(Math.random() * 150) + 30}px`,
                          opacity: 0.7 + (i * 0.05)
                        }}
                      ></div>
                      <div className="text-xs text-gray-500 mt-2">{day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-elegant p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Cases</h2>
                <a href="/cases" className="text-sm text-blue-600 hover:text-blue-700">View all</a>
              </div>
              
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="animate-pulse">
                      <div className="h-28 bg-gray-200 rounded-xl w-full"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {recentCases.map((caseItem) => (
                    <CaseCard 
                      key={caseItem.id}
                      caseNumber={caseItem.caseNumber}
                      title={caseItem.title}
                      status={caseItem.status}
                      date={caseItem.date}
                      dueDate={caseItem.dueDate}
                      priority={caseItem.priority}
                      category={caseItem.category}
                      onClick={() => console.log('Case clicked:', caseItem.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-elegant p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Case Distribution</h2>
              </div>
              <div className="aspect-square relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-sm">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{caseDistribution.total}</div>
                      <div className="text-xs text-gray-500">Total</div>
                    </div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="12" />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="50" 
                    transform="rotate(-90 50 50)" 
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#10b981" 
                    strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="188.4" 
                    transform="rotate(-90 50 50)" 
                    className="animate-delay-200"
                  />
                  <circle 
                    cx="50" cy="50" r="40" 
                    fill="none" 
                    stroke="#f59e0b" 
                    strokeWidth="12" 
                    strokeDasharray="251.2" 
                    strokeDashoffset="213.52" 
                    transform="rotate(-90 50 50)" 
                    className="animate-delay-300"
                  />
                </svg>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Active Cases</span>
                  </div>
                  <span className="text-sm font-medium"> {caseDistribution.activeCases} ({Math.round((caseDistribution.activeCases / caseDistribution.total) * 100)}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Closed Cases</span>
                  </div>
                  <span className="text-sm font-medium"> {caseDistribution.closedCases} ({Math.round((caseDistribution.closedCases / caseDistribution.total) * 100)}%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <span className="text-sm text-gray-700">Pending Review</span>
                  </div>
                  <span className="text-sm font-medium">{caseDistribution.pendingReview} ({Math.round((caseDistribution.pendingReview / caseDistribution.total) * 100)}%)</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-elegant p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
              </div>
              <div className="space-y-6">
                {loading ? (
                  [1, 2, 3, 4].map((item) => (
                    <div key={item} className="flex animate-pulse">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New document uploaded</p>
                        <p className="text-xs text-gray-500">LC-2023-001 - Labor Agreement Draft</p>
                        <p className="text-xs text-gray-500 mt-1">35 minutes ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                        <Briefcase className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Case status updated</p>
                        <p className="text-xs text-gray-500">LC-2023-002 - Moved to Pending</p>
                        <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center mr-3">
                        <BarChart3 className="w-5 h-5 text-yellow-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Monthly report generated</p>
                        <p className="text-xs text-gray-500">August 2023 Case Summary</p>
                        <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                        <AlertTriangle className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">New high priority case</p>
                        <p className="text-xs text-gray-500">LC-2023-003 - Safety Standards</p>
                        <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                      </div>
                    </div>
                  </>
                )}
              </div>
              
              <button className="w-full mt-6 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-lg hover:bg-gray-100">
                View All Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
