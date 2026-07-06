import { ContentType } from "@prisma/client";

export const contentResourceTypes: Record<string, ContentType> = {
  news: "NEWS",
  announcements: "ANNOUNCEMENT",
  projects: "PROJECT",
  investment: "INVESTMENT",
  tourism: "TOURISM",
  settings: "SETTING",
};

export const standaloneResources = ["departments", "leaders", "gallery", "downloads"] as const;

export type StandaloneResource = (typeof standaloneResources)[number];

export function isStandaloneResource(resource: string): resource is StandaloneResource {
  return standaloneResources.includes(resource as StandaloneResource);
}

export function assertResource(resource: string) {
  if (!contentResourceTypes[resource] && !isStandaloneResource(resource)) {
    throw new Error(`Unsupported resource: ${resource}`);
  }
}
