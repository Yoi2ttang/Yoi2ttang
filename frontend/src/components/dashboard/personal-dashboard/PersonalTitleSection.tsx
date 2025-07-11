interface PersonalTitleSectionProps {
  name: string
  days: number
}

const PersonalTitleSection = ({ name, days }: PersonalTitleSectionProps) => {
  return (
    <section className="flex flex-col gap-1">
      <h3 className="text-title-md flex items-center">
        안녕하세요&nbsp;
        <span className="text-yoi-500 inline-block max-w-40 truncate">
          {name}
        </span>
        &nbsp;님
      </h3>
      <p className="text-title-sm">
        <span className="">요이땅</span>과&nbsp;
        <span className="text-yoi-500">{days ? days : "-"}일 </span>동안 달리고
        있어요
      </p>
    </section>
  )
}
export default PersonalTitleSection
