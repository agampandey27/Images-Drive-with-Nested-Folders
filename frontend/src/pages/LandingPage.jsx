import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-10 flex flex-col items-center text-center">
        <h1 className="text-4xl font-extrabold text-blue-600 mb-4 tracking-tight">Welcome to Dobby Ads drive🚀</h1>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          A secure and intuitive web app where users can create nested folders (just like Google Drive),
          upload and manage images, and search them by name — all while keeping everything private and personal.
        </p>

        <ul className="text-gray-700 text-left list-disc pl-6 mb-8">
          <li>🗂️ Create Nested Folders</li>
          <li>🖼️ Upload Images with Name</li>
          <li>🔐 Authenticated & User-Specific Access</li>
          <li>🔎 Search Images By Name</li>
        </ul>

        <div className="flex gap-4">
          <Link to="/signup">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-lg transition duration-300">
              Get Started
            </button>
          </Link>
          <Link to="/login">
            <button className="bg-gray-100 hover:bg-gray-200 text-blue-600 px-6 py-2 rounded-lg text-lg transition duration-300 border border-blue-600">
              Login
            </button>
          </Link>
        </div>

        <p className="text-sm text-gray-400 mt-6">Built with ❤️ using React, NodeJS & MongoDB</p>
      </div>
    </div>
  );
};

export default LandingPage;