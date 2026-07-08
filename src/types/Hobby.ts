export type HobbyLink = {
  label: string;
  url: string;
  note?: string;
};

export type HobbyImage = {
  src: string;
  alt: string;
};

export type HobbyTopic = {
  id: string;
  emoji: string;
  title: string;
  summary: string;
  body_html: string;
  images: HobbyImage[];
  links: HobbyLink[];
};

export type HobbiesData = {
  section: {
    title: string;
    subtitle: string;
  };
  topics: HobbyTopic[];
};
