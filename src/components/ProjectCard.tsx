'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import { Project } from '@/types/project';

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

const ProjectCard = ({ project, onClick }: ProjectCardProps): JSX.Element => {
  return (
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
          onClick={() => onClick(project)}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Show More Details
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
