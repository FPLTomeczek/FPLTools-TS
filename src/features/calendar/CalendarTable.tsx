import { useAppSelector } from "../../app/hooks";
import { LAST_GW } from "../../constants";
import { TEAMS_LIST } from "../../data";
import { setFixtureBackgroundColor } from "../utils";
import { TeamFixture } from "../../store_features/teams/teamsSlice";
import { CalendarTableStyled } from "./Calendar.styled";

const gwArray = Array.from({ length: LAST_GW }, (_, i) => i + 1);

const CalendarTable = () => {
  const teamsList = useAppSelector((state) => state.teams.teamsList);
  const gameweeksList = useAppSelector(
    (state) => state.gameweeks.gameweeksList
  );

  return (
    <CalendarTableStyled>
      <thead className="calendar-thead">
        <tr>
          <th className="calendar-th">FPLTools</th>
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
            <CalendarTableDataRow
              key={name}
              fixtures={fixtures}
              color={color}
              name={name}
            />
          );
        })}
      </tbody>
    </CalendarTableStyled>
  );
};

const CalendarTableDataRow = ({
  fixtures,
  color,
  name,
}: {
  fixtures: TeamFixture[];
  color: string;
  name: string;
}) => {
  return (
    <tr>
      <td
        style={{
          borderBottom: `20px solid ${color}`,
        }}
      >
        {name}
      </td>
      {fixtures.map((fixture, index) => (
        <td
          className="opponent-td"
          key={index}
          style={{
            backgroundColor: setFixtureBackgroundColor(fixture.difficulty),
            color: "black",
            padding: "0.75rem 1rem",
          }}
        >
          <div className="content-td">
            <span>{fixture.opponent}</span>
            <span>{fixture.isHome ? "(H)" : "(A)"}</span>
          </div>
        </td>
      ))}
    </tr>
  );
};

export default CalendarTable;
