
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Upload, BookOpen, DollarSign, Star } from "lucide-react";
import { toast } from "sonner";

interface SellBookFormProps {
  onBack: () => void;
}

const SellBookForm = ({ onBack }: SellBookFormProps) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    category: "",
    price: "",
    coverImage: null as File | null,
    bookFile: null as File | null,
    isbn: "",
    publishYear: "",
    language: "English",
    pages: ""
  });

  const [dragOver, setDragOver] = useState(false);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);

  const categories = [
    "Technology", "Self-Help", "Science Fiction", "Cooking", "Business", 
    "Health", "Romance", "Mystery", "Biography", "History", "Children", "Education"
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (file: File, type: 'cover' | 'book') => {
    if (type === 'cover') {
      setFormData(prev => ({ ...prev, coverImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setFormData(prev => ({ ...prev, bookFile: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent, type: 'cover' | 'book') => {
    e.preventDefault();
    setDragOver(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0], type);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.author || !formData.description || !formData.category || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (!formData.coverImage || !formData.bookFile) {
      toast.error("Please upload both cover image and book file");
      return;
    }

    // In a real app, this would upload to a server
    toast.success("Book submitted successfully! It will be reviewed and published soon.");
    
    // Reset form
    setFormData({
      title: "",
      author: "",
      description: "",
      category: "",
      price: "",
      coverImage: null,
      bookFile: null,
      isbn: "",
      publishYear: "",
      language: "English",
      pages: ""
    });
    setCoverPreview(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-green-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack} className="text-green-700 hover:text-green-800">
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Store
              </Button>
              <div className="flex items-center space-x-2">
                <BookOpen className="h-6 w-6 text-green-600" />
                <h1 className="text-xl font-semibold text-gray-800">Sell Your Book</h1>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Share Your Story with the World
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of authors who have published their work on BookVerse. 
              Reach readers worldwide and earn from your creativity.
            </p>
          </div>

          {/* Benefits Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <DollarSign className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-bold">Earn 70%</h3>
                <p className="text-green-100">Revenue Share</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Star className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-bold">Global Reach</h3>
                <p className="text-teal-100">Worldwide Audience</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white border-0">
              <CardContent className="p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-bold">Easy Upload</h3>
                <p className="text-emerald-100">Simple Process</p>
              </CardContent>
            </Card>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Book Details */}
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Book Information</CardTitle>
                    <CardDescription>Tell us about your book</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title">Book Title *</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => handleInputChange("title", e.target.value)}
                        placeholder="Enter your book title"
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="author">Author Name *</Label>
                      <Input
                        id="author"
                        value={formData.author}
                        onChange={(e) => handleInputChange("author", e.target.value)}
                        placeholder="Your name or pen name"
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>

                    <div>
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        value={formData.description}
                        onChange={(e) => handleInputChange("description", e.target.value)}
                        placeholder="Describe your book in detail..."
                        rows={4}
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="category">Category *</Label>
                        <Select onValueChange={(value) => handleInputChange("category", value)}>
                          <SelectTrigger className="border-green-200 focus:border-green-400">
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="price">Price (USD) *</Label>
                        <Input
                          id="price"
                          type="number"
                          step="0.01"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="9.99"
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="isbn">ISBN (Optional)</Label>
                        <Input
                          id="isbn"
                          value={formData.isbn}
                          onChange={(e) => handleInputChange("isbn", e.target.value)}
                          placeholder="978-0-123456-78-9"
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="publishYear">Publish Year</Label>
                        <Input
                          id="publishYear"
                          type="number"
                          value={formData.publishYear}
                          onChange={(e) => handleInputChange("publishYear", e.target.value)}
                          placeholder="2024"
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="pages">Number of Pages</Label>
                        <Input
                          id="pages"
                          type="number"
                          value={formData.pages}
                          onChange={(e) => handleInputChange("pages", e.target.value)}
                          placeholder="250"
                          className="border-green-200 focus:border-green-400"
                        />
                      </div>

                      <div>
                        <Label htmlFor="language">Language</Label>
                        <Select onValueChange={(value) => handleInputChange("language", value)} defaultValue="English">
                          <SelectTrigger className="border-green-200 focus:border-green-400">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="English">English</SelectItem>
                            <SelectItem value="Spanish">Spanish</SelectItem>
                            <SelectItem value="French">French</SelectItem>
                            <SelectItem value="German">German</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column - File Uploads */}
              <div className="space-y-6">
                {/* Cover Image Upload */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Cover Image *</CardTitle>
                    <CardDescription>Upload a high-quality cover image</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragOver ? "border-green-400 bg-green-50" : "border-green-300"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, 'cover')}
                    >
                      {coverPreview ? (
                        <div className="space-y-4">
                          <img
                            src={coverPreview}
                            alt="Cover preview"
                            className="max-w-full h-48 object-cover mx-auto rounded"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setCoverPreview(null);
                              setFormData(prev => ({ ...prev, coverImage: null }));
                            }}
                          >
                            Remove Image
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="h-12 w-12 mx-auto text-green-500" />
                          <div>
                            <p className="text-gray-600">Drag and drop your cover image here, or</p>
                            <Label
                              htmlFor="cover-upload"
                              className="cursor-pointer text-green-600 hover:text-green-700 underline"
                            >
                              browse files
                            </Label>
                            <Input
                              id="cover-upload"
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, 'cover');
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Book File Upload */}
                <Card className="bg-white/80 backdrop-blur-sm border-green-200">
                  <CardHeader>
                    <CardTitle className="text-green-800">Book File *</CardTitle>
                    <CardDescription>Upload your ebook file</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragOver ? "border-green-400 bg-green-50" : "border-green-300"
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, 'book')}
                    >
                      {formData.bookFile ? (
                        <div className="space-y-4">
                          <BookOpen className="h-12 w-12 mx-auto text-green-500" />
                          <div>
                            <p className="font-medium text-gray-800">{formData.bookFile.name}</p>
                            <p className="text-sm text-gray-500">
                              {(formData.bookFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setFormData(prev => ({ ...prev, bookFile: null }))}
                          >
                            Remove File
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <BookOpen className="h-12 w-12 mx-auto text-green-500" />
                          <div>
                            <p className="text-gray-600">Drag and drop your book file here, or</p>
                            <Label
                              htmlFor="book-upload"
                              className="cursor-pointer text-green-600 hover:text-green-700 underline"
                            >
                              browse files
                            </Label>
                            <Input
                              id="book-upload"
                              type="file"
                              accept=".pdf,.epub,.mobi"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleFileUpload(file, 'book');
                              }}
                            />
                          </div>
                          <p className="text-sm text-gray-500">PDF, EPUB, MOBI up to 50MB</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 px-8"
              >
                <Upload className="h-5 w-5 mr-2" />
                Submit Book for Review
              </Button>
              <p className="text-sm text-gray-500 mt-2">
                Your book will be reviewed within 24-48 hours and published if approved.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellBookForm;
