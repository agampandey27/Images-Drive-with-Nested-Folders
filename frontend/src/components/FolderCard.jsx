import React from 'react';

const FolderCard = ({ folder, onClick }) => (
  <div
    className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-50"
    onClick={onClick}
  >
    <h2 className="text-lg font-medium">📂 {folder.name}</h2>
  </div>
);

export default FolderCard;
