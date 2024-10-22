"use client";

import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import ProjectCard from "@/components/ProjectCard";
import ProjectModal from "@/components/ProjectModal";
import { Project } from "@/types/project";
import { Professor } from "@/types/professor";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { useRouter } from "next/navigation";

export default function ProjectPortal(): JSX.Element {
  const router = useRouter();
  const [projectsData, setProjectsData] = useState<Project[]>([]);
  const [professorsData, setProfessorsData] = useState<Professor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("created_at");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectResponse, profResponse] = await Promise.all([
          axios.get("/data/project.json"),
          axios.get("/data/prof.json"),
        ]);

        const projectsWithProfessors = projectResponse.data.map(
          (project: Project) => {
            const professor = profResponse.data.find(
              (prof: Professor) => prof.email === project.prof_id,
            );
            return { ...project, professor };
          },
        );
        console.log(`This is Projects with prof. ${projectsWithProfessors}`);
        setProjectsData(projectsWithProfessors);
        setProfessorsData(profResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (project: Project): void => {
    setSelectedProject(project);
  };

  const closeModal = (): void => {
    setSelectedProject(null);
  };

  const handleApply = (): void => {
    if (selectedProject) {
      console.log("Applied to project:", selectedProject.title);
      closeModal();
    }
  };

  const filteredProjects = useMemo(() => {
    return projectsData
      .filter(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .filter((project) => (filter ? project.domain === filter : true))
      .sort((a, b) => {
        if (sortOption === "vacancies") return b.vacancies - a.vacancies;
        if (sortOption === "created_at")
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        return 0;
      });
  }, [searchQuery, filter, sortOption, projectsData]);

  return (
    <DefaultLayout>
      <div className="min-h-screen bg-white p-8 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          />
        </div>
        <div className="mb-4 flex flex-wrap gap-4">
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="">All Domains</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Health">Health</option>
          </select>
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="rounded border border-gray-300 bg-gray-100 p-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
          >
            <option value="created_at">Sort by Date</option>
            <option value="vacancies">Sort by Vacancies</option>
          </select>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const associatedProfessor = professorsData.find(
              (prof) => prof.email === project.prof_id,
            );

            return (
              <ProjectCard
                key={project.project_id}
                project={project}
                professor={associatedProfessor}
                Click={() => {
                  router.push(`project/${project.project_id}`);
                }}
              />
            );
          })}
          {selectedProject && (
            <ProjectModal
              project={selectedProject}
              onClose={closeModal}
              onApply={handleApply}
            />
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}
