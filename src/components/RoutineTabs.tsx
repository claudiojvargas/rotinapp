import type { Person } from '../types/routine';
import { PERSON_NAMES } from '../types/routine';

export function RoutineTabs({ currentUser, selected, onSelect }: { currentUser: Person; selected: Person; onSelect: (person: Person) => void }) {
  const other: Person = currentUser === 'claudio' ? 'malu' : 'claudio';
  return <div className="tabs" role="tablist" aria-label="Escolher rotina">
    <button role="tab" aria-selected={selected === currentUser} className={selected === currentUser ? 'selected' : ''} onClick={() => onSelect(currentUser)}>Minha rotina</button>
    <button role="tab" aria-selected={selected === other} className={selected === other ? 'selected' : ''} onClick={() => onSelect(other)}>{PERSON_NAMES[other]}</button>
  </div>;
}

