import { Link, useLocation } from "wouter";

const Header = () => {
  const [location] = useLocation();

  return (
    <header className="bg-[#2D5A27] text-white p-4 shadow-md">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="flex items-center mb-4 sm:mb-0">
          <svg className="w-8 h-8 mr-2" viewBox="0 0 24 24" fill="none">
            <path d="M4 17L10 11L4 5" stroke="#A8C090" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L20 19" stroke="#A8C090" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="16" cy="11" r="4" stroke="#A8C090" strokeWidth="2"/>
          </svg>
          <Link href="/">
            <h1 className="text-xl sm:text-2xl font-bold cursor-pointer">RegEx Explorer</h1>
          </Link>
        </div>
        <nav>
          <ul className="flex space-x-6 text-sm sm:text-base">
            <li>
              <Link href="/">
                <a className={`hover:text-[#A8C090] transition-colors duration-200 ${location === '/' ? 'font-medium text-[#A8C090]' : ''}`}>
                  Puzzles
                </a>
              </Link>
            </li>
            <li>
              <Link href="/documentation">
                <a className={`hover:text-[#A8C090] transition-colors duration-200 ${location === '/documentation' ? 'font-medium text-[#A8C090]' : ''}`}>
                  Documentation
                </a>
              </Link>
            </li>
            <li>
              <Link href="/about">
                <a className={`hover:text-[#A8C090] transition-colors duration-200 ${location === '/about' ? 'font-medium text-[#A8C090]' : ''}`}>
                  About
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
