interface HeaderWrapperProps {
  children: React.ReactNode
}

const HeaderWrapper = ({ children }: HeaderWrapperProps) => {
  return (
    <header className="max-w-yoi-width h-yoi-header-height sticky top-0 w-full bg-neutral-50">
      <div className="flex h-full w-full items-center px-4 py-6">
        {children}
      </div>
    </header>
  )
}

export default HeaderWrapper
