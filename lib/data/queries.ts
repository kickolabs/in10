import { destinations as fallbackDestinations, type Destination } from "@/lib/data/content";
import { internships as fallbackInternships, type Internship } from "@/lib/data/internships";
import { photos } from "@/lib/data/photos";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

type InternshipRow = {
  id: string;
  title: string;
  industry: string;
  destination: string;
  destination_slug: string;
  internship_type: string;
  duration: string;
  duration_group: string;
  eligibility: string;
  language_requirement: string;
  language_group: string;
  accommodation: string | null;
  availability: Internship["availability"];
  summary: string;
  image_url: string | null;
};

type DestinationRow = {
  slug: string;
  name: string;
  summary: string;
  sectors: string[];
  language_note: string;
  image_url: string | null;
};

function mapInternship(row: InternshipRow): Internship {
  return {
    id: row.id,
    title: row.title,
    industry: row.industry,
    destination: row.destination,
    destinationSlug: row.destination_slug,
    type: row.internship_type,
    duration: row.duration,
    durationGroup: row.duration_group,
    eligibility: row.eligibility,
    language: row.language_requirement,
    languageGroup: row.language_group,
    accommodation: row.accommodation ?? "Confirm with the team for the specific opening.",
    availability: row.availability,
    summary: row.summary,
    image: row.image_url || photos.hotel,
  };
}

function mapDestination(row: DestinationRow): Destination {
  return {
    slug: row.slug,
    name: row.name,
    summary: row.summary,
    sectors: row.sectors ?? [],
    languageNote: row.language_note,
    image: row.image_url || photos.travel,
  };
}

export async function getInternships() {
  if (!isSupabaseConfigured()) return fallbackInternships;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("internships")
      .select("*")
      .order("title", { ascending: true });
    if (error || !data?.length) return fallbackInternships;
    return (data as InternshipRow[]).map(mapInternship);
  } catch {
    return fallbackInternships;
  }
}

export async function getDestinations() {
  if (!isSupabaseConfigured()) return fallbackDestinations;
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .order("sort_order", { ascending: true });
    if (error || !data?.length) return fallbackDestinations;
    return (data as DestinationRow[]).map(mapDestination);
  } catch {
    return fallbackDestinations;
  }
}

export type ApplicationRecord = {
  id: string;
  fullName: string;
  education: string;
  createdAt: string;
  resumeAttached: boolean;
};

export async function getMyApplications(): Promise<ApplicationRecord[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("applications")
    .select("id, full_name, education, created_at, resume_path")
    .order("created_at", { ascending: false });
  if (error || !data) return [];
  return data.map((row) => ({
    id: row.id as string,
    fullName: row.full_name as string,
    education: row.education as string,
    createdAt: row.created_at as string,
    resumeAttached: Boolean(row.resume_path),
  }));
}
