import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, BookOpen, Settings, Bookmark } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  preview: string;
  price: number;
}

interface BookReaderProps {
  book: Book;
  onBack: () => void;
}

const BookReader = ({ book, onBack }: BookReaderProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fontSize, setFontSize] = useState(16);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample book content (in a real app, this would come from a database)
  const bookPages = [
    {
      pageNumber: 1,
      content: `${book.preview}\n\nThis is the beginning of an incredible journey through the pages of "${book.title}". Every great story starts with a single word, a single idea that grows into something magnificent.\n\nAs you turn each page, you'll discover new worlds, meet fascinating characters, and explore ideas that will stay with you long after you've finished reading.\n\nThe author, ${book.author}, has crafted this work with careful attention to detail, ensuring that every chapter builds upon the last to create a truly engaging experience.`
    },
    {
      pageNumber: 2,
      content: `Chapter 1: The Beginning\n\nIn every story, there comes a moment when everything changes. This is that moment. The protagonist of our tale is about to embark on a journey that will transform not only their life, but the lives of everyone around them.\n\nThe morning sun cast long shadows across the landscape as our story begins. There was something different about this day, something that whispered of adventures to come and challenges to face.\n\nLittle did anyone know that the events about to unfold would become the stuff of legend, spoken of for generations to come.`
    },
    {
      pageNumber: 3,
      content: `Chapter 2: The Discovery\n\nAs the story progresses, we begin to understand the true scope of what lies ahead. Our characters are developing, growing, and facing the kinds of challenges that define who they really are.\n\nThe discovery that changes everything comes not with fanfare, but with a quiet realization that shifts the entire foundation of what was believed to be true.\n\nThis is where the real adventure begins, where the safe and familiar gives way to the unknown and extraordinary. Every page from here forward will build toward the climactic moments that await.`
    },
    {
      pageNumber: 4,
      content: `Chapter 3: The Journey Continues\n\nThe path forward is rarely straight, and our characters are learning this truth firsthand. Each obstacle overcome reveals new challenges, each answer discovered raises new questions.\n\nBut this is the nature of all great journeys - they transform not just our destination, but our understanding of ourselves and the world around us.\n\nAs you continue reading, you'll find that this story mirrors many of the journeys we take in our own lives, making it both relatable and inspiring.\n\nThe adventure is far from over, and the best is yet to come...`
    }
  ];

  const totalPages = bookPages.length;

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const increaseFontSize = () => {
    if (fontSize < 24) {
      setFontSize(fontSize + 2);
    }
  };

  const decreaseFontSize = () => {
    if (fontSize > 12) {
      setFontSize(fontSize - 2);
    }
  };

  const currentPageContent = bookPages.find(page => page.pageNumber === currentPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      {/* Reader Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-amber-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-amber-700 hover:text-amber-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-amber-600" />
                <div>
                  <h1 className="font-semibold text-gray-800">{book.title}</h1>
                  <p className="text-sm text-gray-600">by {book.author}</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                {book.category}
              </Badge>
              <Button
                variant="ghost"
                onClick={() => setIsBookmarked(!isBookmarked)}
                className={isBookmarked ? "text-red-500" : "text-gray-500"}
              >
                <Bookmark className={`h-5 w-5 ${isBookmarked ? "fill-current" : ""}`} />
              </Button>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={decreaseFontSize}>
                  A-
                </Button>
                <Button variant="outline" size="sm" onClick={increaseFontSize}>
                  A+
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Reading Area */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-amber-200 shadow-xl">
            <CardHeader className="border-b border-amber-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl text-gray-800">
                  {book.title}
                </CardTitle>
                <div className="text-sm text-gray-500">
                  Page {currentPage} of {totalPages}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              {/* Page Content */}
              <div className="min-h-[600px] p-8">
                <div 
                  style={{ fontSize: `${fontSize}px` }}
                  className="leading-relaxed text-gray-800 whitespace-pre-line"
                >
                  {currentPageContent?.content}
                </div>
              </div>

              {/* Page Navigation */}
              <div className="border-t border-amber-100 p-6">
                <div className="flex items-center justify-between">
                  <Button
                    variant="outline"
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="border-amber-300 hover:bg-amber-50"
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous Page
                  </Button>

                  {/* Page Indicator */}
                  <div className="flex items-center space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setCurrentPage(i + 1)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          currentPage === i + 1
                            ? "bg-amber-600"
                            : "bg-amber-200 hover:bg-amber-300"
                        }`}
                      />
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    onClick={nextPage}
                    disabled={currentPage === totalPages}
                    className="border-amber-300 hover:bg-amber-50"
                  >
                    Next Page
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                {/* Reading Progress */}
                <div className="mt-4">
                  <div className="w-full bg-amber-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(currentPage / totalPages) * 100}%` }}
                    />
                  </div>
                  <div className="text-center mt-2 text-sm text-gray-600">
                    {Math.round((currentPage / totalPages) * 100)}% Complete
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Suggestion */}
          {currentPage === totalPages && (
            <Card className="mt-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
              <CardContent className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Enjoying the preview?</h3>
                <p className="text-amber-100 mb-4">
                  Purchase the full book to continue reading and discover how the story ends!
                </p>
                <Button size="lg" variant="secondary" className="text-amber-600">
                  Purchase Full Book - ${book.price}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookReader;
