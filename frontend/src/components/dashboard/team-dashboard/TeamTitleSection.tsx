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
      <h3 className="text-title-md">
        <span className="text-black">{username}</span>님은&nbsp;
        <span className="text-yoi-500">{teamName}</span> 팀입니다.
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
