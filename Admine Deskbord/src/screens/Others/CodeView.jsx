import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useParams } from 'react-router-dom';
import {EditCodeForm, CodeViewer} from '../../components/deskbordComponents';
import { FaGithub, FaExternalLinkAlt, FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from "react-icons/ri";
// import { codeSnippets } from '../../data/dummyData';
import { useUserContext } from '../../services/Context';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const CodeView = () => {
  const { id } = useParams();
  const { adminCodes, updateAdminCodes, removeAdminCode } = useUserContext();
  const navigate = useNavigate();

  console.log('URL id:', id);
  console.log('Admin Codes:', adminCodes);

  const codeSnippet = adminCodes.find(code => code._id === id);
  console.log('Found Code Snippet:', codeSnippet);

  if (!adminCodes) {
    return <div>Loading...</div>;
  }

  const [activeTab, setActiveTab] = useState('html');
  const [isEditing, setIsEditing] = useState(false);
  
  if (!codeSnippet) {
    return <div>Code snippet not found</div>;
  }

  const tabs = [
    { id: 'html', label: 'HTML' },
    { id: 'css', label: 'CSS' },
    { id: 'js', label: 'JavaScript' }
  ];

  const handleEditSubmit = (updatedCode) => {
    updateAdminCodes(updatedCode);
    setIsEditing(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`http://localhost:500/api/admin/delete/${codeSnippet._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      removeAdminCode(codeSnippet._id);
      toast.success('Snippet deleted successfully!');
      await navigate('/admin-codes');
    } catch (error) {
      console.error('Error deleting code snippet:', error);
      toast.error('Failed to delete snippet.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <div className="max-w-4xl mx-auto">
        {!isEditing ? (
          <>
            <div className="mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="mb-2 text-3xl font-bold">{codeSnippet.title}</h2>
                  <p className="text-gray-400">{codeSnippet.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsEditing(true)}
                  className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700"
                >
                  <FaEdit size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDelete}
                  className="p-2 bg-red-600 rounded-lg hover:bg-red-700"
                >
                  <RiDeleteBin6Line size={20} />
                </motion.button>
                </div>
                
              </div>

              <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
                {codeSnippet.image && (
                  <div className="overflow-hidden bg-gray-800 rounded-lg">
                    <img
                      src={codeSnippet.image}
                      alt={codeSnippet.title}
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
                
                {codeSnippet.video && (
                  <div className="overflow-hidden bg-gray-800 rounded-lg">
                    <video
                      src={codeSnippet.video}
                      controls
                      className="object-cover w-full h-48"
                    />
                  </div>
                )}
              </div>

              <div className="flex gap-4 mb-6">
                {codeSnippet.githubUrl && (
                  <a
                    href={codeSnippet.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                )}
                
                {codeSnippet.deployedUrl && (
                  <a
                    href={codeSnippet.deployedUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-gray-400 hover:text-white"
                  >
                    <FaExternalLinkAlt /> View Demo
                  </a>
                )}
              </div>
            </div>

            <div className="overflow-hidden bg-gray-800 rounded-lg">
              <div className="flex border-b border-gray-700">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 ${
                      activeTab === tab.id
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="p-4">
                <CodeViewer
                  code={codeSnippet.code[activeTab]}
                  language={activeTab}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="p-6 bg-gray-800 rounded-lg">
            <h2 className="mb-6 text-2xl font-bold">Edit Code Snippet</h2>
            <EditCodeForm
              code={codeSnippet}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditing(false)}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default CodeView;