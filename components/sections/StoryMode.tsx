import React from 'react';
import { motion } from 'framer-motion';
import { Mic, Terminal, Video, FileText, Check, Music, Image as ImageIcon, Briefcase } from 'lucide-react';

const SectionWrapper: React.FC<{ title: string; subtitle: string; children: React.ReactNode; className?: string }> = ({ title, subtitle, children, className = "" }) => (
  <div className={`min-h-screen flex flex-col justify-center px-6 py-20 border-b border-white/5 bg-black/40 backdrop-blur-md relative overflow-hidden ${className}`}>
    {/* Subtle gradient overlay to ensure text contrast while keeping transparency */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 pointer-events-none" />
    
    <div className="max-w-6xl mx-auto w-full relative z-10">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">{title}</h2>
        <p className="text-xl text-gray-300 max-w-2xl drop-shadow-md">{subtitle}</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </motion.div>
    </div>
  </div>
);

export const StoryMode: React.FC = () => {
  return (
    <div className="text-white">
      {/* SECTION 5: AI VOICE */}
      <SectionWrapper title="AI Voice" subtitle="Have natural conversations with AI. Interrupt, change topics, and brainstorm out loud.">
        <div className="grid md:grid-cols-2 gap-8 items-center">
           <div className="space-y-6">
              {[
                "Practice a new language",
                "Prepare for an interview",
                "Brainstorm project ideas",
                "Debug code via screen share"
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-black/60 border border-white/10 backdrop-blur-md"
                >
                  <div className="w-10 h-10 rounded-full bg-google-blue/20 flex items-center justify-center text-google-blue">
                    <Mic size={20} />
                  </div>
                  <span className="text-lg">{item}</span>
                </motion.div>
              ))}
           </div>
           <div className="relative aspect-square rounded-full bg-gradient-to-tr from-google-blue/20 to-google-red/20 flex items-center justify-center animate-pulse backdrop-blur-sm">
              <div className="w-1/2 h-1/2 rounded-full bg-white blur-3xl opacity-20 absolute" />
              <div className="text-center space-y-2 relative z-10">
                 <div className="flex gap-1 justify-center h-10 items-end">
                    {[1,2,3,4,5].map((bar) => (
                      <motion.div 
                        key={bar}
                        className="w-2 bg-white rounded-full"
                        animate={{ height: [10, 30, 15, 40, 10] }}
                        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", delay: bar * 0.1 }}
                      />
                    ))}
                 </div>
                 <p className="font-mono text-sm text-google-blue">Listening...</p>
              </div>
           </div>
        </div>
      </SectionWrapper>

      {/* SECTION 6: VIDEO GENERATION */}
      <SectionWrapper title="Video Generation" subtitle="Veo 3: Turn text into cinematic 1080p video.">
        <div className="bg-neutral-900/80 rounded-2xl overflow-hidden border border-white/10 p-1 backdrop-blur-md">
          <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-black/50">
             <div className="w-3 h-3 rounded-full bg-red-500" />
             <div className="w-3 h-3 rounded-full bg-yellow-500" />
             <div className="w-3 h-3 rounded-full bg-green-500" />
             <div className="ml-4 px-3 py-1 bg-white/10 rounded text-xs font-mono text-gray-400">Prompt</div>
          </div>
          <div className="p-8 grid md:grid-cols-2 gap-8">
             <div className="space-y-4">
                <p className="font-mono text-google-green text-sm mb-2">INPUT</p>
                <div className="text-2xl font-light leading-relaxed">
                   "Cinematic drone shot of a futuristic cyberpunk city at night, neon lights reflecting in rain puddles, high detail, 8k."
                </div>
                <div className="flex flex-wrap gap-2 mt-4">
                   {['Subject', 'Action', 'Camera', 'Style'].map(tag => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-400">{tag}</span>
                   ))}
                </div>
             </div>
             <div className="aspect-video bg-black rounded-lg border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 to-blue-900/50" />
                <Video className="w-12 h-12 text-white/50 relative z-10" />
                <div className="absolute bottom-4 left-4 text-xs font-mono text-white/70">GENERATING...</div>
                {/* Hover effect to simulate video */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity" />
             </div>
          </div>
        </div>
      </SectionWrapper>

      {/* SECTION 7: CANVAS */}
      <SectionWrapper title="Canvas" subtitle="Write and code with an intelligent sidebar assistant.">
         <div className="flex flex-col md:flex-row h-[500px] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md">
            <div className="flex-1 bg-neutral-900/80 p-8 font-serif text-lg text-gray-300 leading-relaxed border-r border-white/10">
               <h3 className="text-2xl font-bold text-white mb-6">The Future of AI in Education</h3>
               <p>Artificial intelligence is reshaping how students learn...</p>
               <motion.span 
                 initial={{ opacity: 0 }} 
                 whileInView={{ opacity: 1 }}
                 transition={{ repeat: Infinity, duration: 0.8 }}
                 className="inline-block w-2 h-5 bg-google-blue align-middle ml-1"
               />
            </div>
            <div className="w-full md:w-1/3 bg-black/80 p-6 border-l border-white/10">
               <div className="flex items-center gap-2 mb-6 text-google-blue">
                  <Terminal size={18} />
                  <span className="font-mono text-sm">AI Assistant</span>
               </div>
               <div className="bg-white/5 p-4 rounded-lg mb-4">
                  <p className="text-sm text-gray-300">I can help you expand on the ethical implications of AI in classrooms. Would you like some bullet points?</p>
               </div>
               <div className="bg-google-blue/10 border border-google-blue/20 p-4 rounded-lg">
                  <p className="text-sm text-google-blue">Sure, generate 3 key points.</p>
               </div>
            </div>
         </div>
      </SectionWrapper>

      {/* SECTION 8: DEEP RESEARCH */}
      <SectionWrapper title="Deep Research" subtitle="Tackle complex topics with multi-step reasoning.">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
             <div className="space-y-6">
                {[
                   { t: "Live Web Data", d: "Access real-time information" },
                   { t: "Multi-step Reasoning", d: "Breaks down complex queries" },
                   { t: "Source Citations", d: "Always know where data comes from" },
                   { t: "Data Synthesis", d: "Combines 10+ sources into one answer" }
                ].map((item, i) => (
                   <motion.div 
                     key={i}
                     initial={{ x: -50, opacity: 0 }}
                     whileInView={{ x: 0, opacity: 1 }}
                     transition={{ delay: i * 0.1 }}
                     className="flex items-start gap-4"
                   >
                      <div className="mt-1 w-6 h-6 rounded-full bg-google-green/20 flex items-center justify-center">
                         <Check size={14} className="text-google-green" />
                      </div>
                      <div>
                         <h4 className="font-bold text-lg">{item.t}</h4>
                         <p className="text-gray-400">{item.d}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
             <div className="relative">
                <div className="absolute inset-0 bg-google-green/5 blur-3xl rounded-full" />
                <div className="relative bg-neutral-900/80 border border-white/10 rounded-xl p-6 font-mono text-xs md:text-sm text-green-400/80 leading-loose backdrop-blur-md">
                   {`> Query: "Impact of quantum computing on cryptography"`}
                   <br/>
                   {`> Searching: IEEE Xplore, Nature, ScienceDirect...`}
                   <br/>
                   {`> Analyzing 14 papers...`}
                   <br/>
                   {`> Synthesizing report...`}
                   <br/>
                   <span className="text-white block mt-4 p-4 bg-white/5 rounded border-l-2 border-google-green">
                      Quantum computing poses a significant threat to RSA encryption. Post-quantum cryptography (PQC) standards are currently being finalized by NIST... [Source 1, 4]
                   </span>
                </div>
             </div>
         </div>
      </SectionWrapper>

      {/* SECTION 9: AUDIO OVERVIEW */}
      <SectionWrapper title="Audio Overview" subtitle="Turn any PDF or Doc into an engaging podcast.">
         <div className="flex justify-center items-center py-10">
            <div className="relative w-full max-w-md bg-white/5 rounded-3xl p-8 border border-white/10 flex flex-col items-center backdrop-blur-md">
               <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 mb-6 flex items-center justify-center shadow-lg shadow-orange-500/20">
                  <Music size={48} className="text-white" />
               </div>
               <h3 className="text-2xl font-bold mb-2">Lecture Notes.pdf</h3>
               <p className="text-gray-400 mb-8">Generated Audio Overview • 12:04</p>
               
               <div className="w-full flex items-center gap-4 mb-4">
                  <span className="text-xs text-gray-500">2:14</span>
                  <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                     <motion.div 
                       className="h-full bg-white"
                       animate={{ width: ["0%", "30%"] }}
                       transition={{ duration: 10, ease: "linear" }}
                     />
                  </div>
                  <span className="text-xs text-gray-500">12:04</span>
               </div>
               
               <div className="flex gap-2 items-center h-8">
                  {[...Array(20)].map((_, i) => (
                     <motion.div
                        key={i}
                        className="w-1 bg-google-red rounded-full"
                        animate={{ height: [10, 24, 8, 32, 12] }}
                        transition={{ 
                           duration: 0.6, 
                           repeat: Infinity, 
                           delay: i * 0.05,
                           repeatType: "mirror" 
                        }}
                     />
                  ))}
               </div>
            </div>
         </div>
      </SectionWrapper>

      {/* SECTION 10: GEMS */}
      <SectionWrapper title="Gems" subtitle="Expert personas customized for your specific needs.">
         <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
               { name: "Learning Coach", icon: <Briefcase />, color: "bg-blue-500" },
               { name: "Coding Partner", icon: <Terminal />, color: "bg-purple-500" },
               { name: "Creative Writing", icon: <FileText />, color: "bg-pink-500" },
               { name: "Career Guide", icon: <Check />, color: "bg-green-500" },
            ].map((gem, i) => (
               <motion.div 
                  key={i}
                  whileHover={{ y: -10 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center text-center group cursor-pointer backdrop-blur-md hover:bg-white/10 transition-colors"
               >
                  <div className={`w-16 h-16 rounded-2xl ${gem.color} mb-4 flex items-center justify-center text-white shadow-lg`}>
                     {gem.icon}
                  </div>
                  <h3 className="font-bold mb-1">{gem.name}</h3>
                  <p className="text-xs text-gray-500 group-hover:text-white transition-colors">Click to chat</p>
               </motion.div>
            ))}
         </div>
      </SectionWrapper>

      {/* SECTION 11: IMAGE GENERATION */}
      <SectionWrapper title="Imagen 4" subtitle="Create stunning visuals for presentations and projects.">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[400px]">
            {[
               "https://picsum.photos/400/600?random=1",
               "https://picsum.photos/400/600?random=2",
               "https://picsum.photos/400/600?random=3"
            ].map((img, i) => (
               <motion.div 
                  key={i}
                  className="relative rounded-2xl overflow-hidden h-full group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2 }}
               >
                  <img src={img} alt={`AI Generated Imagen 4 artwork example ${i + 1} - AI image generation feature`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                     <p className="text-sm text-white">"A futuristic cityscape with flying cars in the style of synthwave..."</p>
                  </div>
               </motion.div>
            ))}
         </div>
      </SectionWrapper>

      {/* SECTION 12: EXTENSIONS */}
      <SectionWrapper title="Extensions" subtitle="AI works where you work.">
         <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-80">
             {['Docs', 'Gmail', 'Drive', 'Maps', 'YouTube'].map((tool, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.2, color: "#4285F4" }}
                  className="flex flex-col items-center gap-2 cursor-pointer transition-colors"
                >
                   <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <span className="font-bold text-xl">{tool[0]}</span>
                   </div>
                   <span className="text-sm font-medium">{tool}</span>
                </motion.div>
             ))}
         </div>
         <div className="mt-12 text-center text-gray-500">
            <p>Connects seamlessly with your productivity workspace account.</p>
         </div>
      </SectionWrapper>
      
      {/* SECTION 13: PROMPT ENGINEERING */}
      <SectionWrapper title="Prompt Engineering" subtitle="Learn the language of AI.">
        <div className="bg-black/80 border border-gray-800 rounded-lg p-6 font-mono text-sm shadow-2xl backdrop-blur-md">
          <div className="flex gap-2 mb-4 border-b border-gray-800 pb-4">
             <div className="w-3 h-3 rounded-full bg-red-500"/>
             <div className="w-3 h-3 rounded-full bg-yellow-500"/>
             <div className="w-3 h-3 rounded-full bg-green-500"/>
          </div>
          <div className="space-y-4">
             <div className="text-gray-400"># Bad Prompt</div>
             <div className="text-red-400">"Write an essay about climate change."</div>
             
             <div className="text-gray-400 mt-6"># Good Prompt (CO-STAR Method)</div>
             <div className="text-green-400">
                <span className="text-purple-400">Context:</span> You are an environmental scientist.<br/>
                <span className="text-purple-400">Objective:</span> Write a 500-word essay on renewable energy.<br/>
                <span className="text-purple-400">Style:</span> Persuasive and data-driven.<br/>
                <span className="text-purple-400">Tone:</span> Optimistic.<br/>
                <span className="text-purple-400">Audience:</span> High school students.<br/>
                <span className="text-purple-400">Response:</span> Markdown format.
             </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};