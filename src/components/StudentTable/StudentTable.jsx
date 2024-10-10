import React, { useState, useEffect } from "react";
import Modal from "react-modal";

const dummyData = [
  {
    student_serial: 1,
    student_id: "STU123",
    username: "john_doe",
    email_id: "john@example.com",
    first_name: "John",
    last_name: "Doe",
    department: "CSE",
    programme: "B-TECH",
    batch: "2024",
    resume: "https://example.com/resume/johndoe.pdf",
    description: "Skilled in web development and data structures.",
    gender: "male",
    skills: ["React.js", "Node.js", "SQL"],
    resources: {
      github: "https://github.com/johndoe",
      linkedin: "https://linkedin.com/johndoe",
    },
  },
  {
    student_serial: 2,
    student_id: "STU124",
    username: "jane_smith",
    email_id: "jane@example.com",
    first_name: "Jane",
    last_name: "Smith",
    department: "ECE",
    programme: "M-TECH",
    batch: "2023",
    resume: "https://example.com/resume/janesmith.pdf",
    description: "Experienced in embedded systems and circuit design.",
    gender: "female",
    skills: ["C++", "VHDL", "MATLAB"],
    resources: {
      github: "https://github.com/janesmith",
      linkedin: "https://linkedin.com/janesmith",
    },
  },
  {
    student_serial: 3,
    student_id: "STU125",
    username: "mark_brown",
    email_id: "mark@example.com",
    first_name: "Mark",
    last_name: "Brown",
    department: "ME",
    programme: "B-TECH",
    batch: "2022",
    resume: "https://example.com/resume/markbrown.pdf",
    description: "Specialized in mechanical design and CAD modeling.",
    gender: "male",
    skills: ["AutoCAD", "SolidWorks", "ANSYS"],
    resources: {
      github: "https://github.com/markbrown",
      linkedin: "https://linkedin.com/markbrown",
    },
  },
  {
    student_serial: 4,
    student_id: "STU126",
    username: "alice_lee",
    email_id: "alice@example.com",
    first_name: "Alice",
    last_name: "Lee",
    department: "CHE",
    programme: "PHD",
    batch: "2025",
    resume: "https://example.com/resume/alicelee.pdf",
    description: "Researching in chemical processes and reaction kinetics.",
    gender: "female",
    skills: ["Python", "Mathematica", "LabVIEW"],
    resources: {
      github: "https://github.com/alicelee",
      linkedin: "https://linkedin.com/alicelee",
    },
  },
  {
    student_serial: 5,
    student_id: "STU127",
    username: "bob_jackson",
    email_id: "bob@example.com",
    first_name: "Bob",
    last_name: "Jackson",
    department: "CE",
    programme: "M-TECH",
    batch: "2023",
    resume: "https://example.com/resume/bobjackson.pdf",
    description: "Expert in structural analysis and civil engineering design.",
    gender: "male",
    skills: ["STAAD.Pro", "Revit", "Civil 3D"],
    resources: {
      github: "https://github.com/bobjackson",
      linkedin: "https://linkedin.com/bobjackson",
    },
  },
  {
    student_serial: 6,
    student_id: "STU128",
    username: "sophia_wilson",
    email_id: "sophia@example.com",
    first_name: "Sophia",
    last_name: "Wilson",
    department: "EE",
    programme: "B-TECH",
    batch: "2024",
    resume: "https://example.com/resume/sophiawilson.pdf",
    description: "Passionate about power systems and renewable energy.",
    gender: "female",
    skills: ["PowerWorld", "Simulink", "Python"],
    resources: {
      github: "https://github.com/sophiawilson",
      linkedin: "https://linkedin.com/sophiawilson",
    },
  },
];

function StudentTable() {
  const [isPending, setIsPending] = useState(true); // Toggle between pending and active students
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [confirmAction, setConfirmAction] = useState(""); // Either 'accept' or 'reject'

  // Load dummy data into the student list
  useEffect(() => {
    setStudents(dummyData); // Replace with real data fetching
    setFilteredStudents(dummyData); // Initially show all students
  }, []);

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = students.filter(
      (student) =>
        student.first_name.toLowerCase().includes(searchTerm) ||
        student.last_name.toLowerCase().includes(searchTerm) ||
        student.email_id.toLowerCase().includes(searchTerm),
    );
    setFilteredStudents(filtered);
  };

  const handleViewDetails = (student) => {
    setSelectedStudent(student);
    setDetailModalOpen(true);
  };

  const handleConfirmAction = (action, student) => {
    setSelectedStudent(student);
    setConfirmAction(action);
    setConfirmModalOpen(true);
  };

  const confirmDecision = () => {
    if (confirmAction === "accept") {
      // Handle acceptance logic
    } else if (confirmAction === "reject") {
      // Handle rejection logic
    }
    setConfirmModalOpen(false);
  };

  return (
    <div className="p-4">
      {/* Toggle between Pending Applications and Active Students */}
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">
          {isPending ? "Pending Applications" : "Active Students"}
        </h1>
        <button
          className="rounded bg-blue-500 px-4 py-2 text-white"
          onClick={() => setIsPending(!isPending)}
        >
          {isPending ? "View Active Students" : "View Pending Applications"}
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search students..."
        className="mb-4 w-full rounded border border-gray-300 p-2"
        onChange={handleSearch}
      />

      {/* Student Table */}
      <table className="min-w-full border border-gray-300 bg-white">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Skills</th>
            <th className="border px-4 py-2">Resume</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student) => (
            <tr key={student.student_serial}>
              <td className="border px-4 py-2">
                {student.first_name} {student.last_name}
              </td>
              <td className="border px-4 py-2">{student.email_id}</td>
              <td className="border px-4 py-2">{student.skills.join(", ")}</td>
              <td className="border px-4 py-2">
                <a
                  href={student.resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View Resume
                </a>
              </td>
              <td className="flex space-x-2 border px-4 py-2">
                {isPending ? (
                  <>
                    <button
                      className="rounded bg-green-500 px-2 py-1 text-white"
                      onClick={() => handleConfirmAction("accept", student)}
                    >
                      Accept
                    </button>
                    <button
                      className="rounded bg-red-500 px-2 py-1 text-white"
                      onClick={() => handleConfirmAction("reject", student)}
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white"
                    onClick={() => handleConfirmAction("remove", student)}
                  >
                    Remove
                  </button>
                )}
                <button
                  className="rounded bg-gray-500 px-2 py-1 text-white"
                  onClick={() => handleViewDetails(student)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Student Details Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onRequestClose={() => setDetailModalOpen(false)}
        className="mx-auto my-16 max-h-screen w-1/2 overflow-auto rounded-lg bg-white p-8 shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedStudent && (
          <div>
            <h2 className="mb-4 text-2xl font-bold">
              {selectedStudent.first_name} {selectedStudent.last_name}
            </h2>
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-700">
                  <strong>Email:</strong> {selectedStudent.email_id}
                </p>
                <p className="text-gray-700">
                  <strong>Programme:</strong> {selectedStudent.programme}
                </p>
                <p className="text-gray-700">
                  <strong>Batch:</strong> {selectedStudent.batch}
                </p>
                <p className="text-gray-700">
                  <strong>Department:</strong> {selectedStudent.department}
                </p>
                <p className="text-gray-700">
                  <strong>Gender:</strong> {selectedStudent.gender}
                </p>
              </div>
              <div>
                <p className="text-gray-700">
                  <strong>Description:</strong> {selectedStudent.description}
                </p>
                <p className="text-gray-700">
                  <strong>Skills:</strong> {selectedStudent.skills.join(", ")}
                </p>
                <p className="text-gray-700">
                  <strong>GitHub:</strong>{" "}
                  <a
                    href={selectedStudent.resources.github}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Profile
                  </a>
                </p>
                <p className="text-gray-700">
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href={selectedStudent.resources.linkedin}
                    target="_blank"
                    className="text-blue-500 underline"
                  >
                    Profile
                  </a>
                </p>
              </div>
            </div>
            <button
              className="mt-4 rounded bg-gray-500 px-4 py-2 text-white"
              onClick={() => setDetailModalOpen(false)}
            >
              Close
            </button>
          </div>
        )}
      </Modal>

      {/* Confirmation Modal */}
      <Modal
        isOpen={isConfirmModalOpen}
        onRequestClose={() => setConfirmModalOpen(false)}
        className="mx-auto my-16 w-1/3 rounded-lg bg-white p-8 shadow-xl"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        {selectedStudent && (
          <div>
            <h2 className="mb-4 text-xl font-bold">
              Are you sure you want to {confirmAction}{" "}
              {selectedStudent.first_name} {selectedStudent.last_name}?
            </h2>
            <div className="mt-4 flex justify-between">
              <button
                className="rounded bg-green-500 px-4 py-2 text-white"
                onClick={confirmDecision}
              >
                Yes
              </button>
              <button
                className="rounded bg-red-500 px-4 py-2 text-white"
                onClick={() => setConfirmModalOpen(false)}
              >
                No
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default StudentTable;
