import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ExperienceSection from "@/components/experience-section";
import ProjectsSection from "@/components/projects-section";
import AchievementsSection from "@/components/achievements-section";
import ContactSection from "@/components/contact-section";

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      
      <section id="home">
        <HeroSection />
      </section>
      
      <section id="about">
        <AboutSection />
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
