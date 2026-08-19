import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface TileProps {
  title: string;
  text: string;
  content?: React.ReactNode;
}

export default function TileCinematic({ title, text, content }: TileProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
                         bg-black/70 backdrop-blur-lg
                         p-4 md:p-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                className="
                  tile-base tile-open
                  relative w-full max-w-4xl max-h-[90vh]
                  rounded-xl
                  p-6 md:p-12
                  overflow-y-auto
                  "
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button at top-right */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    absolute top-4 right-4 md:top-6 md:right-6
                    w-10 h-10 md:w-12 md:h-12
                    flex items-center justify-center
                    rounded-full
                    bg-black/60 hover:bg-black/80
                    border border-white/20 hover:border-white/40
                    text-white text-xl md:text-2xl
                    font-bold
                    transition-all
                    z-10
                    backdrop-blur-sm
                  "
                  aria-label="Close"
                >
                  ×
                </button>

                <div
                  className="
                    text-2xl md:text-[2.8rem] font-bold tracking-tight
                    text-white mb-6 md:mb-8
                    pr-12 md:pr-16
                  "
                >
                  {title}
                </div>

                <div className="text-white/80 leading-relaxed space-y-4 text-sm md:text-base">
                  {content ? content : <p>{text}</p>}
                </div>

                {/* Bottom close button for mobile (backup) */}
                <button
                  onClick={() => setOpen(false)}
                  className="
                    mt-6 md:mt-10 px-6 py-2 rounded-full
                    bg-[var(--color-accent)]
                    text-black font-semibold
                    hover:opacity-90 transition
                    md:hidden
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
