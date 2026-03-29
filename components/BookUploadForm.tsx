'use client'
import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadSchema } from '@/lib/zod'
import { BookUploadFormValues } from '@/types'
import FileUpload from './FileUpload'
import { ACCEPTED_PDF_TYPES, ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE, MAX_IMAGE_SIZE } from '@/lib/constants'
import { cn } from '@/lib/utils'

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
    const selectedVoice = watch('voice')

    const voiceOptions = {
        male: [
            { id: 'dave', name: 'Dave', description: 'Deep and professional' },
            { id: 'daniel', name: 'Daniel', description: 'Clear and friendly' },
            { id: 'chris', name: 'Chris', description: 'Energetic and upbeat' }
        ],
        female: [
            { id: 'rachel', name: 'Rachel', description: 'Warm and natural' },
            { id: 'sarah', name: 'Sarah', description: 'Soft and calm' }
        ]
    }

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

                <div className="space-y-4">
                    <label className="form-label">Voice Selector</label>
                    
                    <div className="space-y-6">
                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Male Voices</h3>
                            <div className="voice-selector-options">
                                {voiceOptions.male.map((voice) => (
                                    <div
                                        key={voice.id}
                                        onClick={() => setValue('voice', voice.id)}
                                        className={cn(
                                            "voice-selector-option flex-col !items-start",
                                            selectedVoice === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                                        )}
                                    >
                                        <p className="font-bold text-white">{voice.name}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">{voice.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider">Female Voices</h3>
                            <div className="voice-selector-options">
                                {voiceOptions.female.map((voice) => (
                                    <div
                                        key={voice.id}
                                        onClick={() => setValue('voice', voice.id)}
                                        className={cn(
                                            "voice-selector-option flex-col !items-start",
                                            selectedVoice === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                                        )}
                                    >
                                        <p className="font-bold text-white">{voice.name}</p>
                                        <p className="text-xs text-[var(--text-secondary)]">{voice.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    {errors.voice && <p className="text-red-500 text-sm">{errors.voice.message}</p>}
                </div>

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
