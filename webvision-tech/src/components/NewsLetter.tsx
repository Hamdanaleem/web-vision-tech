"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { handleNewsletterSubscription } from "@/lib/actions/newsletter";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    setIsPending(true);

    const result = await handleNewsletterSubscription(email);

    setIsPending(false);
    if (result.success) {
      setIsSubscribed(true);
      setEmail("");
    } else {
      setError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="relative bg-gradient-to-r from-vision-blue to-vision-purple rounded-3xl p-10 md:p-16 overflow-hidden shadow-2xl">

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="text-white max-w-xl text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to our newsletter to get the latest news
              </h2>
              <p className="text-blue-100">
                Stay updated with the latest in software engineering and enterprise solutions.
              </p>
            </div>

            <div className="w-full lg:w-auto flex flex-col gap-4">

              {isSubscribed ? (
                // Success State
                <div className="flex items-center gap-3 bg-white/20 text-white px-6 py-4 rounded-full">
                  <CheckCircle2 size={20} />
                  <span className="font-semibold">You're subscribed! Check your inbox.</span>
                </div>
              ) : (
                <>
                  {/* Error Message */}
                  {error && (
                    <p className="text-red-200 text-sm text-center bg-red-500/20 px-4 py-2 rounded-full">
                      {error}
                    </p>
                  )}

                  {/* Input + Button */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                      className="px-6 py-4 rounded-full w-full lg:w-80 outline-none text-vision-dark"
                    />
                    <button
                      onClick={handleSubmit}
                      disabled={isPending || !email}
                      className="px-10 py-4 bg-vision-dark text-white font-bold rounded-full hover:bg-white hover:text-vision-blue transition-all shadow-lg disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {isPending ? (
                        <><Loader2 className="animate-spin" size={18} /> Subscribing...</>
                      ) : (
                        "Subscribe"
                      )}
                    </button>
                  </div>
                </>
              )}

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}