import { ChevronDown, ChevronUp, Edit3, Plus, Trash2, UserRound } from 'lucide-react';
import type { Person, RoutineTask } from '../types/routine';
import { PERSON_NAMES } from '../types/routine';
import { IconBadge } from '../components/IconBadge';

export function SettingsPage({ person, tasks, onPerson, onAdd, onEdit, onDelete, onMove, onSwitchUser }: { person: Person; tasks: RoutineTask[]; onPerson: (p: Person) => void; onAdd: () => void; onEdit: (t: RoutineTask) => void; onDelete: (t: RoutineTask) => void; onMove: (t: RoutineTask, direction: -1 | 1) => void; onSwitchUser: () => void }) {
  const sorted = [...tasks].sort((a, b) => a.order - b.order);
  return <main className="page settings-page"><header><span className="eyebrow">Configurações</span><h1>Organizar rotinas</h1><p>Edite atividades e ajuste a ordem do dia.</p></header>
    <section className="settings-card"><label>Rotina de<select value={person} onChange={e => onPerson(e.target.value as Person)}><option value="claudio">Claudio</option><option value="malu">Malu</option></select></label><button className="button primary" onClick={onAdd}><Plus size={18} />Adicionar atividade</button></section>
    <section className="manage-list"><div className="section-heading"><div><span className="eyebrow">Atividades</span><h2>{PERSON_NAMES[person]}</h2></div><span>{tasks.length} {tasks.length === 1 ? 'item' : 'itens'}</span></div>
      {sorted.length === 0 ? <div className="manage-empty">Ainda não há atividades nesta rotina.</div> : sorted.map((task, index) => <article className="manage-task" key={task.id}><IconBadge name={task.icon} /><div className="manage-copy"><strong>{task.title}</strong><span>{task.startTime}{task.endTime ? ` — ${task.endTime}` : ''}</span></div><div className="manage-actions"><button disabled={index === 0} onClick={() => onMove(task, -1)} aria-label={`Mover ${task.title} para cima`}><ChevronUp /></button><button disabled={index === sorted.length - 1} onClick={() => onMove(task, 1)} aria-label={`Mover ${task.title} para baixo`}><ChevronDown /></button><button onClick={() => onEdit(task)} aria-label={`Editar ${task.title}`}><Edit3 /></button><button className="danger" onClick={() => onDelete(task)} aria-label={`Excluir ${task.title}`}><Trash2 /></button></div></article>)}
    </section>
    <section className="profile-card"><UserRound /><div><strong>Usuário deste aparelho</strong><span>Troque entre Claudio e Malu sem perder as rotinas.</span></div><button className="button secondary" onClick={onSwitchUser}>Trocar</button></section>
  </main>;
}

