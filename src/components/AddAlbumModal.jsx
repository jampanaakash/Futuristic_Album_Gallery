import React, { useState } from "react";
import { db, storage, auth } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Loader2 } from "lucide-react";

const AddAlbumModal = ({ isOpen, onClose }) => {
  const [albumTitle, setAlbumTitle] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleSubmit = async () => {
    const trimmedTitle = albumTitle.trim();
    const normalizedTitle = trimmedTitle.toLowerCase();

    if (!trimmedTitle || !coverImage || images.length === 0) {
      alert("Please fill in all fields including cover image and album images.");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to create an album.");
      return;
    }

    setUploading(true);

    try {
      // 🔁 Check for existing album (case insensitive)
      const q = query(collection(db, "albums"), where("title", "==", trimmedTitle));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        alert("❗ An album with this name already exists. Please use a different title.");
        setUploading(false);
        return;
      }

      const albumPath = `albums/${trimmedTitle}`;

      // 📤 Upload cover image
      const coverRef = ref(storage, `${albumPath}/cover.jpg`);
      await uploadBytes(coverRef, coverImage);
      const coverUrl = await getDownloadURL(coverRef);

      // 📝 Save album metadata
      await addDoc(collection(db, "albums"), {
        title: trimmedTitle,
        coverImage: coverUrl,
        createdAt: serverTimestamp(),
        createdBy: user.uid,
      });

      // 📤 Upload album images
      const uploadTasks = images.map((img) => {
        const imgRef = ref(storage, `${albumPath}/${img.name}`);
        return uploadBytes(imgRef, img);
      });

      await Promise.all(uploadTasks);

      alert("✅ Album created successfully!");
      setAlbumTitle("");
      setCoverImage(null);
      setImages([]);
      onClose();
    } catch (err) {
      console.error("Upload failed:", err);
      alert("❌ Upload failed. Please try again later.");
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setAlbumTitle("");
    setCoverImage(null);
    setImages([]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md text-gray-800 relative">
        <h2 className="text-xl font-bold mb-4">Create New Album</h2>

        <input
          type="text"
          placeholder="Album title"
          value={albumTitle}
          onChange={(e) => setAlbumTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <label className="block text-sm font-medium mb-1">Cover Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setCoverImage(e.target.files[0])}
          className="w-full mb-3"
        />

        <label className="block text-sm font-medium mb-1">Album Images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setImages([...e.target.files])}
          className="w-full mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 border rounded text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={uploading}
            className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 flex items-center gap-2"
          >
            {uploading ? (
              <>
                <Loader2 className="animate-spin w-4 h-4" /> Uploading...
              </>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAlbumModal;
