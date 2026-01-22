"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { X, UploadCloud } from "lucide-react"; // 替换 FaTimes 为 Lucide

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
    <div className="space-y-10">
      {/* 1. Existing Images Area */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-900 tracking-tight">
          Manage Existing Images
        </h3>
        {currentImages.length === 0 ? (
          <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center">
            <p className="text-gray-400 font-light italic text-sm">
              No existing images left.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {currentImages.map((url, index) => (
              <div
                key={index}
                className="relative aspect-square overflow-hidden rounded-2xl group"
              >
                <Image
                  src={url}
                  alt="Existing"
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-300"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <button
                  type="button"
                  onClick={() => handleDeleteExisting(url)}
                  className="absolute top-2 right-2 bg-white/90 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white shadow-lg transition-all active:scale-90"
                  title="Delete image"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. New Image Upload Area */}
      <div>
        <h3 className="text-xl font-bold mb-6 text-gray-900 tracking-tight">
          Upload New Images
        </h3>
        <div
          {...getRootProps()}
          className={`border-2 border-dashed p-12 text-center cursor-pointer rounded-[2rem] transition-all ${
            isDragActive
              ? "border-[#FF385C] bg-[#FFF8F9]"
              : "border-gray-200 hover:border-gray-300 bg-gray-50"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <UploadCloud
              size={32}
              className={isDragActive ? "text-[#FF385C]" : "text-gray-400"}
            />
            <p className="text-gray-600 font-light">
              {isDragActive
                ? "Drop the files here..."
                : "Drag & drop images here, or click to select"}
            </p>
          </div>
        </div>

        {/* New Image Previews */}
        {newFiles.length > 0 && (
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {newFiles.map((file) => (
              <div
                key={file.name}
                className="relative aspect-square overflow-hidden rounded-2xl group"
              >
                <Image
                  src={file.preview}
                  alt="Preview"
                  fill
                  className="object-cover transition-transform group-hover:scale-110 duration-300"
                  onLoad={() => URL.revokeObjectURL(file.preview)}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNew(file.name)}
                  className="absolute top-2 right-2 bg-white/90 text-gray-900 rounded-full w-8 h-8 flex items-center justify-center hover:bg-white shadow-lg transition-all active:scale-90"
                >
                  <X size={16} />
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
