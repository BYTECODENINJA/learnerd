"use server"
import {CreateBook, TextSegment} from "@/types";
import { connectToDatabase } from "@/DATABASE/mongoose";
import { generateSlug, serializeData } from "@/lib/utils";
import Book from "@/DATABASE/models/book.model";
import BookSegment from "@/DATABASE/models/book-segment.model";

export const checkBookExists = async (title: string) => {
    try {
        await connectToDatabase();

        const slug = generateSlug(title);

        const existingBook = await Book.findOne({slug}).lean();

        if (existingBook) {
            return {
                exists: true,
                data: serializeData(existingBook)
            }
        }
    } catch (error) {
        console.error("Error checking if the book exists:", error);
        return {
            exists: false,
            error: error
        }
    }
}

export const createBook = async (data: CreateBook) => {
  try {
      await connectToDatabase();

      const slug = generateSlug(data.title);

      const exixtingBook = await Book.findOne({slug}).lean();

      if (exixtingBook) {
          return {
              success: false,
             data: serializeData(exixtingBook),
              alreadyExists: true,
          }
      }

      //check subscription limits before creating a book


        const book = await Book.create({...data, slug, totalSegments: 0});
        console.log("Book created successfully:", book._id);
        
        return {
            success: true,
            data: serializeData(book),
        };
    } catch (error) {
        console.error("Error creating book:", error);

        return {
            success: false,
            error: "Failed to create book",
        };
    }
};
export const saveBookSegments = async (bookId: string, clerkId: string, segments: TextSegment[]) => {
    try {
        await connectToDatabase();

        console.log("Saving book segments for bookId:", bookId);

        const segmentsToInsert = segments.map(({ text, segmentIndex, pageNumber, wordCount }) => ({
            clerkId,
            bookId,
            text,
            segmentIndex,
            pageNumber,
            wordCount,
        }))

        await BookSegment.insertMany(segmentsToInsert);
        await Book.findByIdAndUpdate(bookId, { totalSegments: segments.length });
        console.log("Book segments saved successfully");

        return {
            success: true,
            data: { segmentsCreated: segments.length }
        }

    } catch (error) {
        console.error("Error saving book segments:", error);

        await BookSegment.deleteMany({ bookId });
        await Book.findByIdAndDelete(bookId);
        console.log("Book deleted due to segment saving failure");
        
        return {
            success: false,
            error: error instanceof Error ? error.message : "Failed to save book segments"
        }
    }
};