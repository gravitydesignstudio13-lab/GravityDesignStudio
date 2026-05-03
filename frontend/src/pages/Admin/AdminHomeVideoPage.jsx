import React, { useState, useEffect } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const AdminHomeVideoPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadedVideo, setUploadedVideo] = useState(null);

  // ✅ GET CURRENT VIDEO
  const getVideo = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/homevideo/get`);
      if (res.data.success) {
        setUploadedVideo(res.data.data?.videoUrl);
      }
    } catch (err) {
      console.log("GET VIDEO ERROR =", err);
    }
  };

  useEffect(() => {
    getVideo();
  }, []);

  // ✅ HANDLE FILE SELECTION
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    
    if (!file) {
      setSelectedVideo(null);
      return;
    }

    const MAX_SIZE = 80 * 1024 * 1024; // 80MB

    if (file.size > MAX_SIZE) {
      alert("❌ Video must be under 80MB");
      e.target.value = ""; // reset input
      setSelectedVideo(null);
      return;
    }

    setSelectedVideo(file);
  };

  // ✅ UPLOAD VIDEO
  const handleUpload = async () => {
    if (!selectedVideo) {
      alert("📹 Please select a video file first");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedVideo);

    try {
      setLoading(true);
      setProgress(0);

      const res = await axios.post(
        `${BACKEND_URL}/api/homevideo/upload`,
        formData,
        {
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
          },
        }
      );

      if (res.data.success) {
        alert("✅ Video uploaded successfully");
        setSelectedVideo(null);
        setProgress(0);
        // Reset file input
        const fileInput = document.getElementById("video-input");
        if (fileInput) fileInput.value = "";
        getVideo(); // 🔥 refresh video
      }
    } catch (err) {
      console.log(err);
      alert("❌ Upload failed");
    } finally {
      setLoading(false);
    }
  };

  // ✅ REMOVE SELECTED VIDEO
  const removeSelectedVideo = () => {
    setSelectedVideo(null);
    const fileInput = document.getElementById("video-input");
    if (fileInput) fileInput.value = "";
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-[#7a4f1d]">
        Upload Home Video
      </h1>

      {/* ⚠️ WARNING DURING UPLOAD */}
      {loading && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 text-yellow-700 rounded-lg text-sm">
          ⚠️ Please do NOT close, refresh, or go back while uploading. The upload will stop.
        </div>
      )}

      {/* VIDEO SELECTION SECTION */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Select Video File
        </label>
        
        <input
          id="video-input"
          type="file"
          accept="video/*"
          onChange={handleFileSelect}
          disabled={loading}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#7a4f1d] file:text-white hover:file:bg-[#5a3a12] disabled:opacity-50"
        />
        
        <p className="text-xs text-gray-400 mt-1">
          Maximum file size: 80MB
        </p>
      </div>

      {/* SELECTED VIDEO STATUS - CLEAR VISUAL FEEDBACK */}
      {selectedVideo && !loading && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">📹</div>
              <div>
                <p className="font-semibold text-green-800">
                  ✅ Video Selected
                </p>
                <p className="text-sm text-green-700">
                  {selectedVideo.name}
                </p>
                <p className="text-xs text-green-600">
                  Size: {formatFileSize(selectedVideo.size)}
                </p>
              </div>
            </div>
            <button
              onClick={removeSelectedVideo}
              className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
            >
              ✕ Remove
            </button>
          </div>
        </div>
      )}

      {/* NO VIDEO SELECTED WARNING */}
      {!selectedVideo && !loading && (
        <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
          <p className="text-gray-500">
            📹 No video selected
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Please choose a video file to upload
          </p>
        </div>
      )}

      {/* UPLOAD PROGRESS */}
      {loading && (
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Uploading...</span>
            <span className="font-semibold text-[#7a4f1d]">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-[#7a4f1d] h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* UPLOAD BUTTON */}
      <button
        onClick={handleUpload}
        disabled={loading || !selectedVideo}
        className={`w-full py-3 rounded-lg font-semibold transition-all ${
          loading || !selectedVideo
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-[#7a4f1d] text-white hover:bg-[#5a3a12] transform hover:scale-[1.02]"
        }`}
      >
        {loading ? "Uploading Video..." : "📤 Upload Video"}
      </button>

      {/* CURRENT VIDEO PREVIEW */}
      {uploadedVideo && (
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-3 text-gray-700 flex items-center">
            <span className="mr-2">🎥</span>
            Current Home Video
          </h2>
          <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
            <video
              src={uploadedVideo}
              controls
              className="w-full"
              poster="/video-poster.png"
            />
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">
            Video is live on your homepage
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminHomeVideoPage; 