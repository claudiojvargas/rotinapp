import { IconBadge } from './IconBadge';
import type { RoutineTask } from '../types/routine';

export function RoutineTaskCard({ task, current }: { task: RoutineTask; current: boolean }) {
  return <article className={`task-card ${current ? 'current' : ''}`}>
    <div className="time-column"><strong>{task.startTime}</strong><span>{task.endTime || '—'}</span></div>
    <div className="timeline" aria-hidden="true"><span /><i /></div>
    <IconBadge name={task.icon} active={current} />
    <div className="task-copy">{current && <span className="now-pill">Agora</span>}<h3>{task.title}</h3></div>
  </article>;
}

