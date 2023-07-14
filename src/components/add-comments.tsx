"use client"

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

type AddCommentsProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  comment: string
  setComment: React.Dispatch<React.SetStateAction<string>>
  onClose: () => void
}

const AddComments = ({
  open,
  setOpen,
  comment,
  setComment,
  onClose
}: AddCommentsProps) => {
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
                      className="relative inline-block w-full overflow-hidden rounded-xl bg-white px-4 pt-5 pb-4 text-left align-top shadow-xl sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle"
                    >
                      <div className="flex flex-col">
                        <textarea
                          name="comments"
                          rows={3}
                          placeholder="Dinos un poco más.."
                          className="mb-4 border-0 focus:ring-0 text-slate-900"
                          value={comment}
                          onChange={event => setComment(event.target.value)}
                        ></textarea>
                        <button
                          type="submit"
                          disabled={comment.length === 0 ? true : false}
                          className="rounded-full bg-violet-600 py-2 text-white shadow-lg shadow-violet-500/50 active:bg-violet-600 disabled:text-violet-300"
                          onClick={onClose}
                        >
                          Agregar
                        </button>
                      </div>
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

export default AddComments
