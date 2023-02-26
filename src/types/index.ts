export type Attack = {
  range: 1 | 2;
  direction: "orthogonal" | "diagonal";
  times: 1 | 2;
} | null;

export type Movement = {
  range: 0 | 1 | 2 | null;
  direction: "orthogonal" | "diagonal";
} | null;

export type Unit = {
  name:
    | "archer"
    | "berserker"
    | "cavalry"
    | "crossbowman"
    | "knight"
    | "lancer"
    | "mercenary"
    | "swordsman"
    | "royal";
  abbreviation: "Ac" | "Bk" | "Cv" | "Cb" | "Kn" | "Ln" | "Mc" | "Sm" | "Ry";
  actions: 1 | 2;
  royal_action?: "recruit" | "initiative";
  firstAction?: "attack" | "move";
  movement: Movement;
  attack: Attack;
  total: 2 | 4 | 5;
};

export type Player = {
  name: string;
  controlledZones: number;
  handUnits: Unit[];
  bag: Unit[];
  recruitmentZone: Unit[];
  discardPile: Unit[];
};

export type Board = {
  controlZone: boolean;
  controlledBy: Player | null;
  unit: Unit | null;
  unitOwner: Player | null;
}[][];
