
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 bg-stark-bg text-white overflow-hidden">
        {/* Background Watermark */}
        <div className="absolute -top-40 -right-40 w-[800px] h-[800px] bg-arc-cyan/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="container-custom px-6 max-w-[1800px] mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sticky Header - Left Column */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                    <span className="text-arc-cyan font-mono uppercase text-sm tracking-[0.2em] mb-4 block">
                        // 03 EXPERIENCE
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white uppercase">
                        Mission<br/>Log
                    </h2>
                     <p className="text-gray-400 text-lg max-w-xs leading-relaxed font-mono text-sm">
                        Operating timeline and key deployments across the sector.
                    </p>
                </div>
            </div>

            {/* Content - Right Column */}
            <div className="lg:col-span-8 flex flex-col pt-12 lg:pt-0">
                {experiences.map((exp, index) => (
                    <div key={exp.id} className="group border-t border-white/10 py-16 transition-all hover:bg-white/[0.02]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                            
                            {/* Role & Meta */}
                            <div className="md:col-span-5 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-3xl font-bold mb-2 group-hover:text-arc-cyan transition-colors text-white">
                                        {exp.title}
                                    </h3>
                                    <div className="text-lg text-gray-400 font-mono mb-1">{exp.company}</div>
                                </div>
                                <div className="font-mono text-xs text-arc-cyan/60 uppercase tracking-widest mt-6">
                                    [{exp.startDate} — {exp.endDate || "PRESENT"}]
                                </div>
                            </div>

                            {/* Description & Tags */}
                            <div className="md:col-span-7">
                                <p className="text-gray-300 text-lg leading-relaxed font-light mb-8">
                                    {exp.description}
                                </p>
                                
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span key={tech} className="px-3 py-1 rounded-full border border-white/10 text-xs text-gray-400 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>

      </div>
    </section>
  );
}
