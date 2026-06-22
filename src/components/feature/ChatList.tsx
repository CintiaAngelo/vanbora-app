import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Avatar, Screen } from '@/components';
import { chatPreviews } from '@/data/mockData';
import { colors, radius, spacing, typography } from '@/theme';

/**
 * Lista de conversas, reutilizada pelos perfis Responsável e Transportador.
 */
export function ChatList() {
  return (
    <Screen>
      <Text style={[typography.screenTitle, styles.title]}>Conversas</Text>

      <View>
        {chatPreviews.map((chat) => (
          <Pressable
            key={chat.id}
            style={styles.row}
            onPress={() => router.push(`/chat/${chat.id}`)}
          >
            <Avatar name={chat.name} size={48} />
            <View style={styles.info}>
              <Text style={typography.cardTitle}>{chat.name}</Text>
              <Text style={styles.last} numberOfLines={1}>
                {chat.lastMessage}
              </Text>
            </View>
            <View style={styles.meta}>
              <Text style={styles.time}>{chat.time}</Text>
              {chat.unread > 0 ? (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>{chat.unread}</Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: spacing.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    gap: spacing.md,
  },
  info: {
    flex: 1,
    gap: 3,
  },
  last: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  meta: {
    alignItems: 'flex-end',
    gap: 6,
  },
  time: {
    fontSize: 11,
    color: colors.textMuted,
  },
  badge: {
    minWidth: 20,
    height: 20,
    paddingHorizontal: 6,
    borderRadius: radius.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.textOnBrand,
  },
});
