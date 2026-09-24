import type { RoutineTask } from '../types/routine';
import type { LucideIcon } from 'lucide-react';
import { RoutineTaskCard } from './RoutineTaskCard';

export function RoutineSection({ icon: Icon, title, tasks, currentId }: { icon: LucideIcon; title: string; tasks: RoutineTask[]; currentId?: string }) {
  if (!tasks.length) return null;
  return <section className="routine-section"><h2><Icon aria-hidden="true" />{title}</h2><div>{tasks.map(task => <RoutineTaskCard key={task.id} task={task} current={task.id === currentId} />)}</div></section>;
}
