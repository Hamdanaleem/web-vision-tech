import React from "react";
import { ShieldCheck, Target, Eye, Lock, FileSignature, AlertTriangle, Scale } from "lucide-react";
import "react-phone-number-input/style.css";

export default function PrivacyPage() {
  const sections = [
    {
      icon: <Eye className="w-12 h-12 text-vision-blue" />,
      id: "updates",
      title: "1. Policy Updates",
      summary: "If our practices change, we update this page. Major changes will be notified via email or homepage banner.",
      content: (
        <p>
          In the event of a change in our practices, a revised Privacy Policy will be posted to this Website, and the “Effective Date” will be changed. If the revised Privacy Policy contains a material change to how we collect or use personal information, notice of the change will be emailed to you or posted on the Website’s homepage. Your continued use of the Site after such changes constitutes acceptance.
        </p>
      ),
    },
    {
      icon: <FileSignature className="w-12 h-12 text-vision-blue" />,
      id: "collect",
      title: "2. Information We Collect",
      summary: "We collect two types of data: the data you directly provide (like contact forms) and technical data automatically logged (like IP addresses).",
      content: (
        <div className="space-y-4">
          <p>We are required by law, regulation, or security reasons to ask for certain personal information to provide our Services.</p>
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-vision-dark">A. Information You Provide</h3>
            <p className="text-sm">We collect the names and email addresses of users who contact us through our &quot;Contact Sales&quot; or &quot;Inquiry&quot; forms. This includes name, work email, company name, phone number, and product interest.</p>
          </div>
          <div className="bg-gray-50 border border-gray-100 p-6 rounded-2xl">
            <h3 className="font-bold text-lg mb-2 text-vision-dark">B. Information Collected Automatically</h3>
            <p className="text-sm">When visiting our Site, we also store access in a log file. This includes: computer or mobile device info, referring website, operating system, country, internet provider, Date/Time, and IP address of the accessing computer.</p>
          </div>
        </div>
      ),
    },
    {
      icon: <Target className="w-12 h-12 text-vision-blue" />,
      id: "use",
      title: "3. How & Why We Gather",
      summary: "We only collect data that helps us verify your identity, secure our Admin systems, communicate with you, and improve your user experience.",
      content: (
        <p>
          We use your personal information to transact business, communicate with you, verify your identity, and fulfill legal requirements. Technical logs are used strictly for administrative purposes and to assess the usage and performance of our online products, ensuring a stable and secure digital environment for WebVision and its users.
        </p>
      ),
    },
    {
      icon: <Scale className="w-12 h-12 text-vision-blue" />,
      id: "cookies",
      title: "4. Cookies and Security",
      summary: "Cookies remember your identity so you don’t have to re-input credentials. Essential for authentication and site security.",
      content: (
        <p>
          Cookies make it easier for you to navigate our Website by “remembering” your identity. This use of cookies for authentication (i.e., verifying that you are who you say you are) is an essential component of site security. While you can prevent cookies from being set, declining essential authentication-related cookies will prevent you from using the Website&apos;s protected areas.
        </p>
      ),
    },
    {
      icon: <Lock className="w-12 h-12 text-vision-blue" />,
      id: "security",
      title: "5. Information Security",
      summary: "We use commercially reasonable security standards and procedures to protect information about you.",
      content: (
        <p>
          Except as you may otherwise expressly approve, we will limit the collection and use of client information to what we believe would be useful to service your inquiries. We maintain customary security standards and procedures to protect your information and will respond quickly to your requests to correct inaccurate data.
        </p>
      ),
    },
    {
      icon: <AlertTriangle className="w-12 h-12 text-red-600" />,
      id: "children",
      title: "6. Children's Privacy",
      summary: "WebVision is not intended for use by individuals under eighteen (18) years of age.",
      content: (
        <p>
          No one under eighteen (18) years of age is allowed to use the website, provide any personal information or receive our email distributions. If you believe that a minor has disclosed Personally Identifiable Information to WebVision, please report this to us immediately.
        </p>
      ),
    },
  ];

  return (
    <main className="pt-32 pb-20 bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* TITAN HEADER */}
        <div className="text-center mb-16 border-b border-gray-100 pb-10">
          <h1 className="text-5xl md:text-6xl font-black text-vision-dark mb-4">
            Our <span className="text-vision-blue">Privacy</span>
          </h1>
          <p className="text-vision-dark text-lg font-medium opacity-70">
            Last Updated: April 16, 2026. A commitment to transparency, security, and trust.
          </p>
        </div>

        {/* HERO BLOCK */}
        <section className="bg-vision-dark text-white p-12 rounded-3xl shadow-2xl mb-16 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-24 h-24 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                <ShieldCheck size={48} />
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">
              The website (&quot;Site&quot;) for <strong>WebVision Technology</strong> (“WebVision”, “We”, “Our”, “Us” or “Company”) was created to provide high-performance software development services. By submitting information to WebVision, you signify acceptance of this Privacy Policy. Keeping client information secure and using it only as our users want us to are matters of principle for all of us at WebVision.
            </p>
          </div>
        </section>

        {/* INTERACTIVE SECTIONS */}
        <div className="space-y-12">
          {sections.map((section, index) => (
            <div key={section.id} className="grid grid-cols-1 md:grid-cols-[100px_1fr_300px] gap-8 border-b border-gray-100 pb-12">
              
              {/* ICON AREA */}
              <div className="flex items-center justify-center md:items-start md:pt-2">
                {section.icon}
              </div>

              {/* MAIN CONTENT AREA */}
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-vision-dark">{section.title}</h2>
                <div className="prose prose-lg text-gray-500 leading-relaxed font-light">
                  {section.content}
                </div>
              </div>

              {/* SUMMARY SIDEBAR */}
              <div className="bg-gray-50 border border-gray-100 p-8 rounded-2xl flex flex-col gap-3">
                <h4 className="text-sm font-bold text-vision-blue uppercase tracking-widest">In A Nutshell</h4>
                <p className="text-vision-dark font-medium leading-relaxed">{section.summary}</p>
                <div className="w-12 h-1 bg-vision-blue mt-2 rounded-full"></div>
              </div>

            </div>
          ))}
        </div>

        {/* FINAL RED CONTACT BOX */}
        <section className="mt-16 bg-red-600 text-white p-12 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-black mb-2">Have Concerns?</h2>
                <p className="text-red-100 opacity-90">If you believe we have infringed your rights, we encourage you to contact us informally first.</p>
            </div>
            <a href="mailto:privacy@webvision.tech" className="px-12 py-4 bg-white text-red-600 font-bold rounded-full text-lg shadow-lg hover:bg-gray-50 transition-colors">
                Contact our Privacy Officer
            </a>
        </section>

      </div>
    </main>
  );
}