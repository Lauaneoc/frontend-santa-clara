import { Dialog, DialogPanel } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { management } from '../data';
import { useNavigate } from 'react-router-dom';
import UserService from '../../../../@shared/services/UserService';
import { useAuth } from '../../../../@shared/contexts/Auth/AuthContext';
import logo from "../../../../assets/logo_santa_clara.jpeg"

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ open, onClose }) => {

  const {logout} = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); 
    navigate("/login");
  };
  return (
    <Dialog open={open} onClose={onClose} className="lg:hidden">
      <div className="fixed inset-0 z-10" />
      <DialogPanel className="fixed inset-y-0 right-0 z-10 flex w-full flex-col justify-between overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
        <div className="">
          <div className="flex items-center justify-between bg-[#8B1513] p-6">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={logo}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={onClose}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6 text-slate-50" />
            </button>
          </div>
          <div className="mt-2 flow-root p-6">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {management.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group -mx-3 flex items-center gap-x-6 rounded-lg p-3 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                      <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-[#8B1513]" />
                    </div>
                    {item.name}
                  </a>
                ))}
              </div>
              <div className="space-y-2 py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  hover:bg-gray-50"
                >
                  bla bla bla
                </a>
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900  hover:bg-gray-50"
                >
                  bla bla bla
                </a>
              </div>
              <div className="py-6">
                <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900  hover:bg-gray-50"
                  onClick={handleLogout}
                >
                  Sair
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default MobileMenu;
