import { gymInfo, galleryImages, weeklySchedule } from '../data/mockData.js';

// Async, serializable DTOs: no shared mutable state reaches a component.
export const mockContentService = {
  async getGymInfo() { return structuredClone(gymInfo); },
  async getGalleryImages() { return structuredClone(galleryImages); },
  async getWeeklySchedule() { return structuredClone(weeklySchedule); },
};
