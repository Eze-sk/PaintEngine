import { CardWrapper } from "@components/layout/CardWrapper";
import TabContainer from "@components/ui/TabContainer";
import UserProfile from "@components/ui/UserProfile";

export default function Header() {
	return (
		<CardWrapper
			variant="blue"
			gradientStyle="linear"
			tag="header"
			className="w-full px-2 rounded-t min-h-9.5 flex items-center justify-between"
		>
			<TabContainer />
			<UserProfile />
		</CardWrapper>
	);
}
