'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadSchema } from '@/lib/zod'
import { BookUploadFormValues } from '@/types'
import FileUpload from './FileUpload'
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from '@/lib/constants'

const BookUploadForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors, isSubmitting }
    } = useForm<BookUploadFormValues>({
        resolver: zodResolver(UploadSchema)
    })

    const onSubmit = async (data: BookUploadFormValues) => {
        console.log(data)
        // Implementation for actual upload would go here
    }

    const fileValue = watch('file')
    const coverValue = watch('cover')

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="new-book-wrapper">
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="form-label" htmlFor="title">Book Title</label>
                    <input
                        {...register('title')}
                        id="title"
                        placeholder="Enter book title"
                        className="form-input"
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="author">Author</label>
                    <input
                        {...register('author')}
                        id="author"
                        placeholder="Enter author name"
                        className="form-input"
                    />
                    {errors.author && <p className="text-red-500 text-sm">{errors.author.message}</p>}
                </div>

                <div className="space-y-2">
                    <label className="form-label" htmlFor="persona">AI Persona (Optional)</label>
                    <textarea
                        {...register('persona')}
                        id="persona"
                        placeholder="Describe how the AI should talk about this book..."
                        className="form-input min-h-[100px]"
                    />
                    {errors.persona && <p className="text-red-500 text-sm">{errors.persona.message}</p>}
                </div>

                <FileUpload
                    label="Book File (PDF)"
                    hint="PDF up to 50MB"
                    accept={{ 'application/pdf': ACCEPTED_PDF_TYPES }}
                    maxSize={MAX_FILE_SIZE}
                    onFileChange={(files) => setValue('file', files)}
                    value={fileValue}
                />
                {errors.file && <p className="text-red-500 text-sm">{errors.file.message as string}</p>}

                <FileUpload
                    label="Book Cover (Optional)"
                    hint="PNG, JPG, WebP up to 10MB"
                    accept={{ 'image/*': ACCEPTED_IMAGE_TYPES }}
                    maxSize={MAX_IMAGE_SIZE}
                    onFileChange={(files) => setValue('cover', files)}
                    value={coverValue}
                />
                {errors.cover && <p className="text-red-500 text-sm">{errors.cover.message as string}</p>}

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="form-btn"
                >
                    {isSubmitting ? 'Uploading...' : 'Add Book to Library'}
                </button>
            </div>
        </form>
    )
}

export default BookUploadForm
