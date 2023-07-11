import { Player } from "./players";
import { Chip } from "../features/transfer_planner/chips/chipsInterfaces";

export interface Pick extends Player {
  position: number;
  sellCost: number;
  removedPickIndex?: number;
}

export const playerBlankTemplate: Pick = {
  _id: "",
  id: -1,
  web_name: "",
  goals: -1,
  assists: -1,
  team: "",
  element_type: "",
  total_points: -1,
  now_cost: -1,
  availability: -1,
  __v: -1,
  position: -1,
  sellCost: -1,
  removedPickIndex: -1,
  scoring_chance: 0,
};

export interface RemovedPick {
  web_name: string;
  element_type: string;
  position: number;
  removedPickIndex: number;
}

export interface ManagerHistory {
  current: GameweekDetail[];
  past: SeasonDetail[];
  chips: Chip[];
}

interface GameweekDetail {
  event: number;
  points: number;
  total_points: number;
  rank: number;
  rank_sort: number;
  overall_rank: number;
  bank: number;
  value: number;
  event_transfers: number;
  event_transfers_cost: number;
  points_on_bench: number;
}

interface SeasonDetail {
  season_name: string;
  total_points: number;
  rank: number;
}

export interface Transfer {
  element_in: number;
  element_in_cost: number;
  element_out: number;
  element_out_cost: number;
  entry: number;
  event: number;
  time: string;
}
