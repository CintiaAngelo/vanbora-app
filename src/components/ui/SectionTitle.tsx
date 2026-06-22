import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, spacing, typography } from '@/theme';

interface SectionTitleProps {
  title: string;
  /** Ação textual à direita (ex.: "Gerenciar Avisos"). */
  actionLabel?: string;
  onAction?: () => void;
  style?: object;
}

/** Título de seção com ação opcional alinhada à direita. */
export function SectionTitle({ title, actionLabel, onAction, style }: SectionTitleProps) {
  return (
    <View style={[styles.row, style]}>
      <Text style={typography.sectionTitle}>{title}</Text>
      {actionLabel ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <Text style={styles.action}>{actionLabel}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  action: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.brandDark,
  },
});
