import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';
import { fetchPosts } from '../services/api';

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load posts. Is your backend running?');
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

// Safe filtering — prevents any crash
const filteredPosts = Array.isArray(posts) 
  ? posts.filter(post => {
      // Safe search in title and content
      const matchesSearch = 
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()));

      // Safe category match
      const matchesCategory = !selectedCategory || 
        (post.category && post.category.name === selectedCategory);

      return matchesSearch && matchesCategory;
    })
  : [];

  // Pagination
const indexOfLast = currentPage * postsPerPage;
const indexOfFirst = indexOfLast - postsPerPage;
const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);
const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  // Unique categories
  const categories = [...new Set(posts.map(p => p.category?.name).filter(Boolean))];

  if (loading) {
    return <div className="text-center py-32 text-xl text-gray-600">Loading posts...</div>;
  }

  if (error) {
    return <div className="text-center py-32 text-red-600 text-xl">{error}</div>;
  }

  return (
    <>
      {/* Hero */}
      <section className="py-32 px-6 text-center bg-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            MyBlog
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Simple, honest writing about learning React, design systems, and the joy of building.
          </p>
        </div>
      </section>

      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Categories</h3>
              <div className="flex flex-wrap gap-3 mb-10">
                {categories.length > 0 ? (
                  categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                        selectedCategory === cat
                          ? 'bg-indigo-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))
                ) : (
                  <p className="text-gray-500">No categories yet</p>
                )}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Subscribe</h4>
                <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed!'); }}>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <button className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </aside>

          {/* Posts */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">Latest Posts</h2>

            {currentPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-20 text-xl">No posts found.</p>
            ) : (
              <div className="grid gap-12 md:grid-cols-2">
                {currentPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-16">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-6 py-3 rounded-xl font-medium transition ${
                      currentPage === i + 1
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;