const FolderList = ({ folders, onFolderClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
      {folders.map((folder) => (
        <div
          key={folder._id}
          onClick={() => onFolderClick(folder._id)}
          className="bg-white p-4 rounded shadow cursor-pointer hover:bg-blue-100"
        >
          📂 {folder.name}
        </div>
      ))}
    </div>
  );
};

export default FolderList;
