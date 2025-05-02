'use client';

import { UserProfile } from '@clerk/nextjs';
import React from 'react';

function Settings() {
  return (
    <div className="flex items-center justify-center h-full py-10">
      <UserProfile routing="path" path="/dashboard/settings" />
    </div>
  );
}

export default Settings;