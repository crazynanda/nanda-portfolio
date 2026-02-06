import { personalInfo } from "@/data/personal";

export default function Hero() {
  return (
    <section className="py-20 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
        {personalInfo.name}
      </h1>
      <p className="text-xl md:text-2xl text-gray-600 mb-8">
        {personalInfo.title}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a 
          href="#projects" 
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Projects
        </a>
        <a 
          href="#contact" 
          className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Contact Me
        </a>
      </div>
    </section>
  );
}
