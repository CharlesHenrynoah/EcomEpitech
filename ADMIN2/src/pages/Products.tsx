import { useState } from 'react';
import { Search, Filter, Plus, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ProductForm } from '@/components/ProductForm';
import { ProductDetailDialog } from '@/components/ProductDetailDialog';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import { Product, GenderEnum } from '@/types/database';

const Products = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedGender, setSelectedGender] = useState<'all' | GenderEnum>('all');
  const [showProductForm, setShowProductForm] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | null>(null);
  const [productToView, setProductToView] = useState<Product | null>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  
  const { products, loading, deleteProduct } = useProducts({
    search: searchQuery,
    category_id: selectedCategory === 'all' ? undefined : selectedCategory,
    gender: selectedGender === 'all' ? undefined : selectedGender,
  });
  const { categories } = useCategories();

  const filteredProducts = products.filter(product => {
    const matchesSearch = `${product.brand} ${product.model_name}`.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_id === selectedCategory;
    const matchesGender = selectedGender === 'all' || product.gender === selectedGender;
    return matchesSearch && matchesCategory && matchesGender;
  });

  const getStockStatus = (variants: any[]) => {
    const totalStock = variants?.reduce((sum, variant) => sum + variant.stock, 0) || 0;
    if (totalStock === 0) return { label: 'Rupture', variant: 'destructive' as const };
    if (totalStock < 10) return { label: 'Stock bas', variant: 'warning' as const };
    return { label: 'En stock', variant: 'success' as const };
  };

  const handleViewProduct = (product: Product) => {
    setProductToView(product);
    setShowDetailDialog(true);
  };

  const handleEditProduct = (product: Product) => {
    setProductToEdit(product);
    setShowProductForm(true);
  };

  // Suppression désactivée : pas de handler

  // Suppression désactivée : pas de confirmation

  const handleCloseProductForm = (open: boolean) => {
    setShowProductForm(open);
    if (!open) {
      setProductToEdit(null);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Catalogue Produits</h1>
          <p className="text-muted-foreground">
            Gérez vos produits et leurs informations
          </p>
        </div>
        
        <Button className="gap-2" onClick={() => setShowProductForm(true)}>
          <Plus className="h-4 w-4" />
          Nouveau Produit
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Rechercher un produit..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Catégorie
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedCategory('all')}>
                Toutes les catégories
              </DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem 
                  key={category.id} 
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Genre
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSelectedGender('all')}>
                Tous les genres
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedGender('homme')}>Homme</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedGender('femme')}>Femme</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedGender('enfant')}>Enfant</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedGender('unisexe')}>Unisexe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Badge variant="secondary" className="ml-auto">
            {filteredProducts.length} produits
          </Badge>
        </div>
      </Card>

      {/* Products Table */}
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produit</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead>Prix</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Chargement des produits...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  Aucun produit trouvé
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product.variants);
                const totalStock = product.variants?.reduce((sum, variant) => sum + variant.stock, 0) || 0;
                return (
                  <TableRow key={product.id} className="table-row">
                    <TableCell className="font-medium">
                      <div>
                        <p className="font-semibold">{product.brand}</p>
                        <p className="text-sm text-muted-foreground">{product.model_name}</p>
                        {product.color && (
                          <p className="text-xs text-muted-foreground">{product.color}</p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{product.category?.name || 'Sans catégorie'}</TableCell>
                    <TableCell className="font-medium">{Number(product.price).toFixed(2)}€</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span>{totalStock}</span>
                        <Badge variant={stockStatus.variant} className="text-xs">
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="success">
                        Actif
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleViewProduct(product)}
                          title="Voir les détails"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditProduct(product)}
                          title="Modifier"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        {/* Bouton Supprimer retiré */}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Product Form Modal */}
      <ProductForm 
        open={showProductForm} 
        onOpenChange={handleCloseProductForm}
        productToEdit={productToEdit}
      />

      {/* Product Detail Modal */}
      <ProductDetailDialog
        product={productToView}
        open={showDetailDialog}
        onOpenChange={setShowDetailDialog}
      />

      {/* Suppression désactivée : pas de modal de confirmation */}
    </div>
  );
};

export default Products;