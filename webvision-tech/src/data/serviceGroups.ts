import { servicesData } from "@/data/servicesData";

export type ServiceGroup = {
  heading: string;
  serviceIds: string[];
};

// Used by Navbar dropdown + Contact form select.
export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    heading: "Engineering",
    serviceIds: ["web-development", "mobile-development", "custom-software", "saas-development"],
  },
  {
    heading: "AI & Data",
    serviceIds: ["generative-ai", "data-analytics", "automation"],
  },
  {
    heading: "Cloud & Security",
    serviceIds: ["cloud-application", "cloud-ops", "devops", "cybersecurity"],
  },
  {
    heading: "Design",
    serviceIds: ["ui-ux-design", "design-dev", "gaming-art"],
  },
  {
    heading: "Gaming & XR",
    serviceIds: ["game-dev", "web3-gaming", "ar-vr-gaming"],
  },
  {
    heading: "Commerce & CRM",
    serviceIds: ["ecommerce", "salesforce"],
  },
  {
    heading: "Support",
    serviceIds: ["maintenance"],
  },
];

export function getServiceTitleById(id: string) {
  return servicesData.find((s) => s.id === id)?.title;
}

