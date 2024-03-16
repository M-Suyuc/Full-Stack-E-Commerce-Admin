import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  // _req: Request, // _ sirbe para indicar que '_req: Request' no se esta usando es igual a que lo quite es solo una canvencion para que no quede las letras palidas
  { params }: { params: { categoryId: string } }
) {
  try {
    if (!params.categoryId)
      return new NextResponse('categoryId id is required', { status: 400 })

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId
      }
    })
    // console.log(store)

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_GET]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  // categoryId -> is the name of the folder containing this file: path.ts
  try {
    const { userId } = auth()
    const body = await req.json()
    const { name, billboardId } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!name) return new NextResponse('Name is required', { status: 400 })
    if (!billboardId)
      return new NextResponse('billboardId is required', { status: 400 })
    if (!params.categoryId)
      return new NextResponse('categoryId id is required', { status: 400 })

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserID) return new NextResponse('Unauthorized', { status: 403 })

    const category = await prismadb.category.updateMany({
      where: {
        id: params.categoryId
      },
      data: {
        name,
        billboardId
      }
    })
    // console.log(store)

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_PATCH]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  // _req: Request, // _ sirbe para indicar que '_req: Request' no se esta usando es igual a que lo quite es solo una canvencion para que no quede las letras palidas
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!params.categoryId)
      return new NextResponse('categoryId id is required', { status: 400 })

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserID) return new NextResponse('Unauthorized', { status: 403 })

    const category = await prismadb.category.deleteMany({
      where: {
        id: params.categoryId
      }
    })
    // console.log(store)

    return NextResponse.json(category)
  } catch (error) {
    console.log('[CATEGORY_DELETE]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}
