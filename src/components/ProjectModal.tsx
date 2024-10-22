"use client";

import { motion } from "framer-motion";
import { Clock, Users, Link as LinkIcon, X } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types/project";

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onApply: () => void;
}

const ProjectModal = ({
  project,
  onClose,
  onApply,
}: ProjectModalProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        className="z-99999 w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-2xl font-medium text-gray-900">
            {project.title}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <Users className="mr-2 h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-700">
              Vacancies: {project.vacancies}
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="mr-2 h-5 w-5 text-indigo-600" />
            <span className="text-sm text-gray-700">
              Weekly Commitment: {project.weekly_commitment} hours
            </span>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-900">
              Skills Required:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.skills_required.map((skill, index) => (
                <span
                  key={index}
                  className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-800"
                >
                  {skill.skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="mb-2 text-sm font-medium text-gray-900">
              Resource Links:
            </h4>
            <ul className="space-y-1">
              {project.resource_links.map((resource, index) => (
                <li key={index} className="flex items-center">
                  <LinkIcon className="mr-2 h-4 w-4 text-indigo-600" />
                  <a
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Resource {index + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium text-gray-900">
              Project Lead:
            </h4>
            <div className="flex items-center">
              <Image
                src={project.professor.profile_picture_url}
                alt={project.professor.name}
                width={48}
                height={48}
                className="mr-4 h-12 w-12 rounded-full border-2 border-indigo-200"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {project.professor.name}
                </p>
                <p className="text-xs text-gray-500">
                  {project.professor.department}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="rounded-md border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
            onClick={onApply}
          >
            Apply
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
