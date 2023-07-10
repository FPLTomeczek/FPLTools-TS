import { shirts } from "../../../assets/shirts";

export const TEAMS_LIST = [
  { name: "ARS", color: ["#EF0107", "#FFFFFF"], img: shirts.ARS },
  { name: "AVL", color: ["#95BFE5", "#670E36"], img: shirts.AVL },
  { name: "BOU", color: ["#B50E12", "#000000"], img: shirts.BOU },
  { name: "BRE", color: ["#D20000", "#FFFFFF"], img: shirts.BRE },
  { name: "BHA", color: ["#0057B8", "#FFFFFF"], img: shirts.BHA },
  { name: "CFC", color: ["#034694"], img: shirts.CFC },
  { name: "CRY", color: ["#1B458F", "#C4122E"], img: shirts.CRY },
  { name: "EVE", color: ["#003399", "#FFFFFF"], img: shirts.EVE },
  { name: "FUL", color: ["#FFFFFF", "#000000"], img: shirts.FUL },
  { name: "LEE", color: ["#FFCD00", "#1D428A"], img: shirts.LEE },
  { name: "LEI", color: ["#003090"], img: shirts.LEI },
  { name: "LIV", color: ["#C8102E"], img: shirts.LIV },
  { name: "MCI", color: ["#6CABDD"], img: shirts.MCI },
  { name: "MUN", color: ["#DA291C"], img: shirts.MUN },
  { name: "NEW", color: ["#241F20"], img: shirts.NEW },
  { name: "NFO", color: ["#DD0000", "#FFFFFF"], img: shirts.NFO },
  { name: "SOU", color: ["#D71920", "#130C0E"], img: shirts.SOU },
  { name: "TOT", color: ["#FFFFFF"], img: shirts.TOT },
  { name: "WHU", color: ["#7A263A"], img: shirts.WHU },
  { name: "WOL", color: ["#FDB913"], img: shirts.WOL },
] as const;

export const ROLES = [
  {
    role: "GK",
    value: "Goalkeeper",
  },
  {
    role: "DEF",
    value: "Defender",
  },
  {
    role: "MID",
    value: "Midfielder",
  },
  {
    role: "FWD",
    value: "Forward",
  },
] as const;
