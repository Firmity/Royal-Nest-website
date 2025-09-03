"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CareerPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Extract only text fields from formData (exclude resume file)
    const data = {
      name: formData.get("name")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      phone: formData.get("phone")?.toString() ?? "",
      designation: formData.get("designation")?.toString() ?? "",
      // Resume is ignored for now
    };

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        alert("Application sent successfully!");
        form.reset();
      } else {
        alert("Failed to send application. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex items-center justify-center min-h-[50vh] w-full bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 overflow-hidden px-6 md:px-12 py-14">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-blue-700 rounded-full opacity-20 filter blur-3xl animate-slow-spin pointer-events-none"></div>
        <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-blue-800 rounded-full opacity-30 filter blur-2xl pointer-events-none"></div>

        <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-5xl text-center pt-20">
          <h1 className="text-4xl md:text-7xl font-extrabold text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)] tracking-tight leading-tight max-w-4xl">
            CAREER IN ROYAL NEST GROUP
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex flex-1 flex-col md:flex-row items-center justify-center gap-10 max-w-7xl mx-auto py-12 px-6">
        {/* Left Side - Photo */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-6 rounded-xl shadow-lg">
          <img
            src="/career.jpg"
            alt="Career at Royal Nest"
            className="max-w-full h-auto rounded-lg object-cover shadow-xl"
            loading="lazy"
          />
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800">
            Apply for a Position
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {[
              { label: "Name", type: "text", name: "name" },
              { label: "Email", type: "email", name: "email" },
              { label: "Phone Number", type: "tel", name: "phone" },
              { label: "Designation", type: "text", name: "designation" },
            ].map(({ label, type, name }) => (
              <div key={name}>
                <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  className="w-full rounded border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder={`Enter your ${label.toLowerCase()}`}
                />
              </div>
            ))}

            {/* Resume Upload - shown but ignored in submit */}
            <div>
              <label htmlFor="resume" className="block mb-2 font-medium text-gray-700">
                Resume
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                className="w-full rounded border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold focus:outline-none focus:ring-4 transition
                ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:ring-blue-400 text-white"}`}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
