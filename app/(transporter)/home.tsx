import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Card, Screen, SectionTitle } from '@/components';
import {
  currentTransporterName,
  hireRequests,
  notices,
  transporterDashboard,
} from '@/data/mockData';
import { colors, spacing, typography } from '@/theme';

/** Dashboard do Transportador: métricas do dia, solicitações e avisos recentes. */
export default function TransporterHomeScreen() {
  const metrics = [
    { label: 'Alunos hoje', value: transporterDashboard.totalStudents, tone: colors.textPrimary },
    { label: 'Confirmados', value: transporterDashboard.confirmed, tone: colors.success },
    { label: 'Ausentes', value: transporterDashboard.absent, tone: colors.danger },
  ];

  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.greeting]}>
        Olá, {currentTransporterName}
      </Text>

      <View style={styles.metrics}>
        {metrics.map((m) => (
          <Card key={m.label} style={styles.metricCard}>
            <Text style={[styles.metricValue, { color: m.tone }]}>{m.value}</Text>
            <Text style={styles.metricLabel}>{m.label}</Text>
          </Card>
        ))}
      </View>

      <SectionTitle title="Solicitações de Contratação" style={styles.section} />
      <View style={styles.list}>
        {hireRequests.map((req) => (
          <Card key={req.id}>
            <Text style={styles.requestName}>{req.guardianName}</Text>
            <Text style={styles.requestDetail}>Filho: {req.studentName}</Text>
            <View style={styles.requestMeta}>
              <View style={styles.metaItem}>
                <Ionicons name="school-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{req.school}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                <Text style={styles.metaText}>{req.neighborhood}</Text>
              </View>
            </View>
            <View style={styles.requestActions}>
              <Button label="Aceitar" style={styles.acceptBtn} />
              <Button label="Recusar" variant="outline" style={styles.rejectBtn} />
            </View>
          </Card>
        ))}
      </View>

      <SectionTitle
        title="Avisos Recentes"
        actionLabel="Gerenciar Avisos"
        onAction={() => router.push('/notices')}
        style={styles.section}
      />
      <Card>
        <Text style={styles.noticeMessage}>{notices[0].message}</Text>
        <Text style={styles.noticeMeta}>
          Enviado em {notices[0].date} • {notices[0].recipients} responsáveis
        </Text>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  greeting: {
    marginBottom: spacing.xl,
  },
  metrics: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  metricCard: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  metricValue: {
    fontSize: 26,
    fontWeight: '800',
  },
  metricLabel: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginTop: spacing.xl,
  },
  list: {
    gap: spacing.md,
  },
  requestName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  requestDetail: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  requestMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  requestActions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  acceptBtn: {
    flex: 1,
    height: 44,
  },
  rejectBtn: {
    flex: 1,
    height: 44,
  },
  noticeMessage: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textPrimary,
  },
  noticeMeta: {
    fontSize: 11,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});
