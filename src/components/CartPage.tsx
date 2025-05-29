
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trash2, Plus, Minus, ShoppingBag, CreditCard } from "lucide-react";

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  category: string;
  price: number;
}

interface CartPageProps {
  cart: Book[];
  onBack: () => void;
  onRemoveFromCart: (bookId: number) => void;
  onUpdateQuantity: (bookId: number, quantity: number) => void;
}

const CartPage = ({ cart, onBack, onRemoveFromCart, onUpdateQuantity }: CartPageProps) => {
  // Group cart items by book ID to handle quantities
  const cartItems = cart.reduce((acc, book) => {
    const existing = acc.find(item => item.book.id === book.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      acc.push({ book, quantity: 1 });
    }
    return acc;
  }, [] as { book: Book; quantity: number }[]);

  const totalPrice = cartItems.reduce((sum, item) => sum + (item.book.price * item.quantity), 0);

  const updateQuantity = (bookId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      onRemoveFromCart(bookId);
    } else {
      onUpdateQuantity(bookId, newQuantity);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-purple-700 hover:text-purple-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Button>
              <div className="flex items-center space-x-2">
                <ShoppingBag className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Shopping Cart
                </h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {cart.length} items
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingBag className="h-24 w-24 mx-auto text-gray-300 mb-4" />
            <h2 className="text-2xl font-bold text-gray-600 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some books to get started!</p>
            <Button onClick={onBack} className="bg-gradient-to-r from-purple-600 to-blue-600">
              Browse Books
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Cart Items</h2>
                {cartItems.map(({ book, quantity }) => (
                  <Card key={book.id} className="bg-white/90 backdrop-blur-sm border-purple-100">
                    <CardContent className="p-4">
                      <div className="flex items-center space-x-4">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-800">{book.title}</h3>
                          <p className="text-sm text-gray-600">by {book.author}</p>
                          <Badge className="mt-1 bg-purple-100 text-purple-800">
                            {book.category}
                          </Badge>
                          <div className="mt-2 text-lg font-bold text-purple-600">
                            ${book.price.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(book.id, quantity - 1)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="px-3 py-1 bg-gray-100 rounded">{quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(book.id, quantity + 1)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveFromCart(book.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="bg-white/90 backdrop-blur-sm border-purple-100 sticky top-24">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${(totalPrice * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>${(totalPrice * 1.1).toFixed(2)}</span>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Proceed to Checkout
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
