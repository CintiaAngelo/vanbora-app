import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, Badge, Card, Chip, Input, Screen } from '@/components';
import { students } from '@/data/mockData';
import { Student, StudentFinanceStatus } from '@/types';
import { colors, spacing } from '@/theme';

type Filter = 'all' | 'confirmed' | 'absent' | 'overdue';

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: 'Todos' },
  { key: 'confirmed', label: 'Confirmados' },
  { key: 'absent', label: 'Ausentes' },
  { key: 'overdue', label: 'Inadimplentes' },
];

const financeBadge: Record<
  StudentFinanceStatus,
  { label: string; tone: 'success' | 'warning' | 'danger' }
> = {
  em_dia: { label: 'PAGAMENTO EM DIA', tone: 'success' },
  pendente: { label: 'PENDENTE', tone: 'warning' },
  atrasado: { label: 'ATRASADO', tone: 'danger' },
};

/** Lista consolidada de alunos com busca, filtros e detalhes expansíveis. */
export default function StudentsScreen() {
  const [filter, setFilter] = useState<Filter>('all');
  const [query, setQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return students.filter((s) => {
      const matchesQuery =
        !query ||
        s.name.toLowerCase().includes(query.toLowerCase()) ||
        s.guardianName.toLowerCase().includes(query.toLowerCase());
      const matchesFilter = filter !== 'overdue' || s.financeStatus === 'atrasado';
      return matchesQuery && matchesFilter;
    });
  }, [filter, query]);

  return (
    <Screen>
      <AppHeader title="Meus Alunos" showBack />

      <Input
        icon="search"
        placeholder="Buscar aluno ou responsável"
        value={query}
        onChangeText={setQuery}
        containerStyle={styles.search}
      />

      <View style={styles.filters}>
        {FILTERS.map((f) => (
          <Chip
            key={f.key}
            label={f.label}
            selected={filter === f.key}
            onPress={() => setFilter(f.key)}
          />
        ))}
      </View>

      <View style={styles.list}>
        {filtered.map((student) => (
          <StudentCard
            key={student.id}
            student={student}
            expanded={expandedId === student.id}
            onToggle={() =>
              setExpandedId((prev) => (prev === student.id ? null : student.id))
            }
          />
        ))}
      </View>
    </Screen>
  );
}

function StudentCard({
  student,
  expanded,
  onToggle,
}: {
  student: Student;
  expanded: boolean;
  onToggle: () => void;
}) {
  const badge = financeBadge[student.financeStatus];
  return (
    <Card>
      <Pressable style={styles.cardTop} onPress={onToggle}>
        <View style={styles.cardInfo}>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.guardian}>Resp.: {student.guardianName}</Text>
        </View>
        <View style={styles.cardRight}>
          <Badge label={badge.label} tone={badge.tone} />
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.textMuted}
          />
        </View>
      </Pressable>

      {expanded ? (
        <View style={styles.details}>
          <DetailRow icon="school-outline" text={student.school} />
          <DetailRow icon="location-outline" text={student.neighborhood} />
        </View>
      ) : null}
    </Card>
  );
}

function DetailRow({ icon, text }: { icon: keyof typeof Ionicons.glyphMap; text: string }) {
  return (
    <View style={styles.detailRow}>
      <Ionicons name={icon} size={14} color={colors.textSecondary} />
      <Text style={styles.detailText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    marginBottom: spacing.lg,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flex: 1,
    gap: 2,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  guardian: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  cardRight: {
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  details: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: spacing.sm,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  detailText: {
    fontSize: 13,
    color: colors.textSecondary,
  },
});
