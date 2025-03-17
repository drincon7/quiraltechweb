import Logo from "./logo";
import Image from "next/image";
import FooterIllustration from "@/public/images/footer-illustration.svg";

export default function Footer() {
  return (
    <footer>
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Footer illustration */}
        <div
          className="pointer-events-none absolute bottom-0 left-1/2 -z-10 -translate-x-1/2"
          aria-hidden="true"
        >
          <Image
            className="max-w-none"
            src={FooterIllustration}
            width={1076}
            height={378}
            alt="Footer illustration"
          />
        </div>
        
        {/* Simplified footer content */}
        <div className="flex flex-col items-center justify-center py-8 md:py-12">
          <div className="mb-4">
            <Logo />
          </div>
          <div className="text-sm text-center">
            <p className="text-indigo-200/65">
              © QuiralTech SAS {new Date().getFullYear()}
              <span className="text-gray-700 mx-2">·</span>
              <a
                className="text-indigo-200/65 transition hover:text-indigo-500"
                href="#0"
              >
                Términos
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}