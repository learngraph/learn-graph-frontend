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
      {/* ─────────────────────────────
         Compact Tile
         ───────────────────────────── */}
      <motion.div
        onClick={() => setOpen(true)}
        whileHover={{
          y: -4,
          boxShadow: "0 0 16px 2px rgba(61,194,242,0.25)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="tile-base flex flex-col justify-between p-8
                   hover:bg-[var(--color-tile-hover)]
                   transition-colors duration-200 ease-out
                   min-h-[260px] lg:min-h-[280px]
                   w-full max-w-[360px] md:max-w-[300px]
                   overflow-hidden text-left cursor-pointer mx-auto"
      >
        <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-3 leading-tight">
          {title}
        </h3>
        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
          {text}
        </p>
      </motion.div>

      {/* ─────────────────────────────
         Expanded Cinematic View (PORTAL)
         ───────────────────────────── */}
      {open &&
        createPortal(
          <AnimatePresence>
            <motion.div
              key="backdrop"
              className="fixed inset-0 z-[9999]
                         flex items-center justify-center
                         bg-black/60 backdrop-blur-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            >
              <motion.div
                key="expanded"
                className="relative w-full max-w-4xl
                           bg-[var(--color-section-bg)]
                           border border-[var(--color-tile-border)]
                           rounded-[var(--radius-card)]
                           shadow-[0_0_35px_rgba(61,194,242,0.3)]
                           p-10 text-center"
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 110, damping: 22 }}
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-3xl font-bold mb-4 text-[var(--color-text-primary)]">
                  {title}
                </h2>

                <div className="text-[var(--color-text-muted)] leading-relaxed mb-8 space-y-4 text-left">
                  {content ? content : <p>{text}</p>}
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="px-6 py-2 rounded-full
                             bg-[var(--color-accent)]
                             hover:bg-[var(--color-accent-hover)]
                             text-[var(--color-text-invert)]
                             font-semibold transition"
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
