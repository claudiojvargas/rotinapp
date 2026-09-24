import { useState } from 'react';
import { CalendarDays, Settings } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { RoutinePage } from './pages/RoutinePage';
import { SettingsPage } from './pages/SettingsPage';
import { UserSelectionPage } from './pages/UserSelectionPage';
import { routineStorage } from './services/routineStorage';
import type { Person, RoutineTask, Routines } from './types/routine';

type View = 'today' | 'settings';

export default function App() {
  const [currentUser, setCurrentUser] = useState<Person | null>(() => routineStorage.getCurrentUser());
  const [routines, setRoutines] = useState<Routines>(() => routineStorage.getRoutines());
  const [view, setView] = useState<View>('today');
  const [selectedPerson, setSelectedPerson] = useState<Person>(currentUser ?? 'claudio');
  const [editing, setEditing] = useState<RoutineTask | 'new' | null>(null);
  function chooseUser(person: Person) { routineStorage.setCurrentUser(person); setCurrentUser(person); setSelectedPerson(person); setView('today'); }
  function saveRoutines(next: Routines) { setRoutines(next); routineStorage.saveRoutines(next); }
  function saveTask(task: RoutineTask) { const list = routines[task.person]; const next = list.some(item => item.id === task.id) ? list.map(item => item.id === task.id ? task : item) : [...list, task]; saveRoutines({ ...routines, [task.person]: next }); setEditing(null); }
  function deleteTask(task: RoutineTask) { if (window.confirm(`Excluir “${task.title}”?`)) saveRoutines({ ...routines, [task.person]: routines[task.person].filter(item => item.id !== task.id) }); }
  function moveTask(task: RoutineTask, direction: -1 | 1) { const sorted = [...routines[task.person]].sort((a, b) => a.order - b.order); const index = sorted.findIndex(item => item.id === task.id); const target = index + direction; if (target < 0 || target >= sorted.length) return; [sorted[index], sorted[target]] = [sorted[target], sorted[index]]; saveRoutines({ ...routines, [task.person]: sorted.map((item, order) => ({ ...item, order })) }); }
  if (!currentUser) return <UserSelectionPage onSelect={chooseUser} />;
  return <div className="app-shell">
    {view === 'today' ? <RoutinePage currentUser={currentUser} selected={selectedPerson} tasks={routines[selectedPerson]} onSelect={setSelectedPerson} onAdd={() => setEditing('new')} /> : <SettingsPage person={selectedPerson} tasks={routines[selectedPerson]} onPerson={setSelectedPerson} onAdd={() => setEditing('new')} onEdit={setEditing} onDelete={deleteTask} onMove={moveTask} onSwitchUser={() => setCurrentUser(null)} />}
    <nav className="bottom-nav" aria-label="Navegação principal"><button className={view === 'today' ? 'active' : ''} onClick={() => setView('today')}><CalendarDays />Hoje</button><button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}><Settings />Config.</button></nav>
    {editing && <TaskForm person={selectedPerson} task={editing === 'new' ? undefined : editing} nextOrder={routines[selectedPerson].length} onSave={saveTask} onClose={() => setEditing(null)} />}
  </div>;
}

