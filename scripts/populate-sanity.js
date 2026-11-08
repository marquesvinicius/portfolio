const { createClient } = require('@sanity/client')

const client = createClient({
  projectId: '4fwzjmbg',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN, // Você vai precisar criar um token
  apiVersion: '2025-08-23'
})

const sampleProjects = [
  {
    _type: 'project',
    title: 'Grid Invaders',
    slug: { current: 'grid-invaders' },
    description: 'Jogo desenvolvido na linguagem C, utilizando a lib Allegro.',
    longDescription: 'Grid Invaders é um jogo de arcade inspirado no clássico Space Invaders, desenvolvido em C utilizando a biblioteca Allegro. O projeto implementa mecânicas de jogo tradicionais com gráficos 2D, sistema de pontuação e múltiplas fases de dificuldade crescente.',
    tech: ['C', 'Allegro', 'Game Development'],
    category: 'game',
    status: 'completed',
    featured: true,
    publishedAt: new Date('2023-06-01').toISOString(),
    highlights: [
      'Implementação de física de colisão',
      'Sistema de pontuação e vidas',
      'Múltiplas fases com dificuldade crescente',
      'Trilha sonora e efeitos sonoros'
    ],
    links: {
      repository: 'https://github.com/marquesvinicius/grid-invaders'
    }
  },
  {
    _type: 'project',
    title: 'Controle de Gastos',
    slug: { current: 'controle-gastos' },
    description: 'Software para controle de gastos desenvolvido em Java.',
    longDescription: 'Aplicação desktop desenvolvida em Java para gerenciamento financeiro pessoal. O sistema permite cadastro de receitas e despesas, categorização de gastos, geração de relatórios e acompanhamento de metas financeiras.',
    tech: ['Java', 'Swing', 'SQLite', 'Desktop'],
    category: 'desktop',
    status: 'completed',
    featured: true,
    publishedAt: new Date('2023-04-01').toISOString(),
    highlights: [
      'Interface intuitiva com Java Swing',
      'Banco de dados SQLite local',
      'Relatórios em PDF',
      'Sistema de categorias personalizáveis'
    ],
    links: {
      repository: 'https://github.com/marquesvinicius/controle-gastos'
    }
  },
  {
    _type: 'project',
    title: 'Controversa Podcast',
    slug: { current: 'controversa-podcast' },
    description: 'Podcast sobre tecnologia, games e assuntos diversos.',
    longDescription: 'Controversa é um podcast focado em discussões sobre tecnologia, desenvolvimento de software, games e tendências do mercado tech. Produzido e editado de forma independente, com episódios semanais e participações especiais.',
    tech: ['Podcast', 'Conteúdo', 'Edição de Áudio', 'Spotify'],
    category: 'podcast',
    status: 'in-progress',
    featured: true,
    publishedAt: new Date('2023-01-01').toISOString(),
    highlights: [
      'Mais de 50 episódios publicados',
      'Audiência crescente no Spotify',
      'Participações de desenvolvedores renomados',
      'Discussões sobre tendências tech'
    ],
    links: {
      external: 'https://open.spotify.com/show/controversa-podcast'
    }
  }
]

async function populateData() {
  try {
    console.log('Criando projetos no Sanity...')
    
    for (const project of sampleProjects) {
      const result = await client.create(project)
      console.log(`✅ Projeto criado: ${result.title}`)
    }
    
    console.log('🎉 Todos os projetos foram criados com sucesso!')
  } catch (error) {
    console.error('❌ Erro ao criar projetos:', error)
  }
}

populateData()




