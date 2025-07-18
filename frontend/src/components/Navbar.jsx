import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from '../services/axiosInstance';
import { Menu, X } from 'lucide-react'; // Optional: if using Lucide icons

const Navbar = () => {
  const navigate = useNavigate();
  const { username, token, logout } = useAuth();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(`/image/search?query=${value}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSearchResults(res.data.image || []);
    } catch (err) {
      console.error('Search failed:', err);
      setSearchResults([]);
    }
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-purple-700 text-white px-4 py-3 flex justify-between items-center shadow-md relative">
        <button className="text-xl sm:text-2xl font-bold tracking-wide cursor-pointer" onClick={()=>{navigate('/dashboard')}}>Dobby Ads</button>

        {/* Hamburger Button (Mobile) */}
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 w-2/3 justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-md bg-[#fff] text-black focus:outline-none"
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.map((img) => (
                  <div
                    key={img._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black text-sm"
                    onClick={() => {
                      setSelectedImage(img);
                      setSearchResults([]);
                    }}
                  >
                    📷 {img.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex items-center gap-3 ml-auto">
    <span className="text-sm md:text-md font-medium">👤 {username || 'User'}</span>
    <button
      onClick={handleLogout}
      className="bg-white text-purple-700 hover:bg-gray-200 font-semibold px-4 py-1 rounded transition"
    >
      Logout
    </button>
  </div>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white text-black px-4 py-3 shadow-md space-y-3 z-50">
          <div className="relative">
            <input
              type="text"
              placeholder="Search images..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full px-4 py-2 rounded-md border"
            />
            {searchResults.length > 0 && (
              <div className="absolute mt-2 w-full bg-white rounded shadow-lg z-50 max-h-64 overflow-y-auto">
                {searchResults.map((img) => (
                  <div
                    key={img._id}
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    onClick={() => {
                      setSelectedImage(img);
                      setSearchResults([]);
                    }}
                  >
                    📷 {img.name}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="flex justify-between items-center">
            <span className="text-md font-medium">👤 {username || 'User'}</span>
            <button
              onClick={handleLogout}
              className="bg-purple-700 text-white px-4 py-1 rounded"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="bg-white p-4 rounded shadow-lg max-w-md w-full relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setSelectedImage(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-2">{selectedImage.name}</h2>
            <img
              src={selectedImage.url}
              alt={selectedImage.name}
              className="w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
