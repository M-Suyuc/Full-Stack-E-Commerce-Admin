'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { CategoryColumn, columns } from './columns'
import { DataTable } from '@/components/ui/date-table'
import { ApiList } from '@/components/ui/api-list'

interface CategoryClientProps {
  data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  // console.log({ params }) // params: storeId: "8bc08fdb-efac-4f1c-8612-151ada4a0c82" storeId: viene de la carpeta padre llamada [storeId] de bajo de la carpeta (dashboard)

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Categories (${data.length})`}
          description='Manage categories for your store'
        />
        <Button
          onClick={() => router.push(`/${params.storeId}/categories/new`)}
        >
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API Calls for Categories' />
      <Separator />
      <ApiList entityName='categories' entityIdName='categoryId' />
    </>
  )
}
