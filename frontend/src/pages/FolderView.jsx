import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import ImageModal from "../components/ImageModal";

const FolderView = () => {
  const { folderId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [subFolders, setSubFolders] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showFolderModal, setShowFolderModal] = useState(false);
  const [folderName, setFolderName] = useState("");

  const [showImageModal, setShowImageModal] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // New loading states
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const foldersRes = await axios.get(`/folder/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSubFolders(foldersRes.data.folders || []);

        const imagesRes = await axios.get(`/image/folder/${folderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setImages(imagesRes.data.images || []);
      } catch (error) {
        console.error("Error fetching folder content:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [folderId]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const getDownloadUrl = (url, filename) => {
    try {
      const parts = url.split("/upload/");
      if (parts.length !== 2) return url;
      return `${parts[0]}/upload/fl_attachment:${filename}/${parts[1]}`;
    } catch {
      return url;
    }
  };

  const handleDownload = (url, name) => {
    const downloadUrl = getDownloadUrl(url, name);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    
    setIsCreatingFolder(true);
    try {
      await axios.post(
        "/folder/",
        {
          name: folderName,
          parent: folderId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setFolderName("");
      setShowFolderModal(false);

      // Refresh folders
      const foldersRes = await axios.get(`/folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubFolders(foldersRes.data.folders || []);
    } catch (err) {
      console.error("Error creating folder:", err);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  const handleUploadImage = async () => {
    if (!imageName.trim() || !imageFile) return;
    
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("name", imageName);
      formData.append("image", imageFile);

      await axios.post(`/image/upload/${folderId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setImageName("");
      setImageFile(null);
      setShowImageModal(false);

      // Refresh images
      const imagesRes = await axios.get(`/image/folder/${folderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setImages(imagesRes.data.images || []);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">📁 Folder View</h1>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setShowFolderModal(true)}
              disabled={isCreatingFolder}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ➕ Create Folder
            </button>
            <button
              onClick={() => setShowImageModal(true)}
              disabled={isUploadingImage}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              🖼️ Add Image
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-blue-300 hover:bg-blue-400 text-black rounded shadow-sm"
            >
              ← Go Back
            </button>
          </div>
        </div>

        {/* Global Loading Indicator */}
        {(isCreatingFolder || isUploadingImage) && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>
              {isCreatingFolder && "Creating folder..."}
              {isUploadingImage && "Uploading image..."}
            </span>
          </div>
        )}

        {loading ? (
          <div className="text-gray-600">Loading...</div>
        ) : (
          <>
            {/* Subfolders */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Subfolders
              </h2>
              {subFolders.length === 0 ? (
                <p className="text-gray-500 italic">No subfolders found.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {subFolders.map((folder) => (
                    <div
                      key={folder._id}
                      className="bg-white hover:bg-blue-50 p-4 rounded-lg shadow cursor-pointer transition-all border border-gray-200"
                      onClick={() => navigate(`/folder/${folder._id}`)}
                    >
                      <div className="text-3xl mb-2">📂</div>
                      <div className="text-sm font-medium text-gray-800 truncate">
                        {folder.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Images */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 mb-3">
                Images
              </h2>
              {images.length === 0 ? (
                <p className="text-gray-500 italic">
                  No images in this folder.
                </p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {images.map((img) => (
                    <div
                      key={img._id}
                      className="bg-white p-2 rounded-lg shadow border border-gray-200 hover:shadow-md transition-all"
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-32 object-cover rounded cursor-pointer"
                        onClick={() => handleImageClick(img)}
                      />
                      <div className="mt-2 flex justify-between items-center">
                        <p className="text-sm text-gray-700 truncate">
                          {img.name}
                        </p>
                        <button
                          className="text-blue-500 hover:text-blue-700 text-sm"
                          onClick={() => handleDownload(img.url, img.name)}
                        >
                          ⬇️ Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}

        {/* Image Preview Modal */}
        {selectedImage && (
          <ImageModal image={selectedImage} onClose={handleCloseModal} />
        )}

        {/* Create Folder Modal */}
        {showFolderModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Create New Folder</h2>
              <input
                type="text"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
                placeholder="Enter folder name"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isCreatingFolder}
              />
              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setShowFolderModal(false);
                    setFolderName("");
                  }}
                  disabled={isCreatingFolder}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={handleCreateFolder}
                  disabled={isCreatingFolder}
                >
                  {isCreatingFolder && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  {isCreatingFolder ? "Creating..." : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Upload Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
              <h2 className="text-lg font-semibold mb-4">Upload Image</h2>
              <input
                type="text"
                value={imageName}
                onChange={(e) => setImageName(e.target.value)}
                placeholder="Enter image name"
                className="w-full border border-gray-300 rounded px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                disabled={isUploadingImage}
              />
              <div className="mb-4">
                <label className={`inline-block bg-purple-600 text-white font-medium px-4 py-2 rounded cursor-pointer hover:bg-purple-700 transition ${isUploadingImage ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="hidden"
                    disabled={isUploadingImage}
                  />
                </label>
                {imageFile && (
                  <span className="ml-2 text-sm text-gray-600">{imageFile.name}</span>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => {
                    setShowImageModal(false);
                    setImageName("");
                    setImageFile(null);
                  }}
                  disabled={isUploadingImage}
                >
                  Cancel
                </button>
                <button
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  onClick={handleUploadImage}
                  disabled={isUploadingImage}
                >
                  {isUploadingImage && (
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  )}
                  {isUploadingImage ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FolderView;