'use client';

import React, { useState } from 'react';
import { ChevronDown, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  type SectionType = 'officeAddress' | 'registeredOffice' | 'salesQueries' | 'customerCare';
  
  const [expandedSections, setExpandedSections] = useState<Record<SectionType, boolean>>({
    officeAddress: true,
    registeredOffice: false,
    salesQueries: false,
    customerCare: false
  });

  const toggleSection = (section: SectionType) => {
    setExpandedSections(prev => {
      const newState: Record<SectionType, boolean> = {
        officeAddress: false,
        registeredOffice: false,
        salesQueries: false,
        customerCare: false
      };
      newState[section] = !prev[section];
      return newState;
    });
  };

  return (
    <footer className="bg-gray-900 text-white px-4">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Three Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-18 mb-8 md:pl-18">
          {/* Left Column - Contact Information */}
          <div className="space-y-6">
            <div>
              <button 
                onClick={() => toggleSection('officeAddress')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                Office address
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.officeAddress ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.officeAddress && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Royal Nest Group</p>
                  <p>(CIN: U45201HR2003PLC082732)</p>
                  <p>Royal Nest</p>
                  <p>Noida,</p>
                  <p>Uttar Pradesh-201301</p>
                  <p>Contact No. +91 120 4492650</p>
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => toggleSection('registeredOffice')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                Registered office
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.registeredOffice ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.registeredOffice && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Royal Nest Group</p>
                  <p>Registered Office Address</p>
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => toggleSection('salesQueries')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                For sales queries
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.salesQueries ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.salesQueries && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Sales Department</p>
                  <p>Contact: +91 120 4492650</p>
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => toggleSection('customerCare')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                Customer care
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.customerCare ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.customerCare && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Customer Support</p>
                  <p>Email: support@royalnest.com</p>
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Projects and About */}
          <div className="space-y-6 mt-8 md:mt-0">
            <div>
              <h3 className="font-semibold text-lg mb-4">Projects</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Royal Nest Saffron, Katra</p>
                <p>Royal Nest Green, GK</p>
              </div>
            </div>

            <Link href="/Aboutus"><div>
              <h3 className="font-semibold text-lg mb-4">About Us</h3>
            </div></Link>

            <div>
              <h3 className="font-semibold text-lg mb-4">Career</h3>
            </div>

            <div>
              <h3 className="font-semibold text-lg mb-4">Media</h3>
            </div>
            <Link href="/Contact">
            <div>
              <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            </div>
            </Link>
          </div>

          {/* Right Column - Links and Information */}
          <div className="space-y-6 mt-8 md:mt-0">
            <div>
              <h3 className="font-semibold text-lg mb-4">Blogs</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Latest News</p>
                <p>Industry Insights</p>
                <p>Project Updates</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Important Notices</h3>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Statutory Compliances</h3>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Scheme of Arrangement</h3>
            </div>

            <div>
              <h3 className="font-semibold mb-4">EHS</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800 px-4">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 md:space-x-0 space-x-0">
            {/* Copyright */}
            <div className="text-sm text-white text-center md:text-left">
              Copyright © 2025 Royal Nest Group, All rights reserved.
            </div>

            {/* Policy Links */}
            <div className="text-sm text-white flex flex-col md:flex-row items-center md:justify-center space-y-2 md:space-y-0 md:space-x-4">
              <span>EOI Submission & Refund Policy</span>
              <span className="hidden md:inline">|</span>
              <span>Privacy Policy</span>
              <span className="hidden md:inline">|</span>
              <span>ISO 9001:2008</span>
              <span className="hidden md:inline">|</span>
              <span>Disclaimer</span>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center justify-center space-x-4">
              <div className="flex space-x-3">
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
