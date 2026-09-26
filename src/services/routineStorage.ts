import { defaultRoutines } from '../data/defaultRoutines';
import type { Relationship, RoutineTask, Routines, UserId, Users } from '../types/routine';

const USER_KEY = 'nossa-rotina:user';
const ROUTINES_KEY = 'nossa-rotina:routines';
const USERS_KEY = 'nossa-rotina:users';
const RELATIONSHIP_KEY = 'nossa-rotina:relationship';
const STORAGE_VERSION_KEY = 'nossa-rotina:storage-version';
const STORAGE_VERSION = '3';

const defaults = (): Routines => structuredClone(defaultRoutines);
const defaultUsers = (): Users => ({ user1: { id: 'user1', name: '' }, user2: { id: 'user2', name: '' } });
const defaultRelationship = (): Relationship => ({ type: 'partner', customLabel: '' });
const isUserId = (value: unknown): value is UserId => value === 'user1' || value === 'user2';

function normalizeTasks(value: unknown, userId: UserId): RoutineTask[] | null {
  if (!Array.isArray(value)) return null;
  return value.map((item) => ({ ...(item as RoutineTask), userId })).map(({ userId: id, ...task }) => ({ ...task, userId: id }));
}

function migrateRoutines(parsed: Record<string, unknown>): Routines {
  const fallback = defaults();
  const legacyKeys = Object.keys(parsed).filter(key => !isUserId(key));
  const first = normalizeTasks(parsed.user1 ?? parsed[legacyKeys[0]], 'user1');
  const second = normalizeTasks(parsed.user2 ?? parsed[legacyKeys[1]], 'user2');
  return { user1: first ?? fallback.user1, user2: second ?? fallback.user2 };
}

export const routineStorage = {
  getCurrentUser(): UserId | null {
    const value = localStorage.getItem(USER_KEY);
    if (isUserId(value)) return value;
    if (value) {
      try {
        const routines = JSON.parse(localStorage.getItem(ROUTINES_KEY) ?? '{}') as Record<string, unknown>;
        const legacyIndex = Object.keys(routines).filter(key => !isUserId(key)).indexOf(value);
        if (legacyIndex === 0) return 'user1';
        if (legacyIndex === 1) return 'user2';
      } catch { return null; }
    }
    return null;
  },
  setCurrentUser(userId: UserId) { localStorage.setItem(USER_KEY, userId); },
  getUsers(): Users {
    try {
      const parsed = JSON.parse(localStorage.getItem(USERS_KEY) ?? '{}') as Partial<Users>;
      return {
        user1: { id: 'user1', name: typeof parsed.user1?.name === 'string' ? parsed.user1.name : '' },
        user2: { id: 'user2', name: typeof parsed.user2?.name === 'string' ? parsed.user2.name : '' }
      };
    } catch { return defaultUsers(); }
  },
  saveUsers(users: Users) { localStorage.setItem(USERS_KEY, JSON.stringify(users)); },
  getRelationship(): Relationship {
    try {
      const parsed = JSON.parse(localStorage.getItem(RELATIONSHIP_KEY) ?? '{}') as Partial<Relationship>;
      const types = ['friend', 'dating', 'engaged', 'married', 'partner', 'other'];
      return types.includes(parsed.type ?? '')
        ? { type: parsed.type as Relationship['type'], customLabel: typeof parsed.customLabel === 'string' ? parsed.customLabel : '' }
        : defaultRelationship();
    } catch { return defaultRelationship(); }
  },
  saveRelationship(relationship: Relationship) { localStorage.setItem(RELATIONSHIP_KEY, JSON.stringify(relationship)); },
  getRoutines(): Routines {
    const stored = localStorage.getItem(ROUTINES_KEY);
    if (!stored) return defaults();
    try {
      const routines = migrateRoutines(JSON.parse(stored) as Record<string, unknown>);
      if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
        localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
        const current = this.getCurrentUser();
        if (current) this.setCurrentUser(current);
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      }
      return routines;
    } catch { return defaults(); }
  },
  saveRoutines(routines: Routines) {
    localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
    localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
  }
};
