'use client'

import { useState } from 'react';
import ProjectCard from '../ProjectCard';
import ProjectModal from '../ProjectModal';
import { Project } from '@/types/project'

const projectsData: Project[] = [ {
      created_at: "2024-09-20T10:00:00.000Z",
      description: "This project aims to develop an innovative e-commerce platform leveraging AI to personalize shopping experiences.",
      domain: "E-commerce",
      duration_in_days: 120,
      prof_id: "michael.smith@example.com",
      project_id: 1,
      project_type: "Development",
      resource_links: [
        { link: "https://example.com/ecommerce-whitepaper" },
        { link: "https://example.com/api-docs" }
      ],
      skills_required: [
        { skill: "JavaScript" },
        { skill: "React" },
        { skill: "Node.js" }
      ],
      start_date: "2024-10-01T09:00:00.000Z",
      status: "CRE",
      tags: [
        { tag: "E-commerce" },
        { tag: "AI" },
        { tag: "Web Development" }
      ],
      title: "AI-Powered E-commerce Platform",
      updated_at: "2024-09-20T10:00:00.000Z",
      vacancies: 5,
      weekly_commitment: 10,
      professor: {
        name: "Dr. Michael Smith",
        email: "michael.smith@example.com",
        department: "Computer Science",
        profile_picture_url: "/placeholder.svg?height=100&width=100"
      }
    },
    {
      created_at: "2024-09-22T14:15:00.000Z",
      description: "A project dedicated to creating a mobile application for mental health support using a community-driven approach.",
      domain: "Health",
      duration_in_days: 60,
      prof_id: "emily.johnson@example.com",
      project_id: 2,
      project_type: "Mobile Development",
      resource_links: [
        { link: "https://example.com/mental-health-research" },
        { link: "https://example.com/app-architecture" }
      ],
      skills_required: [
        { skill: "Flutter" },
        { skill: "Firebase" },
        { skill: "UX Design" }
      ],
      start_date: "2024-11-01T10:00:00.000Z",
      status: "CRE",
      tags: [
        { tag: "Mental Health" },
        { tag: "Mobile App" },
        { tag: "Community" }
      ],
      title: "Community-Based Mental Health App",
      updated_at: "2024-09-22T14:15:00.000Z",
      vacancies: 4,
      weekly_commitment: 12,
      professor: {
        name: "Dr. Emily Johnson",
        email: "emily.johnson@example.com",
        department: "Psychology",
        profile_picture_url: "/placeholder.svg?height=100&width=100"
      }
    } ];

export default function ProjectPortal(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project): void => {
    setSelectedProject(project);
  };

  const closeModal = (): void => {
    setSelectedProject(null);
  };

  const handleApply = (): void => {
    if (selectedProject) {
      console.log('Applied to project:', selectedProject.title);
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        {/* Background SVG pattern */}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-center mb-12 text-indigo-900">
          Project Portal
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <ProjectCard key={project.project_id} project={project} onClick={openModal} />
          ))}
        </div>

        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={closeModal}
            onApply={handleApply}
          />
        )}
      </div>
    </div>
  );
}
