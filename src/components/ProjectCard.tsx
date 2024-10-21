"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, User } from "lucide-react";
import { Project } from "@/types/project";
import { useRouter } from "next/navigation";
import { Professor } from "@/types/professor";

interface ProjectCardProps {
  project: Project;
  professor?: Professor;
  Click?: () => void;
}

const ProjectCard = ({
  project,
  professor,
  Click,
}: ProjectCardProps): JSX.Element => {
  const router = useRouter();
  const handlePostNavigation = (id: number) => {
    router.push(`/project/${id}`);
  };

  return (
    <motion.div
      key={project.project_id}
      className="transform overflow-hidden rounded-lg bg-white shadow-lg transition duration-300 hover:shadow-xl dark:bg-gray-800 dark:shadow-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-6">
        <h2 className="mb-2 text-2xl font-bold text-indigo-700 transition duration-300 hover:text-indigo-800 dark:text-white">
          {project.title}
        </h2>
        <p className="mb-4 line-clamp-3 text-gray-700 dark:text-gray-100">
          {project.description}
        </p>

        <div className="mb-3 flex items-center text-gray-600 dark:text-gray-100">
          <Calendar className="mr-2 h-5 w-5 text-indigo-600 dark:text-white" />
          <span className="text-sm">
            {new Date(project.start_date).toLocaleDateString()}
          </span>
        </div>

        <div className="mb-4 flex items-center text-gray-600 dark:text-gray-100">
          <Clock className="mr-2 h-5 w-5 text-indigo-600 dark:text-white" />
          <span className="text-sm">{project.duration_in_days} days</span>
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="rounded-full bg-indigo-100 px-3 py-1 text-xs text-indigo-800"
            >
              {tag.tag}
            </span>
          ))}
        </div>

        {professor && (
          <div className="mt-4 rounded-lg border border-indigo-200 bg-indigo-50 p-4 dark:bg-gray-900 ">
            <h4 className="flex items-center font-semibold text-indigo-800 dark:text-white">
              <User className="mr-2 h-4 w-4 text-indigo-600" />{" "}
              {/* User icon */}
              Professor:
            </h4>
            <p className="text-lg font-medium text-gray-800 dark:text-gray-100">
              {professor.title} {professor.first_name} {professor.last_name}
            </p>
            <p className="flex items-center text-sm text-gray-600 dark:text-gray-100">
              <span className="mr-1">✉️</span> {/* Email icon */}
              {professor.email}
            </p>
          </div>
        )}

        <div className="mt-4 flex justify-between">
          <button
            className="rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => console.log(`applied to ${project.title}`)}
          >
            Apply
          </button>

          <button
            onClick={() =>
              Click ? Click() : handlePostNavigation(project.project_id)
            }
            className="ml-2 w-full transform rounded-md bg-indigo-600 py-2 text-white transition duration-300 hover:translate-y-[-2px] hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Show More Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
