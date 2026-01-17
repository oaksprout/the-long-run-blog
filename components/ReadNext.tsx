import Link from './Link'

interface Post {
  title: string
  href: string
  summary: string
}

interface ReadNextProps {
  posts: Post[]
}

const ReadNext = ({ posts }: ReadNextProps) => {
  return (
    <div className="mt-10 border-t border-gray-200 pt-10 dark:border-gray-700">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
        Read Next
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.href}
            href={post.href}
            className="group hover:border-primary-500 dark:hover:border-primary-400 relative block h-full rounded-xl border border-gray-200 p-6 transition-all hover:shadow-md dark:border-gray-700"
          >
            <h3 className="group-hover:text-primary-500 dark:group-hover:text-primary-400 mb-2 text-lg font-bold text-gray-900 dark:text-gray-100">
              {post.title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.summary}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default ReadNext
