import React, { useRef } from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion, PanInfo } from "framer-motion"

const overlay = {
  visible: {
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  hidden: {
    opacity: 0,
    transition: {
      ease: "easeIn",
      duration: 0.1
    }
  }
}
const dialog = {
  visible: {
    y: 0,
    transition: { duration: 0.4, ease: [0.36, 0.66, 0.04, 1] }
  },
  hidden: {
    y: "100%",
    transition: { duration: 0.3, ease: [0.36, 0.66, 0.04, 1] }
  }
}

type BottomSheetProps = {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const BottomSheet = ({ children, open, setOpen }: BottomSheetProps) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleDrag = (
    _: MouseEvent | PointerEvent | TouchEvent,
    info: PanInfo
  ): void => {
    const height = modalRef.current?.getBoundingClientRect().height
    const offset = info.offset.y
    const velocity = info.velocity.y

    if (offset > height! / 2 || velocity > 800) {
      setOpen(false)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={overlay}
                className="fixed inset-0 z-50 min-h-screen bg-black bg-opacity-60 backdrop-blur-sm sm:block"
              >
                <div className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto pt-10">
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      ref={modalRef}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dialog}
                      drag="y"
                      dragDirectionLock
                      dragElastic={{ top: 0, bottom: 1 }}
                      dragConstraints={{ top: 0, bottom: 0 }}
                      onDragEnd={handleDrag}
                      className="relative inline-block h-full w-full overflow-hidden rounded-2xl bg-neutral-800 px-4 pt-2 pb-4 text-left align-top shadow-xl outline-none sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                    >
                      <div className="mb-3 flex justify-center">
                        <div className="h-1 w-8 rounded-full bg-neutral-700"></div>
                      </div>
                      {children}
                    </motion.div>
                  </Dialog.Content>
                </div>
              </motion.div>
            </Dialog.Overlay>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  )
}

export default BottomSheet
