import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import {
  Menu, X, ChevronRight, Play, Lock, CheckCircle, FileText, Download,
  LayoutDashboard, BookOpen, User, Settings, LogOut, Phone, Mail, MapPin,
  ShieldCheck, BrainCircuit, MonitorPlay
} from "lucide-react";

// --- Types & Mock Data ---

type ViewState = 'landing' | 'contact' | 'login' | 'dashboard' | 'course-overview' | 'lesson-view' | 'assessment';

interface UserProfile {
  name: string;
  role: string;
  progress: number;
}

interface Lesson {
  id: number;
  title: string;
  duration: string;
  type: "video" | "slide" | "quiz";
  isLocked: boolean;
  isCompleted: boolean;
}

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  progress: number;
  lessons: Lesson[];
  resources: { title: string; type: string }[];
}

const MOCK_USER: UserProfile = {
  name: "Guest Learner",
  role: "Aspiring Executive",
  progress: 15
};

const MOCK_COURSES: Course[] = [
  {
    id: 1,
    title: "Executive Leadership Strategy",
    description: "Master the art of high-stakes decision making and strategic alignment in the modern corporate landscape.",
    instructor: "Luxxor Academy",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1600",
    progress: 35,
    resources: [
      { title: "Strategic Framework.pdf", type: "PDF" },
      { title: "Leadership Toolkit.pptx", type: "PPTX" }
    ],
    lessons: [
      { id: 101, title: "The Global Shift", duration: "12:40", type: "video", isLocked: false, isCompleted: true },
      { id: 102, title: "Core Competencies", duration: "18:15", type: "video", isLocked: false, isCompleted: false },
      { id: 103, title: "Mid-Term Assessment", duration: "15 min", type: "quiz", isLocked: true, isCompleted: false },
    ]
  },
  {
    id: 2,
    title: "Digital Transformation 2025",
    description: "Navigate the complexities of AI adoption, data governance, and digital scalability.",
    instructor: "Tech Division",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1600",
    progress: 0,
    resources: [{ title: "Implementation Guide.pdf", type: "PDF" }],
    lessons: [
      { id: 201, title: "AI Fundamentals", duration: "10:00", type: "video", isLocked: true, isCompleted: false },
      { id: 202, title: "Data Ethics", duration: "25:00", type: "slide", isLocked: true, isCompleted: false },
    ]
  }
];

// --- Shared Components ---

const Navbar = ({ onViewChange, currentView }: { onViewChange: (v: ViewState) => void, currentView: ViewState }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'landing', label: 'Home' },
    { id: 'contact', label: 'Contact' },
    { id: 'login', label: 'Portal Login' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => onViewChange('landing')}>
            <span className="font-display font-bold text-2xl tracking-wider text-white">
              LUXXOR<span className="text-gold-500">MEDIA</span>
            </span>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => onViewChange(link.id as ViewState)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    currentView === link.id 
                    ? 'text-gold-500' 
                    : 'text-gray-300 hover:text-gold-400'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onViewChange(link.id as ViewState);
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-black border-t border-white/10 py-12">
    <div className="max-w-7xl mx-auto px-4 text-center">
      <h3 className="text-xl font-bold text-white mb-4">LUXXOR<span className="text-gold-500">MEDIA</span></h3>
      <div className="flex justify-center space-x-6 text-gray-400 text-sm mb-8">
        <span>Strategic Consulting</span>
        <span>•</span>
        <span>Corporate Training</span>
        <span>•</span>
        <span>Digital Systems</span>
      </div>
      <p className="text-gray-600 text-xs">© 2025 Luxxor Media. All rights reserved. Harare, Zimbabwe.</p>
    </div>
  </footer>
);

// --- Page Components (Public) ---

const LandingPage = ({ onViewChange }: { onViewChange: (v: ViewState) => void }) => (
  <div className="pt-20 min-h-screen flex flex-col">
    {/* Hero */}
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
      
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto animate-fade-in">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
          Redefining <span className="gold-gradient-text">Corporate Mastery</span>
        </h1>
        <p className="text-xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
          The premier Learning Experience Platform for high-performance teams. 
          Scalable, secure, and designed for the modern executive.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onViewChange('login')}
            className="px-8 py-4 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-full transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(212,175,55,0.3)]"
          >
            Access Portal
          </button>
          <button 
            onClick={() => onViewChange('contact')}
            className="px-8 py-4 bg-transparent border border-white/20 hover:border-gold-500 text-white font-medium rounded-full transition-all"
          >
            Request Demo
          </button>
        </div>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8">
        {[
          { icon: ShieldCheck, title: "Enterprise Security", desc: "Bank-grade encryption for your proprietary data." },
          { icon: BrainCircuit, title: "Adaptive Learning", desc: "AI-driven pathways that adjust to learner performance." },
          { icon: MonitorPlay, title: "Immersive Content", desc: "4K video streaming and interactive slide decks." }
        ].map((feature, idx) => (
          <div key={idx} className="glass-panel p-8 rounded-xl border-t border-gold-500/20 hover:border-gold-500/50 transition-colors">
            <feature.icon className="w-10 h-10 text-gold-500 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
            <p className="text-gray-400">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  </div>
);

const ContactPage = () => (
  <div className="pt-32 pb-20 min-h-screen max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 animate-fade-in">
    <div>
      <h1 className="text-4xl font-bold text-white mb-6">Get in Touch</h1>
      <p className="text-gray-400 mb-10">
        Ready to elevate your team's capabilities? Contact Luxxor Media to schedule a consultation.
      </p>
      
      <div className="space-y-6">
        <div className="flex items-center gap-4 text-gray-300">
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
            <Phone size={20} />
          </div>
          <span>+263 772 391 374</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
            <Mail size={20} />
          </div>
          <span>rukunim@gmail.com</span>
        </div>
        <div className="flex items-center gap-4 text-gray-300">
          <div className="w-10 h-10 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500">
            <MapPin size={20} />
          </div>
          <span>Harare, Zimbabwe</span>
        </div>
      </div>
    </div>

    <div className="glass-panel p-8 rounded-2xl">
      <form action="https://api.web3forms.com/submit" method="POST" className="space-y-6">
        <input type="hidden" name="access_key" value="d7147c83-f7f7-48fa-b609-471490843907" />
        <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gold-500 uppercase mb-2">First Name</label>
            <input type="text" name="name" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gold-500 uppercase mb-2">Last Name</label>
            <input type="text" name="surname" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors" />
          </div>
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gold-500 uppercase mb-2">Email Address</label>
          <input type="email" name="email" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors" />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gold-500 uppercase mb-2">Message</label>
          <textarea name="message" rows={4} required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors"></textarea>
        </div>
        
        <button type="submit" className="w-full py-4 bg-gold-500 hover:bg-gold-600 text-black font-bold rounded-lg transition-colors shadow-lg">
          Send Message
        </button>
      </form>
    </div>
  </div>
);

const LoginPage = ({ onLogin }: { onLogin: () => void }) => (
  <div className="min-h-screen pt-20 flex items-center justify-center px-4 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80')] bg-cover bg-center">
    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
    
    <div className="relative z-10 glass-panel p-10 rounded-2xl w-full max-w-md border-t border-gold-500/30 shadow-2xl">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
        <p className="text-gray-400">Sign in to your learner dashboard</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-gold-500 uppercase mb-2">Username / Email</label>
          <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors" />
        </div>
        
        <div>
          <label className="block text-xs font-bold text-gold-500 uppercase mb-2">Password</label>
          <input type="password" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-gold-500 outline-none transition-colors" />
        </div>
        
        <button 
          onClick={onLogin}
          className="w-full py-4 bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-black font-bold rounded-lg transition-all transform hover:scale-[1.02]"
        >
          Secure Login
        </button>
      </div>
      
      <div className="mt-6 text-center">
        <a href="#" className="text-sm text-gold-500 hover:underline">Forgot credentials?</a>
      </div>
    </div>
  </div>
);

// --- LMS Components (Private) ---

const DashboardView = ({ onViewChange, onSelectCourse }: { onViewChange: (v: ViewState) => void, onSelectCourse: (c: Course) => void }) => (
  <div className="p-8 animate-fade-in">
    <header className="mb-10 flex justify-between items-end">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, <span className="text-gold-500">{MOCK_USER.name}</span></p>
      </div>
      <div className="text-right hidden sm:block">
        <div className="text-2xl font-bold text-white">{MOCK_USER.progress}%</div>
        <div className="text-xs text-gray-500 uppercase tracking-widest">Overall Mastery</div>
      </div>
    </header>

    <h2 className="text-xl font-bold text-white mb-6 border-l-4 border-gold-500 pl-4">Enrolled Courses</h2>
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {MOCK_COURSES.map((course) => (
        <div 
          key={course.id} 
          onClick={() => onSelectCourse(course)}
          className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-gold-500/50 transition-all duration-300"
        >
          <div className="h-40 relative">
            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
            <div className="absolute bottom-4 left-4">
              <span className="text-xs font-bold bg-gold-500 text-black px-2 py-1 rounded">Module {course.id}</span>
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-gold-400 transition-colors">{course.title}</h3>
            <p className="text-sm text-gray-400 mb-6 line-clamp-2">{course.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="w-full max-w-[120px]">
                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gold-500" style={{ width: `${course.progress}%` }}></div>
                </div>
              </div>
              <span className="text-xs text-gray-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Resume <ChevronRight size={14} />
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CourseOverview = ({ course, onBack, onStartLesson }: { course: Course, onBack: () => void, onStartLesson: (l: Lesson) => void }) => (
  <div className="p-8 animate-fade-in max-w-5xl mx-auto">
    <button onClick={onBack} className="text-gray-400 hover:text-white mb-6 flex items-center gap-2">
      <ChevronRight className="rotate-180" size={16} /> Back to Dashboard
    </button>
    
    <div className="glass-panel p-8 rounded-2xl mb-8 flex flex-col md:flex-row gap-8 items-start border-t border-gold-500/20">
      <img src={course.thumbnail} className="w-full md:w-64 rounded-lg shadow-lg" />
      <div>
        <h1 className="text-3xl font-bold text-white mb-4">{course.title}</h1>
        <p className="text-gray-300 mb-6 leading-relaxed">{course.description}</p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2 text-sm text-gold-500 bg-gold-500/10 px-3 py-1.5 rounded-full">
            <User size={14} /> {course.instructor}
          </div>
          <div className="flex items-center gap-2 text-sm text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full">
            <BookOpen size={14} /> {course.lessons.length} Modules
          </div>
        </div>
      </div>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      <div className="md:col-span-2 space-y-4">
        <h3 className="text-xl font-bold text-white mb-4">Syllabus</h3>
        {course.lessons.map((lesson, idx) => (
          <div 
            key={lesson.id}
            onClick={() => !lesson.isLocked && onStartLesson(lesson)}
            className={`p-4 rounded-lg flex items-center justify-between border transition-colors ${
              lesson.isLocked 
              ? 'bg-white/5 border-transparent opacity-50 cursor-not-allowed' 
              : 'bg-black border-white/10 hover:border-gold-500/50 cursor-pointer'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lesson.isCompleted ? 'bg-green-500/20 text-green-500' : 'bg-white/10 text-gray-400'}`}>
                {lesson.isCompleted ? <CheckCircle size={16} /> : <span className="text-sm font-bold">{idx + 1}</span>}
              </div>
              <div>
                <h4 className="text-white font-medium">{lesson.title}</h4>
                <span className="text-xs text-gray-500 uppercase">{lesson.type} • {lesson.duration}</span>
              </div>
            </div>
            {lesson.isLocked ? <Lock size={16} className="text-gray-600" /> : <Play size={16} className="text-gold-500" />}
          </div>
        ))}
      </div>

      <div>
        <h3 className="text-xl font-bold text-white mb-4">Toolkit</h3>
        <div className="space-y-3">
          {course.resources.map((res, idx) => (
            <div key={idx} className="glass-panel p-4 rounded-lg flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <FileText className="text-gold-500" size={18} />
                <div className="text-sm">
                  <p className="text-white font-medium">{res.title}</p>
                  <p className="text-xs text-gray-500">{res.type}</p>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gold-500"><Download size={16} /></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const LessonPlayer = ({ lesson, onBack, onComplete }: { lesson: Lesson, onBack: () => void, onComplete: () => void }) => (
  <div className="flex flex-col h-full animate-fade-in bg-black">
    <div className="bg-charcoal border-b border-white/10 p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full text-white"><ChevronRight className="rotate-180" /></button>
        <div>
          <h2 className="text-white font-bold">{lesson.title}</h2>
          <p className="text-xs text-gray-500">Playing Now</p>
        </div>
      </div>
      <button onClick={onComplete} className="px-6 py-2 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded text-sm transition-colors">
        Mark Complete
      </button>
    </div>

    <div className="flex-1 flex flex-col items-center justify-center bg-black relative">
      {/* Mock Player */}
      <div className="w-full max-w-5xl aspect-video bg-gray-900 rounded-lg relative overflow-hidden group shadow-2xl border border-white/10">
        <div className="absolute inset-0 flex items-center justify-center">
           {lesson.type === 'video' ? <Play size={64} className="text-white opacity-20" /> : <FileText size={64} className="text-white opacity-20" />}
        </div>
        <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent">
          <div className="h-1 bg-white/30 rounded-full mb-2 cursor-pointer">
            <div className="h-full bg-gold-500 w-1/3 relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-300">
            <span>05:30</span>
            <span>{lesson.duration}</span>
          </div>
        </div>
      </div>
    </div>

    <div className="h-64 bg-charcoal border-t border-white/10 p-8 grid grid-cols-2 gap-8">
       <div>
         <h3 className="text-white font-bold mb-2">Lesson Notes</h3>
         <p className="text-gray-400 text-sm">Key concepts discussed in this module include vertical integration strategy and the 3-point alignment technique.</p>
       </div>
       <div>
         <h3 className="text-white font-bold mb-2">Discussion</h3>
         <div className="bg-black/50 p-4 rounded text-sm text-gray-500 text-center">
           Comments are disabled for this preview module.
         </div>
       </div>
    </div>
  </div>
);

const AssessmentView = ({ onBack }: { onBack: () => void }) => (
  <div className="p-8 max-w-3xl mx-auto flex flex-col items-center justify-center min-h-[80vh] animate-fade-in text-center">
    <div className="w-24 h-24 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 mb-6 border border-gold-500/30">
      <BrainCircuit size={48} />
    </div>
    <h1 className="text-4xl font-bold text-white mb-4">Mastery Check</h1>
    <p className="text-gray-400 mb-10 max-w-lg">
      You must achieve a score of 80% or higher to unlock the next certification level. This assessment contains 15 strategic scenario questions.
    </p>
    <div className="flex gap-4">
      <button onClick={onBack} className="px-8 py-3 border border-white/20 hover:border-white text-white rounded-lg transition-colors">Cancel</button>
      <button className="px-8 py-3 bg-gold-500 hover:bg-gold-400 text-black font-bold rounded-lg shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all">Start Assessment</button>
    </div>
  </div>
);

// --- Main App Controller ---

const App = () => {
  const [view, setView] = useState<ViewState>('landing');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Private View Logic
  const handleLogin = () => setView('dashboard');
  const handleLogout = () => {
    setView('landing');
    setSelectedCourse(null);
    setSelectedLesson(null);
  };

  const handleCourseSelect = (course: Course) => {
    setSelectedCourse(course);
    setView('course-overview');
  };

  const handleLessonStart = (lesson: Lesson) => {
    if(lesson.type === 'quiz') {
      setView('assessment');
    } else {
      setSelectedLesson(lesson);
      setView('lesson-view');
    }
  };

  // Render Logic
  const isPrivate = ['dashboard', 'course-overview', 'lesson-view', 'assessment'].includes(view);

  return (
    <div className="bg-obsidian min-h-screen text-white flex flex-col font-sans selection:bg-gold-500/40">
      {!isPrivate && <Navbar onViewChange={setView} currentView={view} />}

      {/* Main Layout Switcher */}
      <div className={`flex-1 flex ${isPrivate ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* Private Sidebar */}
        {isPrivate && (
          <aside className="w-64 bg-charcoal border-r border-white/10 flex-shrink-0 flex flex-col">
            <div className="h-20 flex items-center px-8 border-b border-white/5">
              <span className="font-display font-bold text-xl tracking-wider text-white">LUXXOR</span>
            </div>
            <nav className="flex-1 p-4 space-y-2">
              <button onClick={() => { setSelectedCourse(null); setView('dashboard'); }} className={`w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium ${view === 'dashboard' ? 'bg-gold-500 text-black' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
                <LayoutDashboard size={18} /> Dashboard
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
                <BookOpen size={18} /> My Learning
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5">
                <Settings size={18} /> Settings
              </button>
            </nav>
            <div className="p-4 border-t border-white/5">
              <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded text-sm">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </aside>
        )}

        {/* Content Area */}
        <main className={`flex-1 ${isPrivate ? 'overflow-y-auto bg-[#0a0a0a]' : ''}`}>
          {view === 'landing' && <LandingPage onViewChange={setView} />}
          {view === 'contact' && <ContactPage />}
          {view === 'login' && <LoginPage onLogin={handleLogin} />}
          
          {view === 'dashboard' && <DashboardView onViewChange={setView} onSelectCourse={handleCourseSelect} />}
          
          {view === 'course-overview' && selectedCourse && (
            <CourseOverview 
              course={selectedCourse} 
              onBack={() => setView('dashboard')}
              onStartLesson={handleLessonStart} 
            />
          )}

          {view === 'lesson-view' && selectedLesson && (
            <LessonPlayer 
              lesson={selectedLesson} 
              onBack={() => setView('course-overview')}
              onComplete={() => setView('course-overview')}
            />
          )}

          {view === 'assessment' && (
             <AssessmentView onBack={() => setView('course-overview')} />
          )}
        </main>
      </div>
      
      {!isPrivate && <Footer />}
    </div>
  );
};

const root = createRoot(document.getElementById("root")!);
root.render(<App />);