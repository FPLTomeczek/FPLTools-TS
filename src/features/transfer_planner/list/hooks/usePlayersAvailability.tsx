import { useDraft } from "../../../../store/customHooks";
import { useAppDispatch } from "../../../../store/hooks";
import { addPick } from "../../../../store_features/drafts/draftsSlice";
import { Player } from "../../../../store_features/players/players";

export const usePlayersAvailability = (player: Player) => {
  const dispatch = useAppDispatch();
  const managerPicks = useDraft().picks;

  const addPlayerToTeam = () => {
    dispatch(addPick(player));
  };

  const availableRoles = [
    ...new Set(
      managerPicks
        .filter((pick) => pick.web_name === "Blank")
        .map((pick) => pick.element_type)
    ),
  ];

  const isPlayerAvailable = !(
    managerPicks.find((pick) => pick.id === player.id) ||
    !availableRoles.includes(player.element_type)
  );

  return {
    isPlayerAvailable,
    addPlayerToTeam,
  };
};

export default usePlayersAvailability;
