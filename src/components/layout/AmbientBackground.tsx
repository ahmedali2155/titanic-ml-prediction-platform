export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="fathom-grid absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_40%,transparent_100%)]" />
      <div className="absolute -left-40 top-[-10%] h-[520px] w-[520px] animate-drift-slow rounded-full bg-signal-500/10 blur-[120px]" />
      <div
        className="absolute -right-32 top-[20%] h-[440px] w-[440px] animate-drift-slow rounded-full bg-current-500/10 blur-[120px]"
        style={{ animationDelay: "-6s" }}
      />
      <div
        className="absolute bottom-[-10%] left-[30%] h-[400px] w-[400px] animate-drift-slow rounded-full bg-challenger/10 blur-[120px]"
        style={{ animationDelay: "-11s" }}
      />
    </div>
  );
}
