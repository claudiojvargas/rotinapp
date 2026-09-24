import type { RoutineTask } from '../types/routine';
import { RoutineTaskCard } from './RoutineTaskCard';

export function RoutineSection({ emoji, title, tasks, currentId }: { emoji: string; title: string; tasks: RoutineTask[]; currentId?: string }) {
  if (!tasks.length) return null;
  return <section className="routine-section"><h2><span>{emoji}</span>{title}</h2><div>{tasks.map(task => <RoutineTaskCard key={task.id} task={task} current={task.id === currentId} />)}</div></section>;
}

