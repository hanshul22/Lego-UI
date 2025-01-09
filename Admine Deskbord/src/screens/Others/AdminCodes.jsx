import React from 'react';
import { motion } from 'framer-motion';
import {CodeCard} from '../../components/deskbordComponents';
// import { codeSnippets } from '../../data/dummyData';

import { useUserContext } from '../../services/Context';

const AdminCodes = () => {

  const { adminCodes } = useUserContext();


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6"
    >
      <h2 className="mb-6 text-3xl font-bold">Admin Code Snippets</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 h-full">
        {adminCodes.map(code => (
          <CodeCard key={code._id} code={code} />
        ))}
      </div>
    </motion.div>
  );
};

export default AdminCodes;