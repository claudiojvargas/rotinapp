import { ChevronDown, ChevronUp, Edit3, Eye, Plus, Trash2, UserRound, UsersRound } from 'lucide-react';
import type { Relationship, RelationshipType, RoutineTask, UserId, Users } from '../types/routine';
import { otherUserId, RELATIONSHIP_LABELS, userDisplayName } from '../types/routine';
import { IconBadge } from '../components/IconBadge';

interface Props {
  currentUserId: UserId; selectedUserId: UserId; users: Users; relationship: Relationship; tasks: RoutineTask[];
  onCurrentUser: (id: UserId) => void; onSelectedUser: (id: UserId) => void; onUsers: (users: Users) => void;
  onRelationship: (relationship: Relationship) => void; onAdd: () => void; onEdit: (task: RoutineTask) => void;
  onDelete: (task: RoutineTask) => void; onMove: (task: RoutineTask, direction: -1 | 1) => void;
}

export function SettingsPage(props: Props) {
  const { currentUserId, selectedUserId, users, relationship, tasks } = props;
  const otherId = otherUserId(currentUserId);
  const sorted = [...tasks].sort((a, b) => a.order - b.order);
  const canEdit = selectedUserId === currentUserId;
  const setName = (id: UserId, name: string) => props.onUsers({ ...users, [id]: { ...users[id], name } });
  return <main className="page settings-page"><header><span className="eyebrow">Configurações</span><h1>Perfis e rotinas</h1><p>Personalize os perfis e organize apenas a sua rotina.</p></header>
    <section className="profile-settings" aria-labelledby="profiles-title">
      <div className="section-heading"><div><span className="eyebrow">Pessoas</span><h2 id="profiles-title">Perfis</h2></div></div>
      <div className="profile-form"><UserRound aria-hidden="true" /><div><strong>Meu perfil</strong><label>Nome<input value={users[currentUserId].name} onChange={event => setName(currentUserId, event.target.value)} placeholder="Seu nome" /></label><label>Usuário atual<select value={currentUserId} onChange={event => props.onCurrentUser(event.target.value as UserId)}><option value={currentUserId}>{userDisplayName(currentUserId, users, currentUserId, relationship)}</option><option value={otherId}>{userDisplayName(otherId, users, currentUserId, relationship)}</option></select></label></div></div>
      <div className="profile-form"><UsersRound aria-hidden="true" /><div><strong>Outra pessoa</strong><label>Nome<input value={users[otherId].name} onChange={event => setName(otherId, event.target.value)} placeholder="Nome da outra pessoa" /></label><label>Tipo de vínculo<select value={relationship.type} onChange={event => props.onRelationship({ ...relationship, type: event.target.value as RelationshipType })}>{Object.entries(RELATIONSHIP_LABELS).map(([value, label]) => <option value={value} key={value}>{label}</option>)}</select></label>{relationship.type === 'other' && <label>Vínculo personalizado<input value={relationship.customLabel} onChange={event => props.onRelationship({ ...relationship, customLabel: event.target.value })} placeholder="Informe o vínculo" /></label>}</div></div>
    </section>
    <section className="settings-card"><label>Rotina de<select value={selectedUserId} onChange={event => props.onSelectedUser(event.target.value as UserId)}><option value={currentUserId}>{userDisplayName(currentUserId, users, currentUserId, relationship)}</option><option value={otherId}>{userDisplayName(otherId, users, currentUserId, relationship)}</option></select></label>{canEdit ? <button className="button primary" onClick={props.onAdd}><Plus size={18} />Adicionar atividade</button> : <span className="read-only"><Eye size={18} />Somente leitura</span>}</section>
    <section className="manage-list"><div className="section-heading"><div><span className="eyebrow">Atividades</span><h2>{userDisplayName(selectedUserId, users, currentUserId, relationship)}</h2></div><span>{tasks.length} {tasks.length === 1 ? 'item' : 'itens'}</span></div>
      {sorted.length === 0 ? <div className="manage-empty">Ainda não há atividades nesta rotina.</div> : sorted.map((task, index) => <article className="manage-task" key={task.id}><IconBadge name={task.icon} /><div className="manage-copy"><strong>{task.title}</strong><span>{task.startTime}{task.endTime ? ` — ${task.endTime}` : ''}</span></div>{canEdit && <div className="manage-actions"><button disabled={index === 0} onClick={() => props.onMove(task, -1)} aria-label={`Mover ${task.title} para cima`}><ChevronUp /></button><button disabled={index === sorted.length - 1} onClick={() => props.onMove(task, 1)} aria-label={`Mover ${task.title} para baixo`}><ChevronDown /></button><button onClick={() => props.onEdit(task)} aria-label={`Editar ${task.title}`}><Edit3 /></button><button className="danger" onClick={() => props.onDelete(task)} aria-label={`Excluir ${task.title}`}><Trash2 /></button></div>}</article>)}
    </section>
  </main>;
}
