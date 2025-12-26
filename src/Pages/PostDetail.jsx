import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchPostById } from '../services/api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        const data = await fetchPostById(id);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError('Post not found or server error');
        setLoading(false);
      }
    };
    loadPost();
  }, [id]);

  if (loading) return <div className="text-center py-32 text-xl">Loading post...</div>;
  if (error || !post) return <div className="text-center py-32 text-red-600 text-xl">{error || 'Post not found'}</div>;

  return (
    <article className="max-w-4xl mx-auto px-6 py-20">
      <Link to="/" className="inline-block mb-10 text-indigo-600 hover:underline text-lg">
        ← Back to posts
      </Link>

      <header className="mb-16">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-8 leading-tight">
          {post.title}
        </h1>
        <time className="text-lg text-gray-500 uppercase tracking-wider block mb-6">
          {new Date(post.published_date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </time>
        {post.category && (
          <span className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
            {post.category.name}
          </span>
        )}
      </header>

      {post.image && (
        <img
          src={post.image}
          alt={post.title}
          className="w-full rounded-2xl mb-12 shadow-lg object-cover max-h-96"
        />
      )}

      <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-6">
        <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }} />
      </div>
    </article>
  );
}

export default PostDetail;