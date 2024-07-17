// import OrganizationSwitcher from '../organization-switcher'
// import { SelectLocale } from '../select-locale'
// import { UserMenu } from '../user-menu'
// import { ResponsiveSideNav } from '../responsive-sidenav'
// import { IoIosGlobe } from 'react-icons/io'
// import { auth } from '@/config/auth'
// import { useEffect, useState } from 'react'

// export default async function Header() {
  
//   const session = await auth()
//   const name = session?.user.firstName
//   const email = session?.user.email

//   return (
//     <header className="w-full bg-mth-grey-blue-600">
//       <nav className="container flex items-center justify-between px-4 py-3 lg:px-8">
//         <ResponsiveSideNav name={name} email={email} />
//         <div className="flex w-72 items-center justify-between gap-x-4 lg:ml-auto lg:w-80">
//           <OrganizationSwitcher />
//           <div className="items-centers flex justify-center px-2">
//             <IoIosGlobe className="pl-auto my-auto hidden h-6 w-8 text-mth-silver-200 md:block" />
//             <SelectLocale />
//           </div>
//           <div className="hidden lg:block">
//             <UserMenu name={name} email={email} />
//           </div>
//         </div>
//       </nav>
//     </header>
//   )
// }

// "use client";

// import { useState, useEffect } from 'react';
// import OrganizationSwitcher from '../organization-switcher';
// import { SelectLocale } from '../select-locale';
// import { UserMenu } from '../user-menu';
// import { ResponsiveSideNav } from '../responsive-sidenav';
// import { IoIosGlobe } from 'react-icons/io';

// interface User {
//   name: string;
//   email: string;
// }

// interface HeaderProps {
//   user: User;
// }

// export default function Header({ user }: HeaderProps) {
//   const [currentUser, setCurrentUser] = useState(user);

//   useEffect(() => {
//     setCurrentUser(user);
//   }, [user]);

//   return (
//     <header className="w-full bg-mth-grey-blue-600">
//       <nav className="container flex items-center justify-between px-4 py-3 lg:px-8">
//         <ResponsiveSideNav name={currentUser.name} email={currentUser.email} />
//         <div className="flex w-72 items-center justify-between gap-x-4 lg:ml-auto lg:w-80">
//           <OrganizationSwitcher />
//           <div className="items-centers flex justify-center px-2">
//             <IoIosGlobe className="pl-auto my-auto hidden h-6 w-8 text-mth-silver-200 md:block" />
//             <SelectLocale />
//           </div>
//           <div className="hidden lg:block">
//             <UserMenu name={currentUser.name} email={currentUser.email} />
//           </div>
//         </div>
//       </nav>
//     </header>
//   );
// }

"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import OrganizationSwitcher from '../organization-switcher';
import { SelectLocale } from '../select-locale';
import { UserMenu } from '../user-menu';
import { ResponsiveSideNav } from '../responsive-sidenav';
import { IoIosGlobe } from 'react-icons/io';

interface User {
  name: string;
  email: string;
}

interface HeaderProps {
  user: User;
}

export default function Header({ user }: HeaderProps) {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState(user);

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      const updatedUser = {
        name: session.user.firstName ?? '',
        email: session.user.email ?? '',
      };
      setCurrentUser(updatedUser);
    }
  }, [session, status]);

  return (
    <header className="w-full bg-mth-grey-blue-600">
      <nav className="container flex items-center justify-between px-4 py-3 lg:px-8">
        <ResponsiveSideNav name={currentUser.name} email={currentUser.email} />
        <div className="flex w-72 items-center justify-between gap-x-4 lg:ml-auto lg:w-80">
          <OrganizationSwitcher />
          <div className="items-centers flex justify-center px-2">
            <IoIosGlobe className="pl-auto my-auto hidden h-6 w-8 text-mth-silver-200 md:block" />
            <SelectLocale />
          </div>
          <div className="hidden lg:block">
            <UserMenu name={currentUser.name} email={currentUser.email} />
          </div>
        </div>
      </nav>
    </header>
  );
}
