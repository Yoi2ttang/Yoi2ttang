import StackHeader from "@/components/layouts/Header/StackHeader"
import AccountManagementSection from "@/components/profile/AcountManagementSection"

const SettingPage = () => {
  return (
    <div>
      <StackHeader title="설정" />

      <div className="flex flex-col gap-6 p-4">
        <AccountManagementSection />
        <AccountManagementSection />
      </div>
    </div>
  )
}

export default SettingPage
