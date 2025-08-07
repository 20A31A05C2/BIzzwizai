import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-2 w-full bg-black ">
      <Link to="/">
        <img
          src="/logo.png"
          alt="BizWiz AI Logo"
          className="w-10 h-10 sm:w-[60px] sm:h-[60px] object-contain"
        />
      </Link>
        {/* <h1 className="text-white text-lg sm:text-2xl font-bold">
            BizWiz AI   
        </h1> */}
    </header>
  );
};

export default Header;