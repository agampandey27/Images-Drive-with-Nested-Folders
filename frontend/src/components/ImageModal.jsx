import React from 'react';

const ImageModal = ({ image, onClose }) => {
  if (!image) return null;

  const getDownloadUrl = (url, filename) => {
  try {
    const parts = url.split('/upload/');
    if (parts.length !== 2) return url;
    return `${parts[0]}/upload/fl_attachment:${filename}/${parts[1]}`;
  } catch {
    return url;
  }
};


  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-white rounded-lg p-4 max-w-xl w-full shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-lg"
        >
          ✖
        </button>

        <h2 className="text-xl font-semibold mb-3">{image.name}</h2>

        <img
          src={image.url}
          alt={image.name}
          className="w-full max-h-[70vh] object-contain rounded mb-4"
        />

        <div className="flex justify-end">
          <a
            href={getDownloadUrl(image.url, image.name)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            ⬇️ Download
          </a>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
