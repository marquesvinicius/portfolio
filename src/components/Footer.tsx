import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-gray-800">
      <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          <Link
            href="https://github.com/marquesvinicius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <Github className="h-6 w-6" />
          </Link>
          <Link
            href="https://linkedin.com/in/marques-vinicius"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <Linkedin className="h-6 w-6" />
          </Link>
          <Link
            href="mailto:marquesviniciusmelomartins@gmail.com"
            className="text-gray-400 hover:text-red-400 transition-colors"
          >
            <span className="sr-only">Email</span>
            <Mail className="h-6 w-6" />
          </Link>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-gray-400">
            &copy; {currentYear} Marques Vinícius. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
