export { colors } from './colors';
export type { ColorName } from './colors';
export { spacing, radius } from './spacing';
export { typography } from './typography';

/** Sombra leve padronizada para cards. */
export const cardShadow = {
  shadowColor: '#000000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.06,
  shadowRadius: 8,
  elevation: 2,
} as const;
