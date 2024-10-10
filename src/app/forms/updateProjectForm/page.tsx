"use client"; // Marking this component as a Client Component

import React, { useState } from "react";

const UpdateProjectForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    projectId: "",
    professorId: "",
    projectStatus: "CRE",
    weeklyCommitment: "10", // Default value
    startDate: "",
    duration: "60", // Default value
    vacancies: "1", // Default value
  });

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Here you can add your form submission logic, e.g., sending data to your backend
    console.log("Form submitted", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h1 className="text-2xl font-bold mb-6">Update Project Form</h1>
        <form onSubmit={handleSubmit}>

          {/* ProjectID */}
          <div className="mb-4">
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
              Project ID
            </label>
            <textarea
              name="projectId"
              id="projectId"
              value={formData.projectId}
              onChange={handleChange}
              maxLength={255}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Project ID (max 255 characters)"
            />
          </div>

          {/* Professor ID */}
          <div className="mb-4">
            <label htmlFor="professorId" className="block text-sm font-medium text-gray-700">
              Email 
            </label>
            <input
              type="email"
              name="professorId"
              id="professorId"
              value={formData.professorId}
              onChange={handleChange}
              required
              maxLength={255}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Professor Email (max 255 characters)"
            />
          </div>
            {/* Project Status */}
            <div className="mb-4">
            <label htmlFor="projectStatus" className="block text-sm font-medium text-gray-700">
              Project Status
            </label>
            <select
              name="projectStatus"
              id="projectStatus"
              value={formData.projectStatus}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="CRE"> Created</option>
                <option value="APP"> Application Open</option>
                <option value="APC"> Application Closed</option>
                <option value="COM"> Completed</option>
                <option value="PAU"> Paused</option>
                <option value="ABR"> Aborted</option>
              </select>
            
          </div>

          {/* Weekly Commitment */}
          <div className="mb-4">
            <label htmlFor="weeklyCommitment" className="block text-sm font-medium text-gray-700">
              Weekly Commitment (hours)
            </label>
            <input
              type="number"
              name="weeklyCommitment"
              id="weeklyCommitment"
              value={formData.weeklyCommitment}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Weekly Commitment (hours)"
            />
          </div>
          {/* Duration in Days */}
          <div className="mb-4">
            <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
              Duration (in days)
            </label>
            <input
              type="number"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Duration in Days"
            />
          </div>

          {/* Vacancies */}
          <div className="mb-4">
            <label htmlFor="vacancies" className="block text-sm font-medium text-gray-700">
              Vacancies (integer)
            </label>
            <input
              type="number"
              name="vacancies"
              id="vacancies"
              value={formData.vacancies}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Number of Vacancies"
            />
          </div>


          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProjectForm;
