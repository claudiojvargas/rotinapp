import type { Period, RoutineTask, Routines, UserId } from '../types/routine';

const entries: ReadonlyArray<readonly [string, string, string, Period, string]> = [
  ['07:00', '07:30', 'Acordar, higiene e beber água', 'morning', 'sunrise'],
  ['07:30', '08:30', 'Alimentar os animais', 'morning', 'paw'],
  ['08:30', '09:00', 'Café da manhã, sem PC', 'morning', 'coffee'],
  ['09:00', '09:15', 'Organizar as prioridades do dia', 'morning', 'list'],
  ['09:15', '11:00', 'Trabalho: projetos, Clovr ou prospecção', 'morning', 'briefcase'],
  ['11:00', '12:00', 'Continuação do trabalho', 'morning', 'laptop'],
  ['12:00', '13:00', 'Continuar o trabalho no PC', 'afternoon', 'laptop'],
  ['13:00', '14:00', 'Almoço e tempo juntos', 'afternoon', 'utensils'],
  ['14:00', '17:30', 'Trabalho: projetos, Clovr ou prospecção', 'afternoon', 'briefcase'],
  ['17:30', '17:45', 'Encerrar o bloco de trabalho', 'afternoon', 'circle-check'],
  ['17:45', '18:05', 'Fechar os animais', 'afternoon', 'paw'],
  ['18:05', '19:00', 'Finalizar pendências ou tempo livre', 'afternoon', 'sparkles'],
  ['19:00', '20:00', 'PC, projetos, jogos ou treino', 'night', 'gamepad'],
  ['20:00', '20:15', 'Banho e pausa', 'night', 'shower'],
  ['20:15', '20:45', 'Preparar o jantar juntos', 'night', 'cooking-pot'],
  ['20:45', '21:15', 'Jantar', 'night', 'utensils'],
  ['21:15', '22:30', 'Série e tempo juntos', 'night', 'heart'],
  ['22:30', '23:30', 'Desacelerar e preparar-se para dormir', 'night', 'moon'],
  ['23:30', '00:00', 'Dormir', 'night', 'bed']
];

export const createDefaultRoutine = (userId: UserId): RoutineTask[] =>
  entries.map(([startTime, endTime, title, period, icon], order) => ({
    id: `${userId}-${order + 1}`, userId, title, startTime, endTime, period, icon, order
  }));

export const defaultRoutines: Routines = {
  user1: createDefaultRoutine('user1'),
  user2: createDefaultRoutine('user2')
};
