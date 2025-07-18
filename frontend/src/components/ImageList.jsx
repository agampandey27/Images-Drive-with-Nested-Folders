const ImageList = ({ images }) => {
  if (!images.length) return null;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-medium mb-2">Images</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="bg-white p-2 rounded shadow">
            <img src={img.url} alt={img.name} className="w-full h-40 object-cover rounded" />
            <p className="mt-1 text-sm text-center truncate">{img.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageList;
