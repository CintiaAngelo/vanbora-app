import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader, Button, Input, Screen } from '@/components';
import { useAppState } from '@/context/AppState';
import { spacing, typography } from '@/theme';

/** Cadastro do responsável. Ao concluir, entra com dashboard vazio (sem transportador). */
export default function RegisterGuardianScreen() {
  const { setRole, setHasTransporter } = useAppState();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    cpf: '',
    email: '',
    cep: '',
    city: '',
    neighborhood: '',
    password: '',
    confirmPassword: '',
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  function handleRegister() {
    setRole('guardian');
    setHasTransporter(false);
    router.replace('/(guardian)/home');
  }

  return (
    <Screen footer={<Button label="Cadastrar" onPress={handleRegister} />}>
      <AppHeader title="Criar Conta" showBack />
      <Text style={[typography.sectionTitle, styles.section]}>Dados do Responsável</Text>

      <View style={styles.form}>
        <Input placeholder="Nome Completo" value={form.name} onChangeText={update('name')} />
        <Input
          placeholder="Telefone (Celular)"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={update('phone')}
        />
        <Input
          placeholder="CPF"
          keyboardType="numeric"
          value={form.cpf}
          onChangeText={update('cpf')}
        />
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={update('email')}
        />
        <Input
          placeholder="CEP"
          keyboardType="numeric"
          value={form.cep}
          onChangeText={update('cep')}
        />
        <View style={styles.row}>
          <Input
            placeholder="Cidade"
            value={form.city}
            onChangeText={update('city')}
            containerStyle={styles.rowItem}
          />
          <Input
            placeholder="Bairro"
            value={form.neighborhood}
            onChangeText={update('neighborhood')}
            containerStyle={styles.rowItem}
          />
        </View>
        <Input
          placeholder="Senha"
          password
          value={form.password}
          onChangeText={update('password')}
        />
        <Input
          placeholder="Confirmar Senha"
          password
          value={form.confirmPassword}
          onChangeText={update('confirmPassword')}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  rowItem: {
    flex: 1,
  },
});
