export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tech: string[];
  category: 'web' | 'mobile' | 'desktop' | 'game' | 'api' | 'podcast' | 'other';
  status: 'completed' | 'in-progress' | 'archived';
  featured: boolean;
  images: {
    thumbnail: string;
    gallery?: string[];
  };
  links?: {
    demo?: string;
    repository?: string;
    video?: string;
    external?: string;
  };
  date: string;
  highlights?: string[];
  colors?: {
    primary: string;
    secondary: string;
  };
}

// Função para gerar URL de placeholder baseada na categoria e cores
const generatePlaceholderImage = (category: string, width: number = 400, height: number = 300, colors?: { primary: string; secondary: string }) => {
  const categoryColors = {
    web: { primary: '3B82F6', secondary: '1E40AF' }, // Blue
    mobile: { primary: '10B981', secondary: '059669' }, // Green  
    desktop: { primary: 'F59E0B', secondary: 'D97706' }, // Amber
    game: { primary: 'EF4444', secondary: 'DC2626' }, // Red
    api: { primary: '8B5CF6', secondary: '7C3AED' }, // Purple
    podcast: { primary: 'F97316', secondary: 'EA580C' }, // Orange
    other: { primary: '6B7280', secondary: '4B5563' } // Gray
  };
  
  const colorScheme = colors || categoryColors[category as keyof typeof categoryColors] || categoryColors.other;
  
  // Usando Unsplash com seeds baseadas no conteúdo para consistência
  return `https://images.unsplash.com/${width}x${height}?${category}&${colorScheme.primary}`;
};

// Função alternativa usando placeholder.com com cores customizadas
const generateColoredPlaceholder = (text: string, width: number = 400, height: number = 300, bgColor: string = '232B2B', textColor: string = 'F7F3E3') => {
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

export const projects: Project[] = [
  {
    id: 'grid-invaders',
    title: 'Grid Invaders',
    description: 'Jogo desenvolvido na linguagem C, utilizando a lib Allegro.',
    longDescription: 'Grid Invaders é um jogo de arcade inspirado no clássico Space Invaders, desenvolvido em C utilizando a biblioteca Allegro. O projeto implementa mecânicas de jogo tradicionais com gráficos 2D, sistema de pontuação e múltiplas fases de dificuldade crescente.',
    tech: ['C', 'Allegro', 'Game Development'],
    category: 'game',
    status: 'completed',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('Grid Invaders', 400, 300),
      gallery: [
        generateColoredPlaceholder('Gameplay 1', 800, 600),
        generateColoredPlaceholder('Gameplay 2', 800, 600),
        generateColoredPlaceholder('Game Over', 800, 600)
      ]
    },
    colors: {
      primary: '#EF4444',
      secondary: '#DC2626'
    },
    links: {
      repository: 'https://github.com/marquesvinicius/grid-invaders',
      video: 'https://youtube.com/watch?v=demo'
    },
    date: '2023-06',
    highlights: [
      'Implementação de física de colisão',
      'Sistema de pontuação e vidas',
      'Múltiplas fases com dificuldade crescente',
      'Trilha sonora e efeitos sonoros'
    ]
  },
  {
    id: 'controle-gastos',
    title: 'Controle de Gastos',
    description: 'Software para controle de gastos desenvolvido em Java.',
    longDescription: 'Aplicação desktop desenvolvida em Java para gerenciamento financeiro pessoal. O sistema permite cadastro de receitas e despesas, categorização de gastos, geração de relatórios e acompanhamento de metas financeiras.',
    tech: ['Java', 'Swing', 'SQLite', 'Desktop'],
    category: 'desktop',
    status: 'completed',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('Controle de Gastos', 400, 300),
      gallery: [
        generateColoredPlaceholder('Dashboard', 800, 600),
        generateColoredPlaceholder('Cadastro', 800, 600),
        generateColoredPlaceholder('Relatórios', 800, 600)
      ]
    },
    colors: {
      primary: '#F59E0B',
      secondary: '#D97706'
    },
    links: {
      repository: 'https://github.com/marquesvinicius/controle-gastos'
    },
    date: '2023-04',
    highlights: [
      'Interface intuitiva com Java Swing',
      'Banco de dados SQLite local',
      'Relatórios em PDF',
      'Sistema de categorias personalizáveis'
    ]
  },
  {
    id: 'controversa-podcast',
    title: 'Controversa Podcast',
    description: 'Podcast sobre tecnologia, games e assuntos diversos.',
    longDescription: 'Controversa é um podcast focado em discussões sobre tecnologia, desenvolvimento de software, games e tendências do mercado tech. Produzido e editado de forma independente, com episódios semanais e participações especiais.',
    tech: ['Podcast', 'Conteúdo', 'Edição de Áudio', 'Spotify'],
    category: 'podcast',
    status: 'in-progress',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('Controversa Podcast', 400, 300),
      gallery: [
        generateColoredPlaceholder('Cover Art', 800, 600),
        generateColoredPlaceholder('Estúdio', 800, 600),
        generateColoredPlaceholder('Episódio Especial', 800, 600)
      ]
    },
    colors: {
      primary: '#F97316',
      secondary: '#EA580C'
    },
    links: {
      external: 'https://open.spotify.com/show/controversa-podcast',
      demo: 'https://anchor.fm/controversa'
    },
    date: '2023-01',
    highlights: [
      'Mais de 50 episódios publicados',
      'Audiência crescente no Spotify',
      'Participações de desenvolvedores renomados',
      'Discussões sobre tendências tech'
    ]
  },
  {
    id: 'sistema-web-responsivo',
    title: 'Sistema Web Responsivo',
    description: 'Aplicação web moderna com design responsivo e interface intuitiva.',
    longDescription: 'Sistema web completo desenvolvido com tecnologias modernas, featuring design responsivo, interface intuitiva e performance otimizada. Inclui sistema de autenticação, dashboard interativo e módulos de gerenciamento.',
    tech: ['HTML5', 'CSS3', 'JavaScript', 'Bootstrap', 'Responsive Design'],
    category: 'web',
    status: 'completed',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('Sistema Web', 400, 300),
      gallery: [
        generateColoredPlaceholder('Desktop View', 800, 600),
        generateColoredPlaceholder('Mobile View', 800, 600),
        generateColoredPlaceholder('Tablet View', 800, 600)
      ]
    },
    colors: {
      primary: '#3B82F6',
      secondary: '#1E40AF'
    },
    links: {
      demo: 'https://sistema-web-demo.vercel.app',
      repository: 'https://github.com/marquesvinicius/sistema-web'
    },
    date: '2023-08',
    highlights: [
      'Design 100% responsivo',
      'Performance otimizada',
      'Acessibilidade (WCAG 2.1)',
      'Cross-browser compatibility'
    ]
  },
  {
    id: 'api-nodejs',
    title: 'API REST com Node.js',
    description: 'API robusta para gerenciamento de dados com autenticação JWT.',
    longDescription: 'API RESTful desenvolvida em Node.js com Express, implementando padrões de segurança modernos, autenticação JWT, validação de dados e documentação completa. Integrada com PostgreSQL e deploy automatizado.',
    tech: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'API REST'],
    category: 'api',
    status: 'completed',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('API Node.js', 400, 300),
      gallery: [
        generateColoredPlaceholder('Swagger Docs', 800, 600),
        generateColoredPlaceholder('Postman Tests', 800, 600),
        generateColoredPlaceholder('Database Schema', 800, 600)
      ]
    },
    colors: {
      primary: '#8B5CF6',
      secondary: '#7C3AED'
    },
    links: {
      repository: 'https://github.com/marquesvinicius/api-nodejs',
      demo: 'https://api-nodejs-docs.herokuapp.com'
    },
    date: '2023-09',
    highlights: [
      'Autenticação JWT segura',
      'Documentação Swagger/OpenAPI',
      'Testes automatizados com Jest',
      'Deploy CI/CD com GitHub Actions'
    ]
  },
  {
    id: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    description: 'Dashboard interativo para visualização de dados e métricas.',
    longDescription: 'Dashboard moderno para visualização de dados em tempo real, desenvolvido em React com integração de múltiplas APIs. Inclui gráficos interativos, filtros avançados e exportação de relatórios.',
    tech: ['React', 'TypeScript', 'Chart.js', 'Bootstrap', 'API Integration'],
    category: 'web',
    status: 'completed',
    featured: true,
    images: {
      thumbnail: generateColoredPlaceholder('Dashboard Analytics', 400, 300),
      gallery: [
        generateColoredPlaceholder('Overview', 800, 600),
        generateColoredPlaceholder('Charts', 800, 600),
        generateColoredPlaceholder('Filters', 800, 600)
      ]
    },
    colors: {
      primary: '#10B981',
      secondary: '#059669'
    },
    links: {
      demo: 'https://dashboard-analytics-demo.netlify.app',
      repository: 'https://github.com/marquesvinicius/dashboard-analytics'
    },
    date: '2023-10',
    highlights: [
      'Gráficos interativos com Chart.js',
      'Filtros dinâmicos e busca avançada',
      'Exportação de dados em PDF/Excel',
      'Atualização de dados em tempo real'
    ]
  }
];

// Função para buscar projetos em destaque
export const getFeaturedProjects = (): Project[] => {
  return projects.filter(project => project.featured);
};

// Função para buscar projeto por ID
export const getProjectById = (id: string): Project | undefined => {
  return projects.find(project => project.id === id);
};

// Função para buscar projetos por categoria
export const getProjectsByCategory = (category: Project['category']): Project[] => {
  return projects.filter(project => project.category === category);
};

// Função para buscar todos os projetos ordenados por data
export const getAllProjects = (): Project[] => {
  return projects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};
