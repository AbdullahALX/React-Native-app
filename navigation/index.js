import React from 'react';
import UserStack from './UserStack.js';
import AuthStack from './AuthStack.js';
import { useAuth } from '../componets/useAuth.js';

export default function RootNavigationStack() {
  const { user } = useAuth();

  return user ? <UserStack /> : <AuthStack />;
}
