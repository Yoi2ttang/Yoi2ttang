import { ReactNode } from "react"

interface HeaderWrapperProps {
  children: ReactNode
}

const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return (
    <header className="max-w-yoi-width max-h-yoi-header-height h-yoi-header-height sticky top-0 w-full bg-neutral-50">
      <div className="flex h-full w-full items-center px-2">{children}</div>
    </header>
  )
}

export default HeaderWrapper
