// import Link from 'next/link';
// import React from 'react';

// export const navItemsData = [
//   { name: 'Home', url: '/' },
//   { name: 'Courses', url: '/courses' },
//   { name: 'About', url: '/about' },
//   { name: 'Policy', url: '/policy' },
//   { name: 'FAQ', url: '/faq' },
// ];

// type Props = {
//   activeItem: number;
//   isMobile: boolean;
// };

// const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
//   // Always show navigation items, regardless of isMobile prop
//   return (
//     <>
//       <div className="flex flex-wrap">
//         {navItemsData.map((i, index) => (
//           <Link href={i.url} key={index} className="px-3 py-2">
//             <span
//               className={`${
//                 activeItem === index
//                   ? 'dark:text-[#37a39a] text-[crimson] font-medium'
//                   : 'dark:text-white text-black hover:text-[crimson] dark:hover:text-[#37a39a]'
//               } text-[16px] font-Poppins transition-colors duration-200`}
//             >
//               {i.name}
//             </span>
//           </Link>
//         ))}
//       </div>
      
//     </>
//   );
// };

// export default NavItems;



import Link from 'next/link';
import React from 'react';

export const navItemsData = [
  { name: 'Home', url: '/' },
  { name: 'Courses', url: '/courses' },
  { name: 'About', url: '/about' },
  { name: 'Policy', url: '/policy' },
  { name: 'FAQ', url: '/faq' },
];

type Props = {
  activeItem: number;
  isMobile: boolean;
};

const NavItems: React.FC<Props> = ({ activeItem, isMobile }) => {
  return (
    <>
      <div className="800px:flex items-center">
        {navItemsData.map((i, index) => (
          <Link href={i.url} key={index} passHref>
            <span
              className={`${
                activeItem === index
                  ? 'dark:text-[#37a39a] text-[crimson]'
                  : 'dark:text-white text-black'
              } text-[18px] px-6 font-Poppins font-[400]`}
            >
              {i.name}
            </span>
          </Link>
        ))}
      </div>

      {isMobile && (
        <div className="800px:hidden mt-5">
          <div className="w-full text-center py-6">
            {navItemsData.map((i, index) => (
              <Link href={i.url} key={index} passHref>
                <span
                  className={`${
                    activeItem === index
                      ? 'dark:text-[#37a39a] text-[crimson]'
                      : 'dark:text-white text-black'
                  } block py-5 text-[18px] px-6 font-Poppins font-[400]`}
                >
                  {i.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NavItems;