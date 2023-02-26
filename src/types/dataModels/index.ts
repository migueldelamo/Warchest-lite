import { Unit } from "../";

export const MOVEMENTS = [
  "place",
  "control",
  "move",
  "recruit",
  "attack",
  "initiative",
  "forfeit",
];

export const Archer: Unit = {
  abbreviation: "Ac",
  name: "archer",
  actions: 1,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 2,
    direction: "diagonal",
    times: 1,
  },
  total: 4,
};

export const Berserker: Unit = {
  abbreviation: "Bk",
  name: "berserker",
  actions: 1,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 2,
  },
  total: 4,
};

export const Cavalry: Unit = {
  abbreviation: "Bk",
  name: "cavalry",
  actions: 2,
  firstAction: "move",
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 1,
  },
  total: 4,
};

export const Crossbowman: Unit = {
  abbreviation: "Cb",
  name: "crossbowman",
  actions: 1,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 2,
    direction: "orthogonal",
    times: 1,
  },
  total: 5,
};

export const Knight: Unit = {
  abbreviation: "Kn",
  name: "knight",
  actions: 1,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 1,
  },
  total: 5,
};

export const Mercenary: Unit = {
  abbreviation: "Mc",
  name: "mercenary",
  actions: 1,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 1,
  },
  total: 5,
};

export const Lancer: Unit = {
  abbreviation: "Ln",
  name: "lancer",
  actions: 2,
  movement: {
    range: 2,
    direction: "orthogonal",
  },
  firstAction: "move",
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 1,
  },
  total: 4,
};

export const Swordsman: Unit = {
  abbreviation: "Sm",
  name: "swordsman",
  actions: 2,
  movement: {
    range: 1,
    direction: "orthogonal",
  },
  firstAction: "attack",
  attack: {
    range: 1,
    direction: "orthogonal",
    times: 1,
  },
  total: 4,
};

export const Royal: Unit = {
  abbreviation: "Ry",
  name: "royal",
  actions: 1,
  movement: null,
  attack: null,
  total: 2,
};
