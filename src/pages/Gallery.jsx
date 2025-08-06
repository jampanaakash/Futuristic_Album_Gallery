import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ref, listAll, getDownloadURL, deleteObject } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { Loader2, Heart, Download, Trash } from 'lucide-react';
import ImageModal from '../components/ImageModal';

const Gallery = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { albumTitle } = location.state || {};

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!albumTitle) {
      alert('No album title found.');
      navigate('/');
      return;
    }

    const fetchImages = async () => {
      try {
        const folderRef = ref(storage, `albums/${albumTitle}`);
        const result = await listAll(folderRef);
        const urls = await Promise.all(
          result.items
            .filter((item) => !item.name.includes('cover'))
            .map(async (itemRef) => ({
              name: itemRef.name,
              url: await getDownloadURL(itemRef),
              id: itemRef.fullPath,
            }))
        );
        setImages(urls);
      } catch (error) {
        console.error('Error loading album:', error);
        alert('Unable to load album. Make sure you are logged in.');
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    const fetchFavorites = async () => {
      if (!user) return;
      try {
        const favRef = doc(db, 'favorites', user.uid);
        const favSnap = await getDoc(favRef);
        if (favSnap.exists()) {
          setFavorites(favSnap.data().images || []);
        }
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    };

    if (user) {
      fetchImages();
      fetchFavorites();
    }
  }, [navigate, user, albumTitle]);

  const toggleFavorite = async (image) => {
    if (!user) {
      alert('Login required to save favorites.');
      return;
    }

    const favRef = doc(db, 'favorites', user.uid);
    const alreadyFav = favorites.some((fav) => fav.id === image.id);

    try {
      if (alreadyFav) {
        await updateDoc(favRef, { images: arrayRemove(image) });
        setFavorites((prev) => prev.filter((img) => img.id !== image.id));
      } else {
        await setDoc(favRef, { images: arrayUnion(image) }, { merge: true });
        setFavorites((prev) => [...prev, image]);
      }
    } catch (err) {
      console.error('Error updating favorites:', err);
    }
  };

  const deleteImage = async (image) => {
    if (!user) {
      alert('You must be logged in to delete images.');
      return;
    }
    if (!window.confirm(`Are you sure you want to delete ${image.name}?`)) return;
    try {
      const imageRef = ref(storage, image.id);
      await deleteObject(imageRef);
      setImages((prev) => prev.filter((img) => img.id !== image.id));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image.');
    }
  };

  const isFavorite = (image) => favorites.some((fav) => fav.id === image.id);

  const openModal = (index) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 px-4 py-6 sm:px-6 md:px-10">
      <h1 className="text-white text-2xl sm:text-3xl font-bold mb-6">
        {albumTitle ? `${albumTitle} Album` : 'Gallery'}
      </h1>

      {loading ? (
        <div className="text-cyan-400 flex items-center gap-3">
          <Loader2 className="animate-spin" />
          <span>Loading images...</span>
        </div>
      ) : images.length === 0 ? (
        <p className="text-gray-400">No images found in this album.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {images.map((img, index) => (
            <div
              key={img.id}
              className="relative rounded-xl overflow-hidden shadow-md group bg-gray-700/20 border border-gray-600 cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={img.url}
                alt={img.name}
                loading="lazy"
                className="object-cover w-full aspect-square sm:aspect-[3/2] group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white p-2 flex justify-between items-center">
                <span className="truncate text-sm max-w-[50%]">{img.name}</span>
                <div className="flex gap-2">
                  <a href={img.url} download onClick={(e) => e.stopPropagation()}>
                    <Download className="w-4 h-4 hover:text-cyan-400" />
                  </a>
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(img); }}>
                    {isFavorite(img) ? (
                      <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                    ) : (
                      <Heart className="w-4 h-4 hover:text-pink-500" />
                    )}
                  </button>
                  <button onClick={(e) => { e.stopPropagation(); deleteImage(img); }}>
                    <Trash className="w-4 h-4 text-red-400 hover:text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Fullscreen Image Modal */}
      <ImageModal
        album={{ title: albumTitle }}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
      />
    </div>
  );
};

export default Gallery;
