import { motion, AnimatePresence } from 'framer-motion';

type SuccessModalProps = {
  open: boolean;
  onClose: () => void;
  message: string;
};

export default function SuccessModal({ open, onClose, message }: SuccessModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl p-8 max-w-sm w-full shadow-xl text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <h2 className="text-2xl font-bold mb-2 text-green-600">Success!</h2>
            <p className="mb-6">{message}</p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              OK
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
