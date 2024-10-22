"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  student_id: string;
  email: string;
  password: string;
  confirmPassword: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  termsAccepted: boolean;
}

interface FormErrors {
  username?: string;
  student_id?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  termsAccepted?: string;
}

export default function SignupStudentWithPassword() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    student_id: "",
    email: "",
    password: "",
    confirmPassword: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.student_id) tempErrors.student_id = "Student ID is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.first_name) tempErrors.first_name = "First name is required";
    if (!formData.termsAccepted)
      tempErrors.termsAccepted = "You must accept the terms";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted", formData);
    }
    try {
      const res = await fetch("0.0.0.0:3045/api/v1/student/signup", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Login not successful!");
    }
    setFormData({
      username: "",
      student_id: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      middle_name: "",
      last_name: "",
      termsAccepted: false,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="mb-2.5 block font-medium">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.username && <p className="text-red-500">{errors.username}</p>}
      </div>

      {/* Student ID */}
      <div className="mb-4">
        <label htmlFor="student_id" className="mb-2.5 block font-medium">
          Student ID
        </label>
        <input
          type="text"
          id="student_id"
          name="student_id"
          placeholder="Enter your student ID"
          value={formData.student_id}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.student_id && (
          <p className="text-red-500">{errors.student_id}</p>
        )}
      </div>

      {/* First Name */}
      <div className="mb-4">
        <label htmlFor="first_name" className="mb-2.5 block font-medium">
          First Name
        </label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Enter your first name"
          value={formData.first_name}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.first_name && (
          <p className="text-red-500">{errors.first_name}</p>
        )}
      </div>

      {/* Middle Name */}
      <div className="mb-4">
        <label htmlFor="middle_name" className="mb-2.5 block font-medium">
          Middle Name
        </label>
        <input
          type="text"
          id="middle_name"
          name="middle_name"
          placeholder="Enter your middle name"
          value={formData.middle_name}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Last Name */}
      <div className="mb-4">
        <label htmlFor="last_name" className="mb-2.5 block font-medium">
          Last Name
        </label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Enter your last name"
          value={formData.last_name}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="mb-2.5 block font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>

      {/* Password */}
      <div className="mb-4">
        <label htmlFor="password" className="mb-2.5 block font-medium">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.password && <p className="text-red-500">{errors.password}</p>}
      </div>

      {/* Confirm Password */}
      <div className="mb-4">
        <label htmlFor="confirmPassword" className="mb-2.5 block font-medium">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword}</p>
        )}
      </div>

      {/* Accept Terms */}
      <div className="mb-5 flex items-center">
        <label className="flex items-center">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            className="mr-2"
          />
          Accept terms and conditions
        </label>
        {errors.termsAccepted && (
          <p className="text-red-500">{errors.termsAccepted}</p>
        )}
      </div>

      {/* Submit Button */}
      <div className="mb-4">
        <button
          type="submit"
          className="w-full rounded-lg bg-primary py-3 text-white"
        >
          Sign Up
        </button>
      </div>
    </form>
  );
}
