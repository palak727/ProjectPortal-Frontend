"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/common/Loader";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [showApplicationDetails, setShowApplicationDetails] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(null);

  useEffect(() => {
    if (!id) return;

    // Fetch project data
    const fetchProjectData = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/v1/prof/projects/${id}`,
          {
            withCredentials: true,
          },
        );
        setProject(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch project details:", error);
        setLoading(false);
      }
    };

    fetchProjectData();

    // Fetch application data from application.json
    const fetchApplications = async () => {
      try {
        const response = await axios.get("/data/applications.json");
        setApplications(response.data);
      } catch (error) {
        console.error("Failed to fetch application data:", error);
      }
    };

    fetchApplications();
  }, [id]);

  const handleUpdateProject = async () => {
    setLoading(true);
    try {
      await axios.put(`/api/projects/${project.project_id}`, updatedProject, {
        withCredentials: true,
      });
      setShowUpdateModal(false);
      const response = await axios.get(`/api/projects/${id}`, {
        withCredentials: true,
      });
      setProject(response.data.project);
    } catch (error) {
      console.error("Failed to update project:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div>
        <Loader />
      </div>
    );
  if (!project) {
    return <div>Project not found</div>;
  }

  const progressDays = Math.min(
    Math.floor(
      (new Date(Date.now()) - new Date(project.start_date)) /
        (1000 * 60 * 60 * 24),
    ),
    project.duration_in_days || 0,
  );

  return (
    <DefaultLayout>
    <div className="container mx-auto p-4">
      <h1 className="mb-8 text-3xl font-bold">
        {project.title} <span className="text-red-500">*</span>
      </h1>
      <p className="mb-2">{project.description}</p>
      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Project Details</h3>
        <p>
          <span className="font-semibold">Domain:</span>{" "}
          {project.domain || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Progress:</span> {progressDays} /{" "}
          {project.duration_in_days || "N/A"} Days
        </p>
        <p>
          <span className="font-semibold">Weekly Commitment:</span>{" "}
          {project.weekly_commitment} hours
        </p>
        <button
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setShowUpdateModal(true)}
        >
          Update Project
        </button>
      </div>

      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-2xl font-bold">Update Project</h2>
            <label>
              Title
              <input
                type="text"
                value={updatedProject?.title || project.title}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    title: e.target.value,
                  })
                }
                className="mb-4 block w-full border"
              />
            </label>
            <label>
              Description
              <textarea
                value={updatedProject?.description || project.description}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    description: e.target.value,
                  })
                }
                className="mb-4 block w-full border"
              />
            </label>
            <label>
              Domain
              <input
                type="text"
                value={updatedProject?.domain || project.domain}
                onChange={(e) =>
                  setUpdatedProject({
                    ...updatedProject,
                    domain: e.target.value,
                  })
                }
                className="mb-4 block w-full border"
              />
            </label>
            <button
              onClick={handleUpdateProject}
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Update Project
            </button>
            <button
              onClick={() => setShowUpdateModal(false)}
              className="ml-2 rounded bg-red-500 px-4 py-2 text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="mb-4">
        <h3 className="mb-2 font-semibold">Pending Applications</h3>
        <table className="mb-2 mt-2 w-full">
          <thead>
            <tr>
              <th>Title</th>
              <th>Deadline</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.title}</td>
                <td>{new Date(app.deadline).toLocaleDateString()}</td>
                <td>{app.status}</td>
                <td>
                  <button
                    onClick={() => handleConfirm("accept", app.application_id)}
                    className="rounded bg-blue-500 px-2 py-1 text-white"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleConfirm("reject", app.application_id)}
                    className="rounded bg-red-500 px-2 py-1 text-white"
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button className="mt-4 rounded bg-blue-500 px-4 py-2 text-white">
        Create Application
      </button>

      {showApplicationDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-full w-full max-w-xl overflow-y-auto rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setShowApplicationDetails(null)}
              className="float-right text-red-500"
            >
              Close
            </button>
            <h2 className="mb-2 text-2xl font-bold">
              {showApplicationDetails.title}
            </h2>
            <p>{showApplicationDetails.details}</p>
          </div>
        </div>
      )}
    </div>
    </DefaultLayout>
  );

  function handleConfirm(action, appId) {
    const confirmation = window.confirm(
      `Are you sure you want to ${action} this application?`,
    );
    if (confirmation) {
      console.log(`Application ${action}ed: ${appId}`);
    }
  }
}

export default ProjectDetails;
