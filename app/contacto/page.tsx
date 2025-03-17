import PageIllustration from "@/components/page-illustration";
import HeroContact from "@/components/Contact";
import BlurWrapper from "@/components/BlurWrapper";

export const metadata = {
  title: "Contacto - QuiralTech",
  description: "Ponte en contacto con QuiralTech para consultas y proyectos",
};

export default function ContactPage() {
  return (
    <>
      <PageIllustration />
        <section>
          <HeroContact />
        </section>
    </>
  );
}