import React from 'react';
import { motion } from 'framer-motion';

const AlbumCard = ({ album, onClick, position }) => {
  return (
    <motion.div
      className="absolute cursor-pointer"
      style={{
        left: position.x - 120,
        top: position.y - 80,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(album)}
    >
      <div className="relative w-60 h-40 rounded-xl overflow-hidden backdrop-blur-md bg-gray-800/30 border border-cyan-500/50 hover:border-purple-500/80 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
        <img
          src={album.cover}
          alt={album.title}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-white font-semibold text-lg tracking-wide">
            {album.title}
          </h3>
          <p className="text-cyan-300 text-sm mt-1">
            {album.images.length} images
          </p>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-cyan-400 rounded-full animate-pulse" />
      </div>
    </motion.div>
  );
};

export default AlbumCard;