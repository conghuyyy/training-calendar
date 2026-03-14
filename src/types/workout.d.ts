declare namespace Workout {
  export interface Entity {
    id: string;
    name: string;
    exerciseIds: string[];
  }

  export type Map = Record<string, Entity>;
}
