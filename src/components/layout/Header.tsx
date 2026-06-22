import { CardWrapper } from "@components/layout/CardWrapper";
import TabContainer from "../../pages/Editor/components/TabContainer";
import UserProfile from "@components/ui/UserProfile";
import Logo from "@components/ui/Logo";

type TypeDistribution = "start" | "between" | "end";

interface TypeProps {
  hasTabs?: boolean;
  hasUserProfile?: boolean;
  hasLogo?: boolean;
  distribution?: TypeDistribution;
}

export default function Header({
  hasLogo,
  hasTabs,
  hasUserProfile,
  distribution,
}: TypeProps) {
  const variantDistribution: Record<TypeDistribution, string> = {
    start: "justify-start",
    between: "justify-between",
    end: "justify-end",
  };

  const getDistribution = variantDistribution[distribution ?? "between"];

  return (
    <CardWrapper
      variant="blue"
      gradientStyle="linear"
      tag="header"
      className={`
        w-full px-2 rounded-t min-h-9.5
        flex items-center ${getDistribution}
      `}
    >
      {hasLogo ? <Logo /> : " "}
      {hasTabs ? <TabContainer /> : " "}
      {hasUserProfile ? <UserProfile /> : " "}
    </CardWrapper>
  );
}
