import type { Relationship, UserId, Users } from '../types/routine';
import { otherUserId, userDisplayName } from '../types/routine';

interface Props {
  currentUserId: UserId;
  selectedUserId: UserId;
  users: Users;
  relationship: Relationship;
  onSelect: (userId: UserId) => void;
}

export function RoutineTabs({ currentUserId, selectedUserId, users, relationship, onSelect }: Props) {
  const otherId = otherUserId(currentUserId);
  return <div className="tabs" role="tablist" aria-label="Escolher rotina">
    <button role="tab" aria-selected={selectedUserId === currentUserId} className={selectedUserId === currentUserId ? 'selected' : ''} onClick={() => onSelect(currentUserId)}>{userDisplayName(currentUserId, users, currentUserId, relationship)}</button>
    <button role="tab" aria-selected={selectedUserId === otherId} className={selectedUserId === otherId ? 'selected' : ''} onClick={() => onSelect(otherId)}>{userDisplayName(otherId, users, currentUserId, relationship)}</button>
  </div>;
}
