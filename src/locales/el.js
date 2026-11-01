// Interface copy lives here; editorial content belongs to the content service.
export const messages = {
  home: 'Αρχική', announcements: 'Νέα / Ανακοινώσεις', contact: 'Στοιχεία Επικοινωνίας',
  facilities: 'Χώρος', groupPrograms: 'Ομαδικά Προγράμματα',
  heroContact: 'Βρες μας / Επικοινώνησε μαζί μας',
  navigation: 'Κύρια πλοήγηση', menuOpen: 'Άνοιγμα μενού', menuClose: 'Κλείσιμο μενού',
  loading: 'Φόρτωση περιεχομένου…', error: 'Το περιεχόμενο δεν είναι διαθέσιμο αυτή τη στιγμή.', retry: 'Δοκίμασε ξανά',
  socialLabel: 'Ακολούθησέ μας', scroll: 'Κάνε το πρώτο βήμα',
  galleryEyebrow: 'Ο ΧΩΡΟΣ ΜΑΣ',
  galleryLabel: 'Φωτογραφίες γυμναστηρίου', galleryPrevious: 'Προηγούμενες φωτογραφίες', galleryNext: 'Επόμενες φωτογραφίες',
  galleryEmpty: 'Οι φωτογραφίες του χώρου μας θα είναι σύντομα διαθέσιμες.',
  scheduleEyebrow: 'ΟΜΑΔΙΚΑ ΠΡΟΓΡΑΜΜΑΤΑ', 
  weeklySchedule: 'Εβδομαδιαίο πρόγραμμα ομαδικών',
  noClasses: 'Δεν υπάρχουν ομαδικά.',
  instructor: 'Εκπαιδευτής', minutes: 'λεπτά', classCount: (count) => `${count} ${count === 1 ? 'μάθημα' : 'μαθήματα'}`,
  location: 'Τοποθεσία', hours: 'Ώρες λειτουργίας', contactLabel: 'Στοιχεία Επικοινωνίας', maps: 'Οδηγίες πρόσβασης',
  today: 'Σήμερα',
};
export const days = [
  { id: 'monday', label: 'Δευτέρα', short: 'Δευ', number: 1 },
  { id: 'tuesday', label: 'Τρίτη', short: 'Τρι', number: 2 },
  { id: 'wednesday', label: 'Τετάρτη', short: 'Τετ', number: 3 },
  { id: 'thursday', label: 'Πέμπτη', short: 'Πεμ', number: 4 },
  { id: 'friday', label: 'Παρασκευή', short: 'Παρ', number: 5 },
  { id: 'saturday', label: 'Σάββατο', short: 'Σαβ', number: 6 },
];
