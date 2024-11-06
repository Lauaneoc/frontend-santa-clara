import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { management } from '../data';

const PopoverMenu: React.FC = () => {
  return (
    <Popover className="relative">
      <PopoverButton className="flex items-center gap-x-1 text-md font-semibold leading-6 text-gray-50">
            Gestão
        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-50" />
      </PopoverButton>

      <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition">
        <div className="p-4">
          {management.map((item) => (
            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
              <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                {item.icon && (
                  <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-[#8B1513]" />
                )}
              </div>
              <div className="flex-auto">
                <a href={item.href} className="block font-semibold text-gray-900">
                  {item.name}
                  <span className="absolute inset-0" />
                </a>
                {item.description && (
                  <p className="mt-1 text-gray-600">{item.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </PopoverPanel>
    </Popover>
  );
};

export default PopoverMenu;
