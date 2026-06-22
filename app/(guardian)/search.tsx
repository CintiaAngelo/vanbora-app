import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Avatar, Button, Card, Input, Screen, StarRating } from '@/components';
import { formatCurrency, transporters } from '@/data/mockData';
import { Transporter } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';

type SortKey = 'price' | 'rating';

/** Busca de transportadores por escola e bairro. */
export default function SearchScreen() {
  const [sort, setSort] = useState<SortKey>('price');

  const results = useMemo(() => {
    const list = [...transporters];
    list.sort((a, b) =>
      sort === 'price' ? a.monthlyFee - b.monthlyFee : b.rating - a.rating,
    );
    return list;
  }, [sort]);

  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.title]}>Encontrar Transportador</Text>

      <View style={styles.form}>
        <Input icon="school-outline" placeholder="Escola do seu filho" />
        <Input icon="location-outline" placeholder="Bairro de atendimento" />
        <Button label="Buscar" icon="search" />
      </View>

      <View style={styles.resultsHeader}>
        <Text style={typography.sectionTitle}>Resultados</Text>
        <View style={styles.sortRow}>
          <SortPill label="Preço" active={sort === 'price'} onPress={() => setSort('price')} />
          <SortPill label="Avaliação" active={sort === 'rating'} onPress={() => setSort('rating')} />
        </View>
      </View>

      <View style={styles.list}>
        {results.map((t) => (
          <ResultCard key={t.id} transporter={t} />
        ))}
      </View>
    </Screen>
  );
}

function SortPill({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.sortPill, active && styles.sortPillActive]}>
      <Ionicons name="swap-vertical" size={13} color={active ? colors.textOnBrand : colors.textSecondary} />
      <Text style={[styles.sortText, active && styles.sortTextActive]}>{label}</Text>
    </Pressable>
  );
}

function ResultCard({ transporter }: { transporter: Transporter }) {
  return (
    <Card>
      <View style={styles.cardTop}>
        <Avatar name={transporter.name} size={44} />
        <View style={styles.cardInfo}>
          <Text style={typography.cardTitle}>{transporter.name}</Text>
          <StarRating rating={transporter.rating} size={13} />
        </View>
      </View>

      <Text style={styles.meta}>
        {transporter.schools[0]} • {transporter.neighborhoods[0]} • {transporter.availableSeats} vagas
      </Text>

      <View style={styles.cardBottom}>
        <View>
          <Text style={styles.feeLabel}>Mensalidade para seu bairro</Text>
          <Text style={styles.fee}>
            {formatCurrency(transporter.monthlyFee)}
            <Text style={styles.feePeriod}> /mês</Text>
          </Text>
        </View>
        <Button
          label="Ver Perfil"
          variant="secondary"
          onPress={() => router.push(`/transporter/${transporter.id}`)}
          style={styles.profileBtn}
        />
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  sortRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  sortPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sortPillActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  sortText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  sortTextActive: {
    color: colors.textOnBrand,
  },
  list: {
    gap: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cardInfo: {
    flex: 1,
    gap: 4,
  },
  meta: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: spacing.md,
  },
  cardBottom: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
  },
  feeLabel: {
    fontSize: 11,
    color: colors.textSecondary,
  },
  fee: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.textPrimary,
    marginTop: 2,
  },
  feePeriod: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textSecondary,
  },
  profileBtn: {
    height: 40,
    paddingHorizontal: spacing.lg,
  },
});
