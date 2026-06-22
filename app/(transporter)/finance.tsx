import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card, Screen } from '@/components';
import { financeSummary, formatCurrency } from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';

const REVENUE_TABS = ['Mensal', 'Semestral', 'Anual'];
const FUEL_TABS = ['Diário', 'Semanal', 'Mensal', 'Anual'];

/** Painel financeiro do transportador: recebimentos, gráfico e consumo. */
export default function FinanceScreen() {
  const [revenueTab, setRevenueTab] = useState('Mensal');
  const [fuelTab, setFuelTab] = useState('Mensal');

  const maxValue = Math.max(...financeSummary.monthlyRevenue.map((m) => m.value));

  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.title]}>Financeiro</Text>

      <Card highlighted style={styles.receivedCard}>
        <Text style={styles.receivedLabel}>Recebido este mês</Text>
        <Text style={styles.receivedValue}>{formatCurrency(financeSummary.receivedThisMonth)}</Text>
      </Card>

      <View style={styles.summaryRow}>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Pendente</Text>
          <Text style={[styles.summaryValue, { color: colors.warning }]}>
            {formatCurrency(financeSummary.pending)}
          </Text>
        </Card>
        <Card style={styles.summaryCard}>
          <Text style={styles.summaryLabel}>Vencido</Text>
          <Text style={[styles.summaryValue, { color: colors.danger }]}>
            {formatCurrency(financeSummary.overdue)}
          </Text>
        </Card>
      </View>

      <SegmentedTabs tabs={REVENUE_TABS} active={revenueTab} onChange={setRevenueTab} />

      <Card style={styles.chartCard}>
        <View style={styles.chart}>
          {financeSummary.monthlyRevenue.map((m, i) => {
            const isLast = i === financeSummary.monthlyRevenue.length - 1;
            return (
              <View key={m.label} style={styles.barColumn}>
                <View
                  style={[
                    styles.bar,
                    { height: `${(m.value / maxValue) * 100}%` },
                    isLast ? styles.barActive : styles.barInactive,
                  ]}
                />
                <Text style={styles.barLabel}>{m.label}</Text>
              </View>
            );
          })}
        </View>
      </Card>

      <Text style={[typography.sectionTitle, styles.fuelTitle]}>Consumo de Combustível</Text>
      <SegmentedTabs tabs={FUEL_TABS} active={fuelTab} onChange={setFuelTab} />

      <Card style={styles.fuelCard}>
        <Ionicons name="trending-up" size={28} color={colors.brandDark} />
        <Text style={styles.fuelText}>Acompanhe seus gastos com combustível ao longo do tempo.</Text>
      </Card>
    </Screen>
  );
}

function SegmentedTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (t: string) => void;
}) {
  return (
    <View style={styles.segment}>
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <Pressable
            key={tab}
            onPress={() => onChange(tab)}
            style={[styles.segmentItem, isActive && styles.segmentItemActive]}
          >
            <Text style={[styles.segmentText, isActive && styles.segmentTextActive]}>{tab}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.lg,
  },
  receivedCard: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  receivedLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textOnBrand,
  },
  receivedValue: {
    fontSize: 30,
    fontWeight: '800',
    color: colors.textOnBrand,
    marginTop: 4,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  summaryCard: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  summaryValue: {
    fontSize: 18,
    fontWeight: '800',
    marginTop: 4,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: radius.md,
    padding: 4,
    marginTop: spacing.xl,
  },
  segmentItem: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
    alignItems: 'center',
  },
  segmentItemActive: {
    backgroundColor: colors.white,
  },
  segmentText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  segmentTextActive: {
    color: colors.textPrimary,
  },
  chartCard: {
    marginTop: spacing.md,
  },
  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 160,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
    gap: spacing.sm,
  },
  bar: {
    width: 26,
    borderRadius: radius.sm,
    minHeight: 8,
  },
  barActive: {
    backgroundColor: colors.brand,
  },
  barInactive: {
    backgroundColor: colors.border,
  },
  barLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  fuelTitle: {
    marginTop: spacing.xl,
  },
  fuelCard: {
    marginTop: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.xl,
  },
  fuelText: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});
