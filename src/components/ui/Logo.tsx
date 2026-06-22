import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '@/theme';

interface LogoProps {
  size?: number;
  showTagline?: boolean;
}

/** Marca VanBora: "Van" em preto, "Bora" em amarelo + ícone de van. */
export function Logo({ size = 28, showTagline = false }: LogoProps) {
  return (
    <View style={styles.wrap}>
      <View style={styles.row}>
        <Ionicons name="bus" size={size} color={colors.brand} style={styles.icon} />
        <Text style={[styles.word, { fontSize: size }]}>
          Van<Text style={{ color: colors.brand }}>Bora</Text>
        </Text>
      </View>
      {showTagline ? (
        <Text style={styles.tagline}>TRANSPORTE ESCOLAR INTELIGENTE</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 6,
    transform: [{ scaleX: -1 }],
  },
  word: {
    fontWeight: '800',
    color: colors.black,
    letterSpacing: 0.5,
  },
  tagline: {
    marginTop: 4,
    fontSize: 9,
    letterSpacing: 1.5,
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
