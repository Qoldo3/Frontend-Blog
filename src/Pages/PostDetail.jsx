import { useParams, Link } from 'react-router-dom';
import { allPosts } from '../data/posts'; // we'll create this

function PostDetail() {
  const { id } = useParams();
  const post = allPosts.find(p => p.id === parseInt(id));

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-32 text-center">
        <p className="text-2xl text-gray-600">Post not found.</p>
        <Link to="/" className="mt-6 inline-block text-indigo-600 hover:underline">← Back home</Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="inline-block mb-10 text-indigo-600 hover:underline text-lg">
        ← Back to all posts
      </Link>

      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>
        <time className="text-lg text-gray-500 uppercase tracking-wider">
          {post.date}
        </time>
        <div className="flex flex-wrap gap-3 mt-6">
          {post.tags.map(tag => (
            <span key={tag} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
              {tag}
            </span>
          ))}
        </div>
      </header>

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
        <p className="text-xl mb-8">
          {post.excerpt}
        </p>
        <p>
          Here is where the full post content would go. You can write multiple paragraphs, add code blocks, lists, quotes, etc.
        </p>
        <p className="mt-8">
          This is a beautiful single post view with generous spacing, large typography, and the same minimal aesthetic as the home page.
        </p>
        {/* Add more content later */}
      </div>

      <div className="mt-20 pt-12 border-t border-gray-200">
        <Link to="/" className="text-indigo-600 hover:underline text-lg">
          ← Back to all posts
        </Link>
      </div>
    </article>
  );
}

export default PostDetail;