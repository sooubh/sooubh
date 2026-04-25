import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Code, Video, Search, Music, Image as ImageIcon, Layers, ArrowUpRight, ArrowRight } from 'lucide-react';

const features = [
  { 
    id: 1, 
    title: "AI Voice", 
    icon: <MessageSquare className="w-6 h-6 text-google-blue" />, 
    desc: "Real-time voice conversation with human-like responsiveness.",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?q=80&w=800&auto=format&fit=crop",
    gradient: "from-blue-500/20 to-purple-500/20",
    link: "#"
  },
  { 
    id: 2, 
    title: "Canvas", 
    icon: <Code className="w-6 h-6 text-google-red" />, 
    desc: "A dedicated workspace for writing and coding projects.",
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=800&auto=format&fit=crop",
    gradient: "from-red-500/20 to-orange-500/20",
    link: "#"
  },
  { 
    id: 3, 
    title: "Video (Veo)", 
    icon: <Video className="w-6 h-6 text-google-yellow" />, 
    desc: "Generate 1080p videos from simple text prompts.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800&auto=format&fit=crop",
    gradient: "from-yellow-500/20 to-green-500/20",
    link: "#"
  },
  { 
    id: 4, 
    title: "Deep Research", 
    icon: <Search className="w-6 h-6 text-google-green" />, 
    desc: "Synthesize answers from multiple credible sources.",
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=800&auto=format&fit=crop",
    gradient: "from-green-500/20 to-teal-500/20",
    link: "#"
  },
  { 
    id: 5, 
    title: "Audio Overview", 
    icon: <Music className="w-6 h-6 text-purple-400" />, 
    desc: "Turn documents into engaging podcast-style audio.",
    image: "https://images.unsplash.com/photo-1516280440614-6697288d5d38?q=80&w=800&auto=format&fit=crop",
    gradient: "from-purple-500/20 to-pink-500/20",
    link: "#"
  },
  { 
    id: 6, 
    title: "Imagen 4", 
    icon: <ImageIcon className="w-6 h-6 text-pink-400" />, 
    desc: "Photorealistic image generation with text rendering.",
    image: "https://images.unsplash.com/photo-1561557944-6e7860d1a7eb?q=80&w=800&auto=format&fit=crop",
    gradient: "from-pink-500/20 to-rose-500/20",
    link: "#"
  },
  { 
    id: 7, 
    title: "Gems", 
    icon: <Layers className="w-6 h-6 text-cyan-400" />, 
    desc: "Custom AI assistants for specific tasks.",
    image: "https://images.unsplash.com/photo-1614850523060-8da1d56e37ad?q=80&w=800&auto=format&fit=crop",
    gradient: "from-cyan-500/20 to-blue-500/20",
    link: "#"
  },
];

interface CardProps {
  feature: typeof features[0];
  index?: number;
  className?: string;
}

const Card: React.FC<CardProps> = ({ feature, index = 0, className = "" }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true, margin: "-50px" }}
      className={`group relative rounded-3xl overflow-hidden border border-white/10 bg-neutral-900/50 hover:border-google-blue/30 transition-all duration-300 flex flex-col justify-end ${className}`}
    >
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
           <img 
             src={feature.image} 
             alt={`${feature.title} - AI feature showcased by Sourabh Singh`}
             className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700"
             loading="lazy"
           />
           <div className={`absolute inset-0 bg-gradient-to-t ${feature.gradient} opacity-40 group-hover:opacity-60 transition-opacity duration-500 mix-blend-overlay`} />
           <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 md:p-8">
            <div className="flex items-center gap-3 mb-3">
               <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md text-white group-hover:bg-white/20 transition-colors">
                  {feature.icon}
               </div>
               <h3 className="text-2xl font-bold text-white leading-tight">{feature.title}</h3>
            </div>
            
            <p className="text-sm md:text-base text-gray-300 mb-5 line-clamp-3 opacity-90 group-hover:opacity-100 transition-opacity">
              {feature.desc}
            </p>

            <a 
              href={feature.link}
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full backdrop-blur-md transition-colors"
            >
              Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </a>
        </div>
    </motion.div>
  );
};

export const WhyDifferent: React.FC = () => {
  return (
    <section className="relative py-20 bg-transparent z-10">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
             <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white tracking-tighter">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-google-blue via-purple-500 to-google-red">AI Edge</span>
             </h2>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg font-light leading-relaxed"
          >
             A complete ecosystem for the new era of computing.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[300px] gap-4 md:gap-6">
           {features.map((feature, i) => {
             // Define Spans
             let spanClass = "col-span-1 row-span-1";
             if (i === 0) spanClass = "md:col-span-2 md:row-span-2"; // Live
             if (i === 1) spanClass = "md:col-span-2 md:row-span-1"; // Canvas
             if (i === 6) spanClass = "md:col-span-2 md:row-span-1"; // Gems (Last item)

             return (
               <Card key={feature.id} feature={feature} index={i} className={spanClass} />
             );
           })}
        </div>
      </div>
    </section>
  );
};
