import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Services } from "@/components/Services";
import { Work } from "@/components/Work";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { ScrollToHash } from "@/components/ScrollToHash";

export default function Home() {
  return (
    <>
      <ScrollToHash />
      <Hero />
      <About />
      <Skills />
      <Services />
      <Work />
      <Testimonials />
      <FAQ />
      <Contact />
    </>
  );
}
