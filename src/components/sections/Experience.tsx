import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 lg:py-32 bg-stark-bg text-white overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-arc-cyan/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container-custom px-6 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-arc-cyan uppercase text-sm tracking-[0.2em] mb-4 block">
            // 04 EXPERIENCE
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase">
            Mission Log
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-arc-cyan to-transparent" />
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            Operating timeline and key deployments across the sector.
          </p>
        </div>

        {/* Experience List */}
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="group border-t border-white/10 py-8 transition-all hover:bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Date */}
                <div className="md:col-span-3">
                  <div className="font-mono text-xs text-arc-cyan/60 uppercase tracking-widest">
                    [{exp.startDate} — {exp.endDate || "PRESENT"}]
                  </div>
                </div>

                {/* Role & Meta */}
                <div className="md:col-span-5">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-arc-cyan transition-colors text-white">
                    {exp.title}
                  </h3>
                  <div className="text-gray-400 font-mono text-sm">{exp.company}</div>
                </div>

                {/* Description & Tags */}
                <div className="md:col-span-4">
                  <p className="text-gray-300 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2 py-1 rounded-full border border-white/10 text-xs text-gray-500 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors">
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
    </section>
  );
}
