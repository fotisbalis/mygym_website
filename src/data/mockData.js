import { siteConfig } from '../config/site.js';

const image = (name) => new URL(`../../assets/images/${name}`, import.meta.url).href;

export const gymInfo = {
  ...siteConfig,
  facilityHighlights: ['Μηχανήματα και Ελεύθερα Βάρη για Ενδυνάμωση', 'Μηχανήματα για Αερόβια Άσκηση', 'Ομαδικά Προγράμματα'],
  hero: {
    image: { src: image('hero.webp'), mobileSrc: image('hero-mobile.webp'), alt: 'Ευρύχωρη αίθουσα γυμναστηρίου με βάρη και εξοπλισμό ενδυνάμωσης', width: 1800, height: 1200 },
  },
};

export const galleryImages = [
  { id: 'strength', src: image('hero.webp'), alt: 'Αίθουσα με ελεύθερα βάρη και πάγκους προπόνησης', title: 'Η δύναμη έχει τον χώρο της.', label: 'ΖΩΝΗ ΕΝΔΥΝΑΜΩΣΗΣ', width: 1800, height: 1200 },
  { id: 'weights', src: image('weights.webp'), alt: 'Αθλητής εκτελεί άσκηση ενδυνάμωσης με αλτήρα', title: 'Κάθε επανάληψη μετράει.', label: 'ΕΛΕΥΘΕΡΑ ΒΑΡΗ', width: 900, height: 1350 },
  { id: 'studio', src: image('studio.webp'), alt: 'Εξοπλισμένος χώρος γυμναστηρίου για καθημερινή άσκηση', title: 'Βρες τον δικό σου ρυθμό.', label: 'Ο ΧΩΡΟΣ ΠΡΟΠΟΝΗΣΗΣ', width: 900, height: 600 },
  { id: 'training', src: image('training.webp'), alt: 'Αθλητής εκτελεί άρση μπάρας στον χώρο προπόνησης', title: 'Πάντα ένα βήμα μπροστά.', label: 'ΛΕΙΤΟΥΡΓΙΚΗ ΠΡΟΠΟΝΗΣΗ', width: 900, height: 600 },
];

// Transcribed from the client-supplied video; see docs/schedule-source.md.
export const weeklySchedule = [
  { id: 'mon-trx', day: 'monday', name: 'TRX Functional', startTime: '09:00', endTime: '10:00' },
  { id: 'mon-pilates', day: 'monday', name: 'Pilates Mat', startTime: '18:00', endTime: '19:00' },
  { id: 'mon-tabata', day: 'monday', name: 'Tabata HIIT', startTime: '19:00', endTime: '20:00' },
  { id: 'tue-pilates', day: 'tuesday', name: 'Pilates Mat', startTime: '09:00', endTime: '10:00' },
  { id: 'tue-total-body', day: 'tuesday', name: 'Total Body', startTime: '19:00', endTime: '20:00' },
  { id: 'wed-yoga', day: 'wednesday', name: 'Yoga', startTime: '09:00', endTime: '10:00' },
  { id: 'wed-trx', day: 'wednesday', name: 'TRX Functional', startTime: '19:00', endTime: '20:00' },
  { id: 'thu-total-body', day: 'thursday', name: 'Total Body', startTime: '09:00', endTime: '10:00' },
  { id: 'thu-pilates', day: 'thursday', name: 'Pilates Mat', startTime: '19:00', endTime: '20:00' },
  { id: 'fri-total-body', day: 'friday', name: 'Total Body', startTime: '18:00', endTime: '19:00' },
  { id: 'fri-yoga', day: 'friday', name: 'Yoga', startTime: '19:00', endTime: '20:00' },
];

