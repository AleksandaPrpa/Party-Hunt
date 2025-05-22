import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-700 py-6">
      <div className="container mx-auto text-center">
        <p className="text-xl text-cyan-400">
          © {currentYear} Aleksandar Prpa. All rights reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="https://www.instagram.com"
            className="text-cyan-400 hover:text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className="w-6 h-6" />
          </a>
          <a
            href="https://www.facebook.com"
            className="text-cyan-400 hover:text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaFacebook className="w-6 h-6" />
          </a>
          <a
            href="https://www.twitter.com"
            className="text-cyan-400 hover:text-pink-500"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaTwitter className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
