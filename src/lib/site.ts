// Dados compartilhados do site: navegação e contatos.

export const navigation = [
  { name: "Início", href: "/" },
  { name: "Sobre", href: "/sobre" },
  { name: "Projetos", href: "/projetos" },
  { name: "Blog", href: "/blog" },
];

export const contact = {
  email: "marquesviniciusmelomartins@gmail.com",
  github: "https://github.com/marquesvinicius",
  linkedin: "https://linkedin.com/in/marquesviniciusmelomartins/",
};

export const categoryLabels: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  game: "Jogo",
  api: "API",
  podcast: "Podcast",
  other: "Outros",
};

export const statusLabels: Record<string, string> = {
  completed: "Concluído",
  "in-progress": "Em progresso",
  archived: "Arquivado",
};
