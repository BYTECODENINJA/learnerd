'use client'
import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { HugeiconsIcon } from '@hugeicons/react'
import { CloudUploadIcon, Delete02Icon } from '@hugeicons/core-free-icons'
import { cn } from '@/lib/utils'

interface FileUploadProps {
    onFileChange: (files: File[] | null) => void
    accept: Record<string, string[]>
    maxSize?: number
    label: string
    hint: string
    value?: File[] | null
}

const FileUpload = ({ onFileChange, accept, maxSize, label, hint, value }: FileUploadProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        onFileChange(acceptedFiles)
    }, [onFileChange])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept,
        maxSize,
        multiple: false
    })

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation()
        onFileChange(null)
    }

    const hasFile = value && value.length > 0

    return (
        <div className="space-y-2">
            <label className="form-label">{label}</label>
            <div
                {...getRootProps()}
                className={cn(
                    "upload-dropzone",
                    hasFile && "upload-dropzone-uploaded",
                    isDragActive && "border-brand border-2 border-dashed"
                )}
            >
                <input {...getInputProps()} />
                <div className="flex flex-col items-center">
                    <HugeiconsIcon icon={CloudUploadIcon} className="upload-dropzone-icon" />
                    <p className="upload-dropzone-text">
                        {hasFile ? value[0].name : "Upload a file or drag and drop"}
                    </p>
                    <p className="upload-dropzone-hint">{hint}</p>
                </div>
                {hasFile && (
                    <button
                        type="button"
                        onClick={removeFile}
                        className="absolute top-2 right-2 upload-dropzone-remove"
                    >
                        <HugeiconsIcon icon={Delete02Icon} size={20} />
                    </button>
                )}
            </div>
        </div>
    )
}

export default FileUpload
