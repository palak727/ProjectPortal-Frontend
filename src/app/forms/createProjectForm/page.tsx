// app/forms/createProjectForm/page.tsx
"use client"; // Marking this component as a Client Component

import React, { useState } from "react";

const CreateProjectForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    professorId: "",
    domain: "",
    skillsRequired: "",
    projectType: "", 
    projectStatus: "CRE",
    weeklyCommitment: "10", // Default value
    startDate: "",
    duration: "60", // Default value
    vacancies: "1", // Default value
    resourceLinks: "",
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
        <h1 className="text-2xl font-bold mb-6">Create Project Form</h1>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              required
              maxLength={255}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Title (max 255 characters)"
            />
          </div>

          {/* Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Description"
              rows={4}
            />
          </div>

          {/* Professor ID */}
          <div className="mb-4">
            <label htmlFor="professorId" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="emai;"
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

          {/* Domain */}
          <div className="mb-4">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Domain
            </label>
            <input
              type="text"
              name="domain"
              id="domain"
              value={formData.domain}
              onChange={handleChange}
              required
              maxLength={255}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Domain (max 255 characters)"
            />
          </div>

          {/* Skills Required */}
          <div className="mb-4">
            <label htmlFor="skillsRequired" className="block text-sm font-medium text-gray-700">
              Skills Required
            </label>
            <input
              type="text"
              name="skillsRequired"
              id="skillsRequired"
              value={formData.skillsRequired}
              onChange={handleChange}
              required
              maxLength={255}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Skills Required (max 255 characters)"
            />
          </div>

          {/* Project Type */}
          <div className="mb-4">
            <label htmlFor="projectType" className="block text-sm font-medium text-gray-700">
              Project Type
            </label>
            <input
              type="text"
              name="projectType"
              id="projectType"
              value={formData.projectType}
              onChange={handleChange}
              required
              maxLength={255}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Project Type (max 255 characters)"
            >
             
            </input>
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

          {/* Start Date */}
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
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

          {/* Resource Links */}
          <div className="mb-4">
            <label htmlFor="resourceLinks" className="block text-sm font-medium text-gray-700">
              Resource Links
            </label>
            <textarea
              name="resourceLinks"
              id="resourceLinks"
              value={formData.resourceLinks}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Resource Links"
              rows={3}
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

export default CreateProjectForm;
