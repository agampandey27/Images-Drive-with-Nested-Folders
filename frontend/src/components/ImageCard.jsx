import React from 'react';

const ImageCard = ({ image }) => (
  <div className="bg-white p-4 rounded shadow">
    <h2 className="text-md font-medium mb-2">🖼️ {image.name}</h2>
    <img src={image.url} alt={image.name} className="w-full h-48 object-cover rounded" />
  </div>
);

export default ImageCard;
