
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./dashboard/_components/Header";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 dark:bg-[#1e293b] dark:border-neutral-700">
        <nav
          className="relative max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex items-center justify-between">
            <div>
              <Image src={"/logo.svg"} alt="logo" width={150} height={150} />
            </div>
          </div>
          <div id="navbar-collapse-with-animation" className="hs-collapse hidden overflow-hidden transition-all duration-300 basis-full grow sm:block">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end sm:ps-7">
               {/* New Home Button */}
               <Link href="https://ai-studio-project.vercel.app/" className="flex items-center gap-x-2 font-medium text-gray-700 hover:text-teal-500 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-amber-400">
                <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Home
              </Link>
              <Link href="/dashboard" className="flex items-center gap-x-2 font-medium text-gray-700 hover:text-teal-500 sm:border-s sm:border-gray-300 py-2 sm:py-0 sm:ms-4 sm:my-6 sm:ps-6 dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-amber-400">
                <svg className="flex-shrink-0 w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                </svg>
                Get Started
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative overflow-hidden bg-[#f0f4f8] dark:bg-[#0f172a] before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/polygon-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/polygon-bg-element.svg')] before:bg-no-repeat before:bg-top before:bg-cover before:size-full before:-z-[1] before:transform before:-translate-x-1/2">
        <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
          <div className="text-center">
            <h1 className="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
              AI Content
              <span className="bg-clip-text bg-gradient-to-r from-teal-500 to-amber-500 text-transparent"> Generator</span>
            </h1>
            <p className="mt-5 text-lg text-gray-700 dark:text-neutral-400 max-w-2xl mx-auto">
              Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
            </p>
          </div>

          <div className="mt-8 flex justify-center">
            <a href="/dashboard" className="inline-flex items-center gap-x-3 bg-gradient-to-r from-teal-500 to-amber-500 hover:from-amber-500 hover:to-teal-500 text-white font-medium rounded-md py-3 px-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 dark:focus:ring-offset-gray-800">
              Get Started
              <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Cards */}
          {[
            { title: "25+ Templates", description: "Responsive, mobile-first projects", icon: "📘" },
            { title: "Customizable", description: "Easily customized and extendable components", icon: "⚙️" },
            { title: "Free to Use", description: "Well-documented components and plugins", icon: "💸" },
            { title: "24/7 Support", description: "Contact us anytime", icon: "🕒" },
          ].map((feature, idx) => (
            <a key={idx} className="group flex flex-col items-center justify-center bg-white dark:bg-[#1e293b] hover:bg-teal-100 dark:hover:bg-amber-800 rounded-xl p-6 shadow-md">
              <div className="text-3xl">{feature.icon}</div>
              <h3 className="mt-3 text-lg font-semibold text-gray-800 dark:text-white group-hover:text-teal-600 dark:group-hover:text-amber-400">{feature.title}</h3>
              <p className="mt-1 text-gray-600 dark:text-neutral-400">{feature.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
