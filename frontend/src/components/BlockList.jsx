import React, { useEffect, useState } from 'react';
import axiosAPI from '../api/axiosApi';

const BlockList = ({ onSelect }) => {
  const [blocks, setBlocks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBlocks = async () => {
    try {
      const res = await axiosAPI.get('/blocks', { params: { search } });
      console.log(res.data);
      setBlocks(res.data.blocks || []);
    } catch (err) {
      console.error('Error fetching blocks:', err);
    }
  };

  useEffect(() => {
    fetchBlocks();
  }, [search]);

  return (
    <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
      <h2 className="text-xl font-semibold text-green-600 mb-4">Blocks</h2>
<input
  type="text"
  placeholder="Search blocks..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  className="w-full px-4 py-2 mb-4 border rounded shadow-sm focus:ring focus:outline-none"
/>
<ul className="space-y-2 max-h-60 overflow-auto">
  {blocks.length > 0 ? (
    blocks.map((block) => (
      <li
        key={block.id}
        onClick={() => onSelect(block.id)}
        className="cursor-pointer p-3 rounded-md border hover:bg-gray-100 transition"
      >
        <strong>{block.name}</strong> <span className="text-sm text-gray-500">({block.type})</span>
      </li>
    ))
  ) : (
    <li className="text-gray-400">No blocks found</li>
  )}
</ul>

    </div>
  );
};

export default BlockList;
