const PersonalTitleSection = () => {
  const mockData = {
    name: "창조",
    days: 100,
  }

  const { name, days } = mockData
  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-title-md">
        안녕하세요 <span className="text-yoi-500">{name}</span>님
      </h3>
      <p className="text-title-sm">
        <span className="">요이땅</span>과&nbsp;
        <span className="text-yoi-500">{days}일</span>동안 달리고 있어요
      </p>
    </section>
  )
}
export default PersonalTitleSection
