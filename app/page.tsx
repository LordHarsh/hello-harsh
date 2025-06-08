import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import AchievementsSection from "@/components/achievements-section";
import ContactSection from "@/components/contact-section";
import SkillsSection from "@/components/skills-section";
import About from "@/components/about-section";
import ChatBot from "@/components/chatbot";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      {/* <FloatingResumeButton /> */}
      <ChatBot />
      <section id="home">
        <HeroSection />
      </section>


      <section id="about">
        <About />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="achievements">
        <AchievementsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>


    </main>
  );
}
