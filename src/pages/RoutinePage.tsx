import { CalendarDays, CloudSun, Hand, Moon, Plus, Sprout, Sun } from 'lucide-react';
import { RoutineSection } from '../components/RoutineSection';
import { RoutineTabs } from '../components/RoutineTabs';
import type { Relationship, RoutineTask, UserId, Users } from '../types/routine';
import { userDisplayName } from '../types/routine';

const periods = [
  { key: 'morning', icon: Sun, title: 'Manhã' },
  { key: 'afternoon', icon: CloudSun, title: 'Tarde' },
  { key: 'night', icon: Moon, title: 'Noite' }
] as const;
const toMinutes = (time: string) => { const [hours, minutes] = time.split(':').map(Number); return hours * 60 + minutes; };
function isCurrent(task: RoutineTask, now: Date) {
  if (!task.endTime) return false;
  const current = now.getHours() * 60 + now.getMinutes();
  const start = toMinutes(task.startTime); const end = toMinutes(task.endTime);
  return end <= start ? current >= start || current < end : current >= start && current < end;
}

interface Props { currentUserId: UserId; selectedUserId: UserId; users: Users; relationship: Relationship; tasks: RoutineTask[]; onSelect: (id: UserId) => void; onAdd: () => void }

export function RoutinePage({ currentUserId, selectedUserId, users, relationship, tasks, onSelect, onAdd }: Props) {
  const now = new Date();
  const greeting = now.getHours() < 12 ? 'Bom dia' : now.getHours() < 18 ? 'Boa tarde' : 'Boa noite';
  const date = new Intl.DateTimeFormat('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }).format(now);
  const currentId = tasks.find(task => isCurrent(task, now))?.id;
  const isOwnRoutine = selectedUserId === currentUserId;
  return <main className="page routine-page">
    <header className="home-header"><div className="brand-row"><span className="brand-dot" />Nossa Rotina</div><p className="date"><CalendarDays size={16} />{date}</p><h1>{greeting}, {userDisplayName(currentUserId, users, currentUserId, relationship)} <Hand aria-hidden="true" /></h1><p className="subtitle">Um passo de cada vez, no seu ritmo.</p></header>
    <RoutineTabs currentUserId={currentUserId} selectedUserId={selectedUserId} users={users} relationship={relationship} onSelect={onSelect} />
    {tasks.length ? <div className="sections">{periods.map(period => <RoutineSection key={period.key} icon={period.icon} title={period.title} tasks={tasks.filter(task => task.period === period.key).sort((a, b) => a.order - b.order)} currentId={currentId} />)}</div> : <section className="empty-state"><Sprout aria-hidden="true" /><h2>Nenhuma atividade cadastrada.</h2><p>{isOwnRoutine ? 'Adicione atividades para montar sua rotina.' : `A rotina de ${userDisplayName(selectedUserId, users, currentUserId, relationship)} ainda está vazia.`}</p>{isOwnRoutine && <button className="button primary" onClick={onAdd}><Plus size={18} />Adicionar atividade</button>}</section>}
  </main>;
}
