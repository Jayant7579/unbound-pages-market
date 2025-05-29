import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, ShoppingCart, Star, Users, TrendingUp, Heart, LogIn, Shield } from "lucide-react";
import BookReader from "@/components/BookReader";
import SellBookForm from "@/components/SellBookForm";
import CartPage from "@/components/CartPage";
import AuthPage from "@/components/AuthPage";
import AdminPage from "@/components/AdminPage";

const Index = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedBook, setSelectedBook] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [featuredBooks, setFeaturedBooks] = useState([
    {
      id: 1,
      title: "The Digital Revolution",
      author: "Sarah Chen",
      price: 12.99,
      rating: 4.8,
      cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
      category: "Technology",
      description: "A comprehensive guide to understanding the digital transformation of our world.",
      preview: "In the beginning of the 21st century, humanity witnessed an unprecedented transformation..."
    },
    {
      id: 2,
      title: "Mindful Living",
      author: "Dr. Emma Williams",
      price: 9.99,
      rating: 4.9,
      cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
      category: "Self-Help",
      description: "Discover the art of mindful living and inner peace.",
      preview: "Mindfulness is not about emptying your mind, but about being present in each moment..."
    },
    {
      id: 3,
      title: "Space Odyssey 2024",
      author: "Marcus Johnson",
      price: 15.99,
      rating: 4.7,
      cover: "https://images.unsplash.com/photo-1446776877081-d282a0f896e2?w=300&h=400&fit=crop",
      category: "Science Fiction",
      description: "An epic journey through the cosmos and human imagination.",
      preview: "The year was 2024, and humanity had finally reached beyond the stars..."
    },
    {
      id: 4,
      title: "The Art of Cooking",
      author: "Chef Isabella Rodriguez",
      price: 18.99,
      rating: 4.6,
      cover: "https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=300&h=400&fit=crop",
      category: "Cooking",
      description: "Master the fundamentals of culinary excellence.",
      preview: "Cooking is more than following recipes; it's about understanding ingredients..."
    }
  ]);

  const categories = ["All", "Technology", "Self-Help", "Science Fiction", "Cooking", "Business", "Health"];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = featuredBooks.filter(book => {
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (book) => {
    setCart([...cart, book]);
  };

  const removeFromCart = (bookId) => {
    setCart(cart.filter(book => book.id !== bookId));
  };

  const updateCartQuantity = (bookId, quantity) => {
    // For now, just update by adding/removing items
    const currentCount = cart.filter(book => book.id === bookId).length;
    const difference = quantity - currentCount;
    
    if (difference > 0) {
      const bookToAdd = featuredBooks.find(book => book.id === bookId);
      const newItems = Array(difference).fill(bookToAdd);
      setCart([...cart, ...newItems]);
    } else if (difference < 0) {
      let updatedCart = [...cart];
      for (let i = 0; i < Math.abs(difference); i++) {
        const index = updatedCart.findIndex(book => book.id === bookId);
        if (index > -1) {
          updatedCart.splice(index, 1);
        }
      }
      setCart(updatedCart);
    }
  };

  const readBook = (book) => {
    setSelectedBook(book);
    setCurrentView("reader");
  };

  // Admin functions
  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: Math.max(...featuredBooks.map(b => b.id)) + 1
    };
    setFeaturedBooks([...featuredBooks, newBook]);
  };

  const updateBook = (bookId, bookData) => {
    setFeaturedBooks(featuredBooks.map(book => 
      book.id === bookId ? { ...book, ...bookData } : book
    ));
  };

  const deleteBook = (bookId) => {
    setFeaturedBooks(featuredBooks.filter(book => book.id !== bookId));
    // Also remove from cart if present
    setCart(cart.filter(book => book.id !== bookId));
  };

  if (currentView === "reader" && selectedBook) {
    return <BookReader book={selectedBook} onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "sell") {
    return <SellBookForm onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "cart") {
    return (
      <CartPage 
        cart={cart} 
        onBack={() => setCurrentView("home")}
        onRemoveFromCart={removeFromCart}
        onUpdateQuantity={updateCartQuantity}
      />
    );
  }

  if (currentView === "auth") {
    return <AuthPage onBack={() => setCurrentView("home")} />;
  }

  if (currentView === "admin") {
    return (
      <AdminPage 
        onBack={() => setCurrentView("home")}
        books={featuredBooks}
        onAddBook={addBook}
        onUpdateBook={updateBook}
        onDeleteBook={deleteBook}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Navigation Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                BookVerse
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView("home")}
                className="text-gray-700 hover:text-purple-600"
              >
                Browse Books
              </Button>
              <Button 
                variant="ghost" 
                onClick={() => setCurrentView("sell")}
                className="text-gray-700 hover:text-purple-600"
              >
                Sell Books
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView("cart")}
                className="relative"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart ({cart.length})
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView("auth")}
                className="text-gray-700 hover:text-purple-600"
              >
                <LogIn className="h-4 w-4 mr-2" />
                Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setCurrentView("admin")}
                className="text-gray-700 hover:text-purple-600 border-orange-200 hover:bg-orange-50"
              >
                <Shield className="h-4 w-4 mr-2" />
                Admin
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Discover Your Next Great Read
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Explore thousands of ebooks, read instantly, and join a community of book lovers
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search books, authors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 text-lg border-purple-200 focus:border-purple-400"
            />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">10,000+</h3>
              <p className="text-purple-100">Books Available</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">50,000+</h3>
              <p className="text-blue-100">Happy Readers</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white border-0">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto mb-2" />
              <h3 className="text-2xl font-bold">98%</h3>
              <p className="text-indigo-100">Satisfaction Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={selectedCategory === category ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Featured Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-purple-100">
              <CardHeader className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={book.cover}
                    alt={book.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-purple-600 hover:bg-purple-700">
                      {book.category}
                    </Badge>
                  </div>
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg mb-2 line-clamp-2">{book.title}</CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2">
                  by {book.author}
                </CardDescription>
                <div className="flex items-center mb-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{book.rating}</span>
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-3">{book.description}</p>
                <div className="text-xl font-bold text-purple-600">${book.price}</div>
              </CardContent>
              <CardFooter className="p-4 pt-0 space-y-2">
                <Button 
                  onClick={() => readBook(book)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Read Preview
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => addToCart(book)}
                  className="w-full border-purple-200 hover:bg-purple-50"
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Start Your Journey?</h3>
          <p className="text-xl mb-6 text-purple-100">
            Join thousands of readers and discover your next favorite book today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-purple-600">
              Browse All Books
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => setCurrentView("sell")}
              className="border-white text-white hover:bg-white hover:text-purple-600"
            >
              Sell Your Books
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
