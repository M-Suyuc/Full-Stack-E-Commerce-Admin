'use client'

import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'
import { useParams } from 'next/navigation'

interface ApiListProps {
  entityName: string
  entityIdName: string
}

export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName
}) => {
  const params = useParams()
  const origin = useOrigin()

  // console.log({ params }) // params: storeId: "8bc08fdb-efac-4f1c-8612-151ada4a0c82" storeId: viene de la carpeta padre llamada [storeId] de bajo de la carpeta (dashboard)

  // console.log({ origin }) // origin: "http://localhost:3000"

  const baseUrl = `${origin}/api/${params.storeId}`

  return (
    <>
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='GET'
        variant='public'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='POST'
        variant='admin'
        description={`${baseUrl}/${entityName}`}
      />
      <ApiAlert
        title='PATCH'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
      <ApiAlert
        title='DELETE'
        variant='admin'
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </>
  )
}
