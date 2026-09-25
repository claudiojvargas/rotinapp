import { Heart, UserRound } from 'lucide-react';
import type { Person } from '../types/routine';

export function UserSelectionPage({ onSelect }: { onSelect: (person: Person) => void }) {
  return <main className="welcome-page"><div className="welcome-mark"><Heart fill="currentColor" /></div><span className="eyebrow">Nossa Rotina</span><h1>Quem está usando<br />o app?</h1><p>Assim mostramos sua rotina primeiro neste aparelho.</p><div className="person-options"><button onClick={() => onSelect('claudio')}><UserRound /><span><strong>Claudio</strong><small>Este é o meu perfil</small></span></button><button onClick={() => onSelect('malu')}><UserRound /><span><strong>Malu</strong><small>Este é o meu perfil</small></span></button></div><small className="privacy-note">Sem conta ou senha. Esta escolha fica salva apenas neste dispositivo.</small></main>;
}
