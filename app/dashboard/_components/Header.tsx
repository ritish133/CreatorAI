import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Search } from 'lucide-react'
import React from 'react'

function Header() {
  return (
    <div className='p-5 shadow-sm border-b-2 bg-white flex justify-between items-center'>
      <div className='flex gap-2 items-center
       p-2 border rounded-md max-w-lg bg-white'>
        <Search />
        <input type='text' placeholder='Search...'
          className='outline-none'
        />
      </div>
      <div className='flex gap-5 items-center'>
        <a href="https://ai-studio-project.vercel.app/" rel="noopener noreferrer">
          <Button variant="outline" className='hover:bg-primary hover:text-white'>AI Studio</Button>
        </a>
        <UserButton />
      </div>
    </div>
  )
}

export default Header