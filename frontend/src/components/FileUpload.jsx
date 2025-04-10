import React, { useState } from 'react';
import axiosAPI from '../api/axiosApi';

const FileUpload = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setUploading(true);

    try {
      const res = await axiosAPI.post('/upload', formData);
      setMessage(res.data.message || 'File uploaded!');
      onUpload(); // trigger reload
    } catch (err) {
      setMessage('Upload failed');
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-indigo-600">Upload DXF File</h2>
      <form onSubmit={handleUpload} className="space-y-4">
      <input
  type="file"
  accept=".dxf,.dwg"
  onChange={(e) => setFile(e.target.files[0])}
  className="block w-full text-sm text-gray-500
             file:mr-4 file:py-2 file:px-4
             file:rounded-full file:border-0
             file:text-sm file:font-semibold
             file:bg-indigo-50 file:text-indigo-700
             hover:file:bg-indigo-100"
/>

        <button
          type="submit"
          disabled={uploading}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-200 disabled:opacity-50"
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </form>
      {message && (
        <p className="mt-3 text-sm text-center text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default FileUpload;
