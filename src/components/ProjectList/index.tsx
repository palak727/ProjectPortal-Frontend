"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns"; 

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/prof/projects`,
          { withCredentials: true },
        );
        setProjects(response.data.data || []);
      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) return <div className="loader">Loading...</div>;
  if (error)
    return <p className="mt-8 text-center text-red-500">Error: {error}</p>;
  if (projects.length === 0)
    return <p className="mt-8 text-center">No projects found</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-center text-3xl font-bold">Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <div
            key={project.project_id}
            className="flex flex-col rounded-lg bg-white p-6 text-black shadow-lg transition-transform duration-300 hover:scale-105 dark:bg-gray-800 dark:text-gray-100"
          >
            <div className="mb-4">
              <h2 className="text-2xl font-semibold">
                {project.title} <span className="text-red-500">*</span>
              </h2>
              <p className="line-clamp-2">{project.description}</p>
            </div>
            <button
              onClick={() => setSelectedProject(project)}
              className="mt-auto rounded bg-blue-500 px-4 py-2 text-white dark:bg-blue-400"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Details Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-3xl rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-900 dark:text-white">
            <button
              onClick={() => setSelectedProject(null)}
              className="float-right text-red-500"
            >
              Close
            </button>
            <h2 className="mb-4 text-3xl font-bold">{selectedProject.title}</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Description: </strong>{" "}
                  {selectedProject.description || "No description available"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Domain: </strong> {selectedProject.domain || "N/A"}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Weekly Commitment: </strong>{" "}
                  {selectedProject.weekly_commitment} hours
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Start Date: </strong>{" "}
                  {format(new Date(selectedProject.start_date), "PPP")}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Vacancies: </strong> {selectedProject.vacancies}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Status: </strong> {selectedProject.status}
                </p>
              </div>
            </div>

            {selectedProject.skills_required &&
              selectedProject.skills_required.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold">Skills Required:</p>
                  <ul className="list-disc pl-5 text-sm">
                    {selectedProject.skills_required.map((skill, idx) => (
                      <li key={idx}>{skill.skill}</li>
                    ))}
                  </ul>
                </div>
              )}

            {selectedProject.resource_links &&
              selectedProject.resource_links.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-bold">Resource Links:</p>
                  <ul className="list-disc pl-5 text-sm">
                    {selectedProject.resource_links.map((link, idx) => (
                      <li key={idx}>
                        <a
                          href={link.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          {link.link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
