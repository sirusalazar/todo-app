import { v4 as uuidv4 } from 'uuid';

export const TODOS = [
  {
    id: uuidv4(),
    title: 'Buy groceries',
    completed: false,
    dueDate: new Date('2025-05-20').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Finish Angular assignment',
    completed: false,
    dueDate: new Date('2025-05-10').toISOString(),
    pastDue: true,
  },
  {
    id: uuidv4(),
    title: 'Schedule dentist appointment',
    completed: true,
    dueDate: new Date('2025-04-30').toISOString(),
    pastDue: true,
  },
  {
    id: uuidv4(),
    title: 'Call mom',
    completed: false,
    dueDate: new Date('2025-05-15').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Pay electricity bill',
    completed: true,
    dueDate: new Date('2025-05-01').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Submit project proposal',
    completed: false,
    dueDate: new Date('2025-05-05').toISOString(),
    pastDue: true,
  },
  {
    id: uuidv4(),
    title: 'Clean garage',
    completed: false,
    dueDate: new Date('2025-05-22').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Renew car insurance',
    completed: true,
    dueDate: new Date('2025-04-25').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Book vacation flights',
    completed: false,
    dueDate: new Date('2025-05-19').toISOString(),
    pastDue: false,
  },
  {
    id: uuidv4(),
    title: 'Prepare monthly report',
    completed: false,
    dueDate: new Date('2025-05-14').toISOString(),
    pastDue: true,
  },
];
