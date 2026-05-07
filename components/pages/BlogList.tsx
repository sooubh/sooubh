import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Clock, Tag, ArrowRight, Play, BookOpen, Search, Filter } from 'lucide-react';
import { blogData } from '../../lib/blogData';
import { FloatingNavbar } from '../ui/FloatingNavbar';
import { Footer } from '../ui/Footer';

export const BlogList: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'blog' | 'vlog'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = useMemo(() => {
    return blogData.filter(post => {
      const matchesFilter = filter === 'all' || post.type === filter;
      const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesFilter && matchesSearch;
    });
  }, [filter, searchQuery]);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <FloatingNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-google-green/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-green to-emerald-400 text-glow-green">Journal</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl leading-relaxed">
              Deep dives into AI, system architecture, and the journey of a Google Student Ambassador. 
              Exploring the intersection of code and community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-20 z-40 bg-[#050505]/80 backdrop-blur-md border-y border-white/5 py-4 mb-12">
        <div className="container mx-auto px-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            {(['all', 'blog', 'vlog'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                  filter === type 
                    ? 'bg-google-green text-black' 
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
            ))}
          </div>
          
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by title or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 pl-12 pr-6 focus:outline-none focus:border-google-green/50 transition-colors text-sm"
            />
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="container mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link to={`/blog/${post.id}`} className="group block h-full">
                  <div className="bg-white/5 border border-white/5 rounded-3xl overflow-hidden h-full flex flex-col hover:border-google-green/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(52,168,83,0.1)]">
                    {/* Image Container */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img 
                        src={post.coverImage} 
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60" />
                      
                      {/* Type Badge */}
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider">
                        {post.type === 'vlog' ? (
                          <><Play className="w-3 h-3 text-red-500" /> Vlog</>
                        ) : (
                          <><BookOpen className="w-3 h-3 text-google-green" /> Blog</>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow">
                      <div className="flex items-center gap-4 text-[10px] text-gray-500 mb-4 font-mono uppercase tracking-widest">
                        <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-google-green transition-colors leading-tight">
                        {post.title}
                      </h3>
                      
                      <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {post.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-[9px] px-2 py-0.5 rounded-md bg-white/5 text-gray-500 border border-white/5 uppercase tracking-tighter">
                            #{tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 text-sm font-bold text-google-green group-hover:gap-3 transition-all mt-auto">
                        {post.type === 'vlog' ? 'Watch Vlog' : 'Read Article'} 
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredPosts.length === 0 && (
          <div className="py-40 text-center">
            <div className="text-gray-600 mb-4 text-6xl opacity-20 flex justify-center"><Search className="w-20 h-20" /></div>
            <h3 className="text-xl font-bold text-gray-400">No results found</h3>
            <p className="text-gray-600 mt-2">Try adjusting your filters or search query</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};
