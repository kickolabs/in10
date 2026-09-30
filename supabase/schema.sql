-- INTERN IN10 schema and sample seed.
-- Run in the Supabase SQL editor. Re-running policy statements is safe.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now()
);

create table if not exists public.destinations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  summary text not null,
  sectors text[] not null default '{}',
  language_note text not null,
  image_url text,
  sort_order int not null default 0
);

create table if not exists public.internships (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  industry text not null,
  destination text not null,
  destination_slug text not null,
  internship_type text not null,
  duration text not null,
  duration_group text not null,
  eligibility text not null,
  language_requirement text not null,
  language_group text not null,
  accommodation text,
  availability text not null default 'Open',
  summary text not null,
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users (id) on delete set null,
  full_name text not null,
  email text not null,
  mobile text not null,
  education text not null,
  resume_path text,
  created_at timestamptz not null default now()
);

alter table public.applications drop column if exists date_of_birth;
alter table public.applications drop column if exists current_location;
alter table public.applications drop column if exists specialization;
alter table public.applications drop column if exists preferred_industry;
alter table public.applications drop column if exists preferred_destination;
alter table public.applications drop column if exists preferred_duration;
alter table public.applications drop column if exists language_proficiency;
alter table public.applications drop column if exists ielts_status;
alter table public.applications drop column if exists message;

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.destinations enable row level security;
alter table public.internships enable row level security;
alter table public.applications enable row level security;
alter table public.contact_messages enable row level security;

drop policy if exists "destinations public read" on public.destinations;
create policy "destinations public read" on public.destinations for select using (true);

drop policy if exists "internships public read" on public.internships;
create policy "internships public read" on public.internships for select using (true);

drop policy if exists "profiles self read" on public.profiles;
create policy "profiles self read" on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles self update" on public.profiles;
create policy "profiles self update" on public.profiles for update using (auth.uid() = id);

drop policy if exists "applications own read" on public.applications;
create policy "applications own read" on public.applications
  for select using (auth.uid() is not null and auth.uid() = user_id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data->>'full_name', ''))
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;

drop policy if exists "users read own resumes" on storage.objects;
create policy "users read own resumes" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

insert into public.destinations (slug, name, summary, sectors, language_note, image_url, sort_order)
values
  ('france', 'France', 'Hospitality and selected healthcare pathways in a country where language preparation often shapes the experience.', array['Hospitality', 'Healthcare'], 'French may be relevant for many hosts. The level depends on the program.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80', 1),
  ('malaysia', 'Malaysia', 'A practical base for hotel, tourism and business internships, with English widely used in professional settings.', array['Hospitality', 'Tourism', 'International Business'], 'English is commonly sufficient. Other languages can be an advantage.', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80', 2),
  ('mauritius', 'Mauritius', 'Resort and tourism environments where guest service and operations experience come together.', array['Tourism', 'Hospitality'], 'English or French may be used, depending on the employer.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80', 3),
  ('singapore', 'Singapore', 'A compact international hub for hospitality and business internships in highly professional workplaces.', array['Hospitality', 'International Business'], 'English is the usual working language.', 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1600&q=80', 4),
  ('australia', 'Australia', 'Healthcare observation and professional placements where academic fit and English proficiency matter.', array['Healthcare', 'Other professional sectors'], 'English is required. Some institutions ask for a formal English result.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80', 5),
  ('new-zealand', 'New Zealand', 'Tourism and travel-desk roles shaped by outdoor hospitality and visitor services.', array['Tourism', 'Hospitality'], 'English is the usual working language.', 'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1600&q=80', 6),
  ('germany', 'Germany', 'Structured hotel and healthcare exposure. Language preparation is often part of getting ready.', array['Hospitality', 'Healthcare'], 'German preparation is commonly relevant. Requirements differ by institution.', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80', 7),
  ('europe', 'European Countries', 'A broader set of European openings beyond the featured countries. Each country has its own requirements.', array['Hospitality', 'International Business', 'Other professional sectors'], 'Language needs follow the destination. There is no single European rule.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80', 8),
  ('gulf', 'Gulf Countries', 'Hotel and guest-relations internships in a region known for large hospitality operations.', array['Hospitality', 'Tourism'], 'English is widely used in hotels. Arabic is not mandatory for every role.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80', 9)
on conflict (slug) do nothing;

insert into public.internships (
  title, industry, destination, destination_slug, internship_type, duration, duration_group,
  eligibility, language_requirement, language_group, accommodation, availability, summary, image_url
)
select * from (
  values
    ('Front Office Internship', 'Hospitality', 'France', 'france', 'Hotel operations', '6 months', '3–6 months', 'Students or recent graduates in hotel management or hospitality', 'Basic French is often helpful. Requirements vary by property.', 'French', 'Some properties arrange staff housing. Confirm during assessment.', 'Open', 'Guest arrival, reservations support and front-desk operations in a French hotel setting.', 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1600&q=80'),
    ('Food & Beverage Internship', 'Hospitality', 'Malaysia', 'malaysia', 'Food and beverage', '4–6 months', '3–6 months', 'Hospitality students with an interest in restaurant service', 'English is commonly used. Additional languages may help.', 'English', 'Accommodation support varies by employer.', 'Open', 'Restaurant and outlet service in hotels and hospitality groups across Malaysia.', 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=80'),
    ('Culinary Internship', 'Hospitality', 'Singapore', 'singapore', 'Kitchen', '6 months', '3–6 months', 'Culinary or hotel management students', 'English. Kitchen communication standards vary by outlet.', 'English', 'Not included by default. Ask during review.', 'Limited', 'Kitchen brigade exposure in a professional Singapore hospitality environment.', 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1600&q=80'),
    ('Guest Relations Internship', 'Hospitality', 'Gulf Countries', 'gulf', 'Guest experience', '6 months', '3–6 months', 'Hospitality students comfortable with guest-facing work', 'English is widely used. Arabic is not required for every role.', 'English', 'Staff accommodation may be available with selected employers.', 'Open', 'Guest communication and service support in hotels across Gulf destinations.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1600&q=80'),
    ('Hotel Operations Internship', 'Hospitality', 'Germany', 'germany', 'Hotel operations', '6 months', '3–6 months', 'Hotel management students ready for a structured training environment', 'German preparation is commonly relevant. Level depends on the property.', 'German', 'Some training hotels discuss housing during assessment.', 'Waitlist', 'Rotational hotel exposure with an emphasis on operations and guest service.', 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1600&q=80'),
    ('Clinical Support Internship', 'Healthcare', 'Germany', 'germany', 'Clinical observation and support', '3–6 months', '3–6 months', 'Healthcare or allied-health students meeting program prerequisites', 'German language preparation is often relevant for clinical settings.', 'German', 'Housing is not guaranteed. Options are discussed if a program offers them.', 'Open', 'Supervised exposure in healthcare settings, subject to institution rules.', 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1600&q=80'),
    ('Patient Care Observation', 'Healthcare', 'Australia', 'australia', 'Observation', '12 weeks', 'Up to 3 months', 'Enrolled healthcare students with required academic standing', 'English. An English test may apply for some institutions.', 'English', 'Candidates usually arrange their own stay.', 'Limited', 'Structured observation of patient-care workflows. Scope depends on the host.', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1600&q=80'),
    ('Community Health Internship', 'Healthcare', 'France', 'france', 'Community health', '4 months', '3–6 months', 'Public health, nursing or allied-health candidates', 'French may be required by the host. Confirm for each opening.', 'French', 'Not included unless stated for a specific opening.', 'Limited', 'Community and outpatient health exposure where a host institution is available.', 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80'),
    ('Tourism Operations Internship', 'Tourism', 'Mauritius', 'mauritius', 'Tourism operations', '3 months', 'Up to 3 months', 'Tourism, travel or hospitality students', 'English or French may be used, depending on the employer.', 'Varies', 'Some resort roles discuss staff housing separately.', 'Open', 'Guest activities, tours desk support and resort operations exposure.', 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1600&q=80'),
    ('Travel Desk Internship', 'Tourism', 'New Zealand', 'new-zealand', 'Travel services', '6 months', '3–6 months', 'Tourism or business students', 'English.', 'English', 'Candidates typically arrange accommodation.', 'Open', 'Itinerary support, guest enquiries and travel-desk coordination.', 'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1600&q=80'),
    ('International Business Internship', 'International Business', 'Singapore', 'singapore', 'Business support', '3–6 months', '3–6 months', 'Business, commerce or management students', 'English.', 'English', 'Not included.', 'Open', 'Commercial support, coordination and professional workplace exposure.', 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80'),
    ('Business Development Internship', 'International Business', 'Malaysia', 'malaysia', 'Commercial', '3 months', 'Up to 3 months', 'Business students with clear written English', 'English.', 'English', 'Not included.', 'Open', 'Research, outreach support and coordination for a commercial team.', 'https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1600&q=80'),
    ('Professional Services Internship', 'Other', 'European Countries', 'europe', 'Professional placement', '3–6 months', '3–6 months', 'Final-year students or recent graduates in a relevant field', 'Language needs depend on the country and host.', 'Varies', 'Rarely included. Discussed only when a host offers it.', 'Limited', 'Office-based internships outside the core hospitality and healthcare tracks.', 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1600&q=80'),
    ('Workplace Skills Internship', 'Other', 'Australia', 'australia', 'Professional training', '12 weeks', 'Up to 3 months', 'Candidates with a relevant course of study', 'English. Testing may apply for some hosts.', 'English', 'Not included.', 'Waitlist', 'Short professional placements where a host and profile match.', 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1600&q=80')
) as seed (
  title, industry, destination, destination_slug, internship_type, duration, duration_group,
  eligibility, language_requirement, language_group, accommodation, availability, summary, image_url
)
where not exists (select 1 from public.internships);
