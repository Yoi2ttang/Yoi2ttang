import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import PersonIcon from "@/assets/icons/navigation-bar/person-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import NavigationButton from "./NavigationButton"
import RunningButton from "./RunningButton"

const NavigationBar = () => {
  return (
    <div className="fixed bottom-0 w-full font-semibold bg-white border-t h-yoi-navbar-height border-neutral-200 max-w-yoi-width">
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
