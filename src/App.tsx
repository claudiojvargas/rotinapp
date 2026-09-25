import { useState } from 'react';
import { CalendarDays, Settings } from 'lucide-react';
import { TaskForm } from './components/TaskForm';
import { RoutinePage } from './pages/RoutinePage';
import { SettingsPage } from './pages/SettingsPage';
import { UserSelectionPage } from './pages/UserSelectionPage';
import { routineStorage } from './services/routineStorage';
import type { Relationship, RoutineTask, Routines, UserId, Users } from './types/routine';

type View = 'today' | 'settings';

export default function App() {
  const [currentUserId, setCurrentUserId] = useState<UserId | null>(() => routineStorage.getCurrentUser());
  const [users, setUsers] = useState<Users>(() => routineStorage.getUsers());
  const [relationship, setRelationship] = useState<Relationship>(() => routineStorage.getRelationship());
  const [routines, setRoutines] = useState<Routines>(() => routineStorage.getRoutines());
  const [view, setView] = useState<View>('today');
  const [selectedUserId, setSelectedUserId] = useState<UserId>(currentUserId ?? 'user1');
  const [editing, setEditing] = useState<RoutineTask | 'new' | null>(null);
  function chooseUser(userId: UserId) { routineStorage.setCurrentUser(userId); setCurrentUserId(userId); setSelectedUserId(userId); setEditing(null); setView('today'); }
  function updateCurrentUser(userId: UserId) { routineStorage.setCurrentUser(userId); setCurrentUserId(userId); setSelectedUserId(userId); setEditing(null); }
  function saveUsers(next: Users) { setUsers(next); routineStorage.saveUsers(next); }
  function saveRelationship(next: Relationship) { setRelationship(next); routineStorage.saveRelationship(next); }
  function saveRoutines(next: Routines) { setRoutines(next); routineStorage.saveRoutines(next); }
  function saveTask(task: RoutineTask) {
    if (task.userId !== currentUserId) return;
    const list = routines[task.userId];
    const next = list.some(item => item.id === task.id) ? list.map(item => item.id === task.id ? task : item) : [...list, task];
    saveRoutines({ ...routines, [task.userId]: next }); setEditing(null);
  }
  function deleteTask(task: RoutineTask) { if (task.userId === currentUserId && window.confirm(`Excluir “${task.title}”?`)) saveRoutines({ ...routines, [task.userId]: routines[task.userId].filter(item => item.id !== task.id) }); }
  function moveTask(task: RoutineTask, direction: -1 | 1) {
    if (task.userId !== currentUserId) return;
    const sorted = [...routines[task.userId]].sort((a, b) => a.order - b.order); const index = sorted.findIndex(item => item.id === task.id); const target = index + direction;
    if (target < 0 || target >= sorted.length) return; [sorted[index], sorted[target]] = [sorted[target], sorted[index]];
    saveRoutines({ ...routines, [task.userId]: sorted.map((item, order) => ({ ...item, order })) });
  }
  if (!currentUserId) return <UserSelectionPage users={users} relationship={relationship} onSelect={chooseUser} />;
  const canEditSelected = selectedUserId === currentUserId;
  return <div className="app-shell">
    {view === 'today' ? <RoutinePage currentUserId={currentUserId} selectedUserId={selectedUserId} users={users} relationship={relationship} tasks={routines[selectedUserId]} onSelect={setSelectedUserId} onAdd={() => canEditSelected && setEditing('new')} /> : <SettingsPage currentUserId={currentUserId} selectedUserId={selectedUserId} users={users} relationship={relationship} tasks={routines[selectedUserId]} onCurrentUser={updateCurrentUser} onSelectedUser={setSelectedUserId} onUsers={saveUsers} onRelationship={saveRelationship} onAdd={() => canEditSelected && setEditing('new')} onEdit={task => canEditSelected && setEditing(task)} onDelete={deleteTask} onMove={moveTask} />}
    <nav className="bottom-nav" aria-label="Navegação principal"><button className={view === 'today' ? 'active' : ''} onClick={() => setView('today')}><CalendarDays />Hoje</button><button className={view === 'settings' ? 'active' : ''} onClick={() => setView('settings')}><Settings />Config.</button></nav>
    {editing && canEditSelected && <TaskForm userId={selectedUserId} task={editing === 'new' ? undefined : editing} nextOrder={routines[selectedUserId].length} onSave={saveTask} onClose={() => setEditing(null)} />}
  </div>;
}
