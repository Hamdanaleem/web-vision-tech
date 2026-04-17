"use client";

import { MapPin, Phone } from "lucide-react";

const offices = [
  {
    country: "USA",
    city: "Silicon Valley",
    address: "123 Tech Boulevard, Suite 500, San Jose, CA 95110",
    phone: "+1 (555) 012-3456",
    flag: "🇺🇸",
  },
  {
    country: "Pakistan",
    city: "Lahore",
    address: "Arfa Software Technology Park, Ferozepur Road, Lahore",
    phone: "+92 300 1234567",
    flag: "🇵🇰",
  },
  {
    country: "UK",
    city: "London",
    address: "71-75 Shelton Street, Covent Garden, London, WC2H 9JQ",
    phone: "+44 20 7946 0123",
    flag: "🇬🇧",
  },
];

export default function OfficeLocations() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-vision-dark mb-12">
          Office <span className="text-vision-blue">locations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offices.map((office, index) => (
            <div key={index} className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-xl transition-all duration-300 group">
              <div className="text-4xl mb-4">{office.flag}</div>
              <h3 className="text-xl font-bold text-vision-dark mb-2 group-hover:text-vision-blue transition-colors">
                {office.city}, {office.country}
              </h3>
              <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                {office.address}
              </p>
              <div className="flex items-center gap-2 text-vision-blue font-semibold">
                <Phone size={18} />
                <span>{office.phone}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}