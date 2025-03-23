
import React, { useState, useEffect } from 'react';
import { 
  MoreVertical, ChevronDown, Filter, Calendar, Clock, 
  SortAsc, ArrowDownUp, Download, Printer, Plus
} from 'lucide-react';
import CaseCard from '../components/CaseCard';
import SearchBar from '../components/SearchBar';

const Cases = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState('grid');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCases([
        {
          id: 1,
          caseNumber: 'LC-2023-001',
          title: 'Gujarat Textile Workers Union vs. State Labor Department',
          status: 'Open',
          date: 'Aug 10, 2023',
          dueDate: 'Oct 15, 2023',
          priority: 'High',
          category: 'Labor Dispute'
        },
        {
          id: 2,
          caseNumber: 'LC-2023-002',
          title: 'Minimum Wage Implementation in Private Manufacturing Sector',
          status: 'Pending',
          date: 'Aug 15, 2023',
          dueDate: 'Sep 30, 2023',
          priority: 'Medium',
          category: 'Wage Dispute'
        },
        {
          id: 3,
          caseNumber: 'LC-2023-003',
          title: 'Workplace Safety Standards in Chemical Industries',
          status: 'Urgent',
          date: 'Aug 22, 2023',
          dueDate: 'Sep 5, 2023',
          priority: 'High',
          category: 'Safety Standards'
        },
        {
          id: 4,
          caseNumber: 'LC-2023-004',
          title: 'Maternity Benefit Extension for Contract Workers',
          status: 'Open',
          date: 'Aug 28, 2023',
          dueDate: 'Oct 20, 2023',
          priority: 'Medium',
          category: 'Benefits'
        },
        {
          id: 5,
          caseNumber: 'LC-2023-005',
          title: 'Industrial Dispute Resolution - Ahmedabad Manufacturing Plant',
          status: 'Closed',
          date: 'Jul 5, 2023',
          dueDate: null,
          priority: 'Low',
          category: 'Industrial Dispute'
        },
        {
          id: 6,
          caseNumber: 'LC-2023-006',
          title: 'Overtime Pay Calculation Guidelines for IT Sector',
          status: 'Open',
          date: 'Aug 30, 2023',
          dueDate: 'Nov 10, 2023',
          priority: 'Medium',
          category: 'Wage Dispute'
        },
        {
          id: 7,
          caseNumber: 'LC-2023-007',
          title: 'Employee Compensation for Work-Related Injuries',
          status: 'Pending',
          date: 'Sep 2, 2023',
          dueDate: 'Oct 30, 2023',
          priority: 'High',
          category: 'Compensation'
        },
        {
          id: 8,
          caseNumber: 'LC-2023-008',
          title: 'Remote Work Policy Implementation for Government Departments',
          status: 'Open',
          date: 'Sep 5, 2023',
          dueDate: 'Nov 20, 2023',
          priority: 'Medium',
          category: 'Work Policy'
        },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
            <p className="text-gray-500">View, filter, and manage all legal cases</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              <span>New Case</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <SearchBar placeholder="Search by case number, title, or category..." fullWidth />
        </div>

        <div className="bg-white rounded-xl shadow-elegant mb-6">
          <div className="px-6 py-4 border-b border-gray-100 flex flex-col md:flex-row md:items-center gap-4 justify-between">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setFilterOpen(!filterOpen)}
                className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SortAsc className="w-4 h-4" />
                <span>Sort</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Export</span>
              </button>
              
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button 
                  onClick={() => setView('grid')}
                  className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="3" width="7" height="7" rx="1" fill={view === 'grid' ? "#4B5563" : "#9CA3AF"} />
                    <rect x="14" y="3" width="7" height="7" rx="1" fill={view === 'grid' ? "#4B5563" : "#9CA3AF"} />
                    <rect x="3" y="14" width="7" height="7" rx="1" fill={view === 'grid' ? "#4B5563" : "#9CA3AF"} />
                    <rect x="14" y="14" width="7" height="7" rx="1" fill={view === 'grid' ? "#4B5563" : "#9CA3AF"} />
                  </svg>
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="3" y="4" width="18" height="2" rx="1" fill={view === 'list' ? "#4B5563" : "#9CA3AF"} />
                    <rect x="3" y="11" width="18" height="2" rx="1" fill={view === 'list' ? "#4B5563" : "#9CA3AF"} />
                    <rect x="3" y="18" width="18" height="2" rx="1" fill={view === 'list' ? "#4B5563" : "#9CA3AF"} />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {filterOpen && (
            <div className="p-4 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                  <option>All Statuses</option>
                  <option>Open</option>
                  <option>Pending</option>
                  <option>Closed</option>
                  <option>Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm">
                  <option>All Categories</option>
                  <option>Labor Dispute</option>
                  <option>Wage Dispute</option>
                  <option>Safety Standards</option>
                  <option>Benefits</option>
                  <option>Compensation</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full">
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
          <div className="p-6">
            {loading ? (
              <div className={`grid grid-cols-1 ${view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
                  </div>
                ))}
              </div>
            ) : cases.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No cases found</h3>
                <p className="text-gray-500">Try adjusting your filters or search criteria</p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
                {cases.map((caseItem) => (
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
          
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing 1-8 of 128 cases</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                Previous
              </button>
              <button className="px-3 py-1 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-600 font-medium">
                1
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cases;
