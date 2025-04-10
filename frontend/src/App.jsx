import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import BlockList from './components/BlockList';
import BlockDetails from './components/BlockDetails';

const App = () => {
  const [selectedBlockId, setSelectedBlockId] = useState(null);
  const [reload, setReload] = useState(false);

  const handleUpload = () => setReload(!reload);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">CAD File Block Viewer</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload */}
        <div className="bg-white rounded-lg shadow p-6">
          <FileUpload onUpload={handleUpload} />
        </div>

        {/* Block List */}
        <div className="bg-white rounded-lg shadow p-6">
          <BlockList onSelect={setSelectedBlockId} reload={reload} />
        </div>

        {/* Block Details */}
        <div className="bg-white rounded-lg shadow p-6">
          <BlockDetails blockId={selectedBlockId} />
        </div>
      </div>
    </div>
  );
};

export default App;
