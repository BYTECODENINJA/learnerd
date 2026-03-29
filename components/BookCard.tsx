import Link from 'next/link'
import Image from 'next/image'
import { BookCardProps } from '@/types'

const BookCard = ({title, author, coverURL, slug}: BookCardProps) => {
    return (
        <Link href={`/books/${slug}`} className="book-card group">
            <div className="book-card-3d">
                <div className="book-card-3d-hover">
                    <div className="book-card-spine" />
                    <div className="book-card-cover-wrapper">
                        <Image
                            src={coverURL}
                            alt={title}
                            width={150}
                            height={225}
                            className="book-card-cover"
                        />
                    </div>
                </div>
            </div>
            <div className="book-card-meta">
                <h3 className="book-card-title">{title}</h3>
                <p className="book-card-author">by {author}</p>
            </div>
        </Link>
    )
}
export default BookCard
