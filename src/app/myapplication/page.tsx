"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { dummyApplications } from "./dummyData"; // Ensure the path to dummy data is correct
import ButtonDefault from "@/components/Buttons/ButtonDefault"; // Import ButtonDefault component

export default function LayoutPage() {
  const [applications, setApplications] = useState(dummyApplications); // Set initial applications
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any | null>(null);
  const [deadline, setDeadline] = useState<Date | null>(null); // Use Date type for deadline
  const [status, setStatus] = useState("");

  const styles: { [key: string]: React.CSSProperties } = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '20px',
    },
    box: {
      border: '1px solid #ddd',
      borderRadius: '15px',
      padding: '15px',
      width: '250px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
      position: 'relative',
    },
    button: {
      backgroundColor: '#5750f1',
      color: 'white',
      padding: '10px 15px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginTop: '10px',
    },
    title: {
      fontWeight: 'bold', // Make title bold
      fontSize: '1.5em', // Slightly increase font size for emphasis
    },
    modal: {
      display: 'block',
      position: 'fixed',
      zIndex: 1,
      left: 0,
      top: 0,
      width: '100%',
      height: '100%',
      overflow: 'auto',
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    modalContent: {
      backgroundColor: '#fff',
      margin: '15% auto',
      padding: '20px',
      border: '1px solid #888',
      width: '40%',
      borderRadius: '8px',
      display: 'flex',
      flexDirection: 'column',
    },
    closeButton: {
      color: '#aaa',
      float: 'right',
      cursor: 'pointer',
      fontSize: '28px',
      fontWeight: 'bold',
    },
    input: {
      marginBottom: '10px',
      padding: '8px',
      border: '1px solid #ddd',
      borderRadius: '4px',
    },
  };

  // Open Detail Modal
  const openDetailModal = (application: any) => {
    setSelectedApplication(application);
    setDeadline(new Date(application.deadline)); // Set initial deadline to a Date object
    setStatus(application.status); // Populate current status
    setShowDetailModal(true);
  };

  // Handle Update
  const handleUpdate = () => {
    if (selectedApplication && deadline) {
      // Update application in the state
      const updatedApplications = applications.map((app) =>
        app.application_id === selectedApplication.application_id
          ? { ...app, deadline: deadline.toISOString(), status } // Update the specific application
          : app
      );
      setApplications(updatedApplications); // Update the main application state
      setShowDetailModal(false); // Close the modal
    }
  };

  // Close All Modals
  const closeModal = () => {
    setShowDetailModal(false);
  };

  return (
    <div className="flex">
      <Sidebar sidebarOpen={false} setSidebarOpen={function (arg: boolean): void {
        throw new Error("Function not implemented.");
      } } />
      <div className="flex-1">
        <Header sidebarOpen={undefined} setSidebarOpen={function (arg0: boolean): void {
          throw new Error("Function not implemented.");
        } } />
        <div className="p-4">
          {/* Button to create application */}
          <div className="mb-4">
            <ButtonDefault
              label="Create Application"
              link="/create-application" // Specify the correct link for the Create Application page
              customClasses="bg-primary rounded-full text-white px-10 py-3.5 lg:px-8 xl:px-10"
            />
          </div>

          {/* Application Boxes */}
          <div style={styles.container}>
            {applications.map((app) => (
              <div key={app.application_id} style={styles.box}>
                <h4>{app.title}</h4>
                <p><strong>Application ID:</strong> {app.application_id}</p>
                <p><strong>Deadline:</strong> {new Date(app.deadline).toLocaleString()}</p>
                <p><strong>Status:</strong> {app.status}</p>
                <button
                  onClick={() => openDetailModal(app)}
                  style={styles.button}
                >
                  Change
                </button>
              </div>
            ))}
          </div>

          {/* Detail Modal */}
          {showDetailModal && selectedApplication && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h2>Change Application Details</h2>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <label>
                    <strong>Application ID:</strong> {selectedApplication.application_id}
                  </label>
                  <label>
                    <strong>Title:</strong> {selectedApplication.title}
                  </label>
                  <label>
                    <strong>Current Deadline:</strong> {selectedApplication.deadline}
                  </label>
                  <DatePicker
                    selected={deadline}
                    onChange={(date) => setDeadline(date)} // Update the deadline state with the selected date
                    showTimeSelect
                    dateFormat="Pp"
                    placeholderText="Select Deadline"
                    style={styles.input}
                  />
                  <label>
                    <strong>Current Status:</strong> {selectedApplication.status}
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    style={styles.input}
                  >
                    <option value="OPN">Open</option>
                    <option value="CLS">Closed</option>
                    <option value="PEN">Pending</option>
                  </select>
                </div>
                <button onClick={handleUpdate} style={styles.button}>
                  Update Application
                </button>
                <span style={styles.closeButton} onClick={closeModal}>
                  &times;
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
