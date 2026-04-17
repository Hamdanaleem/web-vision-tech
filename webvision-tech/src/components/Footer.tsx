"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Twitter, Linkedin, Instagram, MapPin, CheckCircle2, Loader2 } from "lucide-react";
import { handleNewsletterSubscription } from "@/lib/actions/newsletter";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubscribe = async () => {
    setError(null);
    setIsPending(true);

    const result = await handleNewsletterSubscription(email);

    setIsPending(false);
    if (result.success) {
      setIsSubscribed(true);
      setEmail("");
    } else {
      setError(result.error ?? "Something went wrong.");
    }
  };

  return (
    <footer className="bg-vision-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-6">
        
        {/* TOP GRID: 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* COL 1: Brand & About */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold flex items-center gap-2">
              <span className="text-white">Web</span>
              <span className="text-vision-blue">Vision</span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are a global software engineering firm helping enterprise clients 
              scale their business through innovation and technology.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            </div>
          </div>

          {/* COL 2: Services */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-vision-blue pl-3">Services</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/services/web-development" className="hover:text-vision-blue transition-colors">Web Development</Link></li>
<li><Link href="/services/mobile-development" className="hover:text-vision-blue transition-colors">Mobile App Development</Link></li>
<li><Link href="/services/cloud-ops" className="hover:text-vision-blue transition-colors">Cloud & DevOps</Link></li>
<li><Link href="/services/generative-ai" className="hover:text-vision-blue transition-colors">AI & Machine Learning</Link></li>
<li><Link href="/services/ui-ux-design" className="hover:text-vision-blue transition-colors">UI/UX Design</Link></li>
            </ul>
          </div>

          {/* COL 3: Company */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-vision-purple pl-3">Company</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-vision-purple transition-colors">About Us</Link></li>
              {/* <li><Link href="/careers" className="hover:text-vision-purple transition-colors">Careers <span className="text-xs bg-vision-blue px-2 py-0.5 rounded text-white ml-2">Hiring</span></Link></li> */}
              {/* <li><Link href="/portfolio" className="hover:text-vision-purple transition-colors">Case Studies</Link></li> */}
              {/* <li><Link href="/blog" className="hover:text-vision-purple transition-colors">Tech Blog</Link></li> */}
              <li><Link href="/contact" className="hover:text-vision-purple transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* COL 4: Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-6 border-l-4 border-vision-red pl-3">Stay Updated</h3>
            <p className="text-gray-400 text-sm mb-4">
              Get the latest tech trends and company news.
            </p>

            {isSubscribed ? (
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <CheckCircle2 size={18} />
                <span>You're subscribed!</span>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                  className="bg-gray-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-vision-blue text-sm"
                />
                {error && (
                  <p className="text-red-400 text-xs">{error}</p>
                )}
                <button
                  onClick={handleSubscribe}
                  disabled={isPending || !email}
                  className="bg-vision-blue hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPending ? <><Loader2 size={16} className="animate-spin" /> Subscribing...</> : "Subscribe"}
                </button>
              </div>
            )}
          </div>

        </div>

        {/* DIVIDER */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} WebVision Technologies. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <MapPin size={16} className="text-vision-red" />
            <span>Lahore, Pakistan</span>
          </div>
        </div>

      </div>
    </footer>
  );
}