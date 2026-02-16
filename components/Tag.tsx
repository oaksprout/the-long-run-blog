import Link from 'next/link'
import { slug } from 'github-slugger'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="bg-primary-500/10 border-primary-500/20 text-primary-500 hover:bg-primary-500/20 mt-2 mr-3 rounded-sm border px-2 py-0.5 font-mono text-xs font-medium uppercase transition-colors"
    >
      {text.split(' ').join('-')}
    </Link>
  )
}

export default Tag
