import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { createPortal } from "react-dom";

interface TileProps {
  title: string;
  text: string;
  content?: React.ReactNode;
}

export default function TileCinematic({ title, text, content }: TileProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ───────── Compact Tile ───────── */}
      <motion.div
        onClick={() => setOpen(true)}
        className="
          tile-base
          flex flex-col
          p-10
          min-h-[280px]
          cursor-pointer
        "
      >
        <div className="flex flex-col gap-6 flex-1">
          {/* Title */}
          <div className="relative">
            <div
              className="
                text-lg tracking-[0.35em] uppercase font-semibold
                text-white
              "
            >
              {title}
            </div>
            <div className="mt-3 h-px w-12 bg-[var(--color-accent)]/60" />
          </div>

          {/* Text */}
          <p
            className="
              text-base italic leading-[1.6]
              text-white/80
              max-w-[28ch]
            "
          >
            {text}
          </p>
        </div>
      </motion.div>

      {/* ───────── Expanded View ───────── */}
      {open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              className="fixed inset-0 z-[9999]
                         flex items-center justify-center
                         bg-black/70 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="
                  tile-base tile-open
                  relative w-full max-w-4xl
                  rounded-xl
                  p-12
                  "
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="
                    text-[2.8rem] font-bold tracking-tight
                    text-white mb-8
                  "
                >
                  {title}
                </div>

                <div className="text-white/80 leading-relaxed space-y-4">
                  {content ? content : <p>{text}</p>}
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="
                    mt-10 px-6 py-2 rounded-full
                    bg-[var(--color-accent)]
                    text-black font-semibold
                    hover:opacity-90 transition
                  "
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
