import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, listAll, deleteObject, uploadBytes, getMetadata } from "firebase/storage";

const AlbumCard = ({ data, onDelete, onClick, onAddPhotos }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg border border-gray-300 overflow-hidden hover:scale-105 transition-transform cursor-pointer relative"
      onClick={onClick}
    >
      <img
        src={data.coverImage || "https://via.placeholder.com/150"}
        alt={data.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-2 text-center font-medium text-sm text-gray-800">
        {data.title || "Untitled"}
      </div>

      {/* ❌ Delete Button */}
      <button
        className="absolute top-1 right-1 text-white bg-red-600 hover:bg-red-700 p-1 rounded"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      >
        ✕
      </button>

      {/* ➕ Add Photos Button */}
      <button
        className="absolute bottom-2 right-2 text-white bg-blue-600 hover:bg-blue-700 p-1 px-2 text-xs rounded"
        onClick={(e) => {
          e.stopPropagation();
          onAddPhotos();
        }}
      >
        + Add Photos
      </button>
    </div>
  );
};

const AlbumGraph = () => {
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [newImages, setNewImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "albums"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const albumData = [];

      querySnapshot.forEach((docSnap) => {
        const album = docSnap.data();
        if (!album || !album.title || !album.coverImage) return;

        albumData.push({
          id: docSnap.id,
          title: album.title,
          coverImage: album.coverImage,
        });
      });

      setAlbums(albumData);
    });

    return () => unsubscribe();
  }, []);

  const handleDelete = async (albumId, title) => {
    if (!window.confirm(`Are you sure you want to delete album "${title}"?`)) return;

    try {
      await deleteDoc(doc(db, "albums", albumId));

      const albumFolderRef = ref(storage, `albums/${title}`);
      const listResult = await listAll(albumFolderRef);
      const deletePromises = listResult.items.map((itemRef) => deleteObject(itemRef));
      await Promise.all(deletePromises);

      alert("Album deleted successfully!");
    } catch (err) {
      console.error("Failed to delete album:", err);
      alert("Failed to delete album. Check console for details.");
    }
  };

  const handleClick = (album) => {
    navigate("/gallery", {
      state: {
        albumId: album.id,
        albumTitle: album.title,
      },
    });
  };

  const handleAddPhotos = async () => {
    if (!selectedAlbum || newImages.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    setUploading(true);

    try {
      const albumPath = `albums/${selectedAlbum.title}`;

      // Check for duplicates before uploading
      const existingFiles = await listAll(ref(storage, albumPath));
      const existingNames = new Set(existingFiles.items.map((item) => item.name));

      const uploadTasks = [];

      for (const img of newImages) {
        if (existingNames.has(img.name)) {
          console.warn(`Skipped duplicate file: ${img.name}`);
          continue; // skip duplicate
        }
        const imgRef = ref(storage, `${albumPath}/${img.name}`);
        uploadTasks.push(uploadBytes(imgRef, img));
      }

      if (uploadTasks.length === 0) {
        alert("No new files uploaded. All selected files already exist.");
      } else {
        await Promise.all(uploadTasks);
        alert("✅ New photos added to album!");
      }

      // Reset state
      setSelectedAlbum(null);
      setNewImages([]);
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Failed to upload new photos.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 px-6 pt-6 pb-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {albums.map((album) => (
          <AlbumCard
            key={album.id}
            data={album}
            onClick={() => handleClick(album)}
            onDelete={() => handleDelete(album.id, album.title)}
            onAddPhotos={() => setSelectedAlbum(album)}
          />
        ))}
      </div>

      {/* 📤 Upload More Images Modal */}
      {selectedAlbum && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md text-gray-800 relative">
            <h2 className="text-lg font-bold mb-3">
              Add Photos to "{selectedAlbum.title}"
            </h2>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => setNewImages([...e.target.files])}
              className="w-full mb-4"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setSelectedAlbum(null);
                  setNewImages([]);
                }}
                className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPhotos}
                disabled={uploading}
                className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700 flex items-center gap-2"
              >
                {uploading ? (
                  <>
                    <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full" />
                    Uploading...
                  </>
                ) : (
                  "Upload"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlbumGraph;
