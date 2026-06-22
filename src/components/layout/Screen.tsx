import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { Edge, SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '@/theme';

interface ScreenProps {
  children: React.ReactNode;
  /** Habilita rolagem vertical do conteúdo. */
  scroll?: boolean;
  /** Aplica padding horizontal padrão. */
  padded?: boolean;
  edges?: readonly Edge[];
  contentStyle?: ViewStyle;
  /** Conteúdo fixo no rodapé (fora da área rolável). */
  footer?: React.ReactNode;
}

/**
 * Container base de todas as telas: SafeArea + scroll opcional + teclado.
 */
export function Screen({
  children,
  scroll = true,
  padded = true,
  edges = ['top'],
  contentStyle,
  footer,
}: ScreenProps) {
  const inner = (
    <View style={[styles.flex, padded && styles.padded, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scroll ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[styles.scrollContent, padded && styles.padded, contentStyle]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          inner
        )}
        {footer ? <View style={[padded && styles.padded, styles.footer]}>{footer}</View> : null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  padded: {
    paddingHorizontal: spacing.xl,
  },
  scrollContent: {
    paddingBottom: spacing.xxxl,
    flexGrow: 1,
  },
  footer: {
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
});
