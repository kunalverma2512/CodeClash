// src/components/NoteEditorModal.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import axios from "axios";
import { toast } from 'react-toastify';

const AddNotesModal = ({ isOpen, onClose, problem }) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/cf-Problems/addNotes", {
        problemId: `${problem.contestId}${problem.index}`,
        contestId: problem.contestId,
        title:problem.name,
        content: editor.getHTML(),
      },{
        withCredentials:true
      });
      toast.success("Added Successfully")
      console.log("Saved:", response.data);
      onClose();
    } catch (error) {
      console.error("Error saving note:", error);
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/20 p-4"
    >
      <motion.div
        initial={{ y: -50, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 50, scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-white dark:bg-gray-900 p-6 rounded-2xl max-w-2xl w-full shadow-xl border border-gray-300 dark:border-gray-700"
      >
        
        <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">📝 Add Note</h2>
        <div className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-800">
          <EditorContent editor={editor} />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="cursor-pointer px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
  );
};

export default AddNotesModal;
