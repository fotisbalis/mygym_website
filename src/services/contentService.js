import { mockContentService } from './mockContentService.js';

// Swap only this provider when a CMS adapter implements the documented contract.
const provider = mockContentService;
export const getGymInfo = () => provider.getGymInfo();
export const getGalleryImages = () => provider.getGalleryImages();
export const getWeeklySchedule = () => provider.getWeeklySchedule();
