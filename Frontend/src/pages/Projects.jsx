import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/user.context";
import { getProjects, createProject } from "../services/projectService";
import { Trash2, PencilIcon, PlusIcon } from "lucide-react";

export default function Projects() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    fetchProjects();
  }, [user]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getProjects();
      setProjects(data || []);
    } catch (err) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProjectName.trim()) return;
    try {
      const newProject = await createProject({ name: newProjectName });
      setProjects((prev) => [...prev, newProject]);
      setNewProjectName("");
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteProject = async (projectId) => {
    console.log("Project ID to delete:", projectId);
    // if (!window.confirm("Are you sure you want to delete this project?"))
    //   return;
    // try {
    //   await deleteProject(projectId);
    //   setProjects((prev) => prev.filter((p) => p._id !== projectId));
    // } catch (err) {
    //   alert(err.message || "Failed to delete project");
    // }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">My Projects</h1>

      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <input
          type="text"
          placeholder="Enter new project name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          className="w-full sm:w-2/3 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-400"
        />
        <button
          onClick={handleCreateProject}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <PlusIcon /> Create Bot
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading projects...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : projects.length === 0 ? (
        <p className="text-gray-700">No projects yet. Create one above.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project._id}
              className="bg-white border border-gray-200 shadow rounded-xl p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-1">
                {project.name}
              </h2>
              <p className="text-xs text-gray-500 mb-4">ID: {project._id}</p>
              <div className="flex gap-2">
                {/* <button
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="bg-black text-white text-sm px-4 py-1.5 rounded hover:bg-slate-700 transition-colors duration-200"
                >
                  Open
                </button> */}

                <button
                  onClick={() => navigate(`/projects/${project._id}`)}
                  className="bg-black text-white text-sm px-4 py-1.5 rounded hover:bg-slate-700 transition-colors duration-200"
                >
                  <PencilIcon size={18} />
                </button>

                <button
                  onClick={() => handleDeleteProject(project._id)}
                  className="bg-red-500 text-white text-sm px-4 py-1.5 rounded hover:bg-red-700  transition-colors duration-200 flex gap-1 items-center"
                >
                  <Trash2 size={18} />
                </button>
                {/* Optional: Add delete/edit buttons */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
