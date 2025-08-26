import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post do Blog',
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
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 4,
      description: 'Breve descrição que aparece nos cards e SEO'
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'blockContent',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Desenvolvimento', value: 'desenvolvimento'},
          {title: 'Tecnologia', value: 'tecnologia'},
          {title: 'Tutorial', value: 'tutorial'},
          {title: 'Carreira', value: 'carreira'},
          {title: 'Projetos', value: 'projetos'},
          {title: 'Pessoal', value: 'pessoal'},
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Nome',
          type: 'string',
          initialValue: 'Marques Vinícius'
        },
        {
          name: 'image',
          title: 'Foto',
          type: 'image',
          options: {
            hotspot: true,
          }
        }
      ]
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      publishedAt: 'publishedAt'
    },
    prepare(selection) {
      const {title, media, publishedAt} = selection
      const date = new Date(publishedAt).toLocaleDateString('pt-BR')
      return {
        title: title,
        subtitle: `Publicado em ${date}`,
        media: media,
      }
    },
  },
})



