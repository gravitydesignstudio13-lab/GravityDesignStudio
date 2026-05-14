import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { 
  Image, 
  X, 
  ChevronLeft, 
  ChevronRight,
  LayoutGrid,
  LayoutList
} from "lucide-react";

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;

const GalleryPage = () => {
  const [searchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("All");
  const [gallery, setGallery] = useState([]);
  const [allGalleryItems, setAllGalleryItems] = useState([]);
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [viewMode, setViewMode] = useState("grid");

  const getServices = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/service/find`);
      if (res?.data?.success && Array.isArray(res.data.data)) {
        setServices(res.data.data);
      } else if (Array.isArray(res.data)) {
        setServices(res.data);
      } else {
        setServices([]);
      }
    } catch (error) {
      console.log("GET SERVICES ERROR =", error);
      setServices([]);
    }
  };

  const getAllGalleryItems = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/gallery/all?limit=1000`);
      if (res?.data?.success) {
        const items = res.data.data || [];
        setAllGalleryItems(items);
        console.log("All gallery items fetched:", items);
        console.log("Available categories:", [...new Set(items.map(item => item.category))]);
        return items;
      } else {
        setAllGalleryItems([]);
        return [];
      }
    } catch (error) {
      console.log("GET ALL GALLERY ERROR =", error);
      setAllGalleryItems([]);
      return [];
    }
  };

  // Client-side filtering and pagination
  const filterAndPaginateGallery = (allItems, category, page, perPage) => {
    let filteredItems = allItems;
    if (category !== "All") {
      filteredItems = allItems.filter(item => {
        const itemCategory = (item.category || "").toLowerCase().trim();
        const searchCategory = category.toLowerCase().trim();
        return itemCategory === searchCategory || 
               itemCategory.includes(searchCategory) ||
               searchCategory.includes(itemCategory);
      });
    }
    
    console.log(`Filtering for category "${category}": Found ${filteredItems.length} items`);
    
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const paginatedItems = filteredItems.slice(startIndex, endIndex);
    const totalPagesCount = Math.ceil(filteredItems.length / perPage);
    
    return {
      items: paginatedItems,
      totalPages: totalPagesCount,
      totalItems: filteredItems.length
    };
  };

  const getGallery = async () => {
    const { items, totalPages: totalPagesCount } = filterAndPaginateGallery(
      allGalleryItems,
      activeCategory,
      currentPage,
      viewMode === "grid" ? 9 : 6
    );
    
    setGallery(items);
    setTotalPages(totalPagesCount);
  };

  useEffect(() => {
    const categoryFromUrl = searchParams.get("category");
    if (categoryFromUrl) {
      const decodedCategory = decodeURIComponent(categoryFromUrl);
      console.log("Category from URL:", decodedCategory);
      setActiveCategory(decodedCategory);
      setCurrentPage(1);
    }
  }, [searchParams]);

  useEffect(() => {
    getServices();
    getAllGalleryItems();
  }, []);

  useEffect(() => {
    if (allGalleryItems.length > 0) {
      getGallery();
    }
  }, [currentPage, activeCategory, viewMode, allGalleryItems]);

  const handleCategoryChange = (category) => {
    console.log("Changing category to:", category);
    setActiveCategory(category);
    setCurrentPage(1);
    const newUrl = category === "All" 
      ? "/gallery" 
      : `/gallery?category=${encodeURIComponent(category)}`;
    window.history.pushState({}, "", newUrl);
  };

  const openLightbox = (item, index) => {
    setSelectedImage(item);
    setSelectedImageIndex(index);
  };

  const nextImage = () => {
    if (selectedImageIndex < gallery.length - 1) {
      const nextIndex = selectedImageIndex + 1;
      setSelectedImage(gallery[nextIndex]);
      setSelectedImageIndex(nextIndex);
    }
  };

  const prevImage = () => {
    if (selectedImageIndex > 0) {
      const prevIndex = selectedImageIndex - 1;
      setSelectedImage(gallery[prevIndex]);
      setSelectedImageIndex(prevIndex);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedImage) return;
      
      if (e.key === 'ArrowRight') {
        nextImage();
      } else if (e.key === 'ArrowLeft') {
        prevImage();
      } else if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage, selectedImageIndex, gallery]);

  const categories = [
    "All",
    ...new Set(Array.isArray(services) ? services.map((item) => item.title) : []),
  ];

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#7a4f1d]/5 to-[#c49a6c]/5 pt-20 pb-16">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920')] bg-cover bg-fixed opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#7a4f1d]/10 text-[#7a4f1d] text-sm font-medium tracking-wide mb-5">
              Our Portfolio
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Visual Inspirations
            </h1>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">
              Explore our curated collection of design works, concepts, and visual inspirations
            </p>
            {activeCategory !== "All" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#7a4f1d]/20 rounded-full">
                  <span className="text-[#7a4f1d] text-sm">Showing:</span>
                  <span className="text-[#7a4f1d] font-semibold">{activeCategory}</span>
                </span>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Filter & Controls */}
      <section className="sticky top-0 z-20 bg-white/80 backdrop-blur-lg shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((item, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleCategoryChange(item)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    activeCategory === item
                      ? "bg-gradient-to-r from-[#7a4f1d] to-[#c49a6c] text-white shadow-lg transform scale-105"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105"
                  }`}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition ${
                  viewMode === "grid" ? "bg-white shadow-sm text-[#7a4f1d]" : "text-gray-500"
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition ${
                  viewMode === "list" ? "bg-white shadow-sm text-[#7a4f1d]" : "text-gray-500"
                }`}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid/List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode + activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={viewMode === "grid" 
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]"
              : "space-y-4"
            }
          >
            {gallery.map((item, index) => (
              viewMode === "grid" ? (
                // Grid View
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer ${
                    index % 3 === 0 ? "sm:row-span-2 sm:col-span-1" : ""
                  }`}
                  onClick={() => openLightbox(item, index)}
                >
                  <img
                    src={item.image}
                    alt={item.category}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {item.category}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {item.description || "Beautiful design work"}
                      </p>
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-[#7a4f1d]/90 backdrop-blur-sm text-white text-xs px-3 py-1.5 rounded-full">
                    {item.category}
                  </div>
                </motion.div>
              ) : (
                // List View
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group flex gap-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(item, index)}
                >
                  <div className="w-48 h-32 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.category}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 p-4">
                    <div>
                      <span className="inline-block px-2 py-1 bg-[#7a4f1d]/10 text-[#7a4f1d] text-xs rounded-full mb-2">
                        {item.category}
                      </span>
                      <h3 className="font-semibold text-gray-800 mb-1">
                        {item.title || "Design Project"}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        {item.description || "Beautiful design work showcasing our expertise"}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            ))}
          </motion.div>
        </AnimatePresence>

        {gallery.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <Image className="w-20 h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No images found</h3>
            <p className="text-gray-400">
              {activeCategory !== "All" 
                ? `No gallery items available for "${activeCategory}" category` 
                : "No gallery items available"}
            </p>
            {activeCategory !== "All" && (
              <button
                onClick={() => handleCategoryChange("All")}
                className="mt-4 px-6 py-2 bg-[#7a4f1d] text-white rounded-full hover:bg-[#5a3a12] transition"
              >
                View All Categories
              </button>
            )}
          </motion.div>
        )}
      </section>

      {/* Pagination */}
      {gallery.length > 0 && (
        <section className="pb-20 flex justify-center items-center gap-2 flex-wrap">
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
              currentPage === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            Prev
          </motion.button>

          {[...Array(totalPages)].map((_, index) => (
            <motion.button
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setCurrentPage(index + 1)}
              className={`w-10 h-10 rounded-lg font-medium transition ${
                currentPage === index + 1
                  ? "bg-gradient-to-r from-[#7a4f1d] to-[#c49a6c] text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              {index + 1}
            </motion.button>
          ))}

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(currentPage + 1)}
            className={`px-4 py-2 rounded-lg flex items-center gap-2 transition ${
              currentPage === totalPages || totalPages === 0
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:shadow-md"
            }`}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </motion.button>
        </section>
      )}

      {/* Lightbox Modal with Slide Navigation */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg"
            onClick={() => setSelectedImage(null)}
          >
            <div className="flex items-center justify-center min-h-screen p-4">
              {/* Previous Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                disabled={selectedImageIndex === 0}
                className={`absolute left-4 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${
                  selectedImageIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                }`}
              >
                <ChevronLeft className="w-8 h-8 text-white" />
              </button>

              {/* Next Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                disabled={selectedImageIndex === gallery.length - 1}
                className={`absolute right-4 z-10 p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 ${
                  selectedImageIndex === gallery.length - 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                }`}
              >
                <ChevronRight className="w-8 h-8 text-white" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition"
              >
                <X className="w-6 h-6 text-white" />
              </button>

              {/* Image Counter */}
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                {selectedImageIndex + 1} / {gallery.length}
              </div>

              {/* Main Image */}
              <motion.div
                key={selectedImage._id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative max-w-6xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.category}
                  className="w-full h-auto rounded-2xl shadow-2xl max-h-[80vh] object-contain"
                />
                
                {/* Image Details */}
                <div className="mt-4 text-center">
                  <span className="inline-block px-3 py-1 bg-[#7a4f1d] text-white text-sm rounded-full mb-2">
                    {selectedImage.category}
                  </span>
                  <h3 className="text-white text-2xl font-semibold mb-2">
                    {selectedImage.title || "Design Project"}
                  </h3>
                  <p className="text-gray-300">
                    {selectedImage.description || "Beautiful design work showcasing our expertise and creative vision"}
                  </p>
                </div>
              </motion.div>

              {/* Thumbnail Navigation */}
              <div className="absolute bottom-4 left-0 right-0 overflow-x-auto">
                <div className="flex justify-center gap-2 px-4 pb-4">
                  {gallery.map((item, idx) => (
                    <button
                      key={idx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(item);
                        setSelectedImageIndex(idx);
                      }}
                      className={`flex-shrink-0 transition-all duration-300 ${
                        idx === selectedImageIndex 
                          ? "ring-2 ring-[#7a4f1d] scale-110" 
                          : "opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.category}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryPage;