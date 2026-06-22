export const site = {
  name: 'Outlook on the Desktop',
  shortName: 'OotD',
  description:
    'A Windows utility that pins Outlook calendars, inboxes, notes, tasks, and folders directly on your desktop.',
  url: 'https://outlookonthedesktop.com',
  publisherId: 'ca-pub-4655649020743247',
  latestVersion: '5.1.0',
  releaseDate: '2026-06-20',
  downloadUrl: 'https://github.com/mscrivo/OotD/releases/download/5.1.0/ootd-5.1.0.exe',
  releasesUrl: 'https://github.com/mscrivo/OotD/releases',
  sourceUrl: 'https://github.com/mscrivo/OotD',
  // Social-share card generated from the logo by scripts/generate-og-image.mjs.
  ogImage: '/assets/og-card.png',
  ogImageWidth: 1200,
  ogImageHeight: 630,
  themeColor: '#1f7a8c',
};

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/download', label: 'Download' },
  { href: '/screenshots', label: 'Screenshots' },
  { href: '/faq', label: 'FAQ' },
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

export const features = [
  {
    icon: 'check',
    title: 'Fully functional',
    description:
      'Places a fully functional Microsoft Outlook calendar directly on your desktop. Create, edit, and remove items just like you would in Outlook.',
  },
  {
    icon: 'pin',
    title: 'Pinned to your desktop',
    description: 'The calendar is pinned to your desktop so no windows can get stuck behind it.',
  },
  {
    icon: 'gear',
    title: 'Customizable',
    description: "The calendar's position, size, and opacity are all easily adjustable.",
  },
  {
    icon: 'monitor',
    title: 'HiDPI & multi-monitor support',
    description:
      'Full HiDPI and multi-monitor support lets you place instances across all of your screens.',
  },
  {
    icon: 'calendar',
    title: 'Tray icon with day of month',
    description:
      'A tray icon that shows the current day of the month gives you quick access to the app’s more advanced options.',
  },
  {
    icon: 'list',
    title: 'Use any Outlook view',
    description:
      'Switch between any Outlook view, including calendar, inbox, contacts, tasks, and notes.',
  },
];

export type FaqItem = {
  question: string;
  answer: string;
  answerHtml?: string;
};

export const faqs: FaqItem[] = [
  {
    question: 'Which versions of Windows does OotD run on?',
    answer:
      'The current 5.x releases target modern Windows versions and Outlook Classic. Older versions remain available from GitHub releases for legacy systems, and very old releases (3.1 and earlier) even supported Windows XP.',
  },
  {
    question: 'Does OotD work with the new Outlook?',
    answer:
      'No. OotD uses Outlook Classic integration and does not work with the new Outlook app Microsoft is rolling out.',
  },
  {
    question: 'How do I change positioning, sizing, opacity, or the visible folder?',
    answer:
      'Use the header and tray menu controls in each OotD instance. Right-click the tray icon to reach all of the configuration options. Recent releases also support multiple instances and virtual desktop assignment.',
  },
  {
    question: 'How do you get the month view to "stick" the next time OotD loads?',
    answer:
      'Set the view the way you want it, then exit OotD from the tray icon so the setting is saved before you launch it again. On older builds you may need to configure the calendar view in Outlook itself while OotD is closed, then reopen OotD.',
  },
  {
    question:
      'I use month view, but clicking a day switches it to day view. How do I get back to month view without closing OotD?',
    answer:
      'Right-click inside the OotD window, choose Go to Date, and pick Month view from the dropdown to switch back without restarting.',
  },
  {
    question: 'Can I view shared calendars in OotD?',
    answer:
      'Shared calendar support depends on what Outlook exposes through its classic controls. If it is not visible through the folder picker, OotD cannot host it directly.',
  },
  {
    question: 'Can I show the Outlook Today page in OotD?',
    answer:
      'No. Microsoft does not expose the Outlook Today page through the Outlook View Control that OotD relies on, so it cannot be hosted on the desktop.',
  },
  {
    question: 'OotD crashes on startup. What should I try?',
    answer:
      'Make sure Outlook Classic is installed and working, and update to the latest OotD release. Startup crashes are often caused by a damaged Office installation, so repairing or reinstalling Office (or using the Microsoft Office cleanup/repair tools) can help. Check the GitHub issue tracker if the problem persists.',
  },
  {
    question: 'When using OotD, an error pops up that says "Could not read the Calendar".',
    answer:
      'This usually points to a corrupted Outlook view or data file. Try running Outlook /cleanviews, and repair your OST/PST file if the error continues.',
  },
  {
    question: 'Why does OotD become unresponsive after I open an item and then close the window?',
    answer:
      'This stems from a change in how newer Outlook versions shut down their background session. Launching Outlook on its own before starting OotD generally avoids it.',
  },
  {
    question: "I'm using Outlook 2010 and I can't click the Calendar when using OotD.",
    answer:
      'This was a Microsoft bug in the original Outlook 2010 release. Installing Office 2010 SP1 (or a later update) resolves it.',
  },
  {
    question: 'Show Desktop in Windows Vista and Windows 7 hides OotD too. How can I fix this?',
    answer:
      'Use Windows Key + M to minimize your other windows instead of Show Desktop. Show Desktop minimizes OotD as well, and Windows no longer provides a built-in way to exclude it.',
  },
  {
    question: 'How do I uninstall Outlook on the Desktop?',
    answer:
      'Exit OotD from the tray icon first (right-click the icon and choose Exit), then uninstall it from Windows Apps & Features (or Add/Remove Programs on older Windows).',
  },
  {
    question: "I've found a bug. How do I contact the author?",
    answer:
      'Report it on the GitHub issue tracker — search the existing issues first, and open a new one with details if it has not already been reported.',
    answerHtml:
      'Report it on the <a href="https://github.com/mscrivo/OotD/issues">GitHub issue tracker</a> — search the existing issues first, and open a new one with details if it has not already been reported.',
  },
];
