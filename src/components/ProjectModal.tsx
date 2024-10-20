'use client';

import { motion } from 'framer-motion';
import { Clock, Users, Link as LinkIcon, X } from 'lucide-react';
import Image from 'next/image';
import { Project } from '@/types/project';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onApply: () => void;
}

const ProjectModal = ({ project, onClose, onApply }: ProjectModalProps): JSX.Element => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-2xl font-medium text-gray-900">{project.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-2">
          <p className="text-sm text-gray-500">{project.description}</p>
        </div>
        <div className="mt-4 space-y-3">
          <div className="flex items-center">
            <Users className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-sm text-gray-700">Vacancies: {project.vacancies}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            <span className="text-sm text-gray-700">Weekly Commitment: {project.weekly_commitment} hours</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Skills Required:</h4>
            <div className="flex flex-wrap gap-2">
              {project.skills_required.map((skill, index) => (
                <span key={index} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                  {skill.skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Resource Links:</h4>
            <ul className="space-y-1">
              {project.resource_links.map((resource, index) => (
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
            <div className="flex items-center">
              <Image
                src={project.professor.profile_picture_url}
                alt={project.professor.name}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full mr-4 border-2 border-indigo-200"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{project.professor.name}</p>
                <p className="text-xs text-gray-500">{project.professor.department}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end space-x-4">
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none"
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
