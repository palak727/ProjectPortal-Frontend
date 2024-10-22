"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  title: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  office_phone: string;
  department: string;
  office_location: string;
  research_interest: string;
  bio: string;
  profile_picture_url: string;
  termsAccepted: boolean;
}

interface FormErrors {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
  termsAccepted?: string;
}

export default function SignupProfWithPassword() {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    title: "",
    first_name: "",
    middle_name: "",
    last_name: "",
    office_phone: "",
    department: "",
    office_location: "",
    research_interest: "",
    bio: "",
    profile_picture_url: "",
    termsAccepted: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const validate = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!formData.username) tempErrors.username = "Username is required";
    if (!formData.email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      tempErrors.email = "Email is invalid";
    if (!formData.password) tempErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      tempErrors.confirmPassword = "Passwords do not match";
    if (!formData.first_name) tempErrors.first_name = "First name is required";
    if (!formData.last_name) tempErrors.last_name = "Last name is required";
    if (!formData.termsAccepted)
      tempErrors.termsAccepted = "You must accept the terms";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      try {
        const res = await fetch("http://0.0.0.0:3045/api/v1/professor/signup", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        });

        const data = await res.json();

        if (data.error) {
          throw new Error(data.error);
        }
        toast.success("Signup successful!");
      } catch (error) {
        console.error(error);
        toast.error("Signup not successful!");
      }

      // Reset form after submission
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        title: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        office_phone: "",
        department: "",
        office_location: "",
        research_interest: "",
        bio: "",
        profile_picture_url: "",
        termsAccepted: false,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
      </div>

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

      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="mb-2.5 block font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Enter your title"
          value={formData.title}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Office Phone */}
      <div className="mb-4">
        <label htmlFor="office_phone" className="mb-2.5 block font-medium">
          Office Phone
        </label>
        <input
          type="text"
          id="office_phone"
          name="office_phone"
          placeholder="Enter your office phone"
          value={formData.office_phone}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Department */}
      <div className="mb-4">
        <label htmlFor="department" className="mb-2.5 block font-medium">
          Department
        </label>
        <input
          type="text"
          id="department"
          name="department"
          placeholder="Enter your department"
          value={formData.department}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Office Location */}
      <div className="mb-4">
        <label htmlFor="office_location" className="mb-2.5 block font-medium">
          Office Location
        </label>
        <input
          type="text"
          id="office_location"
          name="office_location"
          placeholder="Enter your office location"
          value={formData.office_location}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Research Interest */}
      <div className="mb-4">
        <label htmlFor="research_interest" className="mb-2.5 block font-medium">
          Research Interest
        </label>
        <textarea
          id="research_interest"
          name="research_interest"
          placeholder="Enter your research interests"
          value={formData.research_interest}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Bio */}
      <div className="mb-4">
        <label htmlFor="bio" className="mb-2.5 block font-medium">
          Bio
        </label>
        <textarea
          id="bio"
          name="bio"
          placeholder="Enter your bio"
          value={formData.bio}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div>

      {/* Profile Picture URL
      <div className="mb-4">
        <label htmlFor="profile_picture_url" className="mb-2.5 block font-medium">
          Profile Picture URL
        </label>
        <input
          type="text"
          id="profile_picture_url"
          name="profile_picture_url"
          placeholder="Enter your profile picture URL"
          value={formData.profile_picture_url}
          onChange={handleChange}
          className="w-full rounded-lg border bg-transparent py-3 pl-4"
        />
      </div> */}

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
