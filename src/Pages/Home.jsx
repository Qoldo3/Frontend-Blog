import { useState, useEffect } from 'react';
import PostCard from '../components/PostCard';

const allPosts = [ /* same array as before, with id, title, excerpt, date, tags */ ];

function Home() {
  const [posts, setPosts] = useState(allPosts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  // Same filtering logic as before
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
    setCurrentPage(1);
  }, [searchTerm, selectedTag]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

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

      {/* Main Content - Same as before */}
      <main className="flex-grow max-w-7xl mx-auto px-6 py-16 w-full">
        {/* Grid with sidebar and posts - copy from previous App.jsx */}
        {/* Include tag filtering, newsletter, post grid, pagination */}
      </main>
    </>
  );
}

export default Home;