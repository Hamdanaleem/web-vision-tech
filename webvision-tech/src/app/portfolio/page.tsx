import { getProjects } from "@/lib/actions/portfolio";

export default async function PortfolioPage() {
  const projects = await getProjects();

  return (
    <main className="pt-32 pb-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-black mb-4">Our <span className="text-blue-600">Portfolio</span></h1>
          <p className="text-gray-500">Transforming visions into high-performance digital reality.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project: any) => (
            <div key={project._id} className="group bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all">
              <div className="h-48 bg-blue-600 flex items-center justify-center text-white text-4xl font-bold">
                {project.title.charAt(0)}
              </div>
              <div className="p-8">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">{project.category}</span>
                <h3 className="text-2xl font-bold mt-2 mb-4">{project.title}</h3>
                <p className="text-gray-500 text-sm mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t: string) => (
                    <span key={t} className="px-3 py-1 bg-white border rounded-full text-xs font-medium">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}