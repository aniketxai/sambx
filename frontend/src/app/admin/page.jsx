'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { ArrowLeft } from 'lucide-react';

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    longDescription: '',
    price: '',
    status: 'Available',
    category: '',
    image: '',
    images: [],
    features: [],
    techStack: [],
    useCases: []
  });

  const [featureInput, setFeatureInput] = useState('');
  const [techInput, setTechInput] = useState('');
  const [useCaseInput, setUseCaseInput] = useState('');
  const [imageInput, setImageInput] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const generateSlug = (name) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name,
      slug: generateSlug(name)
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const addTechStack = () => {
    if (techInput.trim()) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const addUseCase = () => {
    if (useCaseInput.trim()) {
      setFormData(prev => ({
        ...prev,
        useCases: [...prev.useCases, useCaseInput.trim()]
      }));
      setUseCaseInput('');
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, imageInput.trim()]
      }));
      setImageInput('');
    }
  };

  const removeFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const removeTechStack = (index) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter((_, i) => i !== index)
    }));
  };

  const removeUseCase = (index) => {
    setFormData(prev => ({
      ...prev,
      useCases: prev.useCases.filter((_, i) => i !== index)
    }));
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.image) {
      toast.error('Please fill in required fields (Name, Price, Image)');
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.from('products').insert([{
        name: formData.name,
        slug: formData.slug || generateSlug(formData.name),
        description: formData.description,
        long_description: formData.longDescription,
        price: parseFloat(formData.price),
        status: formData.status,
        category: formData.category,
        image: formData.image,
        images: formData.images,
        features: formData.features,
        tech_stack: formData.techStack,
        use_cases: formData.useCases
      }]);

      if (error) throw error;

      toast.success('Product added successfully!');
      router.push('/products');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error(error.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <Card>
          <CardHeader>
            <CardTitle>Add New Product</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Basic Information</h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Product Name *</label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleNameChange}
                      placeholder="e.g., VisionPro AI Camera"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Slug</label>
                    <Input
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="auto-generated from name"
                      readOnly
                      className="bg-slate-100 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Category</label>
                    <Input
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g., Computer Vision"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full h-10 px-3 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900"
                    >
                      <option>Available</option>
                      <option>In Development</option>
                      <option>Prototype</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price *</label>
                  <Input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Short Description</label>
                  <Textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief description of the product"
                    rows={2}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Long Description</label>
                  <Textarea
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    placeholder="Detailed description and features"
                    rows={4}
                  />
                </div>
              </div>

              {/* Images */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Images</h3>

                <div>
                  <label className="block text-sm font-medium mb-2">Main Image *</label>
                  <Input
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://images.pexels.com/..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Images</label>
                  <div className="flex gap-2 mb-3">
                    <Input
                      value={imageInput}
                      onChange={(e) => setImageInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addImage())}
                      placeholder="https://images.pexels.com/..."
                    />
                    <Button type="button" onClick={addImage} variant="outline">
                      Add
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.images.map((img, i) => (
                      <div key={i} className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded">
                        <span className="text-sm truncate max-w-xs">{img}</span>
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Features</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    placeholder="Add a feature"
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 bg-blue-100 dark:bg-blue-900 px-3 py-2 rounded text-sm">
                      <span>{feature}</span>
                      <button
                        type="button"
                        onClick={() => removeFeature(i)}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Tech Stack</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
                    placeholder="Add a technology"
                  />
                  <Button type="button" onClick={addTechStack} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map((tech, i) => (
                    <div key={i} className="flex items-center gap-2 bg-purple-100 dark:bg-purple-900 px-3 py-2 rounded text-sm">
                      <span>{tech}</span>
                      <button
                        type="button"
                        onClick={() => removeTechStack(i)}
                        className="text-purple-600 dark:text-purple-400 hover:text-purple-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Use Cases */}
              <div className="space-y-4 pt-6 border-t">
                <h3 className="font-semibold text-slate-900 dark:text-slate-100">Use Cases</h3>
                <div className="flex gap-2 mb-3">
                  <Input
                    value={useCaseInput}
                    onChange={(e) => setUseCaseInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addUseCase())}
                    placeholder="Add a use case"
                  />
                  <Button type="button" onClick={addUseCase} variant="outline">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.useCases.map((useCase, i) => (
                    <div key={i} className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-3 py-2 rounded text-sm">
                      <span>{useCase}</span>
                      <button
                        type="button"
                        onClick={() => removeUseCase(i)}
                        className="text-green-600 dark:text-green-400 hover:text-green-800"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit */}
              <div className="flex gap-3 pt-6 border-t">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1"
                  size="lg"
                >
                  {loading ? 'Adding Product...' : 'Add Product'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
