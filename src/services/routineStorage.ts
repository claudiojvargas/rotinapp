import { defaultRoutines } from '../data/defaultRoutines';
import type { Person, Routines } from '../types/routine';

const USER_KEY = 'nossa-rotina:user';
const ROUTINES_KEY = 'nossa-rotina:routines';

const cloneDefaults = (): Routines => JSON.parse(JSON.stringify(defaultRoutines)) as Routines;

export const routineStorage = {
  getCurrentUser(): Person | null {
    const value = localStorage.getItem(USER_KEY);
    return value === 'claudio' || value === 'malu' ? value : null;
  },
  setCurrentUser(person: Person) { localStorage.setItem(USER_KEY, person); },
  getRoutines(): Routines {
    const stored = localStorage.getItem(ROUTINES_KEY);
    if (!stored) return cloneDefaults();
    try {
      const parsed = JSON.parse(stored) as Partial<Routines>;
      return {
        claudio: Array.isArray(parsed.claudio) ? parsed.claudio : cloneDefaults().claudio,
        malu: Array.isArray(parsed.malu) ? parsed.malu : []
      };
    } catch { return cloneDefaults(); }
  },
  saveRoutines(routines: Routines) { localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines)); }
};
