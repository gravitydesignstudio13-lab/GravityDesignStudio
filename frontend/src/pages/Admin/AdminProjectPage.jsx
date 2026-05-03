import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import {
  Plus,
  Edit,
  Trash2,
  Image,
  X,
  ChevronLeft,
  ChevronRight,
  Search,
  Save,
  UploadCloud,
  AlertCircle,
  CheckCircle,
  UserPlus,
  UserMinus,
  Plus as PlusIcon,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BACKEND_URL = import.meta.env.VITE_BACKENDS_URL;
const api = axios.create({
  baseURL: `${BACKEND_URL}/api/project`,
});

const projectValidationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  location: Yup.string().required('Location is required'),
  description: Yup.string().required('Short description is required'),
  fullDescription: Yup.string(),
  status: Yup.string().oneOf(['Completed', 'Ongoing', 'Upcoming']),
  category: Yup.string().required('Category is required'),
  year: Yup.string(),
  area: Yup.string(),
  duration: Yup.string(),
  team: Yup.array().of(Yup.string()),
  features: Yup.array().of(Yup.string()),
  technologies: Yup.array().of(Yup.string()),
});

// Image size validation helper
const validateImageSize = (file, maxSizeMB = 10) => {
  const maxSizeInBytes = maxSizeMB * 1024 * 1024;
  if (file && file.size > maxSizeInBytes) {
    return {
      isValid: false,
      error: `Image size must be less than ${maxSizeMB} MB. Current size: ${(file.size / (1024 * 1024)).toFixed(2)} MB`
    };
  }
  return { isValid: true, error: null };
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [showFormModal, setShowFormModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [formSuccess, setFormSuccess] = useState(null);

  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {
        page: currentPage,
        limit: 10,
        status: statusFilter,
        category: categoryFilter,
      };

      if (searchTerm) params.search = searchTerm;

      const response = await api.get('/all', { params });

      if (response.data.success) {
        setProjects(response.data.data);
        setTotalPages(response.data.totalPages || 1);
      } else {
        throw new Error(response.data.message || 'Failed to fetch');
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [currentPage, statusFilter, categoryFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter, categoryFilter]);

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    
    setIsDeleting(true);
    
    try {
      await api.delete(`/delete/${deleteConfirm}`);
      toast.success('Project deleted successfully!');
      setDeleteConfirm(null);
      await fetchProjects();
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      toast.error(errorMsg);
      setError(errorMsg);
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = async (id) => {
    setFormLoading(true);
    setFormError(null);

    try {
      const response = await api.get(`/${id}`);

      if (response.data.success) {
        setEditingProject(response.data.data);
        setShowFormModal(true);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setFormError(err.response?.data?.message || err.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleFormSubmit = async (values, files, existingImages) => {
    setFormLoading(true);
    setFormError(null);
    setFormSuccess(null);

    try {
      // Validate hero image size if present
      if (files.heroImage) {
        const heroValidation = validateImageSize(files.heroImage);
        if (!heroValidation.isValid) {
          setFormError(heroValidation.error);
          toast.error(heroValidation.error);
          setFormLoading(false);
          return;
        }
      }

      // Validate each gallery image size
      if (files.images && files.images.length) {
        for (let i = 0; i < files.images.length; i++) {
          const galleryValidation = validateImageSize(files.images[i]);
          if (!galleryValidation.isValid) {
            const errorMsg = `Gallery image ${i + 1}: ${galleryValidation.error}`;
            setFormError(errorMsg);
            toast.error(errorMsg);
            setFormLoading(false);
            return;
          }
        }
      }

      const formData = new FormData();

      Object.keys(values).forEach((key) => {
        if (Array.isArray(values[key])) {
          values[key].forEach((item) => {
            if (item.trim()) formData.append(key, item.trim());
          });
        } else if (
          values[key] !== undefined &&
          values[key] !== null &&
          values[key] !== ''
        ) {
          formData.append(key, values[key]);
        }
      });

      if (files.heroImage) {
        formData.append('heroImage', files.heroImage);
      }

      formData.append('existingImages', JSON.stringify(existingImages || []));

      if (files.images && files.images.length) {
        files.images.forEach((file) => formData.append('images', file));
      }

      let response;

      if (editingProject) {
        response = await api.put(`/update/${editingProject._id}`, formData);
        if (response.data.success) {
          toast.success('Project updated successfully!');
        } else {
          throw new Error(response.data.message);
        }
      } else {
        response = await api.post('/add', formData);
        if (response.data.success) {
          toast.success('Project created successfully!');
        } else {
          throw new Error(response.data.message);
        }
      }

      if (response.data.success) {
        setFormSuccess(response.data.message || 'Project saved successfully');

        setTimeout(() => {
          setShowFormModal(false);
          setEditingProject(null);
          fetchProjects();
        }, 1500);
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      const errorMsg = err.response?.data?.message || err.message;
      setFormError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <div className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Project Management</h1>

            <button
              onClick={() => {
                setEditingProject(null);
                setShowFormModal(true);
                setFormError(null);
                setFormSuccess(null);
              }}
              className="inline-flex items-center px-4 py-2 bg-[#7a5703] text-white rounded-lg hover:bg-[#c49a6c] transition-colors"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="flex gap-3">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Upcoming">Upcoming</option>
              </select>

              <button
                onClick={fetchProjects}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Refresh
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-center text-red-700">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-600"></div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-20 text-gray-500">No projects found</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    {filteredProjects.map((project) => (
                      <motion.tr
                        key={project._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100">
                            {project.heroImage ? (
                              <img
                                src={project.heroImage}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Image className="w-6 h-6 text-gray-400" />
                              </div>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {project.title}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {project.description}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                            {project.category}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              project.status === 'Completed'
                                ? 'bg-green-100 text-green-800'
                                : project.status === 'Ongoing'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {project.location}
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => openEditModal(project._id)}
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <Edit className="w-5 h-5" />
                          </button>

                          <button
                            onClick={() => setDeleteConfirm(project._id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {totalPages > 1 && (
                <div className="px-6 py-4 border-t border-gray-200 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 rounded border disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showFormModal && (
          <ProjectFormModal
            project={editingProject}
            onSubmit={handleFormSubmit}
            onClose={() => {
              setShowFormModal(false);
              setEditingProject(null);
              setFormError(null);
              setFormSuccess(null);
            }}
            loading={formLoading}
            error={formError}
            success={formSuccess}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Confirm Delete
              </h3>
              <p className="text-gray-600 mb-6">
                Are you sure you want to delete this project? This action cannot be undone.
              </p>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  disabled={isDeleting}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                >
                  {isDeleting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                      Deleting...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ProjectFormModal = ({ project, onSubmit, onClose, loading, error, success }) => {
  const [heroFile, setHeroFile] = useState(null);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const [heroPreview, setHeroPreview] = useState(null);
  const [galleryPreviews, setGalleryPreviews] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [heroError, setHeroError] = useState(null);
  const [galleryErrors, setGalleryErrors] = useState([]);

  const formik = useFormik({
    initialValues: {
      title: '',
      location: '',
      description: '',
      fullDescription: '',
      status: 'Upcoming',
      category: 'Residential',
      year: '',
      area: '',
      duration: '',
      team: [''],
      features: [''],
      technologies: [''],
    },
    validationSchema: projectValidationSchema,
    onSubmit: (values) => {
      const files = {
        heroImage: heroFile,
        images: galleryFiles,
      };

      const cleanedValues = {
        ...values,
        team: values.team.filter((member) => member.trim() !== ''),
        features: values.features.filter((feature) => feature.trim() !== ''),
        technologies: values.technologies.filter((tech) => tech.trim() !== ''),
      };

      onSubmit(cleanedValues, files, existingImages);
    },
  });

  useEffect(() => {
    if (project) {
      formik.setValues({
        title: project.title || '',
        location: project.location || '',
        description: project.description || '',
        fullDescription: project.fullDescription || '',
        status: project.status || 'Upcoming',
        category: project.category || 'Residential',
        year: project.year || '',
        area: project.area || '',
        duration: project.duration || '',
        team: project.team?.length ? project.team : [''],
        features: project.features?.length ? project.features : [''],
        technologies: project.technologies?.length ? project.technologies : [''],
      });

      setHeroPreview(project.heroImage || null);
      setExistingImages(project.images || []);
      setGalleryPreviews(project.images || []);
      setGalleryFiles([]);
      setHeroFile(null);
      setHeroError(null);
      setGalleryErrors([]);
    } else {
      formik.resetForm();
      setHeroPreview(null);
      setGalleryPreviews([]);
      setGalleryFiles([]);
      setExistingImages([]);
      setHeroFile(null);
      setHeroError(null);
      setGalleryErrors([]);
    }
  }, [project]);

  const handleArrayChange = (field, index, value) => {
    const newArray = [...formik.values[field]];
    newArray[index] = value;
    formik.setFieldValue(field, newArray);
  };

  const addArrayItem = (field) => {
    formik.setFieldValue(field, [...formik.values[field], '']);
  };

  const removeArrayItem = (field, index) => {
    const newArray = formik.values[field].filter((_, i) => i !== index);
    if (newArray.length === 0) newArray.push('');
    formik.setFieldValue(field, newArray);
  };

  const handleHeroChange = (e) => {
    const file = e.target.files[0];
    setHeroError(null);

    if (file) {
      const validation = validateImageSize(file);
      if (!validation.isValid) {
        setHeroError(validation.error);
        setHeroFile(null);
        setHeroPreview(null);
        e.target.value = '';
        return;
      }

      setHeroFile(file);
      setHeroPreview(URL.createObjectURL(file));
    }
  };

  const handleGalleryChange = (e) => {
    const files = Array.from(e.target.files);
    const newErrors = [];
    const validFiles = [];

    files.forEach((file, index) => {
      const validation = validateImageSize(file);
      if (!validation.isValid) {
        newErrors.push(`Image ${index + 1}: ${validation.error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (newErrors.length > 0) {
      setGalleryErrors((prev) => [...prev, ...newErrors]);
      setTimeout(() => setGalleryErrors((prev) => prev.filter((_, i) => i !== 0)), 3000);
    }

    if (validFiles.length > 0) {
      setGalleryFiles((prev) => [...prev, ...validFiles]);
      const previews = validFiles.map((file) => URL.createObjectURL(file));
      setGalleryPreviews((prev) => [...prev, ...previews]);
    }

    e.target.value = '';
  };

  const removeGalleryImage = (index) => {
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));

    if (index < existingImages.length) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      const newImageIndex = index - existingImages.length;
      setGalleryFiles((prev) => prev.filter((_, i) => i !== newImageIndex));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {project ? 'Edit Project' : 'Add New Project'}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={formik.handleSubmit} className="p-6 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}

            {success && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-green-700 text-sm flex items-center">
                <CheckCircle className="w-4 h-4 mr-2" />
                {success}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.location}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.location && formik.errors.location && (
                    <p className="text-red-500 text-xs mt-1">{formik.errors.location}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Category *
                  </label>
                  <select
                    name="category"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Interior Design">Interior Design</option>
                    <option value="Architecture Design">Architecture Design</option>
                    <option value="3D Visualization">3D Visualization</option>
                    <option value="Renovation">Renovation</option>
                    <option value="Furniture Design">Furniture Design</option>
                    <option value="Space Planning">Space Planning</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    onChange={formik.handleChange}
                    value={formik.values.status}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="Completed">Completed</option>
                    <option value="Ongoing">Ongoing</option>
                    <option value="Upcoming">Upcoming</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    name="year"
                    onChange={formik.handleChange}
                    value={formik.values.year}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Area (sq ft)
                  </label>
                  <input
                    type="text"
                    name="area"
                    onChange={formik.handleChange}
                    value={formik.values.area}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="duration"
                    onChange={formik.handleChange}
                    value={formik.values.duration}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Team Members
                  </label>
                  {formik.values.team.map((member, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={member}
                        onChange={(e) =>
                          handleArrayChange('team', index, e.target.value)
                        }
                        placeholder={`Member ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('team', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <UserMinus className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addArrayItem('team')}
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <UserPlus className="w-4 h-4 mr-1" />
                    Add Team Member
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Features
                  </label>
                  {formik.values.features.map((feature, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) =>
                          handleArrayChange('features', index, e.target.value)
                        }
                        placeholder={`Feature ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('features', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addArrayItem('features')}
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Feature
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Technologies
                  </label>
                  {formik.values.technologies.map((tech, index) => (
                    <div key={index} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tech}
                        onChange={(e) =>
                          handleArrayChange('technologies', index, e.target.value)
                        }
                        placeholder={`Technology ${index + 1}`}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      />
                      <button
                        type="button"
                        onClick={() => removeArrayItem('technologies', index)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addArrayItem('technologies')}
                    className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <PlusIcon className="w-4 h-4 mr-1" />
                    Add Technology
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  name="description"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.description}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.description && formik.errors.description && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Description
                </label>
                <textarea
                  name="fullDescription"
                  onChange={formik.handleChange}
                  value={formik.values.fullDescription}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Hero Image * (Max 10MB)
                </label>

                <div className="flex items-center gap-4">
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors overflow-hidden bg-gray-50">
                    {heroPreview ? (
                      <img
                        src={heroPreview}
                        alt="Hero preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <UploadCloud className="w-8 h-8 text-gray-400 mx-auto" />
                        <span className="text-xs text-gray-500">Upload</span>
                      </div>
                    )}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroChange}
                      className="hidden"
                    />
                  </label>

                  {heroPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setHeroFile(null);
                        setHeroPreview(null);
                        setHeroError(null);
                      }}
                      className="text-red-500 text-sm"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {heroError && (
                  <p className="text-red-500 text-xs mt-2">{heroError}</p>
                )}
                <p className="text-xs text-gray-500 mt-1">Maximum file size: 10 MB</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gallery Images (Max 10MB each)
                </label>

                <div className="flex flex-wrap gap-3 mb-3">
                  {galleryPreviews.map((preview, idx) => (
                    <div
                      key={idx}
                      className="relative w-20 h-20 rounded-lg overflow-hidden border border-gray-200"
                    >
                      <img
                        src={preview}
                        alt={`Gallery ${idx}`}
                        className="w-full h-full object-cover"
                      />

                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 bg-gray-50">
                    <UploadCloud className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500">Add</span>

                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleGalleryChange}
                      className="hidden"
                    />
                  </label>
                </div>

                {galleryErrors.length > 0 && (
                  <div className="space-y-1">
                    {galleryErrors.map((err, idx) => (
                      <p key={idx} className="text-red-500 text-xs">{err}</p>
                    ))}
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-1">Each image must be less than 10 MB</p>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {project ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminProjects;