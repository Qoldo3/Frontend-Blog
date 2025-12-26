function PostCard({ title, excerpt, date, tags = [] }) {
  return (
    <article className="group bg-white dark:bg-gray-900 rounded-3xl shadow-md hover:shadow-2xl transition-all duration-500 p-8 border border-gray-100 dark:border-gray-800">
      <time className="text-sm text-gray-500 dark:text-gray-500 mb-4 block tracking-wider uppercase">
        {date}
      </time>

      <h2 className="text-2xl md:text-3xl font-bold mb-5 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300 leading-tight">
        {title}
      </h2>

      <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed text-lg">
        {excerpt}
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-3 mb-8">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-indigo-100 dark:hover:bg-indigo-950/50 transition"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <a
        href="#"
        className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-semibold text-lg hover:underline group"
      >
        Read more
        <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </article>
  );
}

export default PostCard;