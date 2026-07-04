import { CardWrapper } from "@components/layout/CardWrapper";
import TabContainer from "@components/ui/TabContainer";
import UserProfile from "@components/ui/UserProfile";
import { NavLink } from "react-router";

export default function Header() {
	return (
		<CardWrapper
			variant="blue"
			shadingStyle="linear"
			tag="header"
			className="w-full rounded-t-md flex min-h-9.5 overflow-hidden"
		>
			<NavLink to="/editor" end>
				<CardWrapper
					shadingStyle="square"
					variant="green"
					className="
            flex items-center h-full pl-2.5 gap-2 min-w-32.5 rounded-r-2xl rounded-tl-md
            hover:brightness-110 transition-all
          "
				>
					<img
						src="/assets/home.webp"
						alt="Icon of a small house with a white facade and an orange roof"
						width={30}
						height={30}
					/>
					<span className="text-white font-bold shadown text-shadow-lg">
						Home
					</span>
				</CardWrapper>
			</NavLink>
			<div className="flex px-2 items-center justify-between w-full">
				<TabContainer />
				<UserProfile />
			</div>
		</CardWrapper>
	);
}
