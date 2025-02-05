"use client";

export function PatternBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Grid Pattern */}
      <div
        className="absolute inset-0 bg-[#131821] opacity-20"
        style={{
          backgroundImage: `linear-gradient(#273344 1px, transparent 1px), linear-gradient(to right, #273344 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 bg-[#10151D]"
        style={{
          background: `
          radial-gradient(circle at 0% 0%, rgba(16, 185, 129, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 100% 0%, rgba(244, 63, 94, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 100% 100%, rgba(255, 162, 62, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 0% 100%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)
        `,
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
