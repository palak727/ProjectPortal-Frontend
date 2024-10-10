// types/Project.ts
export interface Skill {
  skill: string;
}

export interface Tag {
  tag: string;
}

export interface ResourceLink {
  link: string;
}

export interface Project {
  project_id: number;
  title: string;
  description: string;
  prof_id: string;
  domain: string;
  skills_required: Skill[];
  project_type: string;
  status: string;
  weekly_commitment: number;
  start_date: string;
  duration_in_days: number;
  vacancies: number;
  resource_links: ResourceLink[];
  created_at: string;
  updated_at: string;
  tags: Tag[];
}
