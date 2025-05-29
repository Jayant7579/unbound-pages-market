
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Edit, Trash2, BookOpen, Shield } from "lucide-react";
import { useForm } from "react-hook-form";

interface Book {
  id: number;
  title: string;
  author: string;
  price: number;
  rating: number;
  cover: string;
  category: string;
  description: string;
  preview: string;
}

interface AdminPageProps {
  onBack: () => void;
  books: Book[];
  onAddBook: (book: Omit<Book, 'id'>) => void;
  onUpdateBook: (id: number, book: Partial<Book>) => void;
  onDeleteBook: (id: number) => void;
}

const AdminPage = ({ onBack, books, onAddBook, onUpdateBook, onDeleteBook }: AdminPageProps) => {
  const [activeTab, setActiveTab] = useState("add");
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      price: "",
      rating: "",
      cover: "",
      category: "",
      description: "",
      preview: ""
    }
  });

  const onSubmit = (data: any) => {
    const bookData = {
      title: data.title,
      author: data.author,
      price: parseFloat(data.price),
      rating: parseFloat(data.rating),
      cover: data.cover,
      category: data.category,
      description: data.description,
      preview: data.preview
    };

    if (editingBook) {
      onUpdateBook(editingBook.id, bookData);
      setEditingBook(null);
    } else {
      onAddBook(bookData);
    }

    form.reset();
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    form.reset({
      title: book.title,
      author: book.author,
      price: book.price.toString(),
      rating: book.rating.toString(),
      cover: book.cover,
      category: book.category,
      description: book.description,
      preview: book.preview
    });
    setActiveTab("add");
  };

  const cancelEdit = () => {
    setEditingBook(null);
    form.reset();
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
                <Shield className="h-6 w-6 text-purple-600" />
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Admin Dashboard
                </h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              {books.length} books
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8">
          <Button
            variant={activeTab === "add" ? "default" : "outline"}
            onClick={() => setActiveTab("add")}
            className={activeTab === "add" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
          >
            <Plus className="h-4 w-4 mr-2" />
            {editingBook ? "Edit Book" : "Add Book"}
          </Button>
          <Button
            variant={activeTab === "manage" ? "default" : "outline"}
            onClick={() => setActiveTab("manage")}
            className={activeTab === "manage" ? "bg-purple-600 hover:bg-purple-700" : "hover:bg-purple-50"}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Manage Books
          </Button>
        </div>

        {/* Add/Edit Book Form */}
        {activeTab === "add" && (
          <Card className="max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">
                {editingBook ? "Edit Book" : "Add New Book"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="title"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Title</FormLabel>
                          <FormControl>
                            <Input placeholder="Book title" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="author"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Author</FormLabel>
                          <FormControl>
                            <Input placeholder="Author name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price ($)</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.01" placeholder="9.99" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.1" min="0" max="5" placeholder="4.5" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input placeholder="Technology" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="cover"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cover Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Book description..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="preview"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Preview Text</FormLabel>
                        <FormControl>
                          <Textarea placeholder="First few sentences of the book..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex space-x-4">
                    <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600">
                      {editingBook ? "Update Book" : "Add Book"}
                    </Button>
                    {editingBook && (
                      <Button type="button" variant="outline" onClick={cancelEdit}>
                        Cancel
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}

        {/* Manage Books Table */}
        {activeTab === "manage" && (
          <Card className="bg-white/90 backdrop-blur-sm border-purple-100">
            <CardHeader>
              <CardTitle className="text-xl text-gray-800">Manage Books</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Cover</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Author</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {books.map((book) => (
                    <TableRow key={book.id}>
                      <TableCell>
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="w-12 h-16 object-cover rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{book.category}</Badge>
                      </TableCell>
                      <TableCell>${book.price.toFixed(2)}</TableCell>
                      <TableCell>{book.rating}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(book)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => onDeleteBook(book.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
