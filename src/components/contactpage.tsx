'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import Image from "next/image";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Form submitted:', formData);
      setIsSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: ''
      });
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white px-4 sm:px-0">
      <div className="flex flex-col sm:flex-row min-h-screen">
        {/* Left Side - Family Photo */}
        <motion.div 
          className="w-full sm:w-1/2 relative overflow-hidden p-2 sm:p-4 sm:pt-6 lg:p-8 xl:p-12 h-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="relative w-full aspect-[4/3] sm:aspect-auto rounded-xl sm:rounded-2xl xl:rounded-3xl overflow-hidden shadow-lg sm:shadow-2xl min-h-[180px] sm:min-h-0 mb-4 sm:mb-0"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            whileHover={{ scale: 1.02 }}
          >
            {/* Family image */}
            <Image 
              src="/family.jpg" 
              alt="Family" 
              fill
              className="absolute inset-0 w-full h-full object-contain sm:object-cover bg-white"
              sizes="(max-width: 640px) 100vw, 50vw"
            />
            {/* Contact Info Overlay */}
            <motion.div 
              className="absolute bottom-2 left-2 right-2 sm:bottom-4 sm:left-4 sm:right-4 bg-black/20 backdrop-blur-sm rounded-lg p-2 sm:p-3 text-white text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              The image is for visual representation only.
            </motion.div>
            {/* Border glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-2xl xl:rounded-3xl border-2 sm:border-4 border-white/20"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(34, 197, 94, 0.3)",
                  "0 0 40px rgba(34, 197, 94, 0.6)",
                  "0 0 20px rgba(34, 197, 94, 0.3)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        {/* Right Side - Contact Form */}
        <motion.div 
          className="w-full sm:w-1/2 flex items-center justify-center px-2 py-4 sm:p-4 sm:pt-6 lg:p-8 xl:p-12 overflow-y-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="w-full max-w-lg py-4 sm:py-8">
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
                      <p className="text-sm text-green-600">Your message has been sent successfully.</p>
                    </div>
                  </div>
                  <button
                    onClick={resetForm}
                    className="mt-3 text-sm text-green-600 hover:text-green-800 underline"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Heading */}
            <motion.h1 
              className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 lg:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="block sm:inline"
              >
                Ask.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="block sm:inline"
              >
                Connect.
              </motion.span>{' '}
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="block sm:inline"
              >
                Belong.
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p 
              className="text-gray-600 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Got a question? Want to explore opportunities? Whether you are a future homeowner or a channel partner, we are here to listen, guide, and grow together. Lets connect.
            </motion.p>

            {/* Contact Form */}
            <motion.form 
              onSubmit={handleSubmit}
              className="space-y-4 sm:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              noValidate
            >
              <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 }}
              >
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter your first name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.firstName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                    aria-describedby={errors.firstName ? "firstName-error" : undefined}
                  />
                  {errors.firstName && (
                    <p id="firstName-error" className="mt-1 text-sm text-red-600">
                      {errors.firstName}
                    </p>
                  )}
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                >
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter your last name"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                      errors.lastName ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                    }`}
                    required
                    aria-describedby={errors.lastName ? "lastName-error" : undefined}
                  />
                  {errors.lastName && (
                    <p id="lastName-error" className="mt-1 text-sm text-red-600">
                      {errors.lastName}
                    </p>
                  )}
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="mt-1 text-sm text-red-600">
                    {errors.email}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="mt-1 text-sm text-red-600">
                    {errors.phone}
                  </p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.5, delay: 1.6 }}
              >
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="Enter your city"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 ${
                    errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-gray-400'
                  }`}
                  required
                  aria-describedby={errors.city ? "city-error" : undefined}
                />
                {errors.city && (
                  <p id="city-error" className="mt-1 text-sm text-red-600">
                    {errors.city}
                  </p>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div
                className="flex justify-end pt-2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.8 }}
              >
                <motion.button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`group bg-black text-white px-6 py-3 rounded-full flex items-center gap-3 transition-all duration-300 ${
                    isSubmitting 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-800 hover:scale-105'
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  <span className="text-base font-medium">
                    {isSubmitting ? 'Sending...' : 'Submit'}
                  </span>
                  {!isSubmitting && (
                    <div className="w-2 h-2 bg-white rounded-full group-hover:scale-110 transition-all duration-300 group-hover:rotate-45 group-hover:rounded-none group-hover:w-3 group-hover:h-3 group-hover:bg-transparent group-hover:border-r-2 group-hover:border-t-2 group-hover:border-white"></div>
                  )}
                  {isSubmitting && (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
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
