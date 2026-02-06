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
    <section id="education" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Education
        </h2>
        <div className="space-y-8">
          {educationData.map((edu) => (
            <div 
              key={edu.id} 
              className="bg-gray-50 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-3">
                  <div className="text-sm text-gray-600 font-medium">
                    {edu.year}
                  </div>
                </div>
                <div className="md:col-span-9">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-gray-900">
                      {edu.degree}
                    </h3>
                    <span className="text-gray-600 text-sm">— {edu.field}</span>
                  </div>
                  <div className="text-gray-600 mb-4">
                    {edu.institution}, {edu.location}
                  </div>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {edu.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {edu.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                      >
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
