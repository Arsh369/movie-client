import { useEffect } from "react";

const Modal = ({ isOpen, onClose, children, title = "" }) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title || "Modal dialog"}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
    >
      {/* Backdrop — clicking outside closes the modal */}
      <div
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity duration-200"
      />

      {/* Modal Panel */}
      <div className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 text-left text-slate-100 shadow-2xl shadow-black/60 transition-all duration-200">
        {/* Top Bar with Optional Title & Close Button */}
        <div className="flex items-center justify-between border-b border-slate-800/80 px-5 py-3.5 sm:px-6">
          {title ? (
            <h3 className="text-base font-semibold tracking-tight text-white">
              {title}
            </h3>
          ) : (
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Manage Details
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors duration-150 hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6">{children}</div>
      </div>
    </div>
  );
};

export default Modal;