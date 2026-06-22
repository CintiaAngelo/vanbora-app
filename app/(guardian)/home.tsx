import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Screen } from '@/components';
import { useAppState } from '@/context/AppState';
import {
  currentGuardianName,
  formatCurrency,
  guardianNotice,
  nextPayment,
  weekAttendance,
} from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';

function greeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
}

/** Dashboard do Responsável — alterna entre estado vazio e populado. */
export default function GuardianHomeScreen() {
  const { hasTransporter } = useAppState();

  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.greeting]}>
        {greeting()}, {currentGuardianName}
      </Text>

      {hasTransporter ? <PopulatedDashboard /> : <EmptyDashboard />}
    </Screen>
  );
}

function PopulatedDashboard() {
  return (
    <View style={styles.body}>
      <Card style={styles.noticeCard}>
        <View style={styles.noticeHeader}>
          <Ionicons name="megaphone-outline" size={18} color={colors.brandDark} />
          <Text style={styles.noticeTitle}>{guardianNotice.title}</Text>
        </View>
        <Text style={styles.noticeMessage}>{guardianNotice.message}</Text>
      </Card>

      <Card>
        <View style={styles.attendanceHeader}>
          <Text style={typography.sectionTitle}>Presença da Semana</Text>
          <Text style={styles.studentName}>Lucas</Text>
        </View>
        <View style={styles.daysRow}>
          {weekAttendance.map((d) => (
            <View key={d.day} style={styles.dayItem}>
              <Text style={styles.dayLabel}>{d.day}</Text>
              <View
                style={[
                  styles.dayCircle,
                  d.present ? styles.dayPresent : styles.dayAbsent,
                ]}
              >
                <Ionicons
                  name={d.present ? 'checkmark' : 'close'}
                  size={16}
                  color={d.present ? colors.textOnBrand : colors.danger}
                />
              </View>
            </View>
          ))}
        </View>
      </Card>

      <Card>
        <View style={styles.paymentRow}>
          <View style={styles.paymentInfo}>
            <View style={styles.paymentLabelRow}>
              <Ionicons name="cash-outline" size={16} color={colors.textSecondary} />
              <Text style={styles.paymentLabel}>Próximo Pagamento</Text>
            </View>
            <Text style={styles.paymentValue}>{formatCurrency(nextPayment.amount)}</Text>
            <Text style={styles.paymentDue}>Vencimento: {nextPayment.dueDate}</Text>
          </View>
          <Button label="Pagar" onPress={() => router.push('/payments')} style={styles.payBtn} />
        </View>
      </Card>
    </View>
  );
}

function EmptyDashboard() {
  return (
    <View style={styles.empty}>
      <View style={styles.emptyIcon}>
        <Ionicons name="bus-outline" size={42} color={colors.textMuted} />
      </View>
      <Text style={styles.emptyTitle}>Você ainda não tem um transportador contratado.</Text>
      <Text style={styles.emptyText}>
        Encontre o transporte ideal para o seu filho e acompanhe tudo pelo aplicativo.
      </Text>
      <Button
        label="Buscar Transportador"
        icon="search"
        onPress={() => router.push('/(guardian)/search')}
        style={styles.emptyBtn}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: spacing.xl,
  },
  body: {
    gap: spacing.lg,
  },
  noticeCard: {
    backgroundColor: colors.brandSoft,
    borderColor: colors.brand,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  noticeTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  noticeMessage: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  attendanceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  studentName: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  daysRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayItem: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  dayLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  dayCircle: {
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayPresent: {
    backgroundColor: colors.brand,
  },
  dayAbsent: {
    backgroundColor: colors.dangerBg,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  paymentInfo: {
    flex: 1,
  },
  paymentLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  paymentLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  paymentValue: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 4,
  },
  paymentDue: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
  payBtn: {
    height: 44,
    paddingHorizontal: spacing.xl,
  },
  empty: {
    alignItems: 'center',
    paddingTop: spacing.xxxl * 2,
  },
  emptyIcon: {
    width: 96,
    height: 96,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 19,
    paddingHorizontal: spacing.lg,
  },
  emptyBtn: {
    marginTop: spacing.xxl,
    alignSelf: 'stretch',
  },
});
