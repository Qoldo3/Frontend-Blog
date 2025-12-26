import { Link } from 'react-router-dom';

function PostCard({ post }) {
  // Safe snippet — handles missing or empty content
  const snippet = post.content
    ? post.content.substring(0, 150) + (post.content.length > 150 ? '...' : '')
    : 'No content available...';

  return (
    <article className="group bg-white rounded-3xl shadow-md hover:shadow-xl transition-all duration-500 p-10 border border-gray-100">
      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover rounded-2xl mb-8"
        />
      )}

      <time className="text-sm text-gray-500 uppercase tracking-wider mb-5 block">
        {new Date(post.published_date).toLocaleDateString()}
      </time>

      <h2 className="text-3xl font-bold text-gray-900 mb-6 group-hover:text-indigo-600 transition-colors leading-tight">
        {post.title || 'Untitled Post'}
      </h2>

      <p className="text-lg text-gray-600 mb-10 leading-relaxed">
        {snippet}
      </p>

      {post.category && (
        <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-8">
          {post.category.name}
        </span>
      )}

      <Link
        to={`/post/${post.id}`}
        className="inline-flex items-center text-indigo-600 font-semibold text-lg hover:underline group"
      >
        Read more
        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </article>
  );
}

export default PostCard;