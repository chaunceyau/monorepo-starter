import * as React from 'react';
import Link from 'next/link';
import {Disclosure, Menu, Transition} from '@headlessui/react';
import {BellIcon, MenuIcon, XIcon} from '@heroicons/react/solid';
//
import {useLayoutContext} from '@monorepo-starter/ui';
import {concatClassNames} from '@monorepo-starter/utils';
//
import {MainContent} from './main-content';
import {DesktopLink} from './desktop/link';
import {TopNavigationMobileMenu} from './mobile';
import {TopNavigationPageHeader} from './page-header';

interface TopNavigationLayoutProps<TUserSession>
  extends React.PropsWithChildren<{}> {
  router?: any;
  title: string;
  session: TUserSession;
}

export function TopNavigationLayout<TUserSession>({
  title,
  router,
  session,
  children,
}: TopNavigationLayoutProps<TUserSession>) {
  const ctx = useLayoutContext();

  if (typeof ctx === `undefined`) {
    throw new Error(`Application is not wrapped in LayoutProvider.`)
  }

  return (
    <div
      id="authenticated-app"
      className="flex flex-col min-h-screen bg-gray-50"
    >
      <Disclosure as="nav" className="bg-primary">
        {({open: menuOpen}) => (
          <>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      className="h-8 w-8"
                      src="https://tailwindui.com/img/logos/workflow-mark-green-300.svg"
                      alt="Workflow"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {/* todo update navigation items*/}
                      {ctx.primaryNavigationLinks.map(item => (
                        <DesktopLink
                          key={item.label}
                          to={item.href}
                          label={item.label}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <button className="p-1 rounded-full text-white hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu
                      as="div"
                      className="ml-3 relative"
                      id="avatar-dropdown"
                    >
                      {({open: profileDropdownOpen}) => (
                        <>
                          <div>
                            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                alt=""
                              />
                            </Menu.Button>
                          </div>
                          <Transition
                            as="div"
                            id="avatar-dropdown-items"
                            show={profileDropdownOpen}
                            enter="ease-out duration-100"
                            enterFrom="transform opacity-0 scale-50"
                            enterTo="transform opacity-100 scale-100"
                            leave="ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items
                              static
                              className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                              {ctx.profileDropdownNavigationLinks.map(item => (
                                <Link href={item.href} key={item.label}>
                                  <Menu.Item>
                                    {({active}) => (
                                        <a
                                          className={concatClassNames(
                                            active ? 'bg-gray-100' : '',
                                            'block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200'
                                          )}
                                        >
                                          {item.label}
                                        </a>
                                    )}
                                  </Menu.Item>
                                </Link>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </>
                      )}
                    </Menu>
                  </div>
                </div>
                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-black bg-opacity-25 inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {menuOpen ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>
            <TopNavigationMobileMenu />
          </>
        )}
      </Disclosure>

      <TopNavigationPageHeader title={title} />
      <MainContent children={children} />
    </div>
  );
  // return (
  //   <div className="flex flex-col min-h-screen bg-gray-100">
  //     <Disclosure as="nav" className="bg-primary">
  //       {({ open }) => (
  //         <>
  //           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  //             <div className="flex items-center justify-between h-16">
  //               <div className="flex items-center">
  //                 <Link href="/">
  //                   <a id="top-navigation-logo" className="flex-shrink-0">
  //                     <img
  //                       alt="Workflow"
  //                       className="h-8 w-8"
  //                       src="https://tailwindui.com/img/logos/workflow-mark.svg?color=green&shade=400"
  //                     />
  //                   </a>
  //                 </Link>
  //                 <LargerThanMobilePrimaryNav router={router} />
  //               </div>
  //               <LargerThanMobileRightNav session={session} />
  //               <div className="-mr-2 flex md:hidden">
  //                 <MobileMenuButton open={open} />
  //               </div>
  //             </div>
  //           </div>
  //           <MobileMenuBody />
  //         </>
  //       )}
  //     </Disclosure>

  //     <TopNavigationPageHeader title={title} />
  //     <MainContent children={children} />
  //   </div>
  // );
}
