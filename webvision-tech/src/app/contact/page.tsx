"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react"; // Added Loader2
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import OfficeLocations from "@/components/OfficeLocations";
import Newsletter from "@/components/NewsLetter";
import { handleContactSubmission } from "@/lib/actions/contact"; // Import your action
import { useSearchParams } from "next/navigation";
import { servicesData } from "@/data/servicesData";
import { SERVICE_GROUPS } from "@/data/serviceGroups";

export default function ContactPage() {
  const searchParams = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [emailNotice, setEmailNotice] = useState<string | null>(null);
  const [selectedInterest, setSelectedInterest] = useState<string>("");

  const groupedServices = useMemo(() => {
    return SERVICE_GROUPS.map((g) => ({
      heading: g.heading,
      services: g.serviceIds
        .map((id) => servicesData.find((s) => s.id === id))
        .filter(Boolean),
    })).filter((g) => g.services.length > 0);
  }, []);

  const effectiveInterest = useMemo(() => {
    if (selectedInterest) return selectedInterest;
    const fromQuery = searchParams.get("service");
    if (!fromQuery) return "";
    return servicesData.some((s) => s.id === fromQuery) ? fromQuery : "";
  }, [searchParams, selectedInterest]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);
    setEmailNotice(null);
    setIsPending(true);

    const formData = new FormData(e.currentTarget);
    const interestId = String(formData.get("interest") ?? "");
    const interestTitle =
      servicesData.find((s) => s.id === interestId)?.title || interestId;
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      company: formData.get("company"),
      country: formData.get("country"),
      interest: interestTitle,
      source: formData.get("source"),
      phone: phoneNumber || "Not provided",
    };

    const result = await handleContactSubmission(data);

    setIsPending(false);
    if (result.success) {
      setEmailNotice(result.emailSent ? null : result.emailNotice);
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      setSubmitError(
        result.error ??
          "We could not send your message. Please try again in a moment.",
      );
    }
  };

  return (
    <main className="pt-24 min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="bg-vision-dark text-white py-20 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="container mx-auto px-6 relative z-10">
          <h1 className="text-5xl font-bold mb-4">Connect with us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">
            Complete the form to schedule a demo or ask questions about the ways we can support your business goals.
          </p>
          <div className="mt-8">
            <button className="bg-vision-blue hover:bg-vision-purple px-8 py-3 rounded-full font-semibold transition-all shadow-lg">
              Start a project ↗
            </button>
          </div>
        </div>
      </section>

      {/* 2. CONTACT SALES FORM */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-5xl mx-auto bg-gray-50 rounded-3xl p-8 md:p-16 border border-gray-100 shadow-sm">
          <h2 className="text-3xl font-bold text-vision-dark mb-10">Contact Sales</h2>

          {isSubmitted ? (
            <div className="bg-white border border-green-200 rounded-2xl p-10 text-center shadow-inner animate-pulse">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-800">Inquiry Received</h3>
              <p className="text-gray-600 mt-2">Our sales team will contact you shortly.</p>
              {emailNotice ? (
                <p
                  className="mt-4 text-left text-sm text-amber-900 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3"
                  role="status"
                >
                  {emailNotice}
                </p>
              ) : null}
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setEmailNotice(null);
                }}
                className="mt-6 text-vision-blue font-bold hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {submitError ? (
                <p
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
                  role="alert"
                >
                  {submitError}
                </p>
              ) : null}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Names */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">First name <span className="text-red-500">*</span></label>
                  <input name="firstName" type="text" placeholder="Enter your first name" required className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Last name <span className="text-red-500">*</span></label>
                  <input name="lastName" type="text" placeholder="Enter your last name" required className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none transition-colors" />
                </div>

                {/* Email & Company */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Work email address <span className="text-red-500">*</span></label>
                  <input name="email" type="email" placeholder="Enter your work email address" required className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Company name <span className="text-red-500">*</span></label>
                  <input name="company" type="text" placeholder="Enter your company name" required className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none transition-colors" />
                </div>
              </div>

              {/* Country Selection */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Country <span className="text-red-500">*</span></label>
                <select name="country" required defaultValue="" className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none">
                  <option value="" disabled>Select a country</option>
                  <option value="US">United States</option>
                  <option value="PK">Pakistan</option>
                  <option value="UK">United Kingdom</option>
                  <option value="AE">United Arab Emirates</option>
                </select>
              </div>

              {/* Phone Number Input */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700">Phone number <span className="text-red-500">*</span></label>
                <div className="border-b border-gray-300 py-2 focus-within:border-vision-blue transition-colors">
                  <PhoneInput
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={setPhoneNumber}
                    defaultCountry="US"
                    international
                    className="bg-transparent outline-none"
                  />
                </div>
              </div>

              {/* Product Interest */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">Product/Service Interest <span className="text-red-500">*</span></label>
                  <select
                    name="interest"
                    required
                    value={effectiveInterest}
                    onChange={(e) => setSelectedInterest(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none"
                  >
                    <option value="" disabled>
                      Please select a service
                    </option>
                    {groupedServices.map((g) => (
                      <optgroup key={g.heading} label={g.heading}>
                        {g.services.map((s) => (
                          <option key={s!.id} value={s!.id}>
                            {s!.title}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">How did you hear about us? <span className="text-red-500">*</span></label>
                  <select name="source" required defaultValue="" className="w-full bg-transparent border-b border-gray-300 py-2 focus:border-vision-blue outline-none">
                    <option value="" disabled>Please Select</option>
                    <option value="Search Engine">Search Engine</option>
                    <option value="Peer Referral">Peer Referral</option>
                    <option value="Social Media">Social Media</option>
                  </select>
                </div>
              </div>

              {/* Consent */}
              <div className="flex items-start gap-3 py-4">
                <input type="checkbox" required className="mt-1 w-5 h-5 accent-vision-blue" />
                <p className="text-sm text-gray-500">
                  By ticking this box, you consent to allow <strong>WebVision</strong> to contact you about products, services, and offers that may be of interest to you.{" "}
                  <a href="/privacy" className="text-vision-blue underline">
                    Privacy policy
                  </a>
                  .
                </p>
              </div>

              <button 
                type="submit" 
                disabled={isPending}
                className="px-12 py-3 bg-vision-blue text-white font-bold rounded-lg hover:bg-vision-purple transition-all shadow-md flex items-center gap-3 disabled:opacity-50"
              >
                {isPending ? <><Loader2 className="animate-spin" size={18} /> Processing...</> : "Submit"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 3. OFFICE LOCATIONS SECTION */}
      <OfficeLocations />

      {/* 4. NEWSLETTER SECTION */}
      <Newsletter />
      
    </main>
  );
}