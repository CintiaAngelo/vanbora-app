import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, Badge, Button, Card, Screen } from '@/components';
import { formatCurrency, nextPayment, paymentHistory } from '@/data/mockData';
import { PaymentStatus } from '@/types';
import { colors, spacing, typography } from '@/theme';

const statusBadge: Record<PaymentStatus, { label: string; tone: 'success' | 'warning' | 'danger' }> = {
  paid: { label: 'PAGO', tone: 'success' },
  pending: { label: 'PENDENTE', tone: 'warning' },
  overdue: { label: 'ATRASADO', tone: 'danger' },
};

/** Histórico de pagamentos do responsável com a mensalidade pendente em destaque. */
export default function PaymentsScreen() {
  return (
    <Screen>
      <AppHeader title="Pagamentos" showBack />

      <Card highlighted>
        <View style={styles.pendingHeader}>
          <Text style={styles.pendingTitle}>{nextPayment.referenceMonth} — Pendente</Text>
          <Ionicons name="information-circle-outline" size={18} color={colors.textMuted} />
        </View>
        <Text style={styles.pendingLabel}>Valor da mensalidade</Text>
        <Text style={styles.pendingValue}>{formatCurrency(nextPayment.amount)}</Text>
        <Text style={styles.pendingDue}>Vence em 10/05</Text>
        <Button label="Pagar agora" style={styles.payBtn} />
      </Card>

      <Text style={[typography.sectionTitle, styles.historyTitle]}>Histórico</Text>

      <Card padded={false}>
        {paymentHistory.map((item, index) => {
          const badge = statusBadge[item.status];
          return (
            <View
              key={item.id}
              style={[styles.historyRow, index < paymentHistory.length - 1 && styles.divider]}
            >
              <View>
                <Text style={styles.historyMonth}>{item.referenceMonth}</Text>
                <Text style={styles.historyAmount}>{formatCurrency(item.amount)}</Text>
              </View>
              <Badge label={badge.label} tone={badge.tone} />
            </View>
          );
        })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  pendingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pendingTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  pendingLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  pendingValue: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  pendingDue: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 4,
  },
  payBtn: {
    marginTop: spacing.lg,
  },
  historyTitle: {
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  historyMonth: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  historyAmount: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
