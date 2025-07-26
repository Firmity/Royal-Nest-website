"use client";

import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useState, useRef } from "react";
import { FaLinkedin, FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";
import ReCAPTCHA from "react-google-recaptcha";

const markers = [
    {
        name: "Head Office",
        address: "Business Park, Ground Floor, H-64, Sec-63, Noida, Distt: Gautam Buddh Nagar, Uttar Pradesh-201301",
        representative: "",
        phone: "0120 4245551",
        email: "",
        mapQuery: "Ufirm+Business+Park",
    },
    {
        name: "Jammu (Hill View Office)",
        address: "Sector-D, Sainik Colony Extension, Chowadi Road, Jammu, Jammu & Kashmir-180011",
        representative: "",
        phone: "+91 9596796757; +91 9541900771; +91 9541900772; +91 9541900773",
        email: "",
        mapQuery: "Royal+Nest+Hill+View",
    },
    {
        name: "Dharamshala (Forest View Office)",
        address: "Khata-14, Cabin No.-1, Khatoni-7, Mohal Chakban Gharoh, Tehsil: Dharamshala, District:- Kangra, Himachal Pradesh-176216",
        representative: "",
        phone: "+91 9818655411; +91 9833885190",
        email: "sales@royalnestdharamshala.com / crm@royalnestdharamshala.com",
        mapQuery: "Royal+Nest+Forest+View",
    },
    {
        name: "Jammu (Sapphire Office)",
        address: "Village Deeli (Kunjwani), Kunjwani Bypass, (Near Anutham Hotel and Audi Showroom) Jammu, Jammu & Kashmir-180010",
        representative: "",
        phone: "+91 9596796757",
        email: "",
        mapQuery: "Royal+Nest+Sapphire",
    },
    {
        name: "Greater Noida West",
        address: "Plot No.-GH-8B, Tech. Zone-IV, Greater Noida West, Distt: Gautam Buddh Nagar, Uttar Pradesh-201306",
        representative: "",
        phone: "",
        email: "",
        mapQuery: "Home+Royal+Nest+Apartments+Noida",
    }
];

export default function Contact() {
    const [, setIsVerified] = useState(false);
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const [selectedLocation, setSelectedLocation] = useState(markers[0]);

    const [form, setForm] = useState({
        name: "", email: "", phone: "", category: "", message: "", receiveComm: true
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (type === 'checkbox' && 'checked' in e.target) ? (e.target as HTMLInputElement).checked : undefined;
        setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
        });
        const data = await response.json();
        if (data.success) {
            alert("Your message has been sent!");
            setForm({ name: "", email: "", phone: "", category: "", message: "", receiveComm: true });
        } else {
            alert("Something went wrong. Please try again.");
        }
    };

    const handleCaptchaSubmission = async (token: string | null) => {
        if (token) {
            await fetch("/api", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ token }),
            });
            setIsVerified(true);
        } else {
            setIsVerified(false);
        }
    };

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
                    <h2 className="text-xl lg:text-2xl font-bold mb-4 text-black">Our Branches</h2>
                    <ul className="space-y-4">
                        {markers.map((location, idx) => (
                            <li
                                key={idx}
                                className={`p-4 border rounded-lg cursor-pointer transition-all ${selectedLocation === location
                                    ? 'bg-yellow-100 border-yellow-400'
                                    : 'hover:bg-gray-50'
                                    }`}
                                onClick={() => setSelectedLocation(location)}
                            >
                                <h3 className="font-semibold text-base lg:text-lg text-black">{location.name}</h3>
                                <p className="text-sm text-gray-700 mb-1">{location.address}</p>
                                {location.representative && (
                                    <p className="text-sm text-black"><strong>Representative:</strong> {location.representative}</p>
                                )}
                                {location.phone && (
                                    <p className="text-sm text-black"><strong>Phone:</strong> {location.phone}</p>
                                )}
                                {location.email && (
                                    <p className="text-sm text-black"><strong>Email:</strong> {location.email}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="min-h-screen  flex justify-center items-center relative">
                <div className="absolute right-0 bottom-0 w-full h-full">
                    <Image
                        src="/Contact.webp"
                        alt="Handshake"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg z-10 mt-20 mb-20 text-black">
                    <h2 className="text-2xl font-bold mb-2 ">Connect with us today</h2>
                    <p className="mb-6">Fill out the form below to get started</p>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <input name="name" onChange={handleChange} value={form.name} type="text" placeholder="Full name" className="w-full border px-4 py-2 rounded-md text-black" />
                        <input name="email" onChange={handleChange} value={form.email} type="email" placeholder="Email address" className="w-full border px-4 py-2 rounded-md" />
                        <input name="phone" onChange={handleChange} value={form.phone} type="tel" placeholder="Mobile Number" className="w-full border px-4 py-2 rounded-md" />

                        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select
                            id="category"
                            name="category"
                            onChange={handleChange}
                            value={form.category}
                            className="w-full border px-4 py-2 rounded-md"
                        >
                            <option value="">Select category</option>
                            <option value="support">Support</option>
                            <option value="sales">Sales</option>
                            <option value="feedback">Feedback</option>
                        </select>

                        <textarea name="message" onChange={handleChange} value={form.message} placeholder="How can we help you?" className="w-full border px-4 py-2 rounded-md h-24" />

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="receiveComm"
                                name="receiveComm"
                                checked={form.receiveComm}
                                onChange={handleChange}
                                title="Receive communications from Royal Nest"
                            />
                            <label htmlFor="receiveComm">I would like to receive communications from Royal Nest</label>
                        </div>

                        <div className="w-fit h-[78px]  flex items-center justify-center rounded-md">
                            <span className="text-sm text-gray-500">
                                <ReCAPTCHA
                                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
                                    ref={recaptchaRef}
                                    onChange={handleCaptchaSubmission}
                                    onExpired={() => setIsVerified(false)}
                                />
                            </span>
                        </div>
                        <button type="submit" className="bg-yellow-500 hover:bg-yellow-600 text-white w-full py-2 rounded-md font-medium">
                            Request a callback
                        </button>
                    </form>

                    <div className="mt-10">
                        <h3 className="text-lg font-semibold mb-4">Connect with us on Social</h3>
                        <div className="flex space-x-4">
                            <a href="https://www.instagram.com/ufirm_technologies/" target="_blank" rel="noopener noreferrer" title="Instagram">
                                <FaInstagram className="w-7 h-7 text-black hover:text-gray-600 transition-colors" />
                            </a>
                            <a href="https://www.linkedin.com/company/ufirm-technologies-pvt-ltd/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                                <FaLinkedin className="w-7 h-7 text-black hover:text-gray-600 transition-colors" />
                            </a>
                            <a href="https://www.youtube.com/@ufirmtechnologies6437" target="_blank" rel="noopener noreferrer" title="YouTube">
                                <FaYoutube className="w-7 h-7 text-black hover:text-gray-600 transition-colors" />
                            </a>
                            <a href="https://www.facebook.com/ufirmtechnologies" target="_blank" rel="noopener noreferrer" title="Facebook">
                                <FaFacebook className="w-7 h-7 text-black hover:text-gray-600 transition-colors" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}