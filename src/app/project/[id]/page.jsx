"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ProjectMoreDetails from "@/components/ProjectDetails";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const response = await axios.get("/data/project.json");
        const projectData = response.data.find(
          (proj) => proj.project_id === Number(id),
        );
        setProject(projectData);
        setUpdatedProject(projectData);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
        setLoading(false);
      }
    };
    fetchProjectData();
  }, [id]);

  if (loading) return <Loader />;

  if (!project) return <div>Details not found</div>;

  return (
    <div className="p-4">
      <DefaultLayout>
        <div className="flex justify-between">
          <h1 className="mb-4 text-2xl font-bold">{project.title}</h1>
          <button
            className="mb-4 w-50 rounded-md bg-green-500 px-4 py-2 text-white transition duration-300 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
            onClick={() => console.log(`applied to ${project.title}`)}
          >
            Apply
          </button>
        </div>

        {/* Project Details */}
        <ProjectMoreDetails project={project} />
      </DefaultLayout>
    </div>
  );
}

export default ProjectDetails;
