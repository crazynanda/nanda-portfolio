export default function BlueprintGrid() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden mix-blend-screen opacity-30">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500/20" />
          </pattern>
          <pattern id="grid" width="400" height="400" patternUnits="userSpaceOnUse">
            <rect width="400" height="400" fill="url(#smallGrid)" />
            <path d="M 400 0 L 0 0 0 400" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400/30" />
          </pattern>
        </defs>
        
        {/* Main Grid Base */}
        <rect width="100%" height="100%" fill="url(#grid)" />

        {/* Golden Ratio / Circle Guides - Stark Tech Style */}
        <g className="text-cyan-500/10">
           <circle cx="50%" cy="50%" r="300" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
           <circle cx="50%" cy="50%" r="500" fill="none" stroke="currentColor" strokeWidth="0.5" />
           
           {/* Crosshairs */}
           <line x1="0" y1="50%" x2="100%" y2="50%" stroke="currentColor" strokeWidth="0.5" />
           <line x1="50%" y1="0" x2="50%" y2="100%" stroke="currentColor" strokeWidth="0.5" />
        </g>
        
        {/* Corner Decorators */}
        <path d="M 20 20 L 100 20 L 100 21 L 21 21 L 21 100 L 20 100 Z" fill="currentColor" className="text-cyan-500/40" />
        <path d="M 20 20 L 100 20 L 100 21 L 21 21 L 21 100 L 20 100 Z" fill="currentColor" className="text-cyan-500/40" transform="rotate(90, 100%, 0)" style={{ transformOrigin: "100% 0" }} />
        <path d="M 20 20 L 100 20 L 100 21 L 21 21 L 21 100 L 20 100 Z" fill="currentColor" className="text-cyan-500/40" transform="rotate(180, 100%, 100%)" style={{ transformOrigin: "100% 100%" }} />
        <path d="M 20 20 L 100 20 L 100 21 L 21 21 L 21 100 L 20 100 Z" fill="currentColor" className="text-cyan-500/40" transform="rotate(270, 0, 100%)" style={{ transformOrigin: "0 100%" }} />

      </svg>
    </div>
  );
}
