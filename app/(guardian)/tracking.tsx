import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge, Card, MapPlaceholder, Screen } from '@/components';
import { trackingTrip } from '@/data/mockData';
import { TripStepStatus } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';

const stepVisual: Record<TripStepStatus, { icon: keyof typeof Ionicons.glyphMap; color: string }> = {
  done: { icon: 'checkmark-circle', color: colors.success },
  in_progress: { icon: 'time', color: colors.warning },
  waiting: { icon: 'ellipse-outline', color: colors.textMuted },
};

/** Rastreamento em tempo real do trajeto do aluno. */
export default function TrackingScreen() {
  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.title]}>Rastreamento</Text>

      <MapPlaceholder height={240} />

      <Card style={styles.card}>
        <View style={styles.header}>
          <View>
            <Text style={styles.studentName}>{trackingTrip.studentName}</Text>
            <Text style={styles.transporter}>
              Transportador: {trackingTrip.transporterName}
            </Text>
          </View>
          <Badge label={trackingTrip.badge} tone="warning" />
        </View>

        <View style={styles.steps}>
          {trackingTrip.steps.map((step, index) => {
            const visual = stepVisual[step.status];
            const isLast = index === trackingTrip.steps.length - 1;
            return (
              <View key={step.id} style={styles.stepRow}>
                <View style={styles.stepIndicator}>
                  <Ionicons name={visual.icon} size={22} color={visual.color} />
                  {!isLast ? <View style={styles.connector} /> : null}
                </View>
                <View style={styles.stepContent}>
                  <Text style={styles.stepLabel}>{step.label}</Text>
                  {step.time ? <Text style={styles.stepTime}>{step.time}</Text> : null}
                </View>
              </View>
            );
          })}
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.lg,
  },
  card: {
    marginTop: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  transporter: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 2,
  },
  steps: {
    marginTop: spacing.sm,
  },
  stepRow: {
    flexDirection: 'row',
  },
  stepIndicator: {
    alignItems: 'center',
    width: 24,
  },
  connector: {
    width: 2,
    flex: 1,
    minHeight: 22,
    backgroundColor: colors.border,
    marginVertical: 2,
  },
  stepContent: {
    flex: 1,
    paddingLeft: spacing.md,
    paddingBottom: spacing.lg,
  },
  stepLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stepTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
