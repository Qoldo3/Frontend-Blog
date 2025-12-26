import { useState, useEffect } from 'react';
import Header from './components/Header';
import PostCard from './components/PostCard';
import Footer from './components/Footer';

const allPosts = [
  {
    id: 1,
    title: 'Getting Started with React and Vite in 2025',
    excerpt: 'A beginner-friendly guide to setting up a modern React app with Vite and Tailwind CSS.',
    date: 'December 26, 2025',
    tags: ['React', 'Vite', 'Tutorial'],
  },
  {
    id: 2,
    title: 'Why Tailwind CSS Changed How I Build UIs',
    excerpt: 'From skepticism to full adoption — my journey with utility-first CSS.',
    date: 'December 20, 2025',
    tags: ['Tailwind', 'CSS', 'Design'],
  },
  {
    id: 3,
    title: 'Building a Beautiful Blog Frontend from Scratch',
    excerpt: 'Step-by-step UI/UX decisions and component patterns for a clean blog layout.',
    date: 'December 15, 2025',
    tags: ['Frontend', 'UI/UX', 'Blog'],
  },
  {
    id: 4,
    title: 'Dark Mode: More Than Just a Trend',
    excerpt: 'How to implement seamless dark mode with Tailwind and React state.',
    date: 'December 10, 2025',
    tags: ['Accessibility'],
  },
  {
    id: 5,
    title: 'Responsive Design Tips for Modern Web Apps',
    excerpt: 'Best practices for mobile-first development in 2025.',
    date: 'December 5, 2025',
    tags: ['Responsive', 'Mobile'],
  },
  {
    id: 6,
    title: 'The Joy of Learning in Public',
    excerpt: 'Why sharing your learning journey helps you grow faster.',
    date: 'December 1, 2025',
    tags: ['Personal', 'Growth'],
  },
];

function App() {
  const [posts, setPosts] = useState(allPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Filter logic
  useEffect(() => {
    let filtered = allPosts;

    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedTag) {
      filtered = filtered.filter(post => post.tags.includes(selectedTag));
    }

    setPosts(filtered);
    setCurrentPage(1); // Reset to page 1 on filter
  }, [searchTerm, selectedTag]);

  // Pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  // Reading Progress Bar
  const [scrollProgress, setScrollProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 relative">
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <Header onSearch={setSearchTerm} />

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

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-1 order-2 lg:order-1">
            <div className="bg-white rounded-3xl shadow-lg p-8 sticky top-24 border border-gray-100">
              {/* Tag Filtering */}
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Tags</h3>
              <div className="flex flex-wrap gap-3 mb-10">
                {['React', 'Tailwind', 'Frontend', 'Personal', 'Tutorial', 'Design'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                      selectedTag === tag
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {tag} {selectedTag === tag && '(clear)'}
                  </button>
                ))}
              </div>

              {/* Newsletter */}
              <div className="mt-10 pt-8 border-t border-gray-200">
                <h4 className="font-bold text-gray-900 mb-4">Subscribe to Newsletter</h4>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert('Subscribed! (Demo)');
                  }}
                  className="space-y-4"
                >
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
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
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              {searchTerm || selectedTag ? 'Filtered Posts' : 'Latest Writing'}
            </h2>

            {currentPosts.length === 0 ? (
              <p className="text-center text-gray-500 py-20">No posts found.</p>
            ) : (
              <div className="grid gap-12 md:grid-cols-2">
                {currentPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-4 mt-16">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-5 py-3 rounded-xl font-medium transition ${
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

      <Footer />
    </div>
  );
}

export default App;