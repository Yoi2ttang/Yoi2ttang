import PeopleIcon from "@/assets/icons/navigation-bar/people-icon.svg"
import PersonIcon from "@/assets/icons/navigation-bar/person-icon.svg"
import RouteIcon from "@/assets/icons/navigation-bar/route-icon.svg"
import NavigationButton from "./NavigationButton"
import NavigationProfileButton from "./NavigationProfileButton"
import NavigationRunningButton from "./NavigationRunningButton"

const NavigationBar = () => {
  return (
    <div className="h-yoi-navbar-height max-w-yoi-width fixed bottom-0 z-9999 flex w-full items-center justify-around border-t border-neutral-200 bg-white font-semibold">
      <NavigationButton
        href="/dashboard/my"
        icon={<PersonIcon className="size-7" />}
        label="마이"
      />
      <NavigationButton
        href="/dashboard/team"
        icon={<PeopleIcon className="size-7" />}
        label="팀"
      />
      <NavigationRunningButton />
      <NavigationButton
        href="/quest"
        icon={<RouteIcon className="size-7" />}
        label="퀘스트"
      />
      <NavigationProfileButton href="/profile" label="프로필" />
    </div>
  )
}

export default NavigationBar
