import React from 'react';

const educationData = [
  {
    id: 1,
    degree: "BCA - AI & Machine Learning",
    field: "Computer Science",
    institution: "Bangalore, India",
    year: "Present",
    description: "Pursuing advanced studies in Artificial Intelligence and Machine Learning. Focused on neural networks, automation systems, and full-stack integration.",
    tags: ["AI/ML", "Web Development", "System Design"]
  }
];

export default function Education() {
  return (
    <section id="education" className="relative py-32 bg-stark-bg text-white overflow-hidden">
        {/* Background Watermark/Glow */}
        <div className="absolute -left-40 top-40 w-[600px] h-[600px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
        
      <div className="container-custom px-6 max-w-[1800px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
            {/* Sticky Header */}
            <div className="lg:col-span-4 relative">
                <div className="sticky top-32">
                    <span className="text-purple-400 font-mono uppercase text-sm tracking-[0.2em] mb-4 block">
                        // 04 EDUCATION
                    </span>
                    <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 text-white uppercase">
                        Data<br/>Upload
                    </h2>
                     <p className="text-gray-400 text-lg max-w-xs leading-relaxed font-mono text-sm">
                        Academic credentials and certified knowledge bases.
                    </p>
                </div>
            </div>

            {/* List */}
            <div className="lg:col-span-8 flex flex-col pt-12 lg:pt-0">
                {educationData.map((edu) => (
                    <div key={edu.id} className="group border-t border-white/10 py-16 transition-all hover:bg-white/[0.02]">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                             <div className="md:col-span-12">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-3xl font-bold text-white group-hover:text-purple-400 transition-colors">
                                        {edu.degree}
                                    </h3>
                                    <span className="font-mono text-xs text-purple-400/80 uppercase tracking-widest border border-purple-500/20 px-2 py-1 rounded bg-purple-500/5">
                                        [{edu.year}]
                                    </span>
                                </div>
                                <div className="text-xl text-gray-300 mb-1">{edu.field}</div>
                                <div className="text-lg text-gray-500 font-mono mb-4">{edu.institution}</div>
                                
                                <p className="text-gray-400 leading-relaxed max-w-2xl mb-6">
                                    {edu.description}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {edu.tags.map(tag => (
                                        <span key={tag} className="text-[10px] font-mono uppercase px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
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
      </div>
    </section>
  );
}
