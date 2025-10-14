"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function CareerPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
    resume: null as File | null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.designation.trim()) newErrors.designation = "Designation is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === "resume" && files) {
      setFormData((prev) => ({ ...prev, resume: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const formPayload = new FormData();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("phone", formData.phone);
      formPayload.append("designation", formData.designation);
      if (formData.resume) {
        formPayload.append("resume", formData.resume);
      }

      const response = await fetch("/api/apply", {
        method: "POST",
        body: formPayload, // FormData automatically sets multipart/form-data
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          designation: "",
          resume: null,
        });
        if (fileInputRef.current) {
  fileInputRef.current.value = ""; // clear the file input
}

      } else {
        alert(result.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit. Try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white pt-20">
      <Navbar />
      <div className="flex flex-col sm:flex-row min-h-[calc(100vh-80px)]">
        {/* Left Section - Image */}
        <motion.div
          className="w-full sm:w-1/2 relative overflow-hidden p-4 sm:p-8 lg:p-12 h-[300px] sm:h-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="relative w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl h-full"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            <Image
              src="/career.jpg"
              alt="Career at Royal Nest"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            <motion.div
              className="absolute inset-0 border-2 sm:border-4 border-white/20 rounded-2xl"
              animate={{
                boxShadow: [
                  "0 0 20px rgba(37,99,235,0.3)",
                  "0 0 40px rgba(37,99,235,0.6)",
                  "0 0 20px rgba(37,99,235,0.3)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Right Section - Form */}
        <motion.div
          className="w-full sm:w-1/2 flex items-center justify-center px-4 py-8 sm:p-8 lg:p-12 overflow-y-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full max-w-lg">
            {/* Success Message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <h3 className="font-medium text-green-800">Thank you!</h3>
                      <p className="text-sm text-green-600">
                        Your application has been submitted successfully.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-3 text-sm text-green-600 hover:text-green-800 underline"
                  >
                    Submit another application
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Heading */}
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Join the <span className="text-blue-600">Royal Nest Group</span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-sm sm:text-base mb-6 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Excited to grow your career with us? Fill out the form below and our team
              will reach out if there’s a fit. Let’s build something amazing together!
            </motion.p>

            {/* Form */}
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              noValidate
            >
              {[
                { label: "Full Name", name: "name", type: "text" },
                { label: "Email Address", name: "email", type: "email" },
                { label: "Phone Number", name: "phone", type: "tel" },
                { label: "Designation", name: "designation", type: "text" },
              ].map(({ label, name, type }) => (
                <motion.div key={name} whileHover={{ scale: 1.01 }}>
                  <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-2">
                    {label} *
                  </label>
                  <input
                    type={type}
                    id={name}
                    name={name}
                    value={formData[name as keyof typeof formData] as string}
                    onChange={handleInputChange}
                    placeholder={`Enter your ${label.toLowerCase()}`}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black ${errors[name]
                        ? "border-red-300 bg-red-50"
                        : "border-gray-300 hover:border-gray-400"
                      }`}
                    required
                    aria-describedby={errors[name] ? `${name}-error` : undefined}
                  />
                  {errors[name] && (
                    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
                      {errors[name]}
                    </p>
                  )}
                </motion.div>
              ))}

              {/* Resume Upload */}
              <motion.div whileHover={{ scale: 1.01 }}>
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">
                  Resume (PDF/DOC)
                </label>
                <input
                  type="file"
                  id="resume"
                  name="resume"
                  ref={fileInputRef}
                  accept=".pdf,.doc,.docx"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg border-gray-300 hover:border-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-black"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div className="flex justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`group bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"
                    }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span className="text-base font-medium">
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </span>
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                  ) : (
                    <div className="w-2 h-2 bg-white rounded-full group-hover:w-3 group-hover:h-3 group-hover:bg-transparent group-hover:border-r-2 group-hover:border-t-2 group-hover:border-white transition-all duration-300" />
                  )}
                </motion.button>
              </motion.div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
