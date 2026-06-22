import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, Card, Screen } from '@/components';
import { notices } from '@/data/mockData';
import { colors, radius, spacing } from '@/theme';

/** Gerenciamento de avisos em massa enviados aos responsáveis. */
export default function NoticesScreen() {
  return (
    <Screen>
      <AppHeader
        title="Avisos"
        showBack
        right={
          <Pressable style={styles.newBtn}>
            <Ionicons name="add" size={16} color={colors.textOnBrand} />
            <Text style={styles.newBtnText}>Novo Aviso</Text>
          </Pressable>
        }
      />

      <View style={styles.list}>
        {notices.map((notice) => (
          <Card key={notice.id}>
            <Text style={styles.message}>{notice.message}</Text>
            <View style={styles.metaRow}>
              <View style={styles.metaItem}>
                <Ionicons name="time-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{notice.date}</Text>
              </View>
              <View style={styles.metaItem}>
                <Ionicons name="people-outline" size={13} color={colors.textSecondary} />
                <Text style={styles.metaText}>{notice.recipients} destinatários</Text>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  newBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  newBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textOnBrand,
  },
  list: {
    gap: spacing.md,
  },
  message: {
    fontSize: 14,
    lineHeight: 20,
    color: colors.textPrimary,
  },
  metaRow: {
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
});
