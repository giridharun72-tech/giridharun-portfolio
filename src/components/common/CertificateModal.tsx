import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn, ZoomOut, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  title: string;
}

export default function CertificateModal({ isOpen, onClose, imageSrc, title }: Props) {
  const [zoomed, setZoomed] = useState(false);

  const handleBackdrop = useCallback((e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          onClick={handleBackdrop}
        >
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 280 }}
            className="relative max-w-4xl w-full bg-[#111113] rounded-xl border border-white/8 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
              <h3 className="text-sm font-medium text-zinc-300 truncate pr-4">{title}</h3>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setZoomed(!zoomed)}
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/5"
                  aria-label={zoomed ? 'Zoom out' : 'Zoom in'}
                >
                  {zoomed ? <ZoomOut className="h-4 w-4" /> : <ZoomIn className="h-4 w-4" />}
                </button>
                <a
                  href={imageSrc}
                  download
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/5"
                  aria-label="Download"
                >
                  <Download className="h-4 w-4" />
                </a>
                <button
                  onClick={onClose}
                  className="p-1.5 text-zinc-500 hover:text-zinc-200 transition-colors rounded-md hover:bg-white/5"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Image */}
            <div className={`overflow-auto ${zoomed ? 'max-h-[80vh]' : 'max-h-[70vh]'}`}>
              <img
                src={imageSrc}
                alt={title}
                className={`w-full transition-transform duration-300 ${zoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setZoomed(!zoomed)}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
