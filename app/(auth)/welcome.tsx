import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { Button, Logo, Screen } from '@/components';
import { spacing } from '@/theme';

/** Tela inicial: marca + botões Entrar / Criar Conta. */
export default function WelcomeScreen() {
  return (
    <Screen scroll={false} contentStyle={styles.content}>
      <View style={styles.logo}>
        <Logo size={36} showTagline />
      </View>

      <View style={styles.actions}>
        <Button label="Entrar" onPress={() => router.push('/(auth)/login')} />
        <Button
          label="Criar Conta"
          variant="secondary"
          onPress={() => router.push('/(auth)/profile-select')}
          style={styles.spaced}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    marginBottom: spacing.xxxl * 2,
  },
  actions: {
    width: '100%',
  },
  spaced: {
    marginTop: spacing.md,
  },
});
