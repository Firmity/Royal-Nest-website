'use client';

import React, { useState } from 'react';
import { ChevronDown, Facebook, Linkedin, Youtube, Instagram } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  type SectionType = 'officeAddress' | 'registeredOffice' | 'customerCare';
  
  const [expandedSections, setExpandedSections] = useState<Record<SectionType, boolean>>({
    officeAddress: true,
    registeredOffice: false,
    customerCare: false
  });

  const toggleSection = (section: SectionType) => {
    setExpandedSections(prev => {
      const newState: Record<SectionType, boolean> = {
        officeAddress: false,
        registeredOffice: false,
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
          {/* Middle Column - Projects and About */}
          <div className="space-y-6 mt-8 md:mt-0">
            <div>
              <h3 className="font-semibold text-lg mb-4">Projects</h3>
              <div className="space-y-2 text-sm text-gray-300">
                <p>Royal Nest Hill View | Jammu</p>
                <p>Royal Nest Forest View | Dharamshala</p>
                <p>Royal Nest Sapphire | Jammu</p>
                <p>Royal Nest | Greater Noida</p>
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
          {/* Left Column - Contact Information */}
          <div className="space-y-6">
            <div>
              <button 
                onClick={() => toggleSection('officeAddress')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                Head Office address
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.officeAddress ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.officeAddress && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p>Business Park, Ground Floor, H-64, Sec-63,</p>
                  <p>Noida, Distt: Gautam Buddh Nagar,</p>
                  <p>Uttar Pradesh-201301</p>
                  <p>Contact No. 0120 4245551</p>
                </div>
              )}
            </div>

            <div>
              <button 
                onClick={() => toggleSection('registeredOffice')}
                className="flex items-center justify-between w-full text-left font-semibold text-lg mb-3"
              >
                Site office
                <ChevronDown className={`w-4 h-4 transition-transform ${expandedSections.registeredOffice ? 'rotate-180' : ''}`} />
              </button>
              {expandedSections.registeredOffice && (
                <div className="space-y-2 text-sm text-gray-300">
                  <p className="font-semibold">Royal Nest Hill View Office:</p>
                  <p>Sector-D, Sainik Colony Extension, Chowadi Road, Jammu, Jammu & Kashmir-180011</p>
                  <p>📱 +91 9596796757; +91 9541900771; +91 9541900772; +91 9541900773</p>
                  <hr className="my-2 border-gray-700" />
                  <p className="font-semibold">Royalnest Forest View Office:</p>
                  <p>Khata-14, Cabin No.-1, Khatoni-7, Mohal Chakban Gharoh, Tehsil: Dharamshala, District:- Kangra, Himachal Pradesh-176216</p>
                  <p>📱 +91 9818655411; +91 9833885190</p>
                  <p>📧 sales@royalnestdharamshala.com / crm@royalnestdharamshala.com</p>
                  <hr className="my-2 border-gray-700" />
                  <p className="font-semibold">Royal Nest Sapphire Office:</p>
                  <p>Village Deeli (Kunjwani), Kunjwani Bypass, (Near Anutham Hotel and Audi Showroom) Jammu, Jammu & Kashmir-180010</p>
                  <p>📱 +91 9596796757</p>
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
                  <p>Phone: +91 9596796757</p>
                  <p>Email: support@royalnest.com</p>
                </div>
              )}
            </div>
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
              <span>ISO 9001:2015</span>
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
