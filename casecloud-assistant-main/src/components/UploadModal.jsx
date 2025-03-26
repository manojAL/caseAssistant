import React, { useState } from 'react';
import { X, Upload as UploadIcon } from 'lucide-react';

const UploadModal = ({ isOpen, onClose, onUpload }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('GR');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      if (!title) {
        setTitle(selectedFile.name.replace(/\.[^/.]+$/, "")); // Set title to filename without extension
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('document', file);
    formData.append('title', title);
    formData.append('category', category);

    try {
      setIsUploading(true);
      await onUpload(formData);
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to upload document');
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Upload Document</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Document File</label>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <UploadIcon className="w-8 h-8 mb-3 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, XLSX (MAX. 10MB)
                  </p>
                </div>
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileChange}
                  accept=".pdf,.docx,.xlsx"
                />
              </label>
            </div>
            {file && (
              <p className="mt-2 text-sm text-gray-600">
                Selected: {file.name}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
            <input
              type="text"
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              className="w-full border border-gray-200 rounded-lg p-2 text-sm"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="GR">GR</option>
              <option value="Notification">Notification</option>
              <option value="Guidelines">Guidelines</option>
              <option value="Amendment">Amendment</option>
              <option value="Proposal">Proposal</option>
              <option value="Standards">Standards</option>
              <option value="Checklist">Checklist</option>
              <option value="Report">Report</option>
              <option value="Act">Act</option>
            </select>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
              disabled={isUploading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50"
              disabled={isUploading}
            >
              {isUploading ? 'Uploading...' : 'Upload Document'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;