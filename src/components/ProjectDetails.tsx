import { Project } from "@/types/project";
import ProgressBar from "./ProgressBar";

interface ProjectMoreDetailsProps {
  project: Project;
}

const ProjectMoreDetails: React.FC<ProjectMoreDetailsProps> = ({ project }) => {
  const daysPassed = Math.floor(
    (new Date().getTime() - new Date(project?.start_date).getTime()) /
      (1000 * 60 * 60 * 24),
  );

  return (
    <div className="w-full transform rounded-xl bg-white p-8 shadow-lg transition-transform hover:shadow-xl dark:bg-gray-900">
      <h2 className="mb-6 text-3xl font-extrabold text-gray-900 dark:text-gray-100">
        Project Details
      </h2>

      <div className="space-y-6">
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Description:
            </strong>{" "}
            {project.description}
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Domain:
            </strong>{" "}
            {project.domain}
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Type:
            </strong>{" "}
            {project.project_type}
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Duration:
            </strong>{" "}
            {project.duration_in_days} days
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Start Date:
            </strong>{" "}
            {new Date(project.start_date).toLocaleDateString()}
          </p>

          <div className="mb-6">
            <ProgressBar
              current={daysPassed}
              total={project.duration_in_days}
            />
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {daysPassed} / {project.duration_in_days} days completed
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Status:
            </strong>{" "}
            {project.status}
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Vacancies:
            </strong>{" "}
            {project.vacancies}
          </p>

          <p className="text-lg">
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              Weekly Commitment:
            </strong>{" "}
            {project.weekly_commitment} hours
          </p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <strong className="font-semibold text-gray-800 dark:text-gray-300">
            Skills Required:
          </strong>
          <ul className="mt-2 list-inside list-disc text-gray-700 dark:text-gray-400">
            {project.skills_required.map((skill, idx) => (
              <li key={idx} className="text-lg">
                {skill.skill}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <strong className="font-semibold text-gray-800 dark:text-gray-300">
            Resource Links:
          </strong>
          <ul className="mt-2 list-inside list-disc text-blue-600 dark:text-blue-400">
            {project.resource_links.map((link, idx) => (
              <li key={idx}>
                <a
                  href={link.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:underline"
                >
                  {link.link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800">
          <strong className="font-semibold text-gray-800 dark:text-gray-300">
            Tags:
          </strong>
          <ul className="mt-2 flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <li
                key={idx}
                className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-800 dark:bg-gray-700 dark:text-gray-100"
              >
                {tag.tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProjectMoreDetails;
