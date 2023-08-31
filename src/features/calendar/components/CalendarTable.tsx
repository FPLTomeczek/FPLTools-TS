import { useAppSelector } from "../../../store/hooks";
import { LAST_GW } from "../../../shared/utils/constants";
import { TEAMS_LIST } from "../../../shared/utils/data/teamsData";
import { setFixtureBackgroundColor } from "../../../shared/helper/setFixtureBackgroundColor";
import { TeamFixture } from "../../../store_features/teams/teamsSlice";
import {
  CalendarTableDataStyled,
  CalendarTableRowStyled,
  CalendarTableStyled,
} from "./Calendar.styled";
import logo from "../../../shared/assets/logos/fpltools_logo.webp";

const gwArray = Array.from({ length: LAST_GW }, (_, i) => i + 1);

const CalendarTable = () => {
  const teamsList = useAppSelector((state) => state.teams.teamsList);
  const gameweeksList = useAppSelector(
    (state) => state.gameweeks.gameweeksList
  );

  return (
    <CalendarTableStyled>
      <table>
        <thead className="calendar-thead">
          <tr>
            <th className="calendar-th">
              <img className="calendar-th-logo" src={logo} alt="logo" />
            </th>
            {gwArray.map((gw) => {
              const date = gameweeksList[gw - 1]?.deadline_time.split("T")[0];
              return (
                <th className="calendar-th" key={gw}>
                  <div>GW{gw}</div> <span>{date}</span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {teamsList.map((team) => {
            const { name, fixtures } = team;
            const teamFiltered = TEAMS_LIST.filter((team) => {
              return team.name === name;
            });
            const color = teamFiltered[0].color[0];
            return (
              <CalendarTableRow
                key={name}
                fixtures={fixtures}
                color={color}
                name={name}
              />
            );
          })}
        </tbody>
      </table>
    </CalendarTableStyled>
  );
};

const CalendarTableRow = ({
  fixtures,
  color,
  name,
}: {
  fixtures: TeamFixture[];
  color: string;
  name: string;
}) => {
  const gws = Array.from({ length: LAST_GW }, (_, i) => 1 + i * 1);

  return (
    <CalendarTableRowStyled color={color}>
      <td className="team-td">{name}</td>

      {gws.map((gw) => {
        const fixture = fixtures.filter((fixture) => fixture.event === gw);
        if (fixture.length === 1) {
          return (
            <CalendarTableDataStyled
              fixture={fixture[0]}
              setFixtureBackgroundColor={setFixtureBackgroundColor}
              key={`${gw}-${fixture[0].opponent}`}
            >
              <div className="content-td">
                <span>{fixture[0].opponent}</span>
                <span>{fixture[0].isHome ? "(H)" : "(A)"}</span>
              </div>
            </CalendarTableDataStyled>
          );
        } else if (fixture.length > 1) {
          // Double GW Compionent
          return;
        } else {
          return (
            <td key={`${gw}-blank`}>
              <div className="content-td">
                <span>-</span>
              </div>
            </td>
          );
        }
      })}
    </CalendarTableRowStyled>
  );
};

export default CalendarTable;
