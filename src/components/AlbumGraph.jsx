import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AlbumCard from './AlbumCard';

const AlbumGraph = ({ albums, onAlbumClick }) => {
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      setContainerSize({
        width: window.innerWidth,
        height: window.innerHeight - 100,
      });
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Generate positions for albums in a connected graph layout
  const generatePositions = (albumCount) => {
    if (albumCount === 0) return [];
    
    const positions = [];
    const centerX = containerSize.width / 2;
    const centerY = containerSize.height / 2;
    
    if (albumCount === 1) {
      positions.push({ x: centerX, y: centerY });
      return positions;
    }

    // Create a spiral-like pattern for multiple albums
    const radius = Math.min(containerSize.width, containerSize.height) * 0.25;
    const angleStep = (2 * Math.PI) / albumCount;
    
    for (let i = 0; i < albumCount; i++) {
      const angle = i * angleStep;
      const spiralRadius = radius + (i * 50);
      const x = centerX + Math.cos(angle) * spiralRadius;
      const y = centerY + Math.sin(angle) * spiralRadius;
      
      positions.push({
        x: Math.max(150, Math.min(containerSize.width - 150, x)),
        y: Math.max(100, Math.min(containerSize.height - 100, y)),
      });
    }
    
    return positions;
  };

  const positions = generatePositions(albums.length);

  // Generate connection paths between albums
  const renderConnections = () => {
    if (albums.length < 2) return null;

    const paths = [];
    for (let i = 0; i < positions.length - 1; i++) {
      const start = positions[i];
      const end = positions[i + 1];
      
      paths.push(
        <motion.line
          key={`connection-${i}`}
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: i * 0.2 }}
        />
      );
    }

    // Connect last to first to create a circuit
    if (positions.length > 2) {
      const start = positions[positions.length - 1];
      const end = positions[0];
      
      paths.push(
        <motion.line
          key="connection-circuit"
          x1={start.x}
          y1={start.y}
          x2={end.x}
          y2={end.y}
          stroke="url(#connectionGradient)"
          strokeWidth="2"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.6 }}
          transition={{ duration: 1, delay: positions.length * 0.2 }}
        />
      );
    }

    return paths;
  };

  return (
    <div className="relative w-full h-full">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern
            id="grid"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 50 0 L 0 0 0 50"
              fill="none"
              stroke="cyan"
              strokeWidth="1"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.8" />
          </linearGradient>
        </defs>
        {renderConnections()}
      </svg>

      {/* Album cards */}
      {albums.map((album, index) => (
        <AlbumCard
          key={album.id}
          album={album}
          position={positions[index] || { x: 0, y: 0 }}
          onClick={onAlbumClick}
        />
      ))}

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full"
            initial={{
              x: Math.random() * containerSize.width,
              y: Math.random() * containerSize.height,
              opacity: 0,
            }}
            animate={{
              x: Math.random() * containerSize.width,
              y: Math.random() * containerSize.height,
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AlbumGraph;