import { photos } from "@/lib/data/photos";

export type Destination = {
  slug: string;
  name: string;
  summary: string;
  sectors: string[];
  languageNote: string;
  image: string;
};

export const destinations: Destination[] = [
  {
    slug: "france",
    name: "France",
    summary: "Hospitality and selected healthcare pathways in a country where language preparation often shapes the experience.",
    sectors: ["Hospitality", "Healthcare"],
    languageNote: "French may be relevant for many hosts. The level depends on the program.",
    image: photos.france,
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    summary: "A practical base for hotel, tourism and business internships, with English widely used in professional settings.",
    sectors: ["Hospitality", "Tourism", "International Business"],
    languageNote: "English is commonly sufficient. Other languages can be an advantage.",
    image: photos.malaysia,
  },
  {
    slug: "mauritius",
    name: "Mauritius",
    summary: "Resort and tourism environments where guest service and operations experience come together.",
    sectors: ["Tourism", "Hospitality"],
    languageNote: "English or French may be used, depending on the employer.",
    image: photos.mauritius,
  },
  {
    slug: "singapore",
    name: "Singapore",
    summary: "A compact international hub for hospitality and business internships in highly professional workplaces.",
    sectors: ["Hospitality", "International Business"],
    languageNote: "English is the usual working language.",
    image: photos.singapore,
  },
  {
    slug: "australia",
    name: "Australia",
    summary: "Healthcare observation and professional placements where academic fit and English proficiency matter.",
    sectors: ["Healthcare", "Other professional sectors"],
    languageNote: "English is required. Some institutions ask for a formal English result.",
    image: photos.australia,
  },
  {
    slug: "new-zealand",
    name: "New Zealand",
    summary: "Tourism and travel-desk roles shaped by outdoor hospitality and visitor services.",
    sectors: ["Tourism", "Hospitality"],
    languageNote: "English is the usual working language.",
    image: photos.newZealand,
  },
  {
    slug: "germany",
    name: "Germany",
    summary: "Structured hotel and healthcare exposure. Language preparation is often part of getting ready.",
    sectors: ["Hospitality", "Healthcare"],
    languageNote: "German preparation is commonly relevant. Requirements differ by institution.",
    image: photos.germany,
  },
  {
    slug: "europe",
    name: "European Countries",
    summary: "A broader set of European openings beyond the featured countries. Each country has its own requirements.",
    sectors: ["Hospitality", "International Business", "Other professional sectors"],
    languageNote: "Language needs follow the destination. There is no single European rule.",
    image: photos.europe,
  },
  {
    slug: "gulf",
    name: "Gulf Countries",
    summary: "Hotel and guest-relations internships in a region known for large hospitality operations.",
    sectors: ["Hospitality", "Tourism"],
    languageNote: "English is widely used in hotels. Arabic is not mandatory for every role.",
    image: photos.gulf,
  },
];

export const industries = [
  {
    slug: "hospitality",
    name: "Hotel Management & Hospitality",
    filter: "Hospitality",
    summary: "Front office, food and beverage, culinary and guest-relations internships in hotels and resorts.",
    examples: ["Front office", "Food & beverage", "Culinary", "Guest relations", "Housekeeping operations"],
    image: photos.lobby,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    summary: "Observation and support internships for students in nursing, allied health and related fields.",
    filter: "Healthcare",
    examples: ["Clinical observation", "Patient-care support", "Community health", "Allied health exposure"],
    image: photos.healthcare,
  },
  {
    slug: "tourism",
    name: "Tourism & Travel",
    summary: "Operations, tours and travel-desk internships connected to visitor experiences.",
    filter: "Tourism",
    examples: ["Tourism operations", "Travel desk", "Guest activities", "Resort coordination"],
    image: photos.travel,
  },
  {
    slug: "business",
    name: "International Business",
    summary: "Commercial and coordination internships for students building an international career base.",
    filter: "International Business",
    examples: ["Business support", "Commercial research", "Coordination", "Professional communication"],
    image: photos.office,
  },
  {
    slug: "other",
    name: "Other Professional Sectors",
    summary: "Additional industry-specific internships when a host, profile and destination align.",
    filter: "Other",
    examples: ["Professional services", "Workplace skills", "Sector-specific training"],
    image: photos.students,
  },
] as const;

export const steps = [
  {
    number: "01",
    title: "Explore",
    text: "Browse international internship opportunities by destination, industry and duration.",
  },
  {
    number: "02",
    title: "Choose",
    text: "Select a direction based on your studies, interests and eligibility.",
  },
  {
    number: "03",
    title: "Apply",
    text: "Submit your details, preferences and resume for review.",
  },
  {
    number: "04",
    title: "Assessment",
    text: "Our team reviews your profile against the requirements of relevant programs.",
  },
  {
    number: "05",
    title: "Preparation",
    text: "Receive guidance on documents, language preparation and program requirements.",
  },
  {
    number: "06",
    title: "Internship journey",
    text: "Continue with the applicable process and begin the international experience when confirmed.",
  },
] as const;

export const reasons = [
  {
    title: "Destinations with a real range",
    text: "France, Malaysia, Mauritius, Singapore, Australia, New Zealand, Germany, wider Europe and the Gulf — availability changes.",
  },
  {
    title: "Industries that match study paths",
    text: "Hospitality, healthcare, tourism, international business and other professional sectors.",
  },
  {
    title: "A clear six-step process",
    text: "From browsing openings to preparation, without promises of placement or visas.",
  },
  {
    title: "Language support nearby",
    text: "Lord of Languages prepares candidates when a destination or program calls for it.",
  },
  {
    title: "Travel arrangements, separately",
    text: "Fly Maverick helps with flights, stays and tours. It does not process visas.",
  },
  {
    title: "Straight requirements",
    text: "Eligibility, language and documents depend on the host, destination and current openings.",
  },
] as const;

export const languagePrograms = [
  {
    name: "German",
    text: "Language preparation often relevant for Germany and selected European pathways.",
  },
  {
    name: "English",
    text: "Professional and academic English for destinations where English is the working language.",
  },
  {
    name: "IELTS preparation",
    text: "Exam preparation where a host or institution asks for an English test result.",
  },
  {
    name: "Communication skills",
    text: "Spoken confidence for interviews, workplaces and guest-facing roles.",
  },
  {
    name: "Other languages",
    text: "Destination-specific training when a program requires another language.",
  },
] as const;

export const travelServices = [
  { name: "Flight ticket assistance", text: "Help comparing and arranging international flight tickets." },
  { name: "Hotel booking", text: "Stay recommendations and booking support for travel plans." },
  { name: "Room booking", text: "Room reservations aligned with travel dates and budgets." },
  { name: "Tour packages", text: "Structured tours for leisure travel connected to your plans." },
  { name: "Travel assistance", text: "Practical travel support before and during a trip." },
] as const;
