// The mock provider uses this single source of brand/contact configuration.
// A future CMS provider must return the same GymInfo contract.
export const siteConfig = {
  locale: 'el-GR',
  timeZone: 'Europe/Athens',
  name: 'MYGYM',
  tagline: 'FITNESS EXCELLENCE',
  logo: {
    src: new URL('../../assets/images/MYGYM_Logo.png?no-inline', import.meta.url).href,
    width: 1983,
    height: 482,
  },
  fullLogo: {
    src: new URL('../../assets/images/MYGYM_logo_with_FITNESS_EXCELLENCE.png?no-inline', import.meta.url).href,
    width: 1983,
    height: 793,
  },
  theme: { accent: '#509ff5', accentInk: '#03182b' },
  demo: true,
  contact: {
    address: 'Γεωργίου Πετρακογιώργη 45',
    city: 'Ηράκλειο, 713 05',
    phone: '+30 2810 319994',
    email: 'managermygym@gmail.com',
    phoneIcon: { src: new URL('../../assets/images/phone.png?no-inline', import.meta.url).href, width: 1209, height: 1135 },
    emailIcon: { src: new URL('../../assets/images/email.png?no-inline', import.meta.url).href, width: 1304, height: 912 },
    mapsUrl: 'https://www.google.com/maps?cid=3927267043597077548',
  },
  socials: [
    {
      id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/MyGym.her',
      icon: { src: new URL('../../assets/images/facebook.png?no-inline', import.meta.url).href, width: 1024, height: 1536 },
    },
  ],
  openingHours: [
    { label: 'Δευτέρα – Παρασκευή', hours: '09:00 – 22:00' },
    { label: 'Σάββατο', hours: '10:00 – 13:00\n17:00 – 21:00' },
    { label: 'Κυριακή', hours: 'Κλειστά' },
  ],
};
