import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <div 
              key={exp.id} 
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <div className="text-sm text-gray-600 font-medium">
                    {exp.startDate} — {exp.endDate || "Present"}
                  </div>
                </div>
                <div className="md:col-span-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {exp.title}
                  </h3>
                  <div className="text-gray-600">{exp.company}</div>
                </div>
                <div className="md:col-span-4">
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
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
