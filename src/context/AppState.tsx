import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { UserRole } from '@/types';

interface AppState {
  role: UserRole | null;
  /** Indica se o responsável já contratou um transportador. */
  hasTransporter: boolean;
  setRole: (role: UserRole | null) => void;
  setHasTransporter: (value: boolean) => void;
}

const AppStateContext = createContext<AppState | undefined>(undefined);

/**
 * Estado global leve do protótipo (perfil ativo e se há transportador contratado).
 * Mantido em memória — será integrado a autenticação/persistência futuramente.
 */
export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [hasTransporter, setHasTransporter] = useState(false);

  const handleSetHasTransporter = useCallback((value: boolean) => {
    setHasTransporter(value);
  }, []);

  const value = useMemo(
    () => ({ role, hasTransporter, setRole, setHasTransporter: handleSetHasTransporter }),
    [role, hasTransporter, handleSetHasTransporter],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState(): AppState {
  const ctx = useContext(AppStateContext);
  if (!ctx) {
    throw new Error('useAppState deve ser usado dentro de AppStateProvider');
  }
  return ctx;
}
