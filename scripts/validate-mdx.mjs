import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const BLOG_DIR = 'data/blog'
const AUTHORS_DIR = 'data/authors'
const IMAGES_DIR = 'public/static/images'

const getAuthors = () => {
  return fs
    .readdirSync(AUTHORS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace('.mdx', ''))
}

const validateMDX = () => {
  const authors = getAuthors()
  console.log(`Found authors: ${authors.join(', ')}`)

  const blogFiles = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'))
  let hasError = false

  blogFiles.forEach((file) => {
    const filePath = path.join(BLOG_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(content)

    // Validate authors
    if (data.authors) {
      data.authors.forEach((authorId) => {
        if (!authors.includes(authorId)) {
          console.error(`Error in ${file}: Author "${authorId}" not found in ${AUTHORS_DIR}`)
          hasError = true
        }
      })
    } else {
      console.error(`Error in ${file}: Missing authors field`)
      hasError = true
    }

    // Validate images
    if (data.images) {
      const images = Array.isArray(data.images) ? data.images : [data.images]
      images.forEach((image) => {
        if (typeof image === 'string' && image.startsWith('/static/images/')) {
          const imagePath = path.join('public', image)
          if (!fs.existsSync(imagePath)) {
            console.error(`Error in ${file}: Image "${image}" not found in public folder`)
            hasError = true
          }
        }
      })
    }

    // Validate title and date (required by contentlayer)
    if (!data.title) {
      console.error(`Error in ${file}: Missing title field`)
      hasError = true
    }
    if (!data.date) {
      console.error(`Error in ${file}: Missing date field`)
      hasError = true
    }
  })

  // Also validate authors files
  const authorFiles = fs.readdirSync(AUTHORS_DIR).filter((f) => f.endsWith('.mdx'))
  authorFiles.forEach((file) => {
    const filePath = path.join(AUTHORS_DIR, file)
    const content = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(content)

    if (!data.name) {
      console.error(`Error in author ${file}: Missing name field`)
      hasError = true
    }

    if (data.avatar && data.avatar.startsWith('/static/images/')) {
      const imagePath = path.join('public', data.avatar)
      if (!fs.existsSync(imagePath)) {
        console.error(`Error in author ${file}: Avatar "${data.avatar}" not found in public folder`)
        hasError = true
      }
    }
  })

  if (hasError) {
    console.error('MDX validation failed!')
    process.exit(1)
  } else {
    console.log('MDX validation successful!')
  }
}

validateMDX()
