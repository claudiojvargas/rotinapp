import { useState, type FormEvent } from 'react';
import { X } from 'lucide-react';
import { getIconName, iconOptions } from './IconBadge';
import type { Period, Person, RoutineTask } from '../types/routine';

interface Props { person: Person; task?: RoutineTask; nextOrder: number; onSave: (task: RoutineTask) => void; onClose: () => void }

export function TaskForm({ person, task, nextOrder, onSave, onClose }: Props) {
  const [title, setTitle] = useState(task?.title ?? '');
  const [startTime, setStartTime] = useState(task?.startTime ?? '');
  const [endTime, setEndTime] = useState(task?.endTime ?? '');
  const [period, setPeriod] = useState<Period>(task?.period ?? 'morning');
  const [icon, setIcon] = useState(getIconName(task?.icon));
  const [error, setError] = useState('');
  function submit(event: FormEvent) {
    event.preventDefault();
    if (!title.trim() || !startTime) { setError('Preencha o título e o horário inicial.'); return; }
    onSave({ id: task?.id ?? crypto.randomUUID(), person, title: title.trim(), startTime, endTime: endTime || undefined, period, icon, order: task?.order ?? nextOrder });
  }
  return <div className="modal-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && onClose()}>
    <section className="modal" role="dialog" aria-modal="true" aria-labelledby="task-form-title">
      <header><div><span className="eyebrow">Atividade</span><h2 id="task-form-title">{task ? 'Editar atividade' : 'Nova atividade'}</h2></div><button className="icon-button" onClick={onClose} aria-label="Fechar"><X /></button></header>
      <form onSubmit={submit}>
        <label>Título<input autoFocus value={title} onChange={e => setTitle(e.target.value)} placeholder="Ex.: Café da manhã" /></label>
        <div className="form-row"><label>Horário inicial<input type="time" value={startTime} onChange={e => setStartTime(e.target.value)} /></label><label>Horário final <small>(opcional)</small><input type="time" value={endTime} onChange={e => setEndTime(e.target.value)} /></label></div>
        <label>Período<select value={period} onChange={e => setPeriod(e.target.value as Period)}><option value="morning">Manhã</option><option value="afternoon">Tarde</option><option value="night">Noite</option></select></label>
        <label>Ícone<select value={icon} onChange={e => setIcon(e.target.value)}>{iconOptions.map(([value, name]) => <option key={value} value={value}>{name}</option>)}</select></label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <footer><button type="button" className="button secondary" onClick={onClose}>Cancelar</button><button className="button primary" type="submit">Salvar</button></footer>
      </form>
    </section>
  </div>;
}
