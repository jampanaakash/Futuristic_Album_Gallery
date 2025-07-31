import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, LogOut, User, Camera } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import AlbumGraph from '../components/AlbumGraph';
import ImageModal from '../components/ImageModal';
import AddAlbumModal from '../components/AddAlbumModal';

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load albums from JSON file
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const response = await fetch('/albums.json');
        const data = await response.json();
        setAlbums(data.albums || []);
      } catch (error) {
        console.error('Failed to load albums:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAlbums();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const handleAlbumClick = (album) => {
    setSelectedAlbum(album);
    setIsImageModalOpen(true);
  };

  const handleAddAlbum = (newAlbum) => {
    setAlbums(prev => [...prev, newAlbum]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div
          className="flex items-center space-x-3 text-cyan-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xl">Loading gallery...</span>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 relative">
      {/* Header */}
      <motion.header
        className="absolute top-0 left-0 right-0 z-20 p-6"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-cyan-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Futuristic Gallery</h1>
              <p className="text-cyan-300 text-sm">
                {albums.length} albums in your collection
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* User info */}
            <div className="flex items-center space-x-2 px-4 py-2 bg-gray-800/50 backdrop-blur-md border border-cyan-500/30 rounded-lg">
              <User className="w-5 h-5 text-cyan-400" />
              <span className="text-white text-sm">
                {auth.currentUser?.displayName || auth.currentUser?.email}
              </span>
            </div>

            {/* Sign out button */}
            <button
              onClick={handleSignOut}
              className="p-3 bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-md border border-cyan-500/30 hover:border-red-500/50 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            >
              <LogOut className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <div className="pt-24 h-screen">
        {albums.length === 0 ? (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-24 h-24 bg-gradient-to-r from-cyan-600/20 to-purple-600/20 rounded-full flex items-center justify-center mb-6 border border-cyan-500/30">
              <Camera className="w-12 h-12 text-cyan-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">No Albums Yet</h2>
            <p className="text-gray-400 text-lg mb-8 max-w-md">
              Start building your futuristic photo collection by adding your first album.
            </p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-xl text-white font-semibold transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
            >
              <Plus className="w-6 h-6" />
              <span>Add Your First Album</span>
            </button>
          </motion.div>
        ) : (
          <AlbumGraph albums={albums} onAlbumClick={handleAlbumClick} />
        )}
      </div>

      {/* Floating add button */}
      {albums.length > 0 && (
        <motion.button
          onClick={() => setIsAddModalOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] z-30"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1 }}
        >
          <Plus className="w-8 h-8 text-white" />
        </motion.button>
      )}

      {/* Modals */}
      <ImageModal
        album={selectedAlbum}
        isOpen={isImageModalOpen}
        onClose={() => {
          setIsImageModalOpen(false);
          setSelectedAlbum(null);
        }}
      />
      
      <AddAlbumModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAlbum={handleAddAlbum}
      />
    </div>
  );
};

export default Home;