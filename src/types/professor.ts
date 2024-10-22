export interface Professor {
  prof_id: number;
  username: string;
  password: string;
  title: string;
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  office_phone: string;
  department: string;
  office_location: string;
  research_area: string;
  bio: string;
  profile_picture_url: string;
  office_hours: string;
  website_url: string;
  research_domain: {
    primary: string;
    secondary: string[];
  };
  gender: string;
  status: string;
  created_at: string;
  updated_at: string;
}
