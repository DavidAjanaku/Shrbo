import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const WishlistModal = ({ onToggleFavorite, onClose, closable }) => {
  const [selectedWishlist, setSelectedWishlist] = useState("");
  const [newWishlist, setNewWishlist] = useState("");
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (isAdded) {
      const toastMessage = selectedWishlist || newWishlist
        ? "Added to Wishlist"
        : "Please select or enter a wishlist name";

      toast.success(toastMessage, {
        position: toast.POSITION.TOP_CENTER,
      });
      setIsAdded(false); // Reset isAdded after showing the toast
    }
  }, [isAdded, selectedWishlist, newWishlist]);

  const toggleFav = () => {
    toast.success("Added to Wishlist", {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  const handleCancel = () => {
    onClose();
  };

  const handleAddToWishlist = () => {
    toggleFav();
    handleCancel();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white w-96 p-6 rounded-md z-10">
        {closable && (
          <span
            className="text-gray-700 text-2xl font-bold cursor-pointer absolute top-2 right-2"
            onClick={handleCancel}
          >
            &times;
          </span>
        )}
        <h2 className="text-xl font-bold mb-4">Select or Create Wishlist</h2>
        <form>
          <label className="block mb-2">
            Select Wishlist:
            <select
              className="w-full p-2 border rounded"
              value={selectedWishlist}
              onChange={(e) => setSelectedWishlist(e.target.value)}
            >
              <option value="">-- Select Wishlist --</option>
              <option value="wishlist1">Wishlist 1</option>
              <option value="wishlist2">Wishlist 2</option>
            </select>
          </label>
          <label className="block mb-2">
            Create New Wishlist:
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={newWishlist}
              onChange={(e) => setNewWishlist(e.target.value)}
            />
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              className={`bg-orange-400 text-white px-4 py-2 rounded hover:bg-orange-700 ${
                isAdded ? "cursor-not-allowed" : ""
              }`}
              onClick={handleAddToWishlist}
              disabled={isAdded}
            >
              Add to Wishlist
            </button>
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-700"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default WishlistModal;
