import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Trash2 } from 'lucide-react';

const AddAlbumModal = ({ isOpen, onClose, onAddAlbum }) => {
  const [formData, setFormData] = useState({
    title: '',
    cover: '',
    images: ['']
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (index, value) => {
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData({
      ...formData,
      images: newImages
    });
  };

  const addImageField = () => {
    setFormData({
      ...formData,
      images: [...formData.images, '']
    });
  };

  const removeImageField = (index) => {
    if (formData.images.length > 1) {
      const newImages = formData.images.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        images: newImages
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.cover.trim()) {
      alert('Please fill in the title and cover image URL');
      return;
    }

    const validImages = formData.images.filter(img => img.trim() !== '');
    if (validImages.length === 0) {
      alert('Please add at least one image URL');
      return;
    }

    const newAlbum = {
      id: formData.title.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
      title: formData.title,
      cover: formData.cover,
      images: validImages
    };

    onAddAlbum(newAlbum);
    
    // Reset form
    setFormData({
      title: '',
      cover: '',
      images: ['']
    });
    
    onClose();
  };

  const handleClose = () => {
    setFormData({
      title: '',
      cover: '',
      images: ['']
    });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          
          {/* Modal content */}
          <motion.div
            className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-900/90 backdrop-blur-md border border-cyan-500/50 rounded-xl p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Add New Album</h2>
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 border border-cyan-500/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-[0_0_10px_rgba(6,182,212,0.5)]"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Album Title */}
              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-2">
                  Album Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                  placeholder="Enter album title..."
                  required
                />
              </div>

              {/* Cover Image URL */}
              <div>
                <label className="block text-cyan-300 text-sm font-medium mb-2">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  name="cover"
                  value={formData.cover}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                  placeholder="https://drive.google.com/uc?export=view&id=..."
                  required
                />
              </div>

              {/* Image URLs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-cyan-300 text-sm font-medium">
                    Image URLs
                  </label>
                  <button
                    type="button"
                    onClick={addImageField}
                    className="flex items-center space-x-1 px-3 py-1 bg-cyan-600/20 hover:bg-cyan-600/30 border border-cyan-500/50 rounded-md text-cyan-300 text-sm transition-all duration-300"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Image</span>
                  </button>
                </div>
                
                <div className="space-y-3">
                  {formData.images.map((image, index) => (
                    <div key={index} className="flex space-x-2">
                      <input
                        type="url"
                        value={image}
                        onChange={(e) => handleImageChange(index, e.target.value)}
                        className="flex-1 px-4 py-3 bg-gray-800/50 border border-cyan-500/30 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none focus:shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-300"
                        placeholder="https://drive.google.com/uc?export=view&id=..."
                      />
                      {formData.images.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeImageField(index)}
                          className="p-3 bg-red-600/20 hover:bg-red-600/30 border border-red-500/50 rounded-lg text-red-400 transition-all duration-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-6 py-3 bg-gray-700/50 hover:bg-gray-600/50 border border-gray-500/50 rounded-lg text-gray-300 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-500 hover:to-purple-500 rounded-lg text-white font-medium transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
                >
                  Add Album
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddAlbumModal;