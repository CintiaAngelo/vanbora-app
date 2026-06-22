import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Card, Chip, Screen, SectionTitle } from '@/components';
import { useAppState } from '@/context/AppState';
import { helpers, transporterProfile } from '@/data/mockData';
import { colors, spacing, typography } from '@/theme';

const SETTINGS = [
  { icon: 'lock-closed-outline', label: 'Alterar Senha' },
  { icon: 'notifications-outline', label: 'Notificações' },
  { icon: 'document-text-outline', label: 'Termos de Uso' },
] as const;

/** Perfil do Transportador: dados do veículo, ajudantes, atendimento e configurações. */
export default function TransporterProfileScreen() {
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
        <Avatar name={transporterProfile.name} size={52} />
        <View style={styles.profileInfo}>
          <Text style={typography.cardTitle}>{transporterProfile.name}</Text>
          <Text style={styles.meta}>
            CNH {transporterProfile.cnh} • Placa {transporterProfile.plate}
          </Text>
          <Text style={styles.meta}>Capacidade: {transporterProfile.capacity} lugares</Text>
        </View>
      </View>

      <Button
        label="Ver Meus Alunos"
        icon="people-outline"
        onPress={() => router.push('/students')}
        style={styles.studentsBtn}
      />

      <SectionTitle title="Meus Ajudantes" style={styles.section} />
      <View style={styles.list}>
        {helpers.map((h) => (
          <Card key={h.id} style={styles.helperCard}>
            <Avatar name={h.name} size={40} tone="neutral" />
            <View style={styles.helperInfo}>
              <Text style={styles.helperName}>{h.name}</Text>
              <Text style={styles.helperRole}>{h.role}</Text>
            </View>
          </Card>
        ))}
      </View>
      <Button label="Adicionar Ajudante" variant="outline" icon="add" style={styles.addBtn} />

      <SectionTitle title="Área de Atendimento" style={styles.section} />
      <View style={styles.chips}>
        {transporterProfile.neighborhoods.map((n) => (
          <Chip key={n} label={n} />
        ))}
        {transporterProfile.schools.map((s) => (
          <Chip key={s} label={s} selected />
        ))}
      </View>

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
    marginBottom: spacing.lg,
  },
  profileInfo: {
    flex: 1,
    gap: 2,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  studentsBtn: {
    marginBottom: spacing.sm,
  },
  section: {
    marginTop: spacing.xl,
  },
  list: {
    gap: spacing.md,
  },
  helperCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  helperInfo: {
    gap: 2,
  },
  helperName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  helperRole: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  addBtn: {
    marginTop: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
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
