import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { AppHeader, Button, Input, Screen, StepProgress } from '@/components';
import { spacing, typography } from '@/theme';

/** Cadastro do transportador — Etapa 1: dados pessoais e do veículo. */
export default function RegisterTransporterScreen() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    document: '',
    email: '',
    cnh: '',
    plate: '',
    capacity: '',
  });

  const update = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  return (
    <Screen
      footer={
        <Button
          label="Próximo"
          onPress={() => router.push('/(auth)/register-transporter-zones')}
        />
      }
    >
      <AppHeader title="Criar Conta" showBack />
      <StepProgress steps={2} current={1} />
      <Text style={[typography.sectionTitle, styles.section]}>Dados do Transportador</Text>

      <View style={styles.form}>
        <Input placeholder="Nome Completo" value={form.name} onChangeText={update('name')} />
        <Input
          placeholder="Telefone (Celular)"
          keyboardType="phone-pad"
          value={form.phone}
          onChangeText={update('phone')}
        />
        <Input
          placeholder="CPF / CNPJ"
          keyboardType="numeric"
          value={form.document}
          onChangeText={update('document')}
        />
        <Input
          placeholder="E-mail"
          autoCapitalize="none"
          keyboardType="email-address"
          value={form.email}
          onChangeText={update('email')}
        />
        <Input placeholder="CNH" keyboardType="numeric" value={form.cnh} onChangeText={update('cnh')} />
        <View style={styles.row}>
          <Input
            placeholder="Placa do Veículo"
            autoCapitalize="characters"
            value={form.plate}
            onChangeText={update('plate')}
            containerStyle={styles.rowItem}
          />
          <Input
            placeholder="Lotação Máx."
            keyboardType="numeric"
            value={form.capacity}
            onChangeText={update('capacity')}
            containerStyle={styles.rowItem}
          />
        </View>
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
