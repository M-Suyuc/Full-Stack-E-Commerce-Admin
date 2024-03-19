'use client'

import { Plus } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { SizeColumn, columns } from './columns'
import { DataTable } from '@/components/ui/date-table'
import { ApiList } from '@/components/ui/api-list'

interface SizeClientProps {
  data: SizeColumn[]
}

export const SizeClient: React.FC<SizeClientProps> = ({ data }) => {
  const params = useParams()
  const router = useRouter()
  // console.log({ params }) // params: storeId: "8bc08fdb-efac-4f1c-8612-151ada4a0c82" storeId: viene de la carpeta padre llamada [storeId] de bajo de la carpeta (dashboard)

  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Sizes (${data.length})`}
          description='Manage sizes for your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <Plus className='mr-2 h-4 w-4' /> Add New
        </Button>
      </div>
      <Separator />

      <DataTable searchKey='name' columns={columns} data={data} />
      <Heading title='API' description='API Calls for Sizes' />
      <Separator />
      <ApiList entityName='sizes' entityIdName='sizeId' />
    </>
  )
}
