/**
 * Paleta de cores da marca VanBora.
 * Amarelo (#F5C518) + preto sobre fundo branco, conforme protótipo.
 */
export const colors = {
  brand: '#F5C518',
  brandDark: '#E0B200',
  brandSoft: '#FFF9E6',

  black: '#111111',
  white: '#FFFFFF',

  background: '#FFFFFF',
  surface: '#FFFFFF',

  textPrimary: '#1A1A1A',
  textSecondary: '#8A8A8E',
  textMuted: '#AAAAAF',
  textOnBrand: '#1A1A1A',

  border: '#ECECEC',
  borderStrong: '#DEDEE2',
  inputBorder: '#E4E4E7',

  success: '#1E9E54',
  successBg: '#E7F7EC',
  warning: '#C8860D',
  warningBg: '#FFF6E0',
  danger: '#D64545',
  dangerBg: '#FBE9E9',

  star: '#F5B301',
  mapBg: '#EFEFF2',

  shadow: '#000000',
} as const;

export type ColorName = keyof typeof colors;
