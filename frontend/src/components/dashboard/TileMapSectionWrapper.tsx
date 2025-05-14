import TileMapSection from "./TileMapSection"

interface TileMapSectionWrapperProps {
  type: "my" | "team"
}

const TileMapSectionWrapper = ({ type }: TileMapSectionWrapperProps) => {
  return (
    <>
      <TileMapSection type={type} />
    </>
  )
}
export default TileMapSectionWrapper
