import PersonIcon from "@/assets/icons/navigation-bar/person-icon.svg"
import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"

import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import NavigationButton from "./NavigationButton"
import RunningButton from "./RunningButton"

const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 font-semibold bg-white border-t h-14 border-neutral-200">
      <div className="absolute flex items-center justify-around w-full h-full">
        <NavigationButton
          href="/dashboard/my"
          icon={<PersonIcon />}
          label="마이"
        />
        <NavigationButton
          href="/dashboard/team"
          icon={<PeopleIcon />}
          label="팀"
        />
        <RunningButton />
        <NavigationButton href="/quest" icon={<RouteIcon />} label="퀘스트" />
        <NavigationButton
          href="/profile"
          icon={
            <div className="border rounded-full border-neutral-300 size-7" />
          }
          label="프로필"
        />
      </div>
    </div>
  )
}

export default NavigationBar
