'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, User } from 'lucide-react'; // Import User icon for professor
import { Project } from '@/types/project';
import { useRouter } from 'next/navigation';
import { Professor } from '@/types/professor';

interface ProjectCardProps {
  project: Project;
  professor?: Professor;
  onClick: () => void;
}

const ProjectCard = ({ project, professor, onClick }: ProjectCardProps): JSX.Element => {
  const router = useRouter();
  const handlePostNavigation = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <motion.div
      key={project.project_id}
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 dark:text-white text-indigo-700 hover:text-indigo-800 transition duration-300">{project.title}</h2>
        <p className="text-gray-700 mb-4 dark:text-gray-100 line-clamp-3">{project.description}</p>
        
        <div className="flex items-center mb-3 text-gray-600 dark:text-gray-100">
          <Calendar className="w-5 h-5 mr-2 text-indigo-600 dark:text-white" />
          <span className="text-sm">{new Date(project.start_date).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center mb-4 text-gray-600 dark:text-gray-100">
          <Clock className="w-5 h-5 mr-2 text-indigo-600 dark:text-white" />
          <span className="text-sm">{project.duration_in_days} days</span>
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

        {professor && (
          <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-200 dark:bg-gray-900 ">
            <h4 className="font-semibold text-indigo-800 flex items-center dark:text-white">
              <User className="w-4 h-4 mr-2 text-indigo-600" /> {/* User icon */}
              Professor:
            </h4>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">{professor.title} {professor.first_name} {professor.last_name}</p>
            <p className="text-sm text-gray-600 flex items-center dark:text-gray-100">
              <span className="mr-1">✉️</span> {/* Email icon */}
              {professor.email}
            </p>
          </div>
        )}

        <div className="flex justify-between mt-4">
          <button
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => console.log(`applied to ${project.title}`)}
          >
            Apply
          </button>

          <button
            onClick={() => handlePostNavigation(project.project_id)}
            className="ml-2 w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-300 transform hover:translate-y-[-2px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Show More Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
