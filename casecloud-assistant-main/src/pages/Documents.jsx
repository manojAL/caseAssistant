
import React, { useState, useEffect } from 'react';
import { 
  FileText, Filter, ChevronDown, Calendar, Download, Eye, 
  Upload, Search, FileSearch, Folder
} from 'lucide-react';
import SearchBar from '../components/SearchBar';
import UploadModal from '../components/UploadModal';
import DownloadButton from '../components/DownloadButton';
import EyeButton from '../components/EyeButton';
import axios from 'axios';
const Documents = () => {
  const [loading, setLoading] = useState(true);
  const [documents, setDocuments] = useState([]);
  const [filterOpen, setFilterOpen] = useState(false);
  const [view, setView] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [documentsPerPage] = useState(12);
  const [selectedType, setSelectedType] = useState('All Types');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedDate, setSelectedDate] = useState('All Time');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  useEffect(() => {
   // Fetch all documents on initial render
   fetchDocuments({ });
   }, []);
    const fetchDocuments = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/documents',{
          params: {
            type: selectedType,
            category: selectedCategory,
            date: selectedDate,
            page: currentPage,
            limit: 12,
          },
        }); // Replace with your API endpoint
        setDocuments(response.data);
        // Add this line
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false); // Ensure loading is false even on error
      }
    };
 
  // Get current documents
  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = documents.slice(indexOfFirstDocument, indexOfLastDocument);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(documents.length / documentsPerPage);
  
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleUpload = async (formData) => {
    try {
      const response = await axios.post('http://localhost:5000/api/documents/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Refresh the documents list
      fetchDocuments();
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to upload document');
    }
  };
  

  const getFileIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf':
        return (
          <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
            <FileText size={20} />
          </div>
        );
      case 'docx':
        return (
          <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
            <FileText size={20} />
          </div>
        );
      case 'xlsx':
        return (
          <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-500">
            <FileText size={20} />
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500">
            <FileText size={20} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Document Repository</h1>
            <p className="text-gray-500">Access legal documents, GRs, and case files</p>
          </div>
          <div className="mt-4 md:mt-0 flex gap-2">
            <button className="flex items-center px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 text-gray-600">
              <FileSearch className="w-4 h-4 mr-2" />
              <span>Advanced Search</span>
            </button>
            <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm hover:bg-blue-700" onClick={() => setIsUploadModalOpen(true)}>
              <Upload className="w-4 h-4 mr-2" />
              <span>Upload</span>
            </button>
            {isUploadModalOpen && (
            <UploadModal 
            isOpen={isUploadModalOpen}
            onClose={() => setIsUploadModalOpen(false)}
            onUpload={handleUpload}
            />
           )}

          </div>
        </div>

        <div className="mb-6">
          <SearchBar placeholder="Search for documents, GRs, legal files..." fullWidth />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-elegant p-5 flex items-center hover:shadow-elegant-lg transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 mr-4">
              <Folder size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">General Registers</h3>
              <p className="text-sm text-gray-500">214 files</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-elegant p-5 flex items-center hover:shadow-elegant-lg transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-600 mr-4">
              <Folder size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Labor Laws</h3>
              <p className="text-sm text-gray-500">189 files</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-elegant p-5 flex items-center hover:shadow-elegant-lg transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
              <Folder size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Case Files</h3>
              <p className="text-sm text-gray-500">426 files</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-elegant p-5 flex items-center hover:shadow-elegant-lg transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-xl bg-yellow-50 flex items-center justify-center text-yellow-600 mr-4">
              <Folder size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Templates</h3>
              <p className="text-sm text-gray-500">57 files</p>
            </div>
          </div>
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
            </div>
            
            <div className="flex gap-2">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option>All Types</option>
                  <option>PDF</option>
                  <option>DOCX</option>
                  <option>XLSX</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select 
                className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option>All Categories</option>
                  <option>GR</option>
                  <option>Notification</option>
                  <option>Guidelines</option>
                  <option>Amendment</option>
                  <option>Report</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Added</label>
                <select className="w-full border border-gray-200 rounded-lg p-2 text-sm"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                >
                  <option>All Time</option>
                  <option>Last 7 days</option>
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>This year</option>
                </select>
              </div>
              
              <div className="flex items-end">
                <button 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 w-full"
                onClick={() => fetchDocuments({ page: 1, limit: documentsPerPage })}// Reset to page 1 on filter
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
          
        <div className="p-6">
             {loading ? (
                view === 'grid' ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {Array.from({ length: 8 }).map((_, index) => (
                   <div key={`loading-${index}`} className="animate-pulse">
                   <div className="h-48 bg-gray-200 rounded-xl w-full"></div>
               </div>
          ))}
         </div>
          ) : (
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={`loading-list-${index}`} className="animate-pulse flex items-center">
              <div className="w-10 h-10 bg-gray-200 rounded-lg mr-4"></div>
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
              <div className="w-20 h-8 bg-gray-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      )
    ) : documents.length === 0 ? (
      <div key="noDocuments" className="text-center py-12">
        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-1">No documents found</h3>
        <p className="text-gray-500">Try adjusting your filters or search criteria</p>
      </div>
    ) : view === 'grid' ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {currentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-elegant transition-all cursor-pointer p-5"
          >
            <div className="flex items-center justify-between mb-4">
              {getFileIcon(doc.type)}
              <span className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full text-gray-600">
                {doc.type}
              </span>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-2">
              {doc.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{doc.category}</span>
              <span>{doc.date}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{doc.size}</span>
              <div className="flex gap-1">
              <EyeButton document={doc} />
              <DownloadButton document={doc} />
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="divide-y divide-gray-100">
        {currentDocuments.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center py-4 hover:bg-gray-50 px-4 rounded-lg cursor-pointer"
          >
            <div className="mr-4">
              {getFileIcon(doc.type)}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {doc.title}
              </h3>
              <div className="flex items-center text-xs text-gray-500 mt-1">
                <span className="inline-block px-2 py-0.5 bg-gray-100 rounded-full mr-2">
                  {doc.category}
                </span>
                <span>{doc.date}</span>
                <span className="mx-2">•</span>
                <span>{doc.size}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
            <EyeButton document={doc} iconSize={18} className="p-2" />
            <DownloadButton document={doc} iconSize={18} className="p-2" />
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
          
          <div className="px-6 py-4 border-t border-gray-100 flex justify-between items-center">
            <p className="text-sm text-gray-500">Showing {indexOfFirstDocument + 1}-{Math.min(indexOfLastDocument, documents.length)} of {documents.length} documents</p>
            <div className="flex gap-1">
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={currentPage === 1}
              onClick={handlePrevPage}>
                Previous
              </button>
              {pageNumbers.map((number) => (
            <button
              key={number}
              className={`px-3 py-1 border border-gray-200 rounded-md text-sm ${currentPage === number ? 'bg-blue-50 border-blue-200 text-blue-600 font-medium' : 'text-gray-500 hover:bg-gray-50'}`}
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          ))}
              <button className="px-3 py-1 border border-gray-200 rounded-md text-sm text-gray-500 hover:bg-gray-50"
              disabled={currentPage === totalPages}
              onClick={handleNextPage}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
