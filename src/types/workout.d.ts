declare namespace Workout {
  interface Entity {
    id: string;
    name: string;
    exerciseIds: string[];
  }

  type Map = Record<string, Entity>;
}
