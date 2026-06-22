import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Card, Screen, SectionTitle } from '@/components';
import { useAppState } from '@/context/AppState';
import { dependents } from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';

const SETTINGS = [
  { icon: 'lock-closed-outline', label: 'Alterar Senha' },
  { icon: 'notifications-outline', label: 'Notificações' },
  { icon: 'document-text-outline', label: 'Termos de Uso' },
] as const;

/** Perfil do Responsável: dados, dependentes e configurações. */
export default function GuardianProfileScreen() {
  const { setRole, setHasTransporter } = useAppState();

  function handleLogout() {
    setRole(null);
    setHasTransporter(false);
    router.replace('/(auth)/welcome');
  }

  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.title]}>Meu Perfil</Text>

      <View style={styles.profileRow}>
        <Avatar name="Mariana Costa" size={52} />
        <View style={styles.profileInfo}>
          <Text style={typography.cardTitle}>Mariana Costa</Text>
          <Text style={styles.email}>mariana.costa@email.com</Text>
        </View>
      </View>

      <SectionTitle title="Meus Dependentes" style={styles.section} />
      <View style={styles.list}>
        {dependents.map((dep) => (
          <Card key={dep.id} style={styles.dependentCard}>
            <Avatar name={dep.name} size={40} tone="neutral" />
            <View style={styles.dependentInfo}>
              <Text style={styles.dependentName}>{dep.name}</Text>
              <Text style={styles.dependentSchool}>{dep.school}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Card>
        ))}
      </View>

      <Button label="Adicionar Dependente" variant="outline" icon="add" style={styles.addBtn} />

      <SectionTitle title="Configurações" style={styles.section} />
      <Card padded={false}>
        {SETTINGS.map((item, index) => (
          <Pressable
            key={item.label}
            style={[styles.settingRow, index < SETTINGS.length - 1 && styles.settingDivider]}
          >
            <Ionicons name={item.icon} size={18} color={colors.textSecondary} />
            <Text style={styles.settingLabel}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>
        ))}
      </Card>

      <Pressable style={styles.logout} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={18} color={colors.danger} />
        <Text style={styles.logoutText}>Sair</Text>
      </Pressable>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  profileInfo: {
    gap: 2,
  },
  email: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  dependentCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  dependentInfo: {
    flex: 1,
    gap: 2,
  },
  dependentName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  dependentSchool: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addBtn: {
    marginTop: spacing.lg,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
  },
  settingDivider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: colors.textPrimary,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.xl,
    paddingVertical: spacing.md,
  },
  logoutText: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.danger,
  },
});
