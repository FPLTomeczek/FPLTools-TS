import { Range } from "../../shared/utils/types/range";

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
  scoring_chance: Range<0, 101>;
  __v: number;
}

export interface PlayerHistory {
  _id: string;
  id: number;
  cost_history: number[];
  __v: number;
}

export interface PlayerFilters {
  name: string;
  team: string;
  role: string;
}

export interface PlayerRankingsFilters extends PlayerFilters {
  probability: string;
  price: number;
}

export interface SortOptions {
  type: string;
  value: string;
}
