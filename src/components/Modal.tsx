import React from "react"
import * as Dialog from "@radix-ui/react-dialog"
import { AnimatePresence, motion } from "framer-motion"

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
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.9,
    transition: {
      ease: "easeIn",
      duration: 0.2
    }
  }
}

type ModalProps = {
  children: React.ReactNode
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const Modal = ({ children, open, setOpen }: ModalProps) => {
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
                className="fixed inset-0 z-50 min-h-screen bg-black bg-opacity-60 px-4 pt-4 pb-20 backdrop-blur-sm sm:block sm:p-0"
              >
                <div className="fixed inset-0 z-50 flex min-h-screen items-start justify-center overflow-y-auto px-4 py-20">
                  <Dialog.Content asChild forceMount>
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={dialog}
                      className="relative inline-block w-full overflow-hidden rounded-xl bg-neutral-700 px-4 pt-5 pb-4 text-left align-top shadow-xl outline-none sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                    >
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

export default Modal
