interface HeaderWrapperProps {
  children: React.ReactNode
}

const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return (
    <header className="max-w-yoi-width max-h-yoi-header-height h-yoi-header-height sticky top-0 w-full bg-neutral-50">
      <div className="flex h-full w-full items-center px-4">{children}</div>
    </header>
  )
}

export default HeaderWrapper
