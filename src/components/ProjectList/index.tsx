'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, Users, Tag, Link as LinkIcon, X } from 'lucide-react'

interface ResourceLink {
  link: string;
}

interface Skill {
  skill: string;
}

interface ProjectTag {
  tag: string;
}

interface Professor {
  name: string;
  email: string;
  department: string;
  profile_picture_url: string;
}

interface Project {
  created_at: string;
  description: string;
  domain: string;
  duration_in_days: number;
  prof_id: string;
  project_id: number;
  project_type: string;
  resource_links: ResourceLink[];
  skills_required: Skill[];
  start_date: string;
  status: string;
  tags: ProjectTag[];
  title: string;
  updated_at: string;
  vacancies: number;
  weekly_commitment: number;
  professor: Professor;
}

// Sample project data
const projectsData: Project[] = [
  {
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
  }
]

export default function ProjectPortal(): JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const openModal = (project: Project): void => {
    setSelectedProject(project)
  }

  const closeModal = (): void => {
    setSelectedProject(null)
  }

  const handleApply = (): void => {
    if (selectedProject) {
      // Here you would typically handle the application process
      console.log('Applied to project:', selectedProject.title)
      closeModal()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold text-center mb-12 text-indigo-900 relative">
          Project Portal
          <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-indigo-500 rounded-full"></span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <motion.div
              key={project.project_id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-indigo-800">{project.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>
                <div className="flex items-center mb-3">
                  <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
                  <span className="text-sm text-gray-500">
                    {new Date(project.start_date).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center mb-4">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                  <span className="text-sm text-gray-500">
                    {project.duration_in_days} days
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => openModal(project)}
                  className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                  Show More Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-medium text-gray-900">{selectedProject.title}</h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="mt-2">
                <p className="text-sm text-gray-500">{selectedProject.description}</p>
              </div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-2 text-indigo-600" />
                  <span className="text-sm text-gray-700">Vacancies: {selectedProject.vacancies}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-indigo-600" />
                  <span className="text-sm text-gray-700">Weekly Commitment: {selectedProject.weekly_commitment} hours</span>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Required:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.skills_required.map((skill, index) => (
                      <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                        {skill.skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Resource Links:</h4>
                  <ul className="space-y-1">
                    {selectedProject.resource_links.map((resource, index) => (
                      <li key={index} className="flex items-center">
                        <LinkIcon className="w-4 h-4 mr-2 text-indigo-600" />
                        <a href={resource.link} target="_blank" rel="noopener noreferrer" className="text-sm text-indigo-600 hover:underline">
                          Resource {index + 1}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Project Lead:</h4>
                    <Image
                      src={selectedProject.professor.profile_picture_url}
                      alt={selectedProject.professor.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200"
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{selectedProject.professor.name}</p>
                      <p className="text-xs text-gray-500">{selectedProject.professor.department}</p>
                    </div>
                  </div>
                </div>
              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gray-500 transition duration-150 ease-in-out"
                  onClick={closeModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 transition duration-150 ease-in-out"
                  onClick={handleApply}
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}