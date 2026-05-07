import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Tag, Share2, ChevronLeft, Play } from 'lucide-react';
import { blogData } from '../../lib/blogData';
import { FloatingNavbar } from '../ui/FloatingNavbar';
import { Footer } from '../ui/Footer';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const post = blogData.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Post not found</h1>
        <Link to="/blog" className="text-google-green flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <FloatingNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-6 max-w-4xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-gray-500 hover:text-google-green transition-colors mb-8 text-sm group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-gray-500 mb-6 uppercase tracking-widest">
                <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {post.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> {post.readTime}</span>
                <span className="w-1 h-1 rounded-full bg-gray-700" />
                <span className={`px-2 py-0.5 rounded border border-white/10 ${post.type === 'vlog' ? 'text-red-400' : 'text-google-green'}`}>
                    {post.type.toUpperCase()}
                </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
              {post.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Feature Image / Video */}
      <section className="container mx-auto px-6 max-w-5xl mb-16">
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-video relative group"
        >
          {post.type === 'vlog' && post.videoUrl ? (
            <iframe 
              src={post.videoUrl} 
              title={post.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          ) : (
            <img 
                src={post.coverImage} 
                alt={post.title}
                className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </section>

      {/* Article Content */}
      <section className="container mx-auto px-6 max-w-3xl pb-32">
        <div className="prose prose-invert prose-google max-w-none">
          {/* We'll use a simple parser to render the content with basic styling */}
          <div className="space-y-6 text-gray-300 leading-relaxed text-lg">
            {post.content.split('\n\n').map((paragraph, i) => {
              if (paragraph.startsWith('# ')) {
                return <h2 key={i} className="text-3xl font-bold text-white mt-12 mb-6">{paragraph.replace('# ', '')}</h2>;
              }
              if (paragraph.startsWith('## ')) {
                return <h3 key={i} className="text-2xl font-bold text-white mt-8 mb-4">{paragraph.replace('## ', '')}</h3>;
              }
              if (paragraph.startsWith('### ')) {
                return <h4 key={i} className="text-xl font-bold text-white mt-6 mb-3">{paragraph.replace('### ', '')}</h4>;
              }
              if (paragraph.startsWith('- ')) {
                return (
                  <ul key={i} className="list-disc pl-6 space-y-2 text-gray-400">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j}>{item.replace('- ', '')}</li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('1. ') || paragraph.match(/^\d\. /)) {
                return (
                  <ol key={i} className="list-decimal pl-6 space-y-2 text-gray-400">
                    {paragraph.split('\n').map((item, j) => (
                      <li key={j}>{item.replace(/^\d\. /, '')}</li>
                    ))}
                  </ol>
                );
              }
              return <p key={i}>{paragraph}</p>;
            })}
          </div>
        </div>

        {/* Tags & Share */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <span key={tag} className="text-[10px] px-3 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400 uppercase tracking-wider">
                        #{tag}
                    </span>
                ))}
            </div>
            
            <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors">
                <Share2 className="w-4 h-4" /> Share Article
            </button>
        </div>

        {/* Related Posts */}
        <div className="mt-32">
            <h4 className="text-2xl font-bold mb-8">Related Readings</h4>
            <div className="grid md:grid-cols-2 gap-6">
                {blogData.filter(p => p.id !== post.id).slice(0, 2).map(p => (
                    <Link key={p.id} to={`/blog/${p.id}`} className="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-google-green/20 transition-all">
                        <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{p.date}</div>
                        <h5 className="text-lg font-bold group-hover:text-google-green transition-colors">{p.title}</h5>
                    </Link>
                ))}
            </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
