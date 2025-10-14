"use client";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import ContactPage from "@/components/contactpage";
import { FaPhone, FaEnvelope } from "react-icons/fa";

const markers = [
  {
    name: "Head Office",
    address:
      "Business Park, Ground Floor, H-64, Sec-63, Noida, Distt: Gautam Buddh Nagar, Uttar Pradesh-201301",
    representative: "",
    phone: "+91 9540009950",
    email: "info@royalnestgroup.com",
    mapQuery: "Ufirm+Business+Park",
  },
  {
    name: "Jammu (Hill View Office)",
    address:
      "Sector-D, Sainik Colony Extension, Chowadi Road, Jammu, Jammu & Kashmir-180011",
    representative: "",
    phone: "+91 9540009950",
    email: "info@royalnestgroup.com",
    mapQuery: "Royal+Nest+Hill+View",
  },
  {
    name: "Dharamshala (Forest View Office)",
    address:
      "Khata-14, Cabin No.-1, Khatoni-7, Mohal Chakban Gharoh, Tehsil: Dharamshala, District:- Kangra, Himachal Pradesh-176216",
    representative: "",
    phone: "+91 9540009950",
    email: "info@royalnestgroup.com",
    mapQuery: "Royal+Nest+Forest+View",
  },
  {
    name: "Jammu (Sapphire Office)",
    address:
      "Village Deeli (Kunjwani), Kunjwani Bypass, (Near Anutham Hotel and Audi Showroom) Jammu, Jammu & Kashmir-180010",
    representative: "",
    phone: "+91 9540009950",
    email: "info@royalnestgroup.com",
    mapQuery: "Royal+Nest+Sapphire",
  },
  {
    name: "Greater Noida West",
    address:
      "Plot No.-GH-8B, Tech. Zone-IV, Greater Noida West, Distt: Gautam Buddh Nagar, Uttar Pradesh-201306",
    representative: "",
    phone: "+91 9540009950",
    email: "info@royalnestgroup.com",
    mapQuery: "Home+Royal+Nest+Apartments+Noida",
  },
];

export default function Contact() {
  const [selectedLocation, setSelectedLocation] = useState(markers[0]);

  return (
    <div className="bg-white">
      <Navbar />
      {/* Map + Branch Info */}
      <div className="flex flex-col lg:flex-row w-full mb-10 mt-35">
        <div className="w-full lg:w-1/2 h-[300px] lg:h-[80vh]">
          <iframe
            title="Google Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://www.google.com/maps?q=${selectedLocation.mapQuery}&output=embed`}
          />
        </div>

        <div className="w-full lg:w-1/2 p-4 lg:p-6 overflow-y-auto max-h-[400px] lg:max-h-[80vh]">
          <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">
            Our Branches
          </h2>
          <ul className="space-y-4">
            {markers.map((location, idx) => (
              <li
                key={idx}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedLocation === location
                    ? "bg-yellow-100 border-yellow-400"
                    : "hover:bg-gray-50"
                }`}
                onClick={() => setSelectedLocation(location)}
              >
                <h3 className="font-semibold text-base lg:text-lg text-black">
                  {location.name}
                </h3>
                <p className="text-sm text-gray-700 mb-1">{location.address}</p>
                {location.representative && (
                  <p className="text-sm text-black">
                    <strong>Representative:</strong> {location.representative}
                  </p>
                )}
                {location.phone && (
                  <p className="text-sm text-black flex items-center">
                    <FaPhone className="mr-2 text-yellow-600" />
                    <strong>Contact us:</strong>&nbsp;{location.phone}
                  </p>
                )}
                {location.email && (
                  <p className="text-sm text-black flex items-center">
                    <FaEnvelope className="mr-2 text-yellow-600" />
                    <strong>Mail us:</strong>&nbsp;{location.email}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <ContactPage />
    </div>
  );
}
