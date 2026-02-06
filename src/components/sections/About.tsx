import { personalInfo } from "@/data/personal";

export default function About() {
  return (
    <section id="about" className="py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          About Me
        </h2>
        <div className="space-y-6 text-gray-700 leading-relaxed">
          {personalInfo.bio.map((para, i) => (
            <p key={i} className="text-lg">
              {para}
            </p>
          ))}
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">System Stats</h3>
            <div className="space-y-2">
              <p className="text-gray-600">
                <span className="font-semibold">Projects:</span> 4+
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Years Learning:</span> 1+
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Startups:</span> 1
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Curiosity:</span> ∞
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Additional Data</h3>
            <div className="space-y-4">
              {personalInfo.funFacts.map((fact, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    <span className="text-gray-600">{fact.icon}</span>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{fact.title}</h4>
                    <p className="text-gray-600 text-sm">{fact.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
