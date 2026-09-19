import HeroCanvas from "@/components/HeroCanvas";
import HorizontalGallery from "@/components/HorizontalGallery";
import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";
import ProjectsGrid from "@/components/ProjectsGrid";
import { 
  Code2, 
  Megaphone, 
  Briefcase, 
  GraduationCap, 
  Mail, 
  Phone, 
  Link as LinkIcon, 
  CheckCircle2
} from "lucide-react";

export default async function Home() {
  const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`);

  return (
    <main className="min-h-screen text-white selection:bg-rose-600 selection:text-black">
      <HeroCanvas />

      <div className="max-w-6xl mx-auto px-6 py-24 space-y-32">
        {/* About Section */}
        <section id="about" className="scroll-mt-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-2">
                Executive Summary
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight">
                Anshul Soni
              </h3>
              <p className="text-gray-400 text-lg leading-relaxed">
                An MBA graduate with hands-on experience in WordPress website
                development, customization, landing page design, digital
                marketing, and business back-office operations. I bridge the gap
                between technical execution and strategic business growth.
              </p>
            </div>
            <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
              <Image 
                src="/profile.png" 
                alt="Anshul Soni Profile" 
                fill 
                priority
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 to-transparent mix-blend-overlay"></div>
            </div>
          </div>
        </section>


        {/* Horizontal Sliding Gallery */}
        <HorizontalGallery />

        {/* Core Skills Section */}
        <section id="skills" className="scroll-mt-24">
          <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-8 text-center md:text-left">
            Core Skills & Tools
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-600/50 transition-colors">
              <Code2 className="w-8 h-8 text-rose-500 mb-6" />
              <h4 className="text-xl font-bold mb-4">Web & Technical</h4>
              <ul className="space-y-3 text-gray-400">
                <li>WordPress & Elementor</li>
                <li>Responsive Web Design</li>
                <li>Landing Pages</li>
                <li>SEO Basics</li>
                <li>Google & Meta Ads</li>
                <li>AI Website Tools</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-600/50 transition-colors">
              <Megaphone className="w-8 h-8 text-rose-500 mb-6" />
              <h4 className="text-xl font-bold mb-4">Marketing & Design</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Social Media Marketing</li>
                <li>Canva Graphic Design</li>
                <li>Content Management</li>
                <li>GMB Profile Setup</li>
              </ul>
            </div>
            <div className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-rose-600/50 transition-colors">
              <Briefcase className="w-8 h-8 text-rose-500 mb-6" />
              <h4 className="text-xl font-bold mb-4">Operations</h4>
              <ul className="space-y-3 text-gray-400">
                <li>MS Office & Excel</li>
                <li>Email Handling</li>
                <li>Client Communication</li>
                <li>Back Office Operations</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Experience & Education Section */}
        <section id="work" className="scroll-mt-24">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Work Experience */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-8">
                Work Experience
              </h2>
              <div className="space-y-12">
                <div className="relative pl-8 border-l border-zinc-800">
                  <div className="absolute w-3 h-3 bg-rose-600 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="text-xl font-bold">Social Media Executive</h4>
                  <p className="text-rose-500 text-sm mb-3">Collab Sponsor (Present)</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Manages social media accounts, content, captions, engagement, and Meta Ads for lead generation. Builds/maintains WordPress websites, landing pages, and handles basic SEO.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-zinc-800">
                  <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="text-xl font-bold">Website Dev & Digital Marketing</h4>
                  <p className="text-rose-500 text-sm mb-3">MBG Card</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    Built responsive WordPress websites and conversion landing pages using Elementor and AI tools. Managed plugin integrations, performance tweaks, content updates, and keyword/meta-tag SEO setup.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-zinc-800">
                  <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="text-xl font-bold">Back Office Executive</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mt-2">
                    Handled documentation, Excel records, email communications, and administrative coordination.
                  </p>
                </div>
                <div className="relative pl-8 border-l border-transparent">
                  <div className="absolute w-3 h-3 bg-zinc-700 rounded-full -left-[6.5px] top-2"></div>
                  <h4 className="text-xl font-bold">Telecaller & Counselor</h4>
                  <p className="text-gray-400 text-sm leading-relaxed mt-2">
                    Managed student/customer inquiries, follow-ups, and service guidance.
                  </p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-8">
                Education
              </h2>
              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2 relative overflow-hidden">
                  <GraduationCap className="w-24 h-24 absolute -right-6 -top-6 text-zinc-800/50" />
                  <h4 className="text-xl font-bold mb-1 relative z-10">MBA (Finance & HR)</h4>
                  <p className="text-gray-400">Shri Ram Institute of Management, Jabalpur</p>
                  <p className="text-sm text-zinc-500 mt-2">2017</p>
                </div>
                <div className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col gap-2 relative overflow-hidden">
                  <GraduationCap className="w-24 h-24 absolute -right-6 -top-6 text-zinc-800/50" />
                  <h4 className="text-xl font-bold mb-1 relative z-10">B.Com (Computer Applications)</h4>
                  <p className="text-gray-400">JCCC College, Jabalpur</p>
                  <p className="text-sm text-zinc-500 mt-2">2015</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Projects / Websites Section */}
        <section id="projects" className="scroll-mt-24">
          <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold mb-8 text-center md:text-left">
            Featured Websites & Projects
          </h2>
          <ProjectsGrid projects={projects} />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-24 pb-32">
          <div className="p-12 rounded-3xl bg-zinc-900 border border-zinc-800 text-center space-y-8">
            <h2 className="text-sm uppercase tracking-widest text-rose-500 font-semibold">
              Get In Touch
            </h2>
            <h3 className="text-4xl md:text-5xl font-bold">Let's Work Together</h3>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Based in Jabalpur, Madhya Pradesh. Available for freelance opportunities and full-time roles in web development and digital marketing.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-6">
              <Link 
                href={siteSettings?.email ? `mailto:${siteSettings.email}` : "mailto:sonianshul77@gmail.com"}
                className="flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-rose-500 transition-colors w-full sm:w-auto"
              >
                <Mail className="w-5 h-5" />
                Email Me
              </Link>
              <Link 
                href={siteSettings?.phone ? `tel:${siteSettings.phone.replace(/\s+/g, '')}` : "tel:+919039369278"}
                className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-zinc-700 text-white font-bold rounded-full hover:border-white transition-colors w-full sm:w-auto"
              >
                <Phone className="w-5 h-5" />
                {siteSettings?.phone || "+91 9039369278"}
              </Link>
              <Link 
                href={siteSettings?.linkedinURL || "https://www.linkedin.com/in/anshul-soni-b70a57175/"}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-8 py-4 bg-[#0A66C2] text-white font-bold rounded-full hover:bg-[#004182] transition-colors w-full sm:w-auto"
              >
                <LinkIcon className="w-5 h-5" />
                LinkedIn
              </Link>
            </div>
          </div>
        </section>
      </div>

      <footer className="border-t border-zinc-900 py-8 text-center text-sm text-zinc-600">
        <p>© {new Date().getFullYear()} Anshul Soni. All rights reserved.</p>
      </footer>
    </main>
  );
}
