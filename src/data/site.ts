export const site = {
  name: 'Outlook on the Desktop',
  shortName: 'OotD',
  description:
    'A Windows utility that pins Outlook calendars, inboxes, notes, tasks, and folders directly on your desktop.',
  url: 'https://outlookonthedesktop.com',
  publisherId: 'ca-pub-4655649020743247',
  latestVersion: '5.0.229',
  downloadUrl: 'https://github.com/mscrivo/OotD/releases/download/5.0.229/ootd-5.0.229.0.exe',
  releasesUrl: 'https://github.com/mscrivo/OotD/releases',
  sourceUrl: 'https://github.com/mscrivo/OotD',
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/download', label: 'Download' },
  { href: '/screenshots', label: 'Screenshots' },
  { href: '/faq', label: 'FAQ' },
  { href: '/release-notes', label: 'Release Notes' },
  { href: 'https://github.com/mscrivo/OotD', label: 'GitHub', icon: 'github' },
];

export const screenshots = [
  {
    src: '/assets/screenshots/MonthView.jpg',
    alt: 'Outlook on the Desktop month view displayed on the Windows desktop',
    title: 'Month view',
  },
  {
    src: '/assets/screenshots/WeekView.jpg',
    alt: 'Outlook on the Desktop week view',
    title: 'Week view',
  },
  {
    src: '/assets/screenshots/MultipleInstances.jpg',
    alt: 'Multiple Outlook on the Desktop instances running at once',
    title: 'Multiple instances',
  },
  {
    src: '/assets/screenshots/Instance-Management.jpg',
    alt: 'Instance management window in Outlook on the Desktop',
    title: 'Instance management',
  },
  {
    src: '/assets/screenshots/ControlBar_0.jpg',
    alt: 'Outlook on the Desktop control bar',
    title: 'Control bar',
  },
  {
    src: '/assets/screenshots/TrayMenu.jpg',
    alt: 'Outlook on the Desktop tray menu',
    title: 'Tray menu',
  },
];

export const faqs = [
  {
    question: 'Which versions of Windows does OotD run on?',
    answer:
      'The current 5.x releases target modern Windows versions and Outlook Classic. Older versions remain available from GitHub releases for legacy systems.',
  },
  {
    question: 'Does OotD work with the new Outlook?',
    answer:
      'No. OotD uses Outlook Classic integration and does not work with the new Outlook app Microsoft is rolling out.',
  },
  {
    question: 'How do I change positioning, sizing, opacity, or the visible folder?',
    answer:
      'Use the header and tray menu controls in each OotD instance. Recent releases also support multiple instances and virtual desktop assignment.',
  },
  {
    question: 'Can I view shared calendars in OotD?',
    answer:
      'Shared calendar support depends on what Outlook exposes through its classic controls. If it is not visible through the folder picker, OotD cannot host it directly.',
  },
  {
    question: 'OotD crashes on startup. What should I try?',
    answer:
      'Make sure Outlook Classic is installed, update to the latest OotD release, and check the GitHub issue tracker if the problem persists.',
  },
  {
    question: 'How do I uninstall Outlook on the Desktop?',
    answer:
      'Exit OotD from the tray icon first, then uninstall it from Windows Apps & Features.',
  },
];