import React, { useState, useEffect } from 'react';
import { Briefcase,
  MoreVertical, ChevronDown, Filter, Calendar, Clock, 
  SortAsc, ArrowDownUp, Download, Printer, Plus
} from 'lucide-react';
import CaseCard from '../components/CaseCard';
import SearchBar from '../components/SearchBar';
import NewCaseModal from '../components/NewCaseModal';
import axios from 'axios';

const Cases = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState('grid');
  const [isNewCaseModalOpen, setIsNewCaseModalOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: 'All Statuses',
    priority: 'All Priorities',
    category: 'All Categories',
    startDate: '',
    endDate: '',
    sortBy: 'dateFiled',
    sortOrder: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalCases: 0
  });

  const fetchCases = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/cases', {
        params: {
          ...filters,
          page: pagination.currentPage,
          limit: 10
        }
      });
      setCases(response.data.cases);
      setPagination({
        currentPage: response.data.currentPage,
        totalPages: response.data.totalPages,
        totalCases: response.data.totalCases
      });
    } catch (error) {
      console.error('Error fetching cases:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCases();
  }, [filters, pagination.currentPage]);

  const handleCreateCase = async (newCaseData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/cases', {
        title: newCaseData.title,
        description: newCaseData.description,
        status: newCaseData.status,
        priority: newCaseData.priority,
        category: newCaseData.category,
        dueDate: newCaseData.dueDate
      });
      
      // Refresh the cases list
      await fetchCases();
      setIsNewCaseModalOpen(false);
      
      return response.data;
    } catch (error) {
      console.error('Error creating case:', error);
      throw new Error(error.response?.data?.message || 'Failed to create case');
    }
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSearch = (searchTerm) => {
    handleFilterChange('search', searchTerm);
  };

  const handlePageChange = (page) => {
    setPagination(prev => ({ ...prev, currentPage: page }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Case Management</h1>
            <p className="text-gray-500">View, filter, and manage all legal cases</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700"
              onClick={() => setIsNewCaseModalOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              <span>New Case</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <SearchBar 
            placeholder="Search by case number, title, or category..." 
            fullWidth 
            onSearch={handleSearch}
          />
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
              
              <div className="relative">
                <button className="flex items-center gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <SortAsc className="w-4 h-4" />
                  <span>Sort: {filters.sortBy === 'dateFiled' ? 'Date Filed' : 'Due Date'}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900">
                <Printer className="w-4 h-4" />
                <span className="hidden sm:inline">Print</span>
              </button>
              
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button 
                  onClick={() => setView('grid')}
                  className={`px-3 py-2 ${view === 'grid' ? 'bg-gray-100' : 'bg-white'}`}
                >
                  {/* Grid icon */}
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`px-3 py-2 ${view === 'list' ? 'bg-gray-100' : 'bg-white'}`}
                >
                  {/* List icon */}
                </button>
              </div>
            </div>
          </div>
          
          {filterOpen && (
            <div className="p-4 border-b border-gray-100 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select 
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option>All Statuses</option>
                  <option>Open</option>
                  <option>Pending</option>
                  <option>Closed</option>
                  <option>Urgent</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select 
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                  value={filters.priority}
                  onChange={(e) => handleFilterChange('priority', e.target.value)}
                >
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                  className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                  value={filters.category}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                >
                  <option>All Categories</option>
                  <option>Labor Dispute</option>
                  <option>Wage Dispute</option>
                  <option>Safety Standards</option>
                  <option>Benefits</option>
                  <option>Compensation</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full"
                  onClick={() => setFilterOpen(false)}
                >
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
                <h3 className="text-lg font-medium text-gray-900 mb-1">{loading ? 'Loading cases...' : 'No cases found'}</h3>
                <p className="text-gray-500">
      {loading ? (
        'Please wait while we load cases'
      ) : (
        <>
          No cases match your current filters.
          <button 
            className="ml-1 text-blue-600 hover:text-blue-800"
            onClick={() => {
              // Reset all filters
              setFilters({
                status: 'All Statuses',
                priority: 'All Priorities',
                category: 'All Categories',
                startDate: '',
                endDate: '',
                sortBy: 'dateFiled',
                sortOrder: 'desc'
              });
              setPagination(prev => ({ ...prev, currentPage: 1 }));
            }}
          >
            Clear filters
          </button>
        </>
      )}
    </p>
              </div>
            ) : (
              <div className={`grid grid-cols-1 ${view === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : ''} gap-6`}>
                {cases.map((caseItem) => (
                  <CaseCard 
                    key={caseItem._id}
                    caseNumber={caseItem.caseNumber}
                    title={caseItem.title}
                    status={caseItem.status}
                    date={new Date(caseItem.dateFiled).toLocaleDateString()}
                    dueDate={caseItem.dueDate ? new Date(caseItem.dueDate).toLocaleDateString() : null}
                    priority={caseItem.priority}
                    category={caseItem.category}
                    onClick={() => console.log('Case clicked:', caseItem._id)}
                  />
                ))}
              </div>
            )}
          </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">
              Showing {(pagination.currentPage - 1) * 10 + 1}-{Math.min(pagination.currentPage * 10, pagination.totalCases)} of {pagination.totalCases} cases
            </p>
            <div className="flex gap-1">
              <button 
                className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
                disabled={pagination.currentPage === 1}
                onClick={() => handlePageChange(pagination.currentPage - 1)}
              >
                Previous
              </button>
              {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    className={`px-3 py-1 border rounded-md text-sm ${
                      pagination.currentPage === pageNum 
                        ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' 
                        : 'border-gray-200 text-gray-500 hover:bg-gray-50'
                    }`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}
              <button 
                className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={pagination.currentPage === pagination.totalPages}
                onClick={() => handlePageChange(pagination.currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      <NewCaseModal 
        isOpen={isNewCaseModalOpen}
        onClose={() => setIsNewCaseModalOpen(false)}
        onCreate={handleCreateCase}
      />
    </div>
  );
};

export default Cases;