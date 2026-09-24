import { createDefaultRoutine, defaultRoutines } from '../data/defaultRoutines';
import type { Person, Routines } from '../types/routine';

const USER_KEY = 'nossa-rotina:user';
const ROUTINES_KEY = 'nossa-rotina:routines';
const STORAGE_VERSION_KEY = 'nossa-rotina:storage-version';
const STORAGE_VERSION = '2';

const cloneDefaults = (): Routines => JSON.parse(JSON.stringify(defaultRoutines)) as Routines;

export const routineStorage = {
  getCurrentUser(): Person | null {
    const value = localStorage.getItem(USER_KEY);
    return value === 'claudio' || value === 'malu' ? value : null;
  },
  setCurrentUser(person: Person) { localStorage.setItem(USER_KEY, person); },
  getRoutines(): Routines {
    const stored = localStorage.getItem(ROUTINES_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      return cloneDefaults();
    }
    try {
      const parsed = JSON.parse(stored) as Partial<Routines>;
      const routines: Routines = {
        claudio: Array.isArray(parsed.claudio) ? parsed.claudio : cloneDefaults().claudio,
        malu: Array.isArray(parsed.malu) ? parsed.malu : []
      };
      if (localStorage.getItem(STORAGE_VERSION_KEY) !== STORAGE_VERSION) {
        if (routines.malu.length === 0) routines.malu = createDefaultRoutine('malu');
        localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines));
        localStorage.setItem(STORAGE_VERSION_KEY, STORAGE_VERSION);
      }
      return routines;
    } catch { return cloneDefaults(); }
  },
  saveRoutines(routines: Routines) { localStorage.setItem(ROUTINES_KEY, JSON.stringify(routines)); }
};
