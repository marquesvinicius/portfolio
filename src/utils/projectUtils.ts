import { Project } from '@/data/projects';

// Cores por categoria para consistência visual
export const categoryColors = {
  web: { primary: '#3B82F6', secondary: '#1E40AF' }, // Blue
  mobile: { primary: '#10B981', secondary: '#059669' }, // Green  
  desktop: { primary: '#F59E0B', secondary: '#D97706' }, // Amber
  game: { primary: '#EF4444', secondary: '#DC2626' }, // Red
  api: { primary: '#8B5CF6', secondary: '#7C3AED' }, // Purple
  podcast: { primary: '#F97316', secondary: '#EA580C' }, // Orange
  other: { primary: '#6B7280', secondary: '#4B5563' } // Gray
};

// Função para gerar placeholder com nossas cores do tema
export const generateProjectImage = (text: string, width: number = 400, height: number = 300) => {
  // Usando nossas cores do tema: #232B2B (fundo) e #F7F3E3 (texto)
  return `https://via.placeholder.com/${width}x${height}/232B2B/F7F3E3?text=${encodeURIComponent(text)}`;
};

// Função para gerar placeholder com cores da categoria
export const generateCategoryImage = (
  text: string, 
  category: Project['category'], 
  width: number = 400, 
  height: number = 300
) => {
  const colors = categoryColors[category];
  const bgColor = colors.primary.replace('#', '');
  const textColor = 'FFFFFF';
  
  return `https://via.placeholder.com/${width}x${height}/${bgColor}/${textColor}?text=${encodeURIComponent(text)}`;
};

// Template para criar novos projetos facilmente
export const createProject = (
  id: string,
  title: string,
  description: string,
  tech: string[],
  category: Project['category'],
  options: {
    longDescription?: string;
    status?: Project['status'];
    featured?: boolean;
    links?: Project['links'];
    date?: string;
    highlights?: string[];
    customImages?: {
      thumbnail?: string;
      gallery?: string[];
    };
  } = {}
): Project => {
  const {
    longDescription = description,
    status = 'completed',
    featured = false,
    links = {},
    date = new Date().toISOString().slice(0, 7), // YYYY-MM format
    highlights = [],
    customImages
  } = options;

  return {
    id,
    title,
    description,
    longDescription,
    tech,
    category,
    status,
    featured,
    images: customImages || {
      thumbnail: generateProjectImage(title),
      gallery: [
        generateProjectImage(`${title} - Screenshot 1`, 800, 600),
        generateProjectImage(`${title} - Screenshot 2`, 800, 600),
        generateProjectImage(`${title} - Screenshot 3`, 800, 600)
      ]
    },
    links,
    date,
    highlights,
    colors: categoryColors[category]
  };
};

// Função para validar estrutura do projeto
export const validateProject = (project: Project): string[] => {
  const errors: string[] = [];
  
  if (!project.id || project.id.trim() === '') {
    errors.push('ID é obrigatório');
  }
  
  if (!project.title || project.title.trim() === '') {
    errors.push('Título é obrigatório');
  }
  
  if (!project.description || project.description.trim() === '') {
    errors.push('Descrição é obrigatória');
  }
  
  if (!project.tech || project.tech.length === 0) {
    errors.push('Pelo menos uma tecnologia deve ser especificada');
  }
  
  if (!project.images.thumbnail) {
    errors.push('Imagem thumbnail é obrigatória');
  }
  
  return errors;
};

// Função para formatar data de exibição
export const formatProjectDate = (dateString: string): string => {
  const [year, month] = dateString.split('-');
  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];
  
  return `${monthNames[parseInt(month) - 1]} ${year}`;
};

// Função para gerar URL amigável
export const generateProjectSlug = (title: string): string => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
};

