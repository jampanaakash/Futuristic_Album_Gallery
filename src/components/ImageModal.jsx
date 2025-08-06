import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

const ImageModal = ({ album, isOpen, onClose, initialIndex = 0 }) => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);
  const [loading, setLoading] = useState(true);

  // Swipe
  let touchStartX = 0;
  let touchEndX = 0;

  useEffect(() => {
    const fetchImages = async () => {
      if (!album?.title) return;
      setLoading(true);
      try {
        const storage = getStorage();
        const folderRef = ref(storage, `albums/${album.title}`);
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items
            .filter((item) => !item.name.includes('cover'))
            .map((item) => getDownloadURL(item))
        );
        setImages(urls);
        setCurrentImageIndex(initialIndex || 0);
      } catch (err) {
        console.error('Error fetching images for modal:', err);
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchImages();
      document.addEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, album?.title, initialIndex]);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'Escape') onClose();
  };

  const nextImage = () => setCurrentImageIndex((i) => (i + 1) % images.length);
  const prevImage = () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length);

  const handleTouchStart = (e) => {
    touchStartX = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const delta = touchStartX - touchEndX;
    if (delta > 40) nextImage();
    if (delta < -40) prevImage();
  };

  if (!isOpen || !album?.title) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

        <motion.div
          className="relative max-w-6xl max-h-[90vh] mx-4"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top header */}
          <div className="absolute top-0 left-0 right-0 z-10 p-6 bg-gradient-to-b from-black/50 to-transparent flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">{album.title}</h2>
              <p className="text-cyan-300 text-sm">
                {images.length > 0 ? `${currentImageIndex + 1} of ${images.length}` : 'Loading...'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700 border border-cyan-500/40 hover:border-purple-500/60 transition"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Main image */}
          <div className="relative flex justify-center items-center h-[80vh]">
            {loading ? (
              <p className="text-white animate-pulse">Loading image...</p>
            ) : (
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Image ${currentImageIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {/* Arrows */}
            {images.length > 1 && !loading && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-800/70 hover:bg-gray-700 border border-cyan-500/40 hover:border-purple-500 transition"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-gray-800/70 hover:bg-gray-700 border border-cyan-500/40 hover:border-purple-500 transition"
                >
                  <ChevronRight className="w-6 h-6 text-white" />
                </button>
              </>
            )}
          </div>

          {/* Thumbnail strip */}
          {!loading && images.length > 1 && (
            <div className="absolute bottom-0 left-0 right-0 px-4 py-6 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex justify-center space-x-2 overflow-x-auto pb-2">
                {images.map((image, index) => (
                  <motion.button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-16 h-16 rounded overflow-hidden border-2 ${
                      index === currentImageIndex
                        ? 'border-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]'
                        : 'border-gray-600 hover:border-purple-500'
                    }`}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <img
                      src={image}
                      loading="lazy"
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageModal;
