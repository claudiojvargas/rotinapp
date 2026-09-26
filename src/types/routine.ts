export type UserId = 'user1' | 'user2';
export type Period = 'morning' | 'afternoon' | 'night';
export type RelationshipType = 'friend' | 'dating' | 'engaged' | 'married' | 'partner' | 'other';

export interface UserProfile {
  id: UserId;
  name: string;
}

export type Users = Record<UserId, UserProfile>;

export interface Relationship {
  type: RelationshipType;
  customLabel: string;
}

export interface RoutineTask {
  id: string;
  userId: UserId;
  title: string;
  startTime: string;
  endTime?: string;
  period: Period;
  icon?: string;
  order: number;
}

export type Routines = Record<UserId, RoutineTask[]>;

export const USER_IDS: UserId[] = ['user1', 'user2'];

export const RELATIONSHIP_LABELS: Record<RelationshipType, string> = {
  friend: 'Amigo(a)', dating: 'Namorado(a)', engaged: 'Noivo(a)', married: 'Esposo(a)',
  partner: 'Parceiro(a)', other: 'Outro'
};

export function otherUserId(currentUserId: UserId): UserId {
  return currentUserId === 'user1' ? 'user2' : 'user1';
}

export function relationshipLabel(relationship: Relationship): string {
  if (relationship.type === 'other') return relationship.customLabel.trim();
  return RELATIONSHIP_LABELS[relationship.type];
}

export function userDisplayName(userId: UserId, users: Users, currentUserId: UserId, relationship: Relationship): string {
  const name = users[userId].name.trim();
  if (name) return name;
  if (userId === currentUserId) return 'Eu';
  return relationshipLabel(relationship) || 'Pessoa 2';
}
