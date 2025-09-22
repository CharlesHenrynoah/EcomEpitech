import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Plus, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { ImageUpload } from '@/components/ImageUpload';
import { useCategories } from '@/hooks/useCategories';
import { useProducts } from '@/hooks/useProducts';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const productSchema = z.object({
  brand: z.string().min(1, 'La marque est requise'),
  model_name: z.string().min(1, 'Le nom du modèle est requis'),
  description: z.string().optional(),
  price: z.number().min(0, 'Le prix doit être positif'),
  color: z.string().optional(),
  gender: z.enum(['homme', 'femme', 'enfant', 'unisexe']).optional(),
  category_id: z.string().min(1, 'La catégorie est requise'),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductVariant {
  size: string;
  stock: number;
}

interface ProductFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productToEdit?: any; // Le produit à modifier, si fourni
}

export function ProductForm({ open, onOpenChange, productToEdit }: ProductFormProps) {
  const [variants, setVariants] = useState<ProductVariant[]>([{ size: '', stock: 0 }]);
  const [images, setImages] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { categories } = useCategories();
  const { createProduct, updateProduct } = useProducts();
  const { toast } = useToast();
  
  const isEditing = !!productToEdit;

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      brand: productToEdit?.brand || '',
      model_name: productToEdit?.model_name || '',
      description: productToEdit?.description || '',
      price: productToEdit?.price || 0,
      color: productToEdit?.color || '',
      gender: productToEdit?.gender || undefined,
      category_id: productToEdit?.category_id || '',
    },
  });

  // Reset form when productToEdit changes
  useEffect(() => {
    if (productToEdit) {
      form.reset({
        brand: productToEdit.brand || '',
        model_name: productToEdit.model_name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || 0,
        color: productToEdit.color || '',
        gender: productToEdit.gender || undefined,
        category_id: productToEdit.category_id || '',
      });
      
      // Set variants from product
      if (productToEdit.variants?.length > 0) {
        setVariants(productToEdit.variants.map((v: any) => ({
          size: v.size,
          stock: v.stock
        })));
      } else {
        setVariants([{ size: '', stock: 0 }]);
      }
      
      // Set images from product
      if (productToEdit.images?.length > 0) {
        setImages(productToEdit.images.map((img: any) => img.url));
      } else {
        setImages([]);
      }
    } else {
      form.reset({
        brand: '',
        model_name: '',
        description: '',
        price: 0,
        color: '',
        gender: undefined,
        category_id: '',
      });
      setVariants([{ size: '', stock: 0 }]);
      setImages([]);
    }
  }, [productToEdit, form]);

  const addVariant = () => {
    setVariants([...variants, { size: '', stock: 0 }]);
  };

  const removeVariant = (index: number) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== index));
    }
  };

  const updateVariant = (index: number, field: keyof ProductVariant, value: string | number) => {
    // Validation pour les tailles (uniquement des chiffres)
    if (field === 'size' && typeof value === 'string') {
      const numericValue = value.replace(/[^0-9]/g, '');
      const updatedVariants = [...variants];
      updatedVariants[index] = { ...updatedVariants[index], [field]: numericValue };
      setVariants(updatedVariants);
    } else {
      const updatedVariants = [...variants];
      updatedVariants[index] = { ...updatedVariants[index], [field]: value };
      setVariants(updatedVariants);
    }
  };

  // Fonction pour vérifier si les variantes sont valides
  const hasValidVariants = () => {
    return variants.some(v => v.size.trim() !== '' && /^\d+$/.test(v.size));
  };

  // Vérifier si le formulaire est valide
  const isFormValid = form.formState.isValid && hasValidVariants();

  const onSubmit = async (data: ProductFormData) => {
    try {
      setIsSubmitting(true);
      
      // Validate variants (tailles doivent être des chiffres)
      const validVariants = variants.filter(v => v.size.trim() !== '' && /^\d+$/.test(v.size));
      if (validVariants.length === 0) {
        toast({
          title: "Erreur",
          description: "Au moins une variante avec une taille numérique est requise",
          variant: "destructive",
        });
        return;
      }

      // Validate images (max 4)
      if (images.length > 4) {
        toast({
          title: "Erreur",
          description: "Maximum 4 images autorisées par produit",
          variant: "destructive",
        });
        return;
      }

      if (isEditing) {
        // Update existing product
        console.log('Updating product with data:', data);
        
        const updatedProduct = await updateProduct(productToEdit.id, {
          brand: data.brand,
          model_name: data.model_name,
          description: data.description || null,
          price: data.price,
          color: data.color || null,
          gender: data.gender || null,
          category_id: data.category_id,
        });

        if (updatedProduct) {
          // Delete existing variants and images, then recreate them
          await supabase.from('product_variants').delete().eq('product_id', productToEdit.id);
          await supabase.from('product_images').delete().eq('product_id', productToEdit.id);
          
          const productId = productToEdit.id;
          
          // Create new variants
          for (const variant of validVariants) {
            const { error } = await supabase
              .from('product_variants')
              .insert({
                product_id: productId,
                size: variant.size,
                stock: variant.stock,
              });
            
            if (error) {
              throw new Error(`Erreur lors de la mise à jour de la variante: ${error.message}`);
            }
          }

          // Create new images
          for (let i = 0; i < images.length; i++) {
            const { error } = await supabase
              .from('product_images')
              .insert({
                product_id: productId,
                url: images[i],
                position: i,
              });
            
            if (error) {
              throw new Error(`Erreur lors de la mise à jour de l'image: ${error.message}`);
            }
          }
        }
      } else {
        // Create new product
        console.log('Creating product with data:', data);

        const product = await createProduct({
          brand: data.brand,
          model_name: data.model_name,
          description: data.description || null,
          price: data.price,
          color: data.color || null,
          gender: data.gender || null,
          category_id: data.category_id,
        });

        console.log('Product created:', product);

        if (product) {
        // Create variants using Supabase directly
        for (const variant of validVariants) {
          console.log('Creating variant:', variant);
          const { error } = await supabase
            .from('product_variants')
            .insert({
              product_id: product.id,
              size: variant.size,
              stock: variant.stock,
            });
          
          if (error) {
            console.error('Error creating variant:', error);
            throw new Error(`Erreur lors de la création de la variante: ${error.message}`);
          }
        }

        // Create images using Supabase directly
        for (let i = 0; i < images.length; i++) {
          console.log('Creating image:', images[i]);
          const { error } = await supabase
            .from('product_images')
            .insert({
              product_id: product.id,
              url: images[i],
              position: i,
            });
          
          if (error) {
            console.error('Error creating image:', error);
            throw new Error(`Erreur lors de l'ajout de l'image: ${error.message}`);
          }
        }

          toast({
            title: "Succès",
            description: "Produit créé avec succès",
          });

          handleClose();
        }
      }

      toast({
        title: "Succès",
        description: isEditing ? "Produit modifié avec succès" : "Produit créé avec succès",
      });

      handleClose();
    } catch (error) {
      console.error('Full error creating product:', error);
      toast({
        title: "Erreur",
        description: error instanceof Error ? error.message : "Impossible de créer le produit",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    form.reset();
    setVariants([{ size: '', stock: 0 }]);
    setImages([]);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? 'Modifier le produit' : 'Créer un nouveau produit'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Marque *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom de la marque" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom du modèle *</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Nom du modèle" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie *</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prix (€) *</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        {...field}
                        onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                        placeholder="0.00"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Couleur</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Rouge, Violet, etc." />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Genre</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionner un genre" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="homme">Homme</SelectItem>
                        <SelectItem value="femme">Femme</SelectItem>
                        <SelectItem value="enfant">Enfant</SelectItem>
                        <SelectItem value="unisexe">Unisexe</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Description détaillée du produit" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Variants Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-lg font-semibold">Variantes (Tailles/Stock) *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addVariant}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ajouter une taille
                </Button>
              </div>

              {variants.map((variant, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg">
                  <div className="flex-1">
                    <Label>Taille (chiffres uniquement)</Label>
                    <Input
                      value={variant.size}
                      onChange={(e) => updateVariant(index, 'size', e.target.value)}
                      placeholder="Taille numérique (ex: 38, 39, 40...)"
                    />
                  </div>
                  <div className="flex-1">
                    <Label>Stock</Label>
                    <Input
                      type="number"
                      min="0"
                      value={variant.stock}
                      onChange={(e) => updateVariant(index, 'stock', parseInt(e.target.value) || 0)}
                      placeholder="0"
                    />
                  </div>
                  {variants.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeVariant(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Images Section */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Images du produit (max 4)</Label>
              <div className="space-y-2">
                {images.length < 4 && (
                  <ImageUpload
                    value=""
                    onChange={(value) => {
                      if (value && !images.includes(value)) {
                        if (images.length >= 4) {
                          toast({
                            title: "Limite atteinte",
                            description: "Maximum 4 images autorisées par produit",
                            variant: "destructive",
                          });
                          return;
                        }
                        setImages([...images, value]);
                      }
                    }}
                    label="Ajouter une image"
                  />
                )}
                {images.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-muted-foreground">Images ajoutées ({images.length}/4) :</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Image ${index + 1}`} 
                            className="w-full h-24 object-cover rounded border"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="sm"
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => setImages(images.filter((_, i) => i !== index))}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleClose}>
                Annuler
              </Button>
              <Button type="submit" disabled={isSubmitting || !isFormValid}>
                {isSubmitting ? 
                  (isEditing ? 'Modification en cours...' : 'Création en cours...') : 
                  (isEditing ? 'Modifier le produit' : 'Créer le produit')
                }
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}