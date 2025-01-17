import React, { useState } from 'react';
import UploadImages from './UploadImages';
import ImageList from './ImageList';
import './style.css';

const App = () => {
  const [images, setImages] = useState([]);
  const [editingImage, setEditingImage] = useState(null);
  const [annotations, setAnnotations] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputPosition, setInputPosition] = useState({ x: 0, y: 0 });
  const [inputValue, setInputValue] = useState('');

  // Handle click on image to add annotation
  const handleImageClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left; // X position relative to the image
    const y = e.clientY - rect.top;  // Y position relative to the image

    setInputPosition({ x, y });
    setInputVisible(true);
  };

  // Add annotation to image
  const handleAddAnnotation = () => {
    setAnnotations((prev) => [
      ...prev,
      { x: inputPosition.x, y: inputPosition.y, content: inputValue },
    ]);
    setInputVisible(false);
    setInputValue('');
  };

  // Update button clicked (save annotations)
  const handleUpdate = () => {
    // This is where you save your annotations (e.g., send to a server)
    console.log('Annotations saved:', annotations);
    // If saving is successful, keep annotations as is.
  };

  // Close the popup and remove any unsaved annotations
  const handleClose = () => {
    setEditingImage(null);  // Close the popup
    setAnnotations([]);     // Clear annotations if not saved
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>
      <UploadImages setImages={setImages} />
      <ImageList images={images} setEditingImage={setEditingImage} />
      {editingImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl h-auto max-h-[90%] overflow-auto relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Image</h2>
              <button
                onClick={handleClose}
                className="text-gray-600 hover:text-gray-900 text-lg font-bold"
              >
                &times;
              </button>
            </div>

            {/* Image and Annotations */}
            <div
              className="relative w-full h-full"
              onClick={handleImageClick}
            >
              <img
                src={editingImage.url}
                alt="Editing"
                className="rounded w-full h-full object-contain"
              />
              {annotations.map((annotation, index) => (
                <div
                  key={index}
                  className="absolute bg-yellow-200 text-black text-sm px-2 py-1 rounded shadow-lg"
                  style={{
                    top: `${annotation.y}px`,
                    left: `${annotation.x}px`,
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {annotation.content}
                </div>
              ))}
            </div>

            {/* Input for Adding Annotations */}
            {inputVisible && (
              <div
                className="absolute"
                style={{
                  top: `${inputPosition.y}px`,
                  left: `${inputPosition.x}px`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="border border-gray-300 rounded px-2 py-1 text-sm shadow"
                  placeholder="Enter text"
                />
                <button
                  onClick={handleAddAnnotation}
                  className="bg-blue-500 text-white text-sm px-2 py-1 rounded ml-2"
                >
                  Add
                </button>
              </div>
            )}

            {/* Footer */}
            <div className="flex justify-end space-x-4 mt-6">
              {annotations.length > 0 && (
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition"
                >
                  Update
                </button>
              )}
              <button
                onClick={handleClose}
                className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default App;
