import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { NextResponse } from 'next/server'

export async function GET(
  req: Request,
  // _req: Request, // _ sirbe para indicar que '_req: Request' no se esta usando es igual a que lo quite es solo una canvencion para que no quede las letras palidas
  { params }: { params: { billboardId: string } }
) {
  try {
    if (!params.billboardId)
      return new NextResponse('billboardId id is required', { status: 400 })

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardId
      }
    })
    // console.log(store)

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_GET]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { storeId: string; billboardId: string } }
) {
  // billboardId -> is the name of the folder containing this file: path.ts
  try {
    const { userId } = auth()
    const body = await req.json()
    const { label, imageUrl } = body

    if (!userId) return new NextResponse('Unauthorized', { status: 401 })
    if (!label) return new NextResponse('Label is required', { status: 400 })
    if (!imageUrl)
      return new NextResponse('imageUrl is required', { status: 400 })
    if (!params.billboardId)
      return new NextResponse('billboardId id is required', { status: 400 })

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserID) return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardId
      },
      data: {
        label,
        imageUrl
      }
    })
    // console.log(store)

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_PATCH]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  // _req: Request, // _ sirbe para indicar que '_req: Request' no se esta usando es igual a que lo quite es solo una canvencion para que no quede las letras palidas
  { params }: { params: { storeId: string; billboardId: string } }
) {
  try {
    const { userId } = auth()

    if (!userId) return new NextResponse('Unauthenticated', { status: 401 })
    if (!params.billboardId)
      return new NextResponse('billboardId id is required', { status: 400 })

    const storeByUserID = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId
      }
    })

    if (!storeByUserID) return new NextResponse('Unauthorized', { status: 403 })

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardId
      }
    })
    // console.log(store)

    return NextResponse.json(billboard)
  } catch (error) {
    console.log('[BILLBOARD_DELETE]', error)
    return new NextResponse('Internal error ', { status: 500 })
  }
}
