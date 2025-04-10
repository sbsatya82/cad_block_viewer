import React, { useEffect, useState } from 'react';
import axiosAPI from '../api/axiosApi';

const BlockDetails = ({ blockId }) => {
  const [block, setBlock] = useState(null);

  useEffect(() => {
    if (!blockId) return;

    axiosAPI.get(`/blocks/${blockId}`)
      .then((res) => setBlock(res.data))
      .catch((err) => console.error('Error fetching block details:', err));
  }, [blockId]);

  if (!block) {
    return (
      <div className="p-4 bg-white shadow rounded text-gray-500">
        Select a block to view its details.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-indigo-600 mb-4">Block Details</h2>
{!block ? (
  <p className="text-gray-500">Select a block to view its details.</p>
) : (
  <div className="space-y-2">
    <p><strong>Name:</strong> {block.name}</p>
    <p><strong>Type:</strong> {block.type}</p>
    <p><strong>Coordinates:</strong> ({block.x}, {block.y})</p>
  </div>
)}

    </div>
  );
};

export default BlockDetails;
