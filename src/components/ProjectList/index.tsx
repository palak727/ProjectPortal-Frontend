"use client";

import { useState, useEffect } from "react";
import axios from "axios";

type Project = {
  project_id: string;
  title: string; // Required
  description?: string; // Optional
  prof_id: string; // Required
  domain?: string; // Optional
  skills_required?: { skill: string }[]; // Optional
  project_type?: string; // Optional
  status: string; // Required
  weekly_commitment: number; // Required
  start_date: string; // Required
  duration_in_days?: number; // Optional
  vacancies: number; // Required
  resource_links?: { link: string }[]; // Optional
  created_at: string;
  updated_at: string;
  tags?: { tag: string }[]; // Optional
};

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState<Partial<Project>>({}); 

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/prof/projects`,
          {
            withCredentials: true,
          },
        );
        if (response.data && Array.isArray(response.data.data)) {
          setProjects(response.data.data);
        } else {
          setProjects([]);
          setError("Unexpected response format.");
        }
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCreateProject = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/prof/projects`,
        newProject,
        {
          withCredentials: true,
        },
      );
      setShowCreateModal(false);
      
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/prof/projects`,
        {
          withCredentials: true,
        },
      );
      setProjects(response.data.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create project");
    }
  };

  if (loading) return <div className="loader">Loading...</div>;
  if (error)
    return <p className="mt-8 text-center text-red-500">Error: {error}</p>;
  if (projects.length === 0)
    return <p className="mt-8 text-center">No projects found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Projects</h1>
      <button
        onClick={() => setShowCreateModal(true)}
        className="mb-4 rounded bg-green-500 px-4 py-2 text-white"
      >
        Create New Project
      </button>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.project_id}
            className="flex flex-col rounded bg-white p-4 shadow transition-shadow duration-300 hover:shadow-lg"
          >
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                {project.title} <span className="text-red-500">*</span>
              </h2>{" "}
              {/* Required field */}
              <p className="line-clamp-2">{project.description}</p>
            </div>
            <button
              onClick={() => setSelectedProject(project)}
              className="mt-auto rounded bg-blue-500 px-4 py-2 text-white"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Modal for project creation */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Create a New Project</h2>
            <label>
              Title <span className="text-red-500">*</span>
              <input
                type="text"
                value={newProject.title || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="mb-4 block w-full border"
                required
              />
            </label>
            <label>
              Description
              <textarea
                value={newProject.description || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="mb-4 block w-full border"
              />
            </label>
            <label>
              Domain
              <input
                type="text"
                value={newProject.domain || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, domain: e.target.value })
                }
                className="mb-4 block w-full border"
              />
            </label>
            <label>
              Weekly Commitment
              <input
                type="number"
                value={newProject.weekly_commitment || 10} 
                onChange={(e) =>
                  setNewProject({
                    ...newProject,
                    weekly_commitment: +e.target.value,
                  })
                }
                className="mb-4 block w-full border"
                required
                min="1"
              />
            </label>
            <label>
              Start Date <span className="text-red-500">*</span>
              <input
                type="date"
                value={newProject.start_date || ""}
                onChange={(e) =>
                  setNewProject({ ...newProject, start_date: e.target.value })
                }
                className="mb-4 block w-full border"
                required
              />
            </label>
            <button
              onClick={handleCreateProject}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Create Project
            </button>
            <button
              onClick={() => setShowCreateModal(false)}
              className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setSelectedProject(null)}
              className="float-right text-red-500"
            >
              Close
            </button>
            <div className="mb-4">
              <h2 className="text-2xl font-bold">
                {selectedProject.title} <span className="text-red-500">*</span>
              </h2>{" "}
              {/* Required field */}
              <p className="line-clamp-2">{selectedProject.description}</p>
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
