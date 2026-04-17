import React from "react";
import { Gavel, Globe, ShieldAlert, Cpu, ScrollText, Ban, Mail } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      icon: <Globe className="w-10 h-10 text-vision-blue" />,
      title: "1. Acceptance of Terms",
      content: "By accessing or using the WebVision Technology site and our software development services, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site."
    },
    {
      icon: <Cpu className="w-10 h-10 text-vision-blue" />,
      title: "2. Scope of Services",
      content: "WebVision provides specialized software development, UI/UX design, and digital transformation services. While we strive for 100% uptime and bug-free delivery, all services are provided on an 'as-is' basis unless otherwise specified in a signed Master Service Agreement (MSA) between the Company and the Client."
    },
    {
      icon: <ShieldAlert className="w-10 h-10 text-vision-blue" />,
      title: "3. Intellectual Property",
      content: "The WebVision name, logo, and all original content (including our Portfolio and Admin software architecture) are the exclusive property of WebVision Technology. You may not reproduce, distribute, or create derivative works from our site content without express written permission."
    },
    {
      icon: <Ban className="w-10 h-10 text-red-600" />,
      title: "4. Prohibited Conduct",
      content: "Users are strictly prohibited from: (a) Attempting to reverse engineer or hack the Admin Dashboard; (b) Using our Site to transmit malicious code; (c) Misrepresenting your identity in contact forms; or (d) Scraping our Portfolio data for commercial use."
    },
    {
      icon: <ScrollText className="w-10 h-10 text-vision-blue" />,
      title: "5. Limitation of Liability",
      content: "In no event shall WebVision Technology or its affiliates be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use our digital Services, even if we have been notified of the possibility of such damage."
    },
    {
      icon: <Gavel className="w-10 h-10 text-vision-blue" />,
      title: "6. Governing Law",
      content: "These terms are governed by and construed in accordance with the laws of Pakistan. You irrevocably submit to the exclusive jurisdiction of the courts in Lahore for any disputes arising out of these terms."
    }
  ];

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-6xl">
        
        {/* HEADER SECTION */}
        <div className="mb-16 border-l-8 border-vision-blue pl-8">
          <h1 className="text-5xl font-black text-vision-dark mb-4 uppercase tracking-tighter">
            Terms of <span className="text-vision-blue">Service</span>
          </h1>
          <p className="text-gray-500 text-lg">Last Updated: April 16, 2026. Please read these terms carefully before engaging with our platform.</p>
        </div>

        {/* INTRO HERO */}
        <div className="bg-gray-50 rounded-3xl p-8 mb-16 border border-gray-100 flex items-start gap-6">
          <ShieldAlert className="text-vision-blue flex-shrink-0" size={32} />
          <p className="text-vision-dark leading-relaxed italic">
            "Engagement with WebVision signifies a partnership built on mutual respect and professional integrity. These terms ensure that both our developers and our clients are protected within a secure digital framework."
          </p>
        </div>

        {/* TERMS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {sections.map((section, idx) => (
            <div key={idx} className="group p-8 rounded-3xl border border-transparent hover:border-gray-100 hover:bg-white hover:shadow-xl transition-all duration-300">
              <div className="mb-6">{section.icon}</div>
              <h3 className="text-2xl font-bold text-vision-dark mb-4">{section.title}</h3>
              <p className="text-gray-500 leading-relaxed font-light">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* FOOTER CALL TO ACTION */}
        <section className="mt-20 p-12 bg-vision-dark rounded-[3rem] text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <ScrollText size={120} />
          </div>
          <h2 className="text-3xl font-bold mb-4 relative z-10">Questions regarding these terms?</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto relative z-10">
            If you have a specific project agreement, those terms will supersede these general website terms. For all other inquiries, contact our legal team.
          </p>
          <a 
            href="mailto:legal@webvision.tech" 
            className="inline-flex items-center gap-2 px-8 py-3 bg-vision-blue rounded-full font-bold hover:bg-blue-600 transition-all relative z-10"
          >
            <Mail size={18} />
            legal@webvision.tech
          </a>
        </section>

      </div>
    </main>
  );
}