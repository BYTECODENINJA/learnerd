import React from 'react'
import Link from 'next/link'
import { HugeiconsIcon } from '@hugeicons/react'
import { ArrowLeft02Icon } from '@hugeicons/core-free-icons'
import BookUploadForm from '@/components/BookUploadForm'

const Page = () => {
    return (
        <main className="new-book">
            <Link href="/" className="back-btn-floating">
                <HugeiconsIcon icon={ArrowLeft02Icon} />
            </Link>

            <div className="flex flex-col items-center">
                <h1 className="page-title-xl">Add New Book</h1>
                <p className="subtitle mt-2">Upload your PDF and start learning</p>
            </div>

            <BookUploadForm />
        </main>
    )
}
export default Page
