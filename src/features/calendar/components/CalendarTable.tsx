import { useAppSelector } from "../../../store/hooks";
import { LAST_GW } from "../../../shared/utils/constants";
import { TEAMS_LIST } from "../../../shared/utils/data/teamsData";
import { setFixtureBackgroundColor } from "../../../shared/helper/setFixtureBackgroundColor";
import { TeamFixture } from "../../../store_features/teams/teamsSlice";
import { CalendarTableStyled } from "./Calendar.styled";
import logo from "../../../shared/assets/logos/fpltools_logo.png";
import styled from "styled-components";

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
  return (
    <CalendarTableRowStyled color={color}>
      <td className="team-td">{name}</td>
      {fixtures.map((fixture, index) => (
        <CalendarTableDataStyled
          fixture={fixture}
          setFixtureBackgroundColor={setFixtureBackgroundColor}
          key={index}
        >
          <div className="content-td">
            <span>{fixture.opponent}</span>
            <span>{fixture.isHome ? "(H)" : "(A)"}</span>
          </div>
        </CalendarTableDataStyled>
      ))}
    </CalendarTableRowStyled>
  );
};

const CalendarTableRowStyled = styled.tr<{
  color: string;
}>`
  .team-td {
    border-bottom: 20px solid ${(props) => props.color};
  }
`;

const CalendarTableDataStyled = styled.td<{
  fixture: TeamFixture;
  setFixtureBackgroundColor: (difficulty: number) => string | undefined;
}>`
  background-color: ${(props) =>
    props.setFixtureBackgroundColor(props.fixture.difficulty)};
  color: black;
  padding: 0.75rem 1rem;
`;

export default CalendarTable;
