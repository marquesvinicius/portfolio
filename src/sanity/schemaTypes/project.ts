import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Descrição Breve',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'longDescription',
      title: 'Descrição Detalhada',
      type: 'text',
      rows: 6
    }),
    defineField({
      name: 'tech',
      title: 'Tecnologias',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          {title: 'Web', value: 'web'},
          {title: 'Mobile', value: 'mobile'},
          {title: 'Desktop', value: 'desktop'},
          {title: 'Game', value: 'game'},
          {title: 'API', value: 'api'},
          {title: 'Podcast', value: 'podcast'},
          {title: 'Outros', value: 'other'},
        ],
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Concluído', value: 'completed'},
          {title: 'Em Desenvolvimento', value: 'in-progress'},
          {title: 'Arquivado', value: 'archived'},
        ],
      },
      initialValue: 'completed',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'featured',
      title: 'Projeto em Destaque',
      type: 'boolean',
      description: 'Aparece na página inicial',
      initialValue: false
    }),
    defineField({
      name: 'thumbnail',
      title: 'Imagem Principal',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'object',
      fields: [
        {
          name: 'demo',
          title: 'Demo/Live',
          type: 'url'
        },
        {
          name: 'repository',
          title: 'Repositório',
          type: 'url'
        },
        {
          name: 'video',
          title: 'Vídeo Demo',
          type: 'url'
        },
        {
          name: 'external',
          title: 'Link Externo',
          type: 'url'
        }
      ]
    }),
    defineField({
      name: 'highlights',
      title: 'Destaques',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Principais features ou conquistas'
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'thumbnail',
      category: 'category',
      status: 'status'
    },
    prepare(selection) {
      const {title, media, category, status} = selection
      return {
        title: title,
        subtitle: `${category} • ${status}`,
        media: media,
      }
    },
  },
})



