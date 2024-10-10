"use client";
import Link from "next/link";
import React from "react";
import GoogleSigninButton from "../GoogleSigninButton";
import SignupStudentWithPassword from "../SignupStudentWithPassword";
import SignupProfWithPassword from "../SignupProfWithPassword";

export const SignupStudent = () => {
  return (
    <>
      <div>
        <SignupStudentWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have any account?{" "}
          <Link href="/auth/student/signin" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}

export const SignupProf = () => {
  return (
    <>
      <div>
        <SignupProfWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Already have any account?{" "}
          <Link href="/auth/prof/signin" className="text-primary">
            Sign in
          </Link>
        </p>
      </div>
    </>
  );
}