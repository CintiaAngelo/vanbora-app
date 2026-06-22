import React from 'react';
import { Stack } from 'expo-router';

/** Stack do fluxo de autenticação e cadastro. */
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
