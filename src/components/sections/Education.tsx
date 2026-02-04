import React from 'react';

const educationData = [
  {
    id: 1,
    degree: "BCA - AI & Machine Learning",
    field: "Computer Science",
    institution: "Swamy Vivekananda Rural First Grade College",
    location: "Bangalore, India",
    year: "2025 - Present",
    description: "Pursuing advanced studies in Artificial Intelligence and Machine Learning. Focused on neural networks, automation systems, and full-stack integration.",
    tags: ["AI/ML", "Web Development", "System Design"]
  }
];

export default function Education() {
  return (
    <section id="education" className="relative py-24 lg:py-32 bg-stark-bg text-white overflow-hidden">
      {/* Background Watermark/Glow */}
      <div className="absolute -left-40 top-40 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />

       <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <span className="font-mono text-purple-400 uppercase text-sm tracking-[0.2em] mb-4 block">
            // 05 EDUCATION
          </span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 text-white uppercase">
            Data Upload
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-transparent" />
          <p className="text-gray-400 text-lg mt-4 max-w-xl">
            Academic credentials and certified knowledge bases.
          </p>
        </div>

        {/* Education List */}
        <div className="space-y-8">
          {educationData.map((edu) => (
            <div key={edu.id} className="group border-t border-white/10 py-8 transition-all hover:bg-white/[0.02]">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Date */}
                <div className="md:col-span-3">
                  <div className="font-mono text-xs text-purple-400/60 uppercase tracking-widest border border-purple-500/20 px-3 py-1 rounded bg-purple-500/5 inline-block">
                    [{edu.year}]
                  </div>
                </div>

                {/* Degree & Institution */}
                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {edu.degree}
                    </h3>
                    <span className="text-gray-500 font-mono text-sm">— {edu.field}</span>
                  </div>
                  <div className="text-gray-400 font-mono text-sm mb-4">{edu.institution}, {edu.location}</div>

                  <p className="text-gray-400 leading-relaxed mb-4">
                    {edu.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {edu.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 text-xs font-mono uppercase">
                        {tag}
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
