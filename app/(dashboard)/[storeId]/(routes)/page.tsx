import prismadb from '@/lib/prismadb'

interface Props {
  params: { storeId: string }
}

const DashboardPage = async ({ params }: Props) => {
  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeId
    }
  })
  return (
    <>
      <div>
        Active store <b> {store?.name}</b>
      </div>
    </>
  )
}
export default DashboardPage
