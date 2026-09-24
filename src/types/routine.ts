export type Person = 'claudio' | 'malu';
export type Period = 'morning' | 'afternoon' | 'night';

export interface RoutineTask {
  id: string;
  person: Person;
  title: string;
  startTime: string;
  endTime?: string;
  period: Period;
  icon?: string;
  order: number;
}

export type Routines = Record<Person, RoutineTask[]>;

export const PERSON_NAMES: Record<Person, string> = { claudio: 'Claudio', malu: 'Malu' };

