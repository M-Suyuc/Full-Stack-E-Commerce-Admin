import { UserButton, auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import StoreSwitcher from './store-switcher'
import { MainNav } from './main-navbar'

const Navbar = async () => {
  const { userId } = auth()

  if (!userId) {
    redirect('/sign-in')
  }

  const stores = await prismadb.store.findMany({
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
          {/* <ThemeToggle /> */}
          <UserButton afterSignOutUrl='/' />
        </div>
      </div>
    </div>
  )
}

export default Navbar
