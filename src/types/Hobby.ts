export type HobbyLink = {
  label: string;
  url: string;
  note?: string;
};

export type HobbyTopic = {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  body_html: string;
  links: HobbyLink[];
};

export type HobbiesData = {
  section: {
    title: string;
    subtitle: string;
  };
  topics: HobbyTopic[];
};
