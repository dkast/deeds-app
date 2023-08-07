type NavBarProps = {
  title: string
  leftItem?: React.ReactNode
  rightItem?: React.ReactNode
}

export default function NavBar({
  title,
  leftItem,
  rightItem
}: NavBarProps): JSX.Element {
  return (
    <>
      <div className="fixed inset-x-0 z-20 w-full bg-gradient-to-t from-neutral-800/50 to-neutral-800 px-6 py-4 backdrop-blur">
        <div className="grid grid-cols-4">
          <div className="flex items-center justify-start">{leftItem}</div>
          <div className="col-span-2">
            <h1 className="text-center text-2xl font-bold text-white">
              {title}
            </h1>
          </div>
          <div className="flex items-center justify-end">{rightItem}</div>
        </div>
      </div>
    </>
  )
}
