import React from "react";

const ImageList = ({ images, setEditingImage }) => {
  return (
    <div className="overflow-x-auto p-6 bg-gray-50 rounded-lg shadow-md">
      {images.length > 0 ? (
        <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
            <tr>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">No</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Screen</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">User Skipped Tour</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Time Delay (On/Off)</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Time Delay (Seconds)</th>
              <th className="border border-gray-200 px-6 py-3 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image, index) => (
              <tr
                key={image.id}
                className="hover:bg-gray-100 transition duration-150"
              >
                <td className="border border-gray-200 px-6 py-4">{index + 1}</td>
                <td className="border border-gray-200 px-6 py-4">
                  <img
                    src={image.url}
                    alt="Uploaded"
                    className="w-16 h-16 object-cover rounded-lg shadow-md"
                  />
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <span className="text-gray-500">-</span>
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" />
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <input
                    type="number"
                    min="0"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="0"
                  />
                </td>
                <td className="border border-gray-200 px-6 py-4 text-center">
                  <button
                    className="bg-indigo-600 text-white px-6 py-2 rounded-lg shadow hover:bg-indigo-700 transition duration-150"
                    onClick={() => setEditingImage(image)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="text-lg font-medium">No screens available to display.</p>
          <p className="text-sm">Upload some screens to see them here.</p>
        </div>
      )}
    </div>
  );
};

export default ImageList;
