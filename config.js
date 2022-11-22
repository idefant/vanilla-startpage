const gap = 20;
const colWidth = 200;
const hotkeyLeader = ':';
const usePreCalculatedHeights = false;

// if `usePreCalculatedHeights` is true
const emptyCategoryHeight = 70.6;
const linkHeight = 27.4;

// if `usePreCalculatedHeights` is false
const delayBeforePlacingCategories = 30;

const categories = [
  {
    name: 'About_Project',
    links: [
      { name: 'Repo', url: 'https://github.com/idefant/vanilla-startpage' },
      { name: 'My_Github_Profile', url: 'https://github.com/idefant' },
      { name: 'My_Website', url: 'https://idefant.ru' },
    ],
  },
  {
    name: 'Social',
    links: [
      { name: 'Telegram', url: 'web.telegram.org/', hotkey: 'tg' },
      { name: 'Youtube', url: 'https://youtube.com/', hotkey: 'yt' },
      { name: 'Gmail', url: 'https://mail.google.com/', hotkey: 'gm' },
      { name: 'LinkedIn', url: 'linkedin.com', hotkey: 'li' },
      { name: 'WhatsApp', url: 'https://web.whatsapp.com/', hotkey: 'wa' },
    ],
  },
  {
    name: 'Code',
    links: [
      { name: 'BundlePhobia', url: 'https://bundlephobia.com/', hotkey: 'bp' },
      { name: 'CanInlude', url: 'https://caninclude.glitch.me/', hotkey: 'ci' },
      { name: 'CanIUse', url: 'https://caniuse.com/', hotkey: 'cu' },
      { name: 'NPM', url: 'https://www.npmjs.com/', hotkey: 'npm' },
      { name: 'Tailwind', url: 'https://tailwindcss.com/', hotkey: 'tw' },
      { name: 'Codewars', url: 'https://www.codewars.com', hotkey: 'cw' },
      { name: 'Colab', url: 'https://colab.research.google.com/' },
    ],
  },
  {
    name: 'Tools',
    links: [
      { name: 'Excalidraw', url: 'https://excalidraw.com', hotkey: 'ew' },
      { name: 'Pendulums', url: 'https://app.pendulums.io/dashboard', hotkey: 'pd' },
      { name: 'SnapDrop', url: 'https://snapdrop.net/', hotkey: 'sd' },
      { name: 'ShareDrop', url: 'https://www.sharedrop.io/' },
      { name: 'GDrive', url: 'https://drive.google.com/' },
    ],
  },
  {
    name: 'Selfhosted',
    links: [
      { name: 'Nextcloud', url: 'https://nextcloud.com/', hotkey: 'nc' },
      { name: 'AdGuard', url: 'https://adguard.com/en/adguard-home/overview.html' },
      { name: 'Traefik', url: 'https://traefik.io/' },
    ],
  },
  {
    name: 'Music',
    links: [
      { name: 'Music_For_Programming', url: 'https://musicforprogramming.net/', hotkey: 'mp' },
    ],
  },
];
