import { Heart, UserRound } from 'lucide-react';
import type { Relationship, UserId, Users } from '../types/routine';

export function UserSelectionPage({ users, onSelect }: { users: Users; relationship: Relationship; onSelect: (userId: UserId) => void }) {
  return <main className="welcome-page"><div className="welcome-mark"><Heart fill="currentColor" /></div><span className="eyebrow">Nossa Rotina</span><h1>Quem está usando<br />o app?</h1><p>Assim mostramos sua rotina primeiro neste aparelho.</p><div className="person-options">{(['user1', 'user2'] as UserId[]).map((userId, index) => <button key={userId} onClick={() => onSelect(userId)}><UserRound /><span><strong>{users[userId].name.trim() || `Pessoa ${index + 1}`}</strong><small>Este é o meu perfil</small></span></button>)}</div><small className="privacy-note">Sem conta ou senha. Esta escolha fica salva apenas neste dispositivo.</small></main>;
}
