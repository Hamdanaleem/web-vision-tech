"use client";

import Image from "next/image";

// Placeholder logos for Tech Stack (You can replace these with Client Logos later)
const logos = [
  { name: "React", url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Next.js", url: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "MongoDB", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
  { name: "Node.js", url: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg" },
  { name: "Python", url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg" },
  { name: "Docker", url: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg" },
  // Duplicate for seamless loop
  { name: "React", url: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" },
  { name: "Next.js", url: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_light_background.png" },
  { name: "AWS", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg" },
  { name: "MongoDB", url: "https://upload.wikimedia.org/wikipedia/commons/9/93/MongoDB_Logo.svg" },
];

export default function ClientTicker() {
  return (
    <section className="py-10 bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-6 text-center">
        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest">
          Powered by Modern Technologies
        </p>
      </div>

      {/* Infinite Scroll Container */}
      <div className="relative w-full flex overflow-hidden group">
        
        {/* First Loop */}
        <div className="flex space-x-16 animate-infinite-scroll whitespace-nowrap py-4">
          {logos.map((logo, index) => (
            <div key={index} className="relative w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-100 transform hover:scale-110">
              <Image
                src={logo.url}
                alt={logo.name}
                width={100}
                height={50}
                className="object-contain h-full w-auto"
              />
            </div>
          ))}
        </div>

        {/* Second Loop (Duplicate for seamless effect) */}
        <div className="flex space-x-16 animate-infinite-scroll whitespace-nowrap py-4 ml-16" aria-hidden="true">
          {logos.map((logo, index) => (
            <div key={index + "dup"} className="relative w-32 h-12 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-100 transform hover:scale-110">
              <Image
                src={logo.url}
                alt={logo.name}
                width={100}
                height={50}
                className="object-contain h-full w-auto"
              />
            </div>
          ))}
        </div>

      </div>

      {/* Define Custom Animation in Tailwind if not present */}
      <style jsx global>{`
        @keyframes infinite-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 25s linear infinite;
        }
        /* Pause on Hover */
        .group:hover .animate-infinite-scroll {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}