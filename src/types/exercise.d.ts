declare namespace Exercise {
  interface Set {
    weight: number;
    reps: number;
  }

  interface Entity {
    id: string;
    name: string;
    sets: Set[];
  }

  type Map = Record<string, Entity>;
}
