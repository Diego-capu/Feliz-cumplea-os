export interface GameItem {
  id: string;
  title: string;
  tag: string;
  rarity: 'S-RANK';
  developer: string;
  releaseYear: string;
  quote: string;
  description: string;
  primaryColor: string;
  secondaryColor: string;
  discPalette: [string, string, string];
  coverImage: string;
  steamUrl: string;
}

export interface GachaConfig {
  friendName: string;
  birthdayTitle: string;
  birthdaySubtitle: string;
  pityCount: string;
  masterTapes: number;
  polychromes: number;
  crew: string[];
  // Si es null, elige al azar entre los 3. Si pones 0, 1 o 2, fuerza ese juego siempre como ganador.
  forcedWinnerIndex: number | null;
  games: GameItem[];
  belle: {
    name: string;
    origin: string;
    role: string;
    quote: string;
    image: string;
    badge: string;
    video: string;
  };
  proxyStats: {
    interKnotRank: number;
    fiftyFiftyWinRate: string;
    title: string;
  };
}

export const GACHA_CONFIG: GachaConfig = {
  friendName: 'Zopas',
  birthdayTitle: '¡Feliz Cumpleaños, Zopas!',
  birthdaySubtitle: 'Signal Search // Transmisión Exclusiva de Random Play - New Eridu',
  pityCount: '79/80 (S-Rank Dorado Garantizado)',
  masterTapes: 1,
  polychromes: 1600,
  crew: ['Diezos', 'Yaei', 'NightDark', 'Jhunrow', 'Zopas', 'Mich', 'Gabdiauva', 'Rango'],
  forcedWinnerIndex: null, // Cambia a 0, 1 o 2 si quieres fijar el ganador
  games: [
    {
      id: 'megabonk',
      title: 'Megabonk',
      tag: 'Roguelike / Acción / Bullet Heaven',
      rarity: 'S-RANK',
      developer: 'vedinad',
      releaseYear: '2025',
      quote: '¡Arrasa con oleadas infinitas de enemigos y vuélvete absurdamente poderoso!',
      description: 'Agarra loot, sube de nivel, desbloquea personajes y crea builds locas mientras te enfrentas a hordas de criaturas.',
      primaryColor: '#ec4899',
      secondaryColor: '#831843',
      discPalette: ['#ec4899', '#be185d', '#18181b'],
      coverImage: '/images/games/megabonk.jpg',
      steamUrl: 'https://store.steampowered.com/app/3405340/Megabonk/',
    },
    {
      id: 'dungeon-rampage',
      title: 'Dungeon Rampage Remastered',
      tag: 'Action RPG / Mazmorras / Clásico Coop',
      rarity: 'S-RANK',
      developer: 'Gamebreaking Studios',
      releaseYear: '2026',
      quote: '¡Ábrete camino a través de las mazmorras y pon fin al reinado de Lord Dinglepus!',
      description: 'El regreso del clásico de mazmorras para 1-4 jugadores. Juega como un dinámico elenco de héroes, obtén armas, botín y atraviesa furiosamente el desafío.',
      primaryColor: '#eab308',
      secondaryColor: '#713f12',
      discPalette: ['#eab308', '#ca8a04', '#1c1917'],
      coverImage: '/images/games/dungeon_rampage.jpg',
      steamUrl: 'https://store.steampowered.com/app/3053950/Dungeon_Rampage_Remastered/',
    },
    {
      id: 'mouthwashing',
      title: 'Mouthwashing',
      tag: 'Terror Psicológico / Retro Sci-Fi / Narrativa',
      rarity: 'S-RANK',
      developer: 'Wrong Organ',
      releaseYear: '2024',
      quote: 'Los cinco tripulantes han quedado varados en el vacío. El Señor no está con ellos.',
      description: 'Aclamada joya narrativa de terror psicológico en el espacio profundo. La tripulación de la Tulpar atrapada en un atardecer eterno.',
      primaryColor: '#06b6d4',
      secondaryColor: '#164e63',
      discPalette: ['#06b6d4', '#0891b2', '#0f172a'],
      coverImage: '/images/games/mouthwashing.jpg',
      steamUrl: 'https://store.steampowered.com/app/2475490/Mouthwashing/',
    },
  ],
  belle: {
    name: 'Belle',
    origin: 'Zenless Zone Zero // New Eridu',
    role: 'Manager de Random Play & Proxy Legendaria (Phaethon)',
    quote: '¡Ey, Zopas! ¡Feliz cumpleaños! En Random Play no regalamos cosas aburridas, y menos antes de que cambies de servidor rumbo a España. He cargado en el sistema un banner de sintonización exclusivo de cumpleaños con 3 juegazos en la ruleta. Tira al gacha de abajo y el juego que te salga... ¡es tuyo! Muchísima suerte en esta nueva aventura, proxy, ¡y que el RNG te acompañe para ganar todos los 50/50!',
    image: '/images/belle_chibi_icon.jpg',
    badge: 'Random Play Manager',
    video: '/videos/belle_animated.mp4',
  },
  proxyStats: {
    interKnotRank: 50,
    fiftyFiftyWinRate: '100% (Garantizado Hoy)',
    title: 'Proxy Legendario de New Eridu (Rango S)',
  },
};
