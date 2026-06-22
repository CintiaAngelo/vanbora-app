import { TextStyle } from 'react-native';
import { colors } from './colors';

/** Estilos tipográficos reutilizáveis. */
export const typography = {
  screenTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  body: {
    fontSize: 14,
    fontWeight: '400',
    color: colors.textPrimary,
  },
  label: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: '400',
    color: colors.textSecondary,
  },
  button: {
    fontSize: 16,
    fontWeight: '700',
  },
} satisfies Record<string, TextStyle>;
