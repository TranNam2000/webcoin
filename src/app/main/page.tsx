'use client';
import Image from 'next/image';
import { comment } from 'postcss';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


// Define content components first
export function HomeContent() {
const router = useRouter();
const handleClick =(e: { preventDefault: () => void; }) => {
  e.preventDefault();
router.push("/login")
};
  return (
    <div className="bg-white"> 
    <div className="w-ful max-w py-12 ">
    <div className="relative isolate overflow-hidden bg-gray-900 w-full mb-14 pb-20 sm:px-0 lg:flex lg:gap-x-0 lg:px-60 lg:pt-14">
    <svg viewBox="0 0 1024 1024" className="absolute left-1/2 top-1/2 -z-10 size-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0" aria-hidden="true">
  <circle cx="512" cy="512" r="512" fill="url(#759c1415-0410-454c-8f7c-9a820de03641)" fillOpacity="0.7" />
  <defs>
    <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
      <stop stopColor="#7775D6" />
      <stop offset="1" stopColor="#E935C1" />
    </radialGradient>
  </defs>
</svg>
        <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">Boost your productivity. Start using our app today.</h2>
          <p className="mt-6 text-pretty text-lg/8 text-gray-300">Ac euismod vel sit maecenas id pellentesque eu sed consectetur. Malesuada adipiscing sagittis vel nulla.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a onClick={handleClick} className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Get started</a>
            <a href="#" className="text-sm/6 font-semibold text-white">Learn more <span aria-hidden="true">→</span></a>
          </div>
        </div>
        <div className="relative mt-16 h-80 lg:mt-8">
          <img className="absolute left-0 top-0 w-[57rem] max-w-none  rounded-md bg-white/5 ring-1 ring-white/10"
           src="https://tailwindui.com/plus/img/component-images/dark-project-app-screenshot.png" alt="App screenshot" width="1824" height="1080"/>
        </div>
      </div>
    </div>
    </div>
  );
}

export function TeamContent() {
  return (
    <div className="p-4 bg-gray-700 text-white">
      <h2>Team Content</h2>
      <p>This is the content for the Team menu.</p>
    </div>
  );
}

export function ProjectsContent() {
  return (
    <div className="p-4 bg-gray-700 text-white">
      <h2>Projects Content</h2>
      <p>This is the content for the Projects menu.</p>
    </div>
  );
}

export function CalendarContent() {
  return (
    <div className="p-4 bg-gray-700 text-white">
      <h2>Calendar Content</h2>
      <p>This is the content for the Calendar menu.</p>
    </div>
  );
}


const MENU_ITEMS = [
  { name: 'Home', component: <HomeContent /> },
  { name: 'Team', component: <TeamContent /> },
  { name: 'Projects', component: <ProjectsContent /> },
  { name: 'Calendar', component: <CalendarContent /> }
];

export default function Navbar() {
  const [selectedMenu, setSelectedMenu] = useState('Home');
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMenuClick = (menu: string) => {
    setSelectedMenu(menu); 
    setMobileMenuOpen(false); 
  };
  const CurrentContent = MENU_ITEMS.find(item => item.name === selectedMenu)?.component ||(()=> <HomeContent/>);

  return (

    <div>
      
      <nav className="fixed top-0 left-0 w-full bg-gray-800 z-50">
  <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
    <div className="relative flex h-16 items-center justify-center">
      <div className="flex items-center space-x-6">
        {/* Logo */}
          <img
            className="h-8 w-auto cursor-pointer"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
            alt="Your Company"
          />

        <div className="flex space-x-4">
          {['Home', 'Team', 'Projects', 'Calendar'].map((menu) => (
            <a
              key={menu}
              onClick={() => handleMenuClick(menu)}
              className={`rounded-md px-3 py-2 text-sm font-medium 
                ${selectedMenu === menu ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
              {menu}
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
</nav>
      <div >
        {CurrentContent}
      </div>
    </div>
  );
}

