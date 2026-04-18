"use client";
import { useState, useEffect } from "react";
import { addProject, getProjects, updateProject, deleteProject } from "@/lib/actions/portfolio";
import { loginAdmin, checkAuth, logoutAdmin } from "@/lib/actions/auth";
import { Loader2, Lock, Edit2, Trash2, Plus } from "lucide-react";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    checkAuth().then((res) => {
      setIsAuthenticated(res);
      if (res) fetchProjects();
      setChecking(false);
    });
  }, []);

  async function fetchProjects() {
    const data = await getProjects();
    setProjects(data);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      tech: (formData.get("tech") as string).split(",").map(t => t.trim()),
      link: formData.get("link"),
    };

    const res = editingId 
      ? await updateProject(editingId, data) 
      : await addProject(data);

    setLoading(false);
    if (res.success) {
      alert(editingId ? "Project Updated!" : "Project Published!");
      setEditingId(null);
      e.currentTarget.reset();
      fetchProjects();
    }
  }

  const startEdit = (project: any) => {
    setEditingId(project._id);
  
    const form = document.getElementById("project-form") as HTMLFormElement;
  
    const elements = form.elements as any;
  
    elements["title"].value = project.title;
    elements["category"].value = project.category;
    elements["description"].value = project.description;
    elements["tech"].value = project.tech.join(", ");
    elements["link"].value = project.link;
  
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      await deleteProject(id);
      fetchProjects();
    }
  };

  if (checking) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin text-blue-600" /></div>;

  if (!isAuthenticated) {
    return (
      <main className="h-screen flex items-center justify-center bg-gray-900 px-6">
        <div className="bg-white p-10 rounded-3xl shadow-2xl max-w-md w-full text-center">
           <Lock size={32} className="mx-auto mb-4 text-blue-600" />
           <h1 className="text-2xl font-bold mb-6">WebVision Admin</h1>
           <form onSubmit={async (e) => {
             e.preventDefault();
             const res = await loginAdmin((e.currentTarget.elements[0] as HTMLInputElement).value);
             if (res.success) { setIsAuthenticated(true); fetchProjects(); } else alert("Denied");
           }} className="space-y-4">
             <input type="password" placeholder="Master Password" required className="w-full p-4 bg-gray-50 border rounded-xl outline-none" />
             <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold">Unlock</button>
           </form>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-32 pb-20 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">{editingId ? "Edit Project" : "Add New Project"}</h1>
          <button onClick={async () => { await logoutAdmin(); window.location.reload(); }} className="text-red-600 font-bold">Logout</button>
        </div>
        
        <form id="project-form" onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl shadow-sm border mb-12 space-y-4">
          <input name="title" placeholder="Project Title" required className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          <select name="category" className="w-full p-4 bg-gray-50 rounded-xl outline-none">
            <option value="Web Development">Web Development</option>
            <option value="Mobile App">Mobile App</option>
            <option value="AI Solution">AI Solution</option>
          </select>
          <textarea name="description" placeholder="Short Description" className="w-full p-4 bg-gray-50 rounded-xl h-32 outline-none" />
          <input name="tech" placeholder="Tech (Next.js, Tailwind, MongoDB)" className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          <input name="link" placeholder="Live Demo Link" className="w-full p-4 bg-gray-50 rounded-xl outline-none" />
          <div className="flex gap-4">
            <button disabled={loading} className="flex-1 bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
              {loading ? "Processing..." : editingId ? "Save Changes" : "Publish Project"}
            </button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); (document.getElementById("project-form") as HTMLFormElement).reset(); }} className="px-6 bg-gray-200 rounded-xl font-bold text-gray-600">Cancel</button>
            )}
          </div>
        </form>

        <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
        <div className="grid gap-4">
          {projects.map((p: any) => (
            <div key={p._id} className="bg-white p-6 rounded-2xl border flex items-center justify-between shadow-sm hover:shadow-md transition-all">
              <div>
                <h3 className="font-bold text-lg">{p.title}</h3>
                <p className="text-sm text-gray-400">{p.category}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => startEdit(p)} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"><Edit2 size={18} /></button>
                <button onClick={() => handleDelete(p._id)} className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}