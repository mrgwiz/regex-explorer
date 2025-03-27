import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-[#2D5A27]/10 mt-10 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-[#2C3639]/70">© {new Date().getFullYear()} RegEx Explorer. All rights reserved.</p>
          </div>
          <div className="flex space-x-6">
            <Link href="/privacy">
              <a className="text-sm text-[#2C3639]/70 hover:text-[#2D5A27]">Privacy Policy</a>
            </Link>
            <Link href="/terms">
              <a className="text-sm text-[#2C3639]/70 hover:text-[#2D5A27]">Terms of Service</a>
            </Link>
            <Link href="/contact">
              <a className="text-sm text-[#2C3639]/70 hover:text-[#2D5A27]">Contact</a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
