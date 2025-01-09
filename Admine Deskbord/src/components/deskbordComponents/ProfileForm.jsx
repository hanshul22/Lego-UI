import React from 'react';
import { motion } from 'framer-motion';

const ProfileForm = ({ profile, onChange, onSubmit }) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={profile.name}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* If you want to add image URL input, uncomment the following block */}
      {/* <div>
        <label className="block text-sm font-medium mb-1">Profile Image URL</label>
        <input
          type="text"
          name="image"
          value={profile.image}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div> */}

      <div>
        <label className="block text-sm font-medium mb-1">Current Password</label>
        <input
          type="password"
          name="currentPassword"
          value={profile.currentPassword}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">New Password</label>
        <input
          type="password"
          name="newPassword"
          value={profile.newPassword}
          onChange={onChange}
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Save Changes
      </motion.button>
    </form>
  );
};

export default ProfileForm;