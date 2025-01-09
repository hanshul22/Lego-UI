import React from 'react';
import { motion } from 'framer-motion';
import { FaCopy } from 'react-icons/fa';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeViewer = ({ code, language }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={copyToClipboard}
        className="absolute right-4 top-4 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors"
      >
        <FaCopy />
      </motion.button>

      <SyntaxHighlighter
        language={language}
        style={atomOneDark}
        className="rounded-lg !bg-gray-800"
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeViewer;