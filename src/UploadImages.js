import React from 'react';

const UploadImages = ({ setImages }) => {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedImages = [];

    // Iterate over each file to upload it
    for (const file of files) {
      try {
        // Create a FormData object to send the file in a POST request
        const formData = new FormData();
        formData.append('image', file);

        // Use ImgBB API to upload the image (you need your own API key)
        const response = await fetch('https://api.imgbb.com/1/upload?key=a3b6001a0c27a585059b0d0f9ffaae52', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
        

        if (data && data.data && data.data.url) {
          // Create a file object with the uploaded image URL
          uploadedImages.push({
            id: Date.now() + file.name,
            url: data.data.url, // This is the image URL from ImgBB
          });
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }

    // Add the uploaded image URLs to your state
    setImages((prev) => [...prev, ...uploadedImages]);
  };

  return (
    <div className="mb-6">
      <label className="block mb-2 text-sm font-medium text-gray-700">
        Upload Screens
      </label>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
    </div>
  );
};

export default UploadImages;
