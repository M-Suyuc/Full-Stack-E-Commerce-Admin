import React from 'react'
import { UserButton, auth } from '@clerk/nextjs'
import { MainNav } from './main-nav'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ThemeToggle } from './theme-toggle'
import StoreSwitcher from './store-switcher'

export const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await prismadb?.store.findMany({
    where: {
      userId
    }
  })

  return (
    <div className='border-b'>
      <div className='flex h-16 items-center px-4'>
        <StoreSwitcher items={stores} /> {/* Options */}
        <MainNav className='mx-6' /> {/* Links */}
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeToggle />
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}
