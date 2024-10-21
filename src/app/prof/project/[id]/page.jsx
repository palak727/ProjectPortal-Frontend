"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/common/Loader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import StudentTable from "@/components/StudentTable/StudentTable";
import ProjectMoreDetails from "@/components/ProjectDetails";

function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [updatedProject, setUpdatedProject] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showStudentDetails, setShowStudentDetails] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const openStudentModal = (student) => {
    setSelectedStudent(student);
    setShowStudentDetails(true);
  };
  

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
    fetchApplications();
  }, [id]);

  useEffect(() => {
    
    if (showUpdateModal) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto"; 
    }

    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, [showUpdateModal]);

  const fetchApplications = async () => {
    try {
      const response = await axios.get("/data/application.json");
      const filteredApplications = response.data.filter(
        (app) => app.project_id === Number(id) && app.status === "OPN",
      );
      setApplications(filteredApplications);
    } catch (error) {
      console.error("Failed to fetch application data:", error);
    }
  };

  const handleUpdateProject = async () => {
    try {
      await axios.put(`/api/projects/${project.project_id}`, updatedProject, {
        withCredentials: true,
      });
      setShowUpdateModal(false);
      const response = await axios.get(`/api/projects/${id}`);
      setProject(response.data);
    } catch (error) {
      console.error("Failed to update project:", error);
    }
  };

  const skillOptions = project?.skills_required.map((skill) => ({
    value: skill.skill,
    label: skill.skill,
  }));

  const tagOptions = project?.tags.map((tag) => ({
    value: tag.tag,
    label: tag.tag,
  }));

  const filteredApplications = applications.filter((app) =>
    app.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (loading) return <Loader />;

  if (!project) return <div>Project not found</div>;

  return (
    <div className="p-4">
      <DefaultLayout>
        <h1 className="mb-4 text-2xl font-bold">{project.title}</h1>
        <button
          className="mb-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          onClick={() => setShowUpdateModal(true)}
        >
          Update Project
        </button>
       {/* Project Details */}
        <ProjectMoreDetails project={project} />
        {/* Applications */}
       <StudentTable />
      </DefaultLayout>

      {/* Update Project Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50">
          <div className="relative mt-100 w-11/12 rounded-lg bg-white p-6  shadow-lg md:w-2/3 lg:w-1/2">
            <button
              className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowUpdateModal(false)}
            >
              ✖
            </button>
            <h2 className="mb-4 text-2xl font-semibold">Update Project</h2>

            <LabelInput
              label="Project Title"
              defaultValue={updatedProject.title}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  title: e.target.value,
                })
              }
            />
            <LabelInput
              label="Project Description"
              as="textarea"
              defaultValue={updatedProject.description}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  description: e.target.value,
                })
              }
            />
            <LabelInput
              label="Domain"
              defaultValue={updatedProject.domain}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  domain: e.target.value,
                })
              }
            />
            <LabelInput
              label="Project Type"
              defaultValue={updatedProject.project_type}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  project_type: e.target.value,
                })
              }
            />
            <LabelInput
              label="Duration (days)"
              type="number"
              defaultValue={updatedProject.duration_in_days}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  duration_in_days: +e.target.value,
                })
              }
            />
            <LabelInput
              label="Vacancies"
              type="number"
              defaultValue={updatedProject.vacancies}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  vacancies: +e.target.value,
                })
              }
            />
            <LabelInput
              label="Weekly Commitment (hours)"
              type="number"
              defaultValue={updatedProject.weekly_commitment}
              onChange={(e) =>
                setUpdatedProject({
                  ...updatedProject,
                  weekly_commitment: +e.target.value,
                })
              }
            />

            {/* Skills Required */}
            <label className="mb-2 block text-gray-700">Skills Required</label>
            <CreatableSelect
              isMulti
              options={skillOptions}
              defaultValue={skillOptions}
              onChange={(selectedOptions) =>
                setUpdatedProject({
                  ...updatedProject,
                  skills_required: selectedOptions.map((s) => ({
                    skill: s.value,
                  })),
                })
              }
              components={makeAnimated()}
              isClearable={true}
              isSearchable={true}
              className="mb-4"
              placeholder="Select or type skills..."
            />

            {/* Tags */}
            <label className="mb-2 block text-gray-700">Tags</label>
            <CreatableSelect
              isMulti
              options={tagOptions}
              defaultValue={tagOptions}
              onChange={(selectedOptions) =>
                setUpdatedProject({
                  ...updatedProject,
                  tags: selectedOptions.map((t) => ({ tag: t.value })),
                })
              }
              components={makeAnimated()}
              isClearable={true}
              isSearchable={true}
              className="mb-4"
              placeholder="Select or type tags..."
            />

            {/* Date Picker */}
            <label className="mb-2 block text-gray-700">Start Date</label>
            <DatePicker
              selected={new Date(updatedProject.start_date)}
              onChange={(date) =>
                setUpdatedProject({
                  ...updatedProject,
                  start_date: date.toISOString(),
                })
              }
              dateFormat="yyyy-MM-dd"
              className="mb-4 rounded border border-gray-300 p-2"
            />
            <div>
              <button
                className="ml-115 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={handleUpdateProject}
              >
                Save
              </button>
              <button
                className="ml-6 rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => setShowUpdateModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const LabelInput = ({
  label,
  type = "text",
  as: Component = "input",
  ...props
}) => (
  <div className="mb-4">
    <label className="mb-2 block text-gray-700">{label}</label>
    <Component
      type={type}
      className="w-full rounded border border-gray-300 p-2"
      {...props}
    />
  </div>
);

export default ProjectDetails;
