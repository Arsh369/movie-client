const Loader = ({ size = "md", label = "", fullScreen = false }) => {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-[3px]",
    lg: "h-16 w-16 border-4",
  };

  const spinner = (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex flex-col items-center justify-center gap-3"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft ambient glow */}
        <div
          className={`absolute rounded-full bg-amber-500/20 blur-md ${
            sizeClasses[size] || sizeClasses.md
          }`}
        />
        {/* Crisp dual-ring spinner */}
        <div
          className={`animate-spin rounded-full border-slate-800 border-t-amber-500 border-r-amber-400/70 ${
            sizeClasses[size] || sizeClasses.md
          }`}
        />
      </div>

      {label && (
        <span className="text-xs font-medium tracking-wide text-slate-400 animate-pulse">
          {label}
        </span>
      )}
      <span className="sr-only">{label || "Loading..."}</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="flex min-h-[60vh] w-full items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loader;