import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import {
  AppHeader,
  Avatar,
  Button,
  Card,
  Chip,
  Screen,
  SectionTitle,
  StarRating,
} from '@/components';
import { useAppState } from '@/context/AppState';
import { publicReviews, publicTransporter, transporters } from '@/data/mockData';
import { colors, spacing, typography } from '@/theme';

/** Perfil público do transportador, visto pelo responsável antes de contratar. */
export default function PublicTransporterProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { setHasTransporter } = useAppState();

  const base = transporters.find((t) => t.id === id);
  const transporter = { ...publicTransporter, ...(base ?? {}) };

  function handleHire() {
    setHasTransporter(true);
    router.replace('/(guardian)/home');
  }

  return (
    <Screen
      footer={
        <View style={styles.footer}>
          <Button
            label="Mensagem"
            variant="outline"
            icon="chatbubble-outline"
            onPress={() => router.push('/chat/c1')}
            style={styles.footerBtn}
          />
          <Button label="Contratar" onPress={handleHire} style={styles.footerBtn} />
        </View>
      }
    >
      <AppHeader showBack />

      <View style={styles.head}>
        <Avatar name={transporter.name} size={84} />
        <Text style={[typography.title, styles.name]}>{transporter.name}</Text>
        <StarRating
          rating={transporter.rating}
          size={16}
          caption={`(${transporter.reviewsCount} avaliações)`}
        />
        <View style={styles.career}>
          <Ionicons name="briefcase-outline" size={14} color={colors.textSecondary} />
          <Text style={styles.careerText}>{transporter.yearsExperience} anos de carreira</Text>
        </View>
      </View>

      <SectionTitle title="Escolas Atendidas" style={styles.section} />
      <View style={styles.chips}>
        {transporter.schools.map((s) => (
          <Chip key={s} label={s} />
        ))}
      </View>

      <SectionTitle title="Bairros Atendidos" style={styles.section} />
      <View style={styles.chips}>
        {transporter.neighborhoods.map((n) => (
          <Chip key={n} label={n} />
        ))}
      </View>

      <SectionTitle title="Avaliações de outros responsáveis" style={styles.section} />
      <View style={styles.reviews}>
        {publicReviews.map((r) => (
          <Card key={r.id}>
            <View style={styles.reviewHead}>
              <Text style={styles.reviewAuthor}>{r.authorName}</Text>
              <StarRating rating={r.rating} size={13} showValue={false} />
            </View>
            <Text style={styles.reviewComment}>{r.comment}</Text>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  head: {
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  name: {
    marginTop: spacing.sm,
  },
  career: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 2,
  },
  careerText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  section: {
    marginTop: spacing.lg,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  reviews: {
    gap: spacing.md,
  },
  reviewHead: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  reviewAuthor: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  reviewComment: {
    fontSize: 13,
    lineHeight: 19,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  footerBtn: {
    flex: 1,
  },
});
