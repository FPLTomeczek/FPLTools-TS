export interface Player {
  _id: string;
  id: number;
  web_name: string;
  goals: number;
  assists: number;
  team: string;
  element_type: string;
  total_points: number;
  now_cost: number;
  availability: number;
  __v: number;
}

export interface PlayerHistory {
  _id: string;
  id: number;
  cost_history: number[];
  __v: number;
}

export interface FilterOptions {
  name: string;
  team: string;
  role: string;
}

export interface SortOptions {
  type: string;
  value: string;
}
