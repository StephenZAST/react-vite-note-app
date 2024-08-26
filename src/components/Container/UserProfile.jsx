import React from 'react';
import 'daisyui/dist/full.css';

const UserProfile = ({ user }) => {
  if (!user) {
    console.error('User not found');
    return null;
  }

  console.log('User found in context:', user);

  const initials = user.displayName ? user.displayName.charAt(0) : user.email.charAt(0);

  return (
    <div className="flex items-center">
      <div className={`avatar ${user.isOnline ? 'online' : ''}`}>
        {user.photoURL ? (
          <div className="w-24 rounded-full">
            <img src={user.photoURL} alt="Profile" />
          </div>
        ) : (
          <div className="bg-neutral text-neutral-content w-16 rounded-full">
            <span className="text-xl">{initials}</span>
          </div>
        )}
      </div>
      <div className="ml-4">
        <span>{user.displayName || user.email}</span>
      </div>
    </div>
  );
};

export default UserProfile;
