// ============================================================
// PROJECTS DATA FILE — SKETCHIZEL PORTFOLIO
// Visual-First Format: Artwork, concise bio, tags & ArtStation CTA
// ============================================================

export const categories = [
  {
    id: '3d',
    label: '3D Art',
    description: 'Built in Blender — stylized worlds, fan art, and character work.',
  },
  {
    id: 'digital',
    label: 'Digital Art',
    description: 'Digital paintings, character illustrations, and concept art.',
  },
  {
    id: 'traditional',
    label: 'Traditional',
    description: 'Charcoal sketches, acrylic paintings, and drawing studies.',
  },
  {
    id: 'graphic',
    label: 'Graphic Design',
    description: 'Visual communication, layouts, and typographic work.',
  },
]

export const projects = [
  {
    id: 'fishbones',
    title: 'FishBones — Arcane Fan Art',
    subtitle: 'Arcane Fan Art',
    categoryLabel: 'Hard Surface Fan Art',
    category: '3d',
    tags: ['Fan Art', 'Blender', 'Ucupaint', 'PureRef'],
    images: ['/images/Fishbones.png'],
    shortDesc: "Jinx's rocket launcher from Arcane, modeled in Blender and manually textured using Ucupaint. PureRef was used for references.",
    
    // ── ArtStation Link Configuration ─────────────────────────
    artstationUrl: 'https://aniketh_b.artstation.com/projects/WddWQJ',

    year: '2025',
    isFanArt: true,
    fanArtOf: 'Arcane: League of Legends (Riot Games)',
    tools: ['Blender', 'Ucupaint', 'PureRef'],
    palette: {
      accent: '#D4177A',
      bg: '#0D0A0F',
      highlight: '#5BCACA',
      text: '#F0EDE8',
    },
  },

  {
    id: 'village',
    title: 'Stylized Village Environment',
    subtitle: 'Stylized Environment',
    categoryLabel: '3D Environment Art',
    category: '3d',
    tags: ['Environment Art', 'Blender', 'Low Poly', 'Stylized'],
    images: ['/images/village.png'],
    shortDesc: 'A stylized village featuring two types of buildings, three types of trees, a watchtower, a well, a bridge, stones, grass, and rocky plateau/mountain formations. I arranged the environment myself and added elements beyond the reference.',
    
    // ── ArtStation Link Configuration ─────────────────────────
    artstationUrl: 'https://aniketh_b.artstation.com/projects/XaaZyw',

    year: '2025',
    isFanArt: false,
    tools: ['Blender'],
    palette: {
      accent: '#D4622A',
      bg: '#1A0E06',
      highlight: '#5E9E3A',
      text: '#F5E8D8',
    },
  },

  {
    id: 'cave-character',
    title: 'Rocky Plateau, Cave & Bizo Cat',
    subtitle: 'Character + Environment',
    categoryLabel: 'Character & Environment Art',
    category: '3d',
    tags: ['Character Art', 'Environment Art', 'Rigging', 'Blender'],
    images: ['/images/cave_character.png'],
    shortDesc: 'One combined project featuring a stylized rocky plateau and cave environment with the Bizo Cat character. The character has a custom rig and controls.',
    
    // ── ArtStation Link Configuration ─────────────────────────
    artstationUrl: 'https://aniketh_b.artstation.com/projects/411Znq',

    year: '2025',
    isFanArt: false,
    tools: ['Blender'],
    palette: {
      accent: '#D4882A',
      bg: '#080E1A',
      highlight: '#3A7ACC',
      text: '#EEF0F8',
    },
  },

  {
    id: 'snowy-town',
    title: 'Snowy Town — Low-Poly Winter Environment',
    subtitle: 'Winter Environment',
    categoryLabel: '3D Environment Art',
    category: '3d',
    tags: ['Environment Art', 'Blender', 'Low Poly', 'Lighting'],
    images: ['/images/snowy_town.png'],
    shortDesc: 'A low-poly winter scene centered around a building, inspired by a Polygon Runway beginner house tutorial.',
    
    // ── ArtStation Link Configuration ─────────────────────────
    artstationUrl: 'https://aniketh_b.artstation.com/projects/nddgW4',

    year: '2025',
    isFanArt: false,
    tools: ['Blender'],
    palette: {
      accent: '#C878A8',
      bg: '#0E0A18',
      highlight: '#8A9AE8',
      text: '#F5F0FA',
    },
  },

  {
    id: 'claptrap',
    title: 'Claptrap — Borderlands Fan Art',
    subtitle: 'Borderlands Fan Art',
    categoryLabel: 'Cel-Shaded Fan Art',
    category: '3d',
    tags: ['Fan Art', 'Blender', 'Grease Pencil', 'Procedural Textures'],
    images: ['/images/claptrap.png'],
    shortDesc: 'A 3D recreation of Claptrap modeled using a reference image, with Grease Pencil and noise-based texturing.',
    
    // ── ArtStation Link Configuration ─────────────────────────
    artstationUrl: 'https://aniketh_b.artstation.com/projects/vzzkNY',

    year: '2025',
    isFanArt: true,
    fanArtOf: 'Borderlands (Gearbox Software)',
    tools: ['Blender', 'Grease Pencil', 'Procedural Nodes'],
    palette: {
      accent: '#1B4D89',
      bg: '#0A1020',
      highlight: '#D4177A',
      text: '#F8F8F0',
    },
  },
]

// ============================================================
// SOCIAL LINKS
// ============================================================
export const socialLinks = {
  instagram: 'https://www.instagram.com/sketchizel/',
  artstation: 'https://aniketh_b.artstation.com/',
  linkedin: 'https://www.linkedin.com/in/aniketh-b-24b06332b/',
  behance: null,
  email: 'anikethsharma2146@gmail.com',
}

// ============================================================
// SITE CONFIG
// ============================================================
export const siteConfig = {
  name: 'Sketchizel',
  displayName: 'SKETCHIZEL',
  tagline: '3D Artist · Illustrator · Multidisciplinary Creative',
  bio: "I'm Aniketh — a multidisciplinary artist working across 3D modeling, environment art, digital illustration, traditional drawing, and graphic design. My long-term goal is to work in the animation industry. Everything I make is guided by a love of craft, storytelling, and pushing the visual boundaries of each medium.",
}
