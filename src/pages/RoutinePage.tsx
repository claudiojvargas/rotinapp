import { CalendarDays, Plus } from 'lucide-react';
import { RoutineSection } from '../components/RoutineSection';
import { RoutineTabs } from '../components/RoutineTabs';
import type { Person, RoutineTask } from '../types/routine';
import { PERSON_NAMES } from '../types/routine';

const periods = [
  { key: 'morning', emoji: '☀️', title: 'Manhã' },
  { key: 'afternoon', emoji: '🌤️', title: 'Tarde' },
  { key: 'night', emoji: '🌙', title: 'Noite' }
] as const;

const toMinutes = (time: string) => { const [hours, minutes] = time.split(':').map(Number); return hours * 60 + minutes; };
function isCurrent(task: RoutineTask, now: Date) {
  if (!task.endTime) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(task.startTime); const end = toMinutes(task.endTime);
  return end <= start ? current >= start || current < end : current >= start && current < end;
}

export function RoutinePage({ currentUser, selected, tasks, onSelect, onAdd }: { currentUser: Person; selected: Person; tasks: RoutineTask[]; onSelect: (p: Person) => void; onAdd: () => void }) {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Bom dia' : now.getHours() < 18 ? 'Boa tarde' : 'Boa noite';
  const date = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  const currentId = tasks.find(task => isCurrent(task, now))?.id;
  return <main className="page routine-page">
    <header className="home-header"><div className="brand-row"><span className="brand-dot" />Nossa Rotina</div><p className="date"><CalendarDays size={16} />{date}</p><h1>{greeting}, {PERSON_NAMES[currentUser]} <span>👋</span></h1><p className="subtitle">Um passo de cada vez, no seu ritmo.</p></header>
    <RoutineTabs currentUser={currentUser} selected={selected} onSelect={onSelect} />
    {tasks.length ? <div className="sections">{periods.map(period => <RoutineSection key={period.key} emoji={period.emoji} title={period.title} tasks={tasks.filter(task => task.period === period.key).sort((a, b) => a.order - b.order)} currentId={currentId} />)}</div> : <section className="empty-state"><span>🌱</span><h2>Nenhuma atividade cadastrada.</h2><p>Adicione atividades para montar a rotina da {PERSON_NAMES[selected]}.</p><button className="button primary" onClick={onAdd}><Plus size={18} />Adicionar atividade</button></section>}
  </main>;
}

