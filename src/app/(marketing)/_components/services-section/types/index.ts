export type Service = {
  href: string;
  code: string;
  label: string;
  summary: string;
  photo: { src: string; alt: string };
};

export type FeaturedService = Omit<Service, "photo"> & {
  video: { src: string; poster: string };
};
