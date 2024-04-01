'use client'

import { CldUploadWidget } from 'next-cloudinary'
import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ImagePlus, Trash } from 'lucide-react'

interface ImageUploadProps {
  disabled?: boolean
}

const ImageUpload: React.FC<ImageUploadProps> = ({ disabled }) => {
  const [isMounted, setIsMounted] = useState(false)
  const [urls, seturls] = useState<string[]>([])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const onUpload = (result: any) => {
    const urlImage = result.info.secure_url
    seturls((url) => {
      url = [...url, urlImage]
      return url
    })
  }

  const onRemove = (url: string) => {
    seturls(urls.filter((current) => current !== url))
  }

  if (!isMounted) {
    return null
  }

  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {urls.map((url) => (
          <div
            key={url}
            className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
          >
            <div className='z-10 absolute top-2 right-2'>
              <Button
                type='button'
                onClick={() => onRemove(url)}
                variant='destructive'
                size='sm'
              >
                <Trash className='h-4 w-4' />
              </Button>
            </div>
            <Image
              fill
              className='object-cover'
              alt='Image'
              src={url}
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            />
          </div>
        ))}
      </div>

      <CldUploadWidget
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        options={{ maxFiles: 5, multiple: true }}
        onSuccess={(result) => onUpload(result)}
      >
        {({ open }) => {
          return (
            <Button
              type='button'
              disabled={disabled}
              variant='secondary'
              onClick={() => open()}
            >
              <ImagePlus className='h-4 w-4 mr-2' />
              Upload an Image
            </Button>
          )
        }}
      </CldUploadWidget>
    </div>
  )
}

export default ImageUpload
