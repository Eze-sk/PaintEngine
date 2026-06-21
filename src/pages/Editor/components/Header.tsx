import { CardWrapper } from "@components/layout/CardWrapper";
import TabContainer from "./TabContainer";
import UserProfile from "@components/ui/UserProfile";

export default function Header() {
  return (
    <CardWrapper
      variant="blue"
      gradientStyle="linear"
      tag="header"
      className="w-full px-2 rounded-t flex justify-between items-center"
    >
      <TabContainer />
      <UserProfile />
    </CardWrapper>
  );
}
