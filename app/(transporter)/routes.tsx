import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge, Button, Card, MapPlaceholder, Screen } from '@/components';
import { routeStops } from '@/data/mockData';
import { RouteStopStatus } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';

const stopBadge: Record<RouteStopStatus, { label: string; tone: 'success' | 'danger' | 'neutral' }> = {
  going: { label: 'VAI', tone: 'success' },
  not_going: { label: 'NÃO VAI', tone: 'danger' },
  school: { label: 'DESTINO', tone: 'neutral' },
};

/** Rota do dia com paradas e recálculo automático conforme confirmações. */
export default function RoutesScreen() {
  return (
    <Screen>
      <View style={styles.header}>
        <Text style={typography.screenTitle}>Rota do Dia</Text>
        <View style={styles.dateChip}>
          <Ionicons name="calendar-outline" size={13} color={colors.textSecondary} />
          <Text style={styles.dateText}>Hoje, 10 Mai</Text>
        </View>
      </View>

      <View style={styles.mapWrap}>
        <MapPlaceholder label="Mapa da Rota" height={200} />
        <Button label="Otimizar Rota" icon="navigate" style={styles.optimizeBtn} />
      </View>

      <View style={styles.list}>
        {routeStops.map((stop, index) => {
          const badge = stopBadge[stop.status];
          const isSchool = stop.status === 'school';
          return (
            <Card key={stop.id} style={styles.stopCard}>
              <View
                style={[styles.indexCircle, isSchool ? styles.indexSchool : styles.indexDefault]}
              >
                {isSchool ? (
                  <Ionicons name="flag" size={14} color={colors.textOnBrand} />
                ) : (
                  <Text style={styles.indexText}>{index + 1}</Text>
                )}
              </View>
              <View style={styles.stopInfo}>
                <Text style={styles.stopName}>{stop.studentName}</Text>
                <Text style={styles.stopAddress}>{stop.address}</Text>
              </View>
              <Badge label={badge.label} tone={badge.tone} />
            </Card>
          );
        })}
      </View>

      <Text style={styles.footnote}>
        Rota recalculada automaticamente com base nas confirmações de presença dos responsáveis.
      </Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.lg,
  },
  dateChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
  },
  dateText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  mapWrap: {
    position: 'relative',
    marginBottom: spacing.lg,
  },
  optimizeBtn: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    height: 40,
    paddingHorizontal: spacing.lg,
  },
  list: {
    gap: spacing.md,
  },
  stopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  indexCircle: {
    width: 30,
    height: 30,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  indexDefault: {
    backgroundColor: colors.brandSoft,
  },
  indexSchool: {
    backgroundColor: colors.brand,
  },
  indexText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  stopInfo: {
    flex: 1,
    gap: 2,
  },
  stopName: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  stopAddress: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  footnote: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
    lineHeight: 16,
  },
});
