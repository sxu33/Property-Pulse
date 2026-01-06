"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { FaTimes } from "react-icons/fa";

const PropertyImageEdit = ({ initialImages, onImageStateChange }) => {
  // 1. Visual State: The existing images still remaining on the screen
  const [currentImages, setCurrentImages] = useState(initialImages);

  // 2. Data State: URLs of existing images that have been marked for deletion
  const [deletedImageUrls, setDeletedImageUrls] = useState([]);

  // 3. Data State: New files dragged into the dropzone
  const [newFiles, setNewFiles] = useState([]);

  // Helper function to consolidate and report the current state to the parent
  const updateParent = (deleted, newF) => {
    onImageStateChange({
      deletedImages: deleted,
      newFiles: newF,
    });
  };

  // --- Action A: Delete existing images ---
  const handleDeleteExisting = (imageUrl) => {
    // 1. Remove from the visual list
    const updatedCurrent = currentImages.filter((img) => img !== imageUrl);
    setCurrentImages(updatedCurrent);

    // 2. Add to the deletion list
    const updatedDeleted = [...deletedImageUrls, imageUrl];
    setDeletedImageUrls(updatedDeleted);

    // 3. Report to parent component
    updateParent(updatedDeleted, newFiles);
  };

  // --- Action B: Drag in new images ---
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Generate preview URLs for the selected files
      const mappedFiles = acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      );

      const updatedNewFiles = [...newFiles, ...mappedFiles];
      setNewFiles(updatedNewFiles);

      // Report to parent component
      updateParent(deletedImageUrls, updatedNewFiles);
    },
    [newFiles, deletedImageUrls]
  ); // Dependencies

  // --- Action C: Remove a newly added image ---
  const handleRemoveNew = (fileName) => {
    const updatedNewFiles = newFiles.filter((file) => file.name !== fileName);
    setNewFiles(updatedNewFiles);

    // Report to parent component
    updateParent(deletedImageUrls, updatedNewFiles);
  };

  // Dropzone Configuration
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  // Memory Cleanup: Revoke preview URLs when the component unmounts to prevent memory leaks
  useEffect(() => {
    return () => newFiles.forEach((file) => URL.revokeObjectURL(file.preview));
  }, [newFiles]);

  return (
    <div className="space-y-6">
      {/* 1. Existing Images Area */}
      <div className="bg-gray-50 p-4 rounded-md border">
        <h3 className="text-lg font-bold mb-3 text-gray-700">
          Manage Existing Images
        </h3>
        {currentImages.length === 0 ? (
          <p className="text-gray-500 italic text-sm">
            No existing images left.
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {currentImages.map((url, index) => (
              <div key={index} className="relative group aspect-square">
                <Image
                  src={url}
                  alt="Existing"
                  fill
                  className="object-cover rounded-md border"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExisting(url)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 shadow-md transition-transform hover:scale-110"
                  title="Delete image"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. New Image Upload Area */}
      <div>
        <h3 className="text-lg font-bold mb-3 text-gray-700">
          Upload New Images
        </h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-8 text-center cursor-pointer rounded-lg transition-colors ${
            isDragActive
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-blue-400"
          }`}
        >
          <input {...getInputProps()} />
          <p className="text-gray-600">
            {isDragActive
              ? "Drop the files here..."
              : "Drag & drop images here, or click to select"}
          </p>
        </div>

        {/* New Image Previews */}
        {newFiles.length > 0 && (
          <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {newFiles.map((file) => (
              <div key={file.name} className="relative group aspect-square">
                <Image
                  src={file.preview}
                  alt="Preview"
                  fill
                  className="object-cover rounded-md border border-blue-200"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNew(file.name)}
                  className="absolute -top-2 -right-2 bg-gray-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-gray-800 shadow-md transition-transform hover:scale-110"
                >
                  <FaTimes size={12} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertyImageEdit;
