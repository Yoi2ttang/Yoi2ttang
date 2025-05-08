import { BellIcon, ChevronRight } from "lucide-react"
import Section from "../common/Section"

const AccountManagementSection = () => {
  return (
    <Section title="계정 관리" className="rounded-2xl bg-white p-6">
      <div className="flex flex-col gap-4 overflow-hidden">
        {Array.from({ length: 2 }).map((_, index) => (
          <div key={index} className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <BellIcon />
              <p>약관 및 정책</p>
            </div>

            <div className="cursor-pointer">
              <ChevronRight className="size-5 text-neutral-300" />
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

export default AccountManagementSection
