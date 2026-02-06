import { skills } from "@/data/skills";

export default function Skills() {
  const categories = [
    { title: "Frontend", skills: skills.frontend },
    { title: "Design & Animation", skills: skills.animationAndDesign },
    { title: "Tools", skills: skills.tools },
    { title: "Learning", skills: skills.learning },
  ];

  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {categories.map((category) => (
            <div key={category.title}>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">
                {category.title} Modules
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill) => (
                  <div key={skill.name} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{skill.name}</h4>
                      <span className="text-sm text-blue-600">{skill.level}%</span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                      {skill.description}
                    </p>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
