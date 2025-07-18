import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../services/axiosInstance";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [rootFolders, setRootFolders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  
  // Loading states
  const [loading, setLoading] = useState(true);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);

  const fetchRootFolders = async () => {
    try {
      const res = await axios.get("/folder/root", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRootFolders(res.data.folders || []);
    } catch (err) {
      console.error("Error fetching root folders", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetchRootFolders();
    }
  }, [token]);

  const handleCreateFolder = async () => {
    if (!folderName.trim()) return;
    
    setIsCreatingFolder(true);
    try {
      await axios.post(
        "/folder/",
        { name: folderName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setShowModal(false);
      setFolderName("");
      
      // Refresh the folders without showing main loading
      const res = await axios.get("/folder/root", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRootFolders(res.data.folders || []);
    } catch (err) {
      console.error("Error creating folder", err);
    } finally {
      setIsCreatingFolder(false);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">📁 Your Folders</h1>
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setShowModal(true)}
            disabled={isCreatingFolder}
          >
            ➕ Create Folder
          </button>
        </div>

        {/* Global Loading Indicator */}
        {isCreatingFolder && (
          <div className="fixed top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            <span>Creating folder...</span>
          </div>
        )}

        {/* Main Content Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <span className="text-lg text-gray-600">Loading folders...</span>
            </div>
          </div>
        ) : (
          <>
            {rootFolders.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">📁</div>
                <p className="text-gray-600 text-lg">No folders found. Start by creating one!</p>
              </div>
            ) : (
              <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {rootFolders.map((folder) => (
                  <div
                    key={folder._id}
                    className="bg-white shadow-md rounded-xl p-5 cursor-pointer hover:scale-105 transition-all border border-gray-200"
                    onClick={() => navigate(`/folder/${folder._id}`)}
                  >
                    <h2 className="text-xl font-semibold text-blue-600">
                      📁 {folder.name}
                    </h2>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal for Creating Folder */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">
              Create New Folder
            </h2>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isCreatingFolder}
            />
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  setShowModal(false);
                  setFolderName("");
                }}
                disabled={isCreatingFolder}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
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
    </div>
  );
};

export default Dashboard;