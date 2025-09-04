"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";

export default function CareerPage() {
  const [loading, setLoading] = useState(false);
  const [selectedDept, setSelectedDept] = useState("");

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleDeptChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDept(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const name = (
      form.elements.namedItem("name") as HTMLInputElement
    )?.value.trim();
    const email = (
      form.elements.namedItem("email") as HTMLInputElement
    )?.value.trim();
    const phone = (
      form.elements.namedItem("phone") as HTMLInputElement
    )?.value.trim();
    const department = (
      form.elements.namedItem("department") as HTMLSelectElement
    )?.value;
    const departmentOther = (
      form.elements.namedItem("departmentOther") as HTMLInputElement
    )?.value.trim();
    const describe = (
      form.elements.namedItem("describe") as HTMLTextAreaElement
    )?.value.trim();
    const resumeInput = form.elements.namedItem("resume") as HTMLInputElement;
    const resumeFile = resumeInput?.files?.[0];

    // Validate all required fields including phone length exactly 10 digits
    if (
      !name ||
      !email ||
      !phone ||
      !department ||
      !describe ||
      !resumeFile ||
      (department === "Other" && !departmentOther)
    ) {
      alert("Please fill all the information including uploading your resume.");
      setLoading(false);
      return;
    }

    // Phone validation - exactly 10 digits
    if (!/^\d{10}$/.test(phone)) {
      alert("Please enter a valid 10-digit phone number.");
      setLoading(false);
      return;
    }

    if (resumeFile.size > MAX_FILE_SIZE) {
      alert("Resume file size must be less than 10 MB.");
      setLoading(false);
      return;
    }

    const formData = new FormData(form);

    try {
      const response = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        alert("Application sent successfully!");
        form.reset();
        setSelectedDept("");
      } else {
        alert("Failed to send application. Please try again.");
      }
    } catch {
      alert("An error occurred. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Navbar />

      <section className="flex items-center justify-center min-h-[30vh] w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 px-6 md:px-12 py-12 text-center rounded-b-3xl shadow-md">
        <h1 className="max-w-3xl text-3xl md:text-4xl font-semibold text-gray-800 leading-relaxed">
          Take the Next Step in Your Career with <br /> Royal Nest Group
        </h1>
      </section>

      <main className="flex flex-col md:flex-row items-center justify-center gap-12 max-w-6xl mx-auto py-12 px-6">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2 flex items-center justify-center max-h-[600px]">
          <img
            src="/career.jpg"
            alt="Career at Royal Nest"
            className="rounded-xl shadow-xl object-cover w-full h-full max-h-[600px]"
            loading="lazy"
          />
        </div>

        <div className="w-full md:w-1/2 bg-white p-8 rounded-xl shadow-xl border border-gray-200 max-h-[450px] overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-8 text-gray-900 text-center">
            Apply for a Position
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {[
              { label: "Full Name", type: "text", name: "name" },
              { label: "Email Address", type: "email", name: "email" },
              {
                label: "Phone Number",
                type: "tel",
                name: "phone",
                pattern: "\\d{10}",
                maxLength: 10,
              },
            ].map(({ label, type, name, pattern, maxLength }) => (
              <div key={name} className="flex flex-col">
                <label
                  htmlFor={name}
                  className="mb-1 font-medium text-gray-700 select-none"
                >
                  {label}
                </label>
                <input
                  id={name}
                  name={name}
                  type={type}
                  required
                  placeholder={label}
                  pattern={pattern}
                  maxLength={maxLength}
                  className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                />
              </div>
            ))}

            {/* Department select as before */}
            <div className="flex flex-col">
              <label
                htmlFor="department"
                className="mb-1 font-medium text-gray-700 select-none"
              >
                Department
              </label>
              <select
                id="department"
                name="department"
                required
                value={selectedDept}
                onChange={handleDeptChange}
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
              >
                <option value="" disabled>
                  Select Department
                </option>
                <option value="HR">HR</option>
                <option value="Accounts">Accounts</option>
                <option value="Civil">Civil</option>
                <option value="Purchase">Purchase</option>
                <option value="CRM">CRM</option>
                <option value="Administrator">Administrator</option>
                <option value="Sales">Sales</option>
                <option value="In-house Lawyer">In-house Lawyer</option>
                <option value="Designer">Designer</option>
                <option value="Other">Other</option>
              </select>
              {selectedDept === "Other" && (
                <input
                  type="text"
                  name="departmentOther"
                  placeholder="Please specify"
                  required
                  className="mt-3 rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition"
                />
              )}
            </div>

            {/* Describe Yourself textarea */}
            <div className="flex flex-col">
              <label
                htmlFor="describe"
                className="mb-1 font-medium text-gray-700 select-none"
              >
                Describe Yourself
              </label>
              <textarea
                id="describe"
                name="describe"
                rows={4}
                required
                placeholder="Tell us about yourself..."
                className="rounded-md border border-gray-300 px-4 py-2 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-3 focus:ring-blue-400 transition resize-y"
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="resume"
                className="mb-1 font-medium text-gray-700 select-none"
              >
                Upload Resume
              </label>
              <input
                id="resume"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                className="rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:outline-none focus:ring-3 focus:ring-blue-400 transition cursor-pointer"
              />
              <p className="text-sm mt-1 text-gray-500">Max file size: 10 MB</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg font-semibold text-white transition-shadow duration-300 ${
                loading
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-800 shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </main>

      {/* Your footer remains unchanged */}
    </div>
  );
}
