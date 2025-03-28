import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "../../context/AuthContext";
import { ServiceContext } from "../../context/ServiceContext";
import { SettingContext } from "../../context/SettingContext";

const BASE_URL = process.env.REACT_APP_BASE_URL;

// const ads = [
//   { name: "Advertisement for players", to: "ads" },
//   { name: "Advertisement for coaches", to: "ads" },
//   { name: "Advertisement for jobs in football", to: "ads" },
// ];

export default function ClubHeader() {
  const [showModal, setShowModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { settingData, loading } = useContext(SettingContext);

  const { user, logout } = useContext(AuthContext);
  const { serviceData, loadservices } = useContext(ServiceContext);
  
  // console.log(services)
  if (loading || loadservices) {
    return <div>Loading settings...</div>;
  }

  if (!settingData) {
    return <div>No settings available.</div>;
  }

  const services = serviceData.services;

  // Open modal
  const openModal = () => {
    setShowModal(true);
  };
  // Close modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <header className="bg-blue-900 text-white sticky top-0 z-50">
      {/* Modal for Confirmation */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={closeModal}
                className="py-2 px-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={logout}
                className="py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-8 lg:px-8"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">{settingData.site_name}</span>
            <img
              alt={settingData.site_name}
              src={BASE_URL + settingData.site_logo}
              className="h-8 w-auto"
            />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6 text-white" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12">
          {/* <Link to="/" className="text-sm/6 font-semibold text-white-900">
            Home
          </Link> */}
          <Link to="/club/posts" className="text-sm/6 font-semibold text-white-900">
            Ads
          </Link>
          {/* <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white-900 border-none outline-none">
              Ads
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-[2rem] w-[20rem] overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {ads.map((item) => (
                  <div
                    key={item.name}
                    className="group relative flex items-center gap-x-6 text-black p-4 text-sm/6 hover:bg-blue-900 hover:text-white"
                  >
                    <div className="flex-auto">
                      <Link to={item.to} className="font-semibold">
                        {item.name}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover> */}
          {/* <Link
            to="/club/subscriptions"
            className="text-sm/6 font-semibold text-white-900"
          >
            Subscriptions
          </Link> */}

          <Popover className="relative">
            <PopoverButton className="flex items-center gap-x-1 text-sm/6 font-semibold text-white-900 border-none outline-none">
              Services for Clubs
              <ChevronDownIcon
                aria-hidden="true"
                className="size-5 flex-none"
              />
            </PopoverButton>

            <PopoverPanel
              transition
              className="absolute -left-8 top-full z-10 mt-[2rem] w-[18rem] overflow-hidden bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
            >
              <div className="p-4">
                {services.map((item) => (
                  <div
                    key={item.title}
                    className="group relative flex items-center gap-x-6 text-black p-4 text-sm/6 hover:bg-blue-900 hover:text-white"
                  >
                    <div className="flex-auto">
                      <Link to={`/services/${item.slug}`} className="font-semibold">
                        {item.title}
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </PopoverPanel>
          </Popover>

          <Link to="/about" className="text-sm/6 font-semibold text-white-900">
            About
          </Link>
          <Link
            to="/contact"
            className="text-sm/6 font-semibold text-white-900"
          >
            Contact
          </Link>
        </PopoverGroup>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {user ? (
            <>
              <Popover className="relative">
                <PopoverButton className="flex items-center gap-x-2 text-sm font-semibold text-white">
                  <UserCircleIcon className="h-6 w-6 text-white" />
                  <span className="capitalize">{user.role} Profile</span>
                </PopoverButton>
                <PopoverPanel className="absolute right-0 z-10 mt-2 w-48 bg-white shadow-lg rounded-lg ring-1 ring-gray-900/5">
                  <div className="p-2">
                    <Link
                      to="/club/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/club/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <Link
                      onClick={openModal}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </Link>
                  </div>
                </PopoverPanel>
              </Popover>
            </>
          ) : (
            <Link
              to="/login"
              className="px-8 py-2 border border-white rounded hover:bg-white hover:text-black transition duration-300"
            >
              Login
            </Link>
          )}
        </div>
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">{settingData.site_name}</span>
              <img
                alt=""
                src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                className="h-8 w-auto"
              />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Home
                </Link>
                <Link
                  to="/club/posts"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Ads
                </Link>
                {/* <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Ads
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...ads].map((item) => (
                      <DisclosureButton
                        key={item.name}
                        as="a"
                        href={item.to}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.name}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure> */}
                {/* <Link
                  to="/club/subscriptions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Subscriptions
                </Link> */}

                <Disclosure as="div" className="-mx-3">
                  <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50">
                    Services
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="size-5 flex-none group-data-[open]:rotate-180"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="mt-2 space-y-2">
                    {[...services].map((item) => (
                      <DisclosureButton
                        key={item.title}
                        as="a"
                        href={item.slug}
                        className="block rounded-lg py-2 pl-6 pr-3 text-sm/7 font-semibold text-gray-900 hover:bg-gray-50"
                      >
                        {item.title}
                      </DisclosureButton>
                    ))}
                  </DisclosurePanel>
                </Disclosure>
                <Link
                  to="/about"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                >
                  Contact
                </Link>
              </div>
              <div className="py-6">
                {user ? (
                  <>
                    <Link
                      to="/club/dashboard"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Dashboard
                    </Link>

                    <Link
                      onClick={openModal}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Logout
                    </Link>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
