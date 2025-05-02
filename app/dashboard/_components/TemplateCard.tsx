// import React from 'react'
// import { TEMPLATE } from './TemplateListSection'
// import Image from 'next/image'
// import Link from 'next/link'

// function TemplateCard(item:TEMPLATE) {
//   return (
//     <Link href={'/dashboard/content/'+item?.slug}>
//       <div className='p-5 shadow-md rounded-md border bg-white 
//       flex flex-col gap-3  cursor-pointer h-full hover:scale-105 transition-all'>
//           <Image src={item.icon} alt='icon' 
//           width={50} height={50} />
//           <h2 className='font-medium text-lg'>{item.name}</h2>
//           <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
//       </div>
//     </Link>
//   )
// }

// export default TemplateCard

import React from "react";
import { TEMPLATE } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(item: TEMPLATE) {
  return (
    <Link href={"/dashboard/content/" + item?.slug}>
      <div
        className="p-4 shadow-md rounded-lg bg-gradient-to-br from-gray-50 to-white border border-gray-200
        flex flex-col gap-4 cursor-pointer h-full hover:shadow-lg transition-shadow"
      >
        {/* Icon Section */}
        <div className="flex justify-center items-center p-3 rounded-lg bg-gradient-to-br from-blue-400 to-purple-500 shadow-sm">
          <Image src={item.icon} alt="icon" width={40} height={40} />
        </div>

        {/* Title */}
        <h2 className="font-medium text-lg text-gray-700">{item.name}</h2>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-3">{item.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
