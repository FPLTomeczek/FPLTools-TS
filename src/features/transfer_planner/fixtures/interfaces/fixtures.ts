import { Range } from "../../../../shared/utils/types/range";

export interface Fixture {
  event: number;
  team_a: string;
  team_h: string;
  team_a_difficulty: Range<2, 6>;
  team_h_difficulty: Range<2, 6>;
}
