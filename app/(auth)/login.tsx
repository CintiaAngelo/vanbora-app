import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader, Button, Input, Logo, Screen } from '@/components';
import { useAppState } from '@/context/AppState';
import { colors, spacing, typography } from '@/theme';

/** Login. Usuário existente entra como responsável com transportador já contratado. */
export default function LoginScreen() {
  const { setRole, setHasTransporter } = useAppState();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    // Protótipo: simula um responsável já com transportador contratado.
    setRole('guardian');
    setHasTransporter(true);
    router.replace('/(guardian)/home');
  }

  return (
    <Screen contentStyle={styles.content}>
      <AppHeader showBack onBack={() => router.back()} />

      <View style={styles.logo}>
        <Logo size={30} />
      </View>

      <Text style={[typography.title, styles.title]}>Acesse sua conta</Text>
      <Text style={styles.subtitle}>Insira seu e-mail e senha para continuar</Text>

      <View style={styles.form}>
        <Input
          icon="mail-outline"
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          icon="lock-closed-outline"
          placeholder="Senha"
          password
          value={password}
          onChangeText={setPassword}
          containerStyle={styles.spaced}
        />
        <Pressable hitSlop={8} style={styles.forgot}>
          <Text style={styles.forgotText}>Esqueci minha senha</Text>
        </Pressable>
      </View>

      <Button label="Entrar" onPress={handleLogin} style={styles.submit} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  logo: {
    alignItems: 'center',
    marginVertical: spacing.xl,
  },
  title: {
    textAlign: 'center',
  },
  subtitle: {
    textAlign: 'center',
    color: colors.textSecondary,
    marginTop: spacing.xs,
    marginBottom: spacing.xxl,
  },
  form: {
    flex: 1,
  },
  spaced: {
    marginTop: spacing.md,
  },
  forgot: {
    alignSelf: 'flex-end',
    marginTop: spacing.md,
  },
  forgotText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: '500',
  },
  submit: {
    marginTop: spacing.xl,
  },
});
