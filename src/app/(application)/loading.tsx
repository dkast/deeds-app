import NavBar from "@/components/layout/nav-bar"
import Spinner from "@/components/ui/spinner"

export default function Loading() {
  return (
    <>
      {/* <NavBar title="Inicio" /> */}
      <div className="relative items-center justify-center h-full">
        <div className="absolute -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2">
          <Spinner />
        </div>
      </div>
    </>
  )
}
