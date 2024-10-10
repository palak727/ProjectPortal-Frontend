"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SigninStudentWithPassword from "../SigninStudentWithPassword";
import SigninProfWithPassword from "../SigninProfWithPassword";

export const SigninStudent = () => {
  return (
    <>
      <div>
        <SigninStudentWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/student/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export const SigninProf = () => {
  return (
    <>
      <div>
        <SigninProfWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/auth/prof/signup" className="text-primary">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}
