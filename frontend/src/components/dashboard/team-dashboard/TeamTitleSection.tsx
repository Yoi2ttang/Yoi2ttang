interface TeamTitleSectionProps {
  teamInfo: {
    username: string
    teamName: string
    rank: number
    tileCount: number
    zodiacId: number
  }
}

const TeamTitleSection = ({ teamInfo }: TeamTitleSectionProps) => {
  const { username, teamName, rank } = teamInfo

  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-title-md flex items-start">
        <span className="max-w-40 truncate text-black">우리 팀은&nbsp;</span>
        <span className="text-yoi-500">{teamName}</span>&nbsp;팀입니다.
      </h3>
      <p className="text-title-sm">
        <span>
          우리 팀은 <span className="text-yoi-500">{rank}등</span>으로 달리고
          있어요!
        </span>
      </p>
    </section>
  )
}
export default TeamTitleSection
