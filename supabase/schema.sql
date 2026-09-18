-- Portfolio content schema for Supabase.
--
-- Run this once against a fresh Supabase project (SQL Editor, or
-- `supabase db push` / the apply_migration MCP tool) to create the
-- tables the site reads from, then edit rows directly in the Table
-- Editor going forward — that's the whole point.
--
-- Every table is public-read (anon key) only; content is edited via the
-- Supabase dashboard / authenticated access, never from the client.

create extension if not exists pgcrypto;

create table if not exists site_settings (
  id int primary key default 1,
  name text not null default 'YOUR NAME',
  role text[] not null default array['ENGINEERING','DATA','RESEARCH'],
  intro text not null default '',
  location text,
  email text,
  resume_url text,
  resume_file_name text default 'resume.pdf',
  resume_summary text,
  copyright_year int not null default extract(year from now())::int,
  updated_at timestamptz not null default now(),
  constraint site_settings_singleton check (id = 1)
);

create table if not exists about (
  id uuid primary key default gen_random_uuid(),
  headline text,
  description text[] not null default '{}',
  currently text[] not null default '{}',
  interests text[] not null default '{}',
  location text,
  profile_image text,
  is_active boolean not null default true,
  updated_at timestamptz not null default now()
);

create table if not exists education (
  id uuid primary key default gen_random_uuid(),
  institution text not null,
  degree text,
  start_year text,
  end_year text,
  description text,
  location text,
  interests text[] not null default '{}',
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  short_description text,
  description text,
  category text,
  year text,
  image_url text,
  video_url text,
  tools text[] not null default '{}',
  overview text,
  objective text,
  approach text,
  process text,
  outcome text,
  learnings text,
  external_url text,
  github_url text,
  sort_order int not null default 0,
  featured boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  group_name text not null,
  skill_name text not null,
  sort_order int not null default 0
);

create table if not exists social_links (
  id uuid primary key default gen_random_uuid(),
  platform text not null,
  label text not null,
  url text not null,
  sort_order int not null default 0
);

alter table site_settings enable row level security;
alter table about enable row level security;
alter table education enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table social_links enable row level security;

create policy "Public read site_settings" on site_settings for select using (true);
create policy "Public read about" on about for select using (true);
create policy "Public read education" on education for select using (true);
create policy "Public read projects" on projects for select using (true);
create policy "Public read skills" on skills for select using (true);
create policy "Public read social_links" on social_links for select using (true);

-- ---------------------------------------------------------------------
-- Optional starter content — the same generic placeholders the site
-- ships with. Delete this block (or just edit the rows afterwards) once
-- you're ready to replace it with your own.
-- ---------------------------------------------------------------------

insert into site_settings (id, name, role, intro, location, email, resume_url, resume_file_name, resume_summary, copyright_year)
values (
  1,
  'YOUR NAME',
  array['ENGINEERING','DATA','RESEARCH'],
  'Exploring the intersection of engineering, computation and ideas.',
  'Based somewhere / working everywhere',
  'hello@example.com',
  '/resume/resume.pdf',
  'resume.pdf',
  'A concise overview of my education, experience and work.',
  extract(year from now())::int
)
on conflict (id) do nothing;

insert into about (headline, description, currently, interests, is_active)
select
  'About me',
  array[
    'I work across engineering, data and research — moving between building things, studying how systems behave, and writing about what I find along the way.',
    'This site is a running archive of that work: a place to collect projects, notes and process rather than a fixed résumé.'
  ],
  array['Currently focused on a mix of applied engineering and computational work, with an ongoing interest in how research ideas turn into working systems.'],
  array['Systems thinking','Applied mathematics','Design of technical tools','Writing & documentation','Long-form reading'],
  true
where not exists (select 1 from about);

insert into education (institution, degree, start_year, end_year, location, description, interests, sort_order)
select * from (values
  ('INSTITUTION NAME','PROGRAM / DEGREE','2026','Present','City, Country','A short description of the program, focus areas or coursework relevant to the work shown on this site.', array['Applied computation','Systems design'], 0),
  ('INSTITUTION NAME','PROGRAM / DEGREE','2022','2026','City, Country','A short description of the program, focus areas or coursework relevant to the work shown on this site.', array['Mathematics','Research methods'], 1),
  ('INSTITUTION NAME','PROGRAM / DEGREE','2020','2022','City, Country','A short description of earlier study or foundation years.', array[]::text[], 2)
) as seed(institution, degree, start_year, end_year, location, description, interests, sort_order)
where not exists (select 1 from education);

insert into projects (slug, title, short_description, category, year, tools, overview, objective, approach, process, outcome, learnings, external_url, github_url, sort_order, featured)
select * from (values
  ('project-one','Project Title','A short project description covering the problem and the shape of the work.','Engineering','2026', array['CAD','Python','Simulation'],
   'A brief overview of what this project is, who it was for, and the context it sits in.',
   'The problem or question the project set out to address.',
   'The method or reasoning used to move from problem to solution.',
   'Notable steps, iterations or decisions made along the way.',
   'What was produced, delivered or learned by the end of the project.',
   'A short reflection on what the project taught, technically or otherwise.',
   null, 'https://github.com/', 0, true),
  ('project-two','Project Title','A short project description covering the problem and the shape of the work.','Data','2025', array['Python','SQL','Visualization'],
   'A brief overview of what this project is, who it was for, and the context it sits in.',
   'The problem or question the project set out to address.',
   'The method or reasoning used to move from problem to solution.',
   null,
   'What was produced, delivered or learned by the end of the project.',
   null,
   'https://example.com/', 'https://github.com/', 1, true),
  ('project-three','Project Title','A short project description covering the problem and the shape of the work.','Research','2025', array['LaTeX','R'],
   'A brief overview of what this project is, who it was for, and the context it sits in.',
   'The question the research aimed to explore.',
   null,
   'An outline of the research process and methodology used.',
   'A summary of findings or conclusions.',
   'A short reflection on what the project taught.',
   'https://example.com/', null, 2, true),
  ('project-four','Project Title','A short project description covering the problem and the shape of the work.','Software','2024', array['JavaScript','React','Node.js'],
   'A brief overview of what this project is, who it was for, and the context it sits in.',
   null,
   'The method or reasoning used to move from problem to solution.',
   'Notable steps, iterations or decisions made along the way.',
   'What was produced, delivered or learned by the end of the project.',
   null,
   'https://example.com/', null, 3, true),
  ('project-five','Project Title','A short project description covering the problem and the shape of the work.','Design','2024', array['Figma'],
   'A brief overview of what this project is, who it was for, and the context it sits in.',
   'The problem or question the project set out to address.',
   null, null,
   'What was produced, delivered or learned by the end of the project.',
   null,
   null, null, 4, false)
) as seed(slug, title, short_description, category, year, tools, overview, objective, approach, process, outcome, learnings, external_url, github_url, sort_order, featured)
where not exists (select 1 from projects);

insert into skills (group_name, skill_name, sort_order)
select * from (values
  ('Programming','Python',0),('Programming','C++',1),('Programming','JavaScript',2),('Programming','SQL',3),('Programming','R',4),
  ('Data','Data analysis',0),('Data','Statistics',1),('Data','Visualization',2),('Data','Pandas / NumPy',3),
  ('Engineering','Systems design',0),('Engineering','Prototyping',1),('Engineering','Simulation',2),('Engineering','CAD',3),
  ('Tools','Git',0),('Tools','Linux',1),('Tools','Figma',2),('Tools','LaTeX',3)
) as seed(group_name, skill_name, sort_order)
where not exists (select 1 from skills);

insert into social_links (platform, label, url, sort_order)
select * from (values
  ('github','GitHub','https://github.com/',0),
  ('linkedin','LinkedIn','https://linkedin.com/',1),
  ('email','Email','mailto:hello@example.com',2)
) as seed(platform, label, url, sort_order)
where not exists (select 1 from social_links);
