import { isEmpty } from "lodash";
import blank from "../../../../shared/assets/shirts/blank.png";
import { useDraft } from "../../../../store/customHooks";
import { Pick } from "../../../../store_features/drafts/drafts";

export const PickShirt = ({
  src,
  pick,
}: {
  src: string | undefined;
  pick: Pick;
}) => {
  const pickToChange = useDraft().pickToChange;

  if (typeof src === "undefined")
    return <img src={blank} alt="default pick shirt" className="pick-shirt" />;
  return (
    <img
      src={src}
      alt="shirt"
      className={`pick-shirt ${
        !isEmpty(pickToChange) && pickToChange.id === pick.id
          ? "change-pick"
          : ""
      }`}
    />
  );
};
