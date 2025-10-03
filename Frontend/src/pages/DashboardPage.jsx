import React, { useEffect, useState } from 'react';
import { motion,AnimatePresence } from 'motion/react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchNotes, createNote, updateNote, deleteNote, setSearchQuery } from '../redux/slices/notesSlice';
import { FiPlus, FiSearch, FiEdit2, FiTrash2, FiX, FiSave } from 'react-icons/fi';
import { useFormik } from 'formik';
import { noteSchema } from '../utils/validators';

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { notes, loading, searchQuery } = useSelector((state) => state.notes);
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  useEffect(() => {
    dispatch(fetchNotes());
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
    },
    validationSchema: noteSchema,
    onSubmit: async (values, { resetForm }) => {
      if (editingNote) {
        await dispatch(updateNote({ id: editingNote._id, data: values }));
      } else {
        await dispatch(createNote(values));
      }
      resetForm();
      setIsModalOpen(false);
      setEditingNote(null);
    },
  });

  const handleEdit = (note) => {
    setEditingNote(note);
    formik.setValues({
      title: note.title,
      content: note.content,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    formik.resetForm();
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-white mb-2">
            Welcome back, {user?.fullName}!
          </h1>
          <p className="text-gray-400">Manage your notes and ideas securely</p>
        </motion.div>

        {/* Search and Add */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => dispatch(setSearchQuery(e.target.value))}
              className="input-field pl-10 w-full"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <FiPlus />
            <span>New Note</span>
          </motion.button>
        </motion.div>

        {/* Notes Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-400 text-lg">
              {searchQuery ? 'No notes found matching your search.' : 'No notes yet. Create your first note!'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="glass-effect rounded-xl p-6 card-hover"
              >
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {note.title}
                </h3>
                <p className="text-gray-400 mb-4 line-clamp-3">{note.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span>
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEdit(note)}
                    className="flex-1 bg-primary-500/20 hover:bg-primary-500/30 text-primary-400 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <FiEdit2 />
                    <span>Edit</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(note._id)}
                    className="flex-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                  >
                    <FiTrash2 />
                    <span>Delete</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-effect rounded-2xl p-8 w-full max-w-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">
                  {editingNote ? 'Edit Note' : 'Create New Note'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCloseModal}
                  className="text-gray-400 hover:text-white"
                >
                  <FiX size={24} />
                </motion.button>
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">
                    Title
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    className="input-field"
                    placeholder="Enter note title..."
                    {...formik.getFieldProps('title')}
                  />
                  {formik.touched.title && formik.errors.title && (
                    <p className="mt-2 text-sm text-red-400">{formik.errors.title}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-2">
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    rows="8"
                    className="input-field resize-none"
                    placeholder="Enter note content..."
                    {...formik.getFieldProps('content')}
                  />
                  {formik.touched.content && formik.errors.content && (
                    <p className="mt-2 text-sm text-red-400">{formik.errors.content}</p>
                  )}
                </div>

                <div className="flex gap-4">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCloseModal}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 btn-primary flex items-center justify-center space-x-2"
                  >
                    <FiSave />
                    <span>{editingNote ? 'Update' : 'Create'}</span>
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardPage;
