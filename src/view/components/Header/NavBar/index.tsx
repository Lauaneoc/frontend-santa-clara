import { PopoverGroup } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import PopoverMenu from '../PopoverMenu';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../@shared/contexts/Auth/AuthContext';
import logo from "../../../../assets/logo_santa_clara.jpeg"

interface NavBarProps {
  setMobileMenuOpen: (open: boolean) => void;
}

const NavBar: React.FC<NavBarProps> = ({ setMobileMenuOpen }) => {
  const navigate = useNavigate();
  const {logout} = useAuth();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };
  return (
    <nav aria-label="Global" className="mx-auto flex max-w-full md:max-w-[79vw] items-center justify-between p-6 py-4 lg:px-8">
      <div className="flex lg:flex-1">
        <a href="#" className="-m-1.5 p-1.5">
          <span className="sr-only">Clínica Santa Clara</span>
          <img
            alt=""
            src={logo}
            className="w-[250px]"
          />
        </a>
      </div>
      <div className="flex lg:hidden">
        <button
          type="button"
          onClick={() => setMobileMenuOpen(true)}
          className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
        >
          <span className="sr-only">Abrir menu</span>
          <Bars3Icon aria-hidden="true" className="h-6 w-6 text-slate-50" />
        </button>
      </div>
      <PopoverGroup className="hidden lg:flex lg:gap-x-12">
        <a href="/" className="text-md font-semibold leading-6 text-slate-50">Dashboard</a>
        <PopoverMenu />
      </PopoverGroup>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <a onClick={handleLogout} href="#" className="text-md font-semibold leading-6 text-slate-50">
          Sair <span aria-hidden="true">&rarr;</span>
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
