import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { AppHeader, Button, Card, Chip, Input, Screen, StepProgress } from '@/components';
import { useAppState } from '@/context/AppState';
import { PriceZone } from '@/types';
import { colors, radius, spacing, typography } from '@/theme';

const INITIAL_ZONES: PriceZone[] = [
  { id: 'z1', name: 'Premium', neighborhoods: ['Jardins', 'Moema'], monthlyFee: '520,00' },
  { id: 'z2', name: 'Standard', neighborhoods: ['Saúde', 'Ipiranga'], monthlyFee: '380,00' },
];

/** Cadastro do transportador — Etapa 2: área de atendimento e precificação por zona. */
export default function RegisterTransporterZonesScreen() {
  const { setRole, setHasTransporter } = useAppState();
  const [expanded, setExpanded] = useState(true);
  const [zones, setZones] = useState<PriceZone[]>(INITIAL_ZONES);

  function removeNeighborhood(zoneId: string, neighborhood: string) {
    setZones((prev) =>
      prev.map((z) =>
        z.id === zoneId
          ? { ...z, neighborhoods: z.neighborhoods.filter((n) => n !== neighborhood) }
          : z,
      ),
    );
  }

  function removeZone(zoneId: string) {
    setZones((prev) => prev.filter((z) => z.id !== zoneId));
  }

  function updateZone(zoneId: string, key: keyof PriceZone, value: string) {
    setZones((prev) => prev.map((z) => (z.id === zoneId ? { ...z, [key]: value } : z)));
  }

  function addZone() {
    setZones((prev) => [
      ...prev,
      { id: `z${Date.now()}`, name: '', neighborhoods: [], monthlyFee: '' },
    ]);
  }

  function handleFinish() {
    setRole('transporter');
    setHasTransporter(false);
    router.replace('/(transporter)/home');
  }

  return (
    <Screen footer={<Button label="Concluir Cadastro" onPress={handleFinish} />}>
      <AppHeader title="Criar Conta" showBack />
      <StepProgress steps={2} current={2} />

      <Text style={[typography.sectionTitle, styles.section]}>Área de Atendimento e Preços</Text>

      <View style={styles.form}>
        <Input placeholder="Escolas de Atendimento" />
        <Input placeholder="Bairros de Atendimento" />
      </View>

      <Text style={[typography.sectionTitle, styles.zonesTitle]}>Precificação por Zona</Text>

      <Card padded={false}>
        <Pressable style={styles.schoolHeader} onPress={() => setExpanded((v) => !v)}>
          <Text style={typography.cardTitle}>Colégio São Paulo</Text>
          <Ionicons
            name={expanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.textSecondary}
          />
        </Pressable>

        {expanded ? (
          <View style={styles.zonesBody}>
            {zones.map((zone) => (
              <View key={zone.id} style={styles.zone}>
                <View style={styles.zoneTopRow}>
                  <Text style={styles.fieldLabel}>Nome da zona</Text>
                  <Pressable onPress={() => removeZone(zone.id)} hitSlop={8}>
                    <Ionicons name="trash-outline" size={18} color={colors.danger} />
                  </Pressable>
                </View>
                <Input
                  placeholder="Ex.: Premium"
                  value={zone.name}
                  onChangeText={(v) => updateZone(zone.id, 'name', v)}
                />

                <Text style={[styles.fieldLabel, styles.spaced]}>Bairros desta zona</Text>
                <View style={styles.chipsBox}>
                  <View style={styles.chipsWrap}>
                    {zone.neighborhoods.map((n) => (
                      <Chip
                        key={n}
                        label={n}
                        selected
                        removable
                        onRemove={() => removeNeighborhood(zone.id, n)}
                      />
                    ))}
                  </View>
                  <Text style={styles.chipsPlaceholder}>Buscar bairro...</Text>
                </View>

                <Text style={[styles.fieldLabel, styles.spaced]}>Mensalidade</Text>
                <Input
                  placeholder="0,00"
                  keyboardType="numeric"
                  value={zone.monthlyFee}
                  onChangeText={(v) => updateZone(zone.id, 'monthlyFee', v)}
                  icon="cash-outline"
                />
              </View>
            ))}

            <Pressable style={styles.addZone} onPress={addZone}>
              <Ionicons name="add" size={18} color={colors.brandDark} />
              <Text style={styles.addZoneText}>Adicionar zona</Text>
            </Pressable>
          </View>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: spacing.lg,
  },
  form: {
    gap: spacing.md,
    marginBottom: spacing.xxl,
  },
  zonesTitle: {
    marginBottom: spacing.md,
  },
  schoolHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.lg,
  },
  zonesBody: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.lg,
    gap: spacing.lg,
  },
  zone: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  zoneTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  fieldLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  spaced: {
    marginTop: spacing.md,
    marginBottom: spacing.xs,
  },
  chipsBox: {
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: radius.md,
    padding: spacing.md,
  },
  chipsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chipsPlaceholder: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 2,
  },
  addZone: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  addZoneText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '600',
    color: colors.brandDark,
  },
});
