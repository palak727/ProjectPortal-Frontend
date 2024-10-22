// app/forms/createApplicationForm/page.tsx
"use client";
import React, { useState } from "react";

const CreateApplicationForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    projectId: "",
    professorId: "",
    title: "",
    deadline: "",
    status: "OPN",
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
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6">Create Application Form</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="projectId" className="block text-sm font-medium text-gray-700">
              Project ID
            </label>
            <input
              type="text"
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
              maxLength={255}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Professor Email (max 255 characters)"
            />
          </div>
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
              maxLength={255}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter Title (max 255 characters)"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="deadline" className="block text-sm font-medium text-gray-700">
              Deadline
            </label>
            <input
              type="date"
              name="deadline"
              id="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              name="status"
              id="status"
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
              >
                <option value="OPN">OPEN</option>
                <option value="CLD">CLOSED</option>
                <option value="ACD">ACD</option>
            </select>
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

export default CreateApplicationForm;
