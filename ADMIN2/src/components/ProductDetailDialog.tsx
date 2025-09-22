import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Product } from '@/types/database';

interface ProductDetailDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDetailDialog({ product, open, onOpenChange }: ProductDetailDialogProps) {
  if (!product) return null;

  const totalStock = product.variants?.reduce((sum, variant) => sum + variant.stock, 0) || 0;
  const getStockStatus = () => {
    if (totalStock === 0) return { label: 'Rupture', variant: 'destructive' as const };
    if (totalStock < 10) return { label: 'Stock bas', variant: 'warning' as const };
    return { label: 'En stock', variant: 'success' as const };
  };

  const stockStatus = getStockStatus();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-hidden p-0 flex flex-col">
        {/* Header fixe */}
        <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 border-b flex-shrink-0">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
              {product.brand} {product.model_name}
            </DialogTitle>
            <p className="text-muted-foreground mt-2">
              {product.category?.name || 'Sans catégorie'} • {Number(product.price).toFixed(2)}€
            </p>
          </DialogHeader>
        </div>

        {/* Contenu scrollable avec scroll personnalisé */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 transition-colors">
          <div className="p-6">
            <div className="space-y-8 animate-fade-in">
              
              {/* Images avec design amélioré */}
              {product.images && product.images.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold flex items-center gap-2">
                    <div className="w-1 h-6 bg-primary rounded-full"></div>
                    Images du produit
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {product.images.map((image: any, index: number) => (
                      <div 
                        key={index}
                        className="group relative overflow-hidden rounded-xl border shadow-sm hover:shadow-lg transition-all duration-300 hover-scale"
                      >
                        <img 
                          src={image.url} 
                          alt={`${product.brand} ${product.model_name} - Image ${index + 1}`} 
                          className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Informations principales dans une grille moderne */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Section informations générales */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-2xl border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      Informations générales
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center py-2 border-b border-muted">
                        <span className="font-medium text-muted-foreground">Marque</span>
                        <span className="font-semibold">{product.brand}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-muted">
                        <span className="font-medium text-muted-foreground">Modèle</span>
                        <span className="font-semibold">{product.model_name}</span>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-muted">
                        <span className="font-medium text-muted-foreground">Catégorie</span>
                        <Badge variant="secondary">{product.category?.name || 'Sans catégorie'}</Badge>
                      </div>
                      <div className="flex justify-between items-center py-2 border-b border-muted">
                        <span className="font-medium text-muted-foreground">Prix</span>
                        <span className="text-2xl font-bold text-primary">{Number(product.price).toFixed(2)}€</span>
                      </div>
                      {product.color && (
                        <div className="flex justify-between items-center py-2 border-b border-muted">
                          <span className="font-medium text-muted-foreground">Couleur</span>
                          <span className="font-semibold">{product.color}</span>
                        </div>
                      )}
                      {product.gender && (
                        <div className="flex justify-between items-center py-2">
                          <span className="font-medium text-muted-foreground">Genre</span>
                          <Badge variant="outline">{product.gender}</Badge>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Description avec style amélioré */}
                  {product.description && (
                    <div className="bg-gradient-to-br from-muted/30 to-muted/20 p-6 rounded-2xl border">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Description
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                    </div>
                  )}
                </div>

                {/* Section stock et variantes */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-muted/50 to-muted/30 p-6 rounded-2xl border">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <div className="w-1 h-6 bg-primary rounded-full"></div>
                      Stock global
                    </h3>
                    <div className="text-center py-6">
                      <div className="inline-flex items-center gap-4 bg-background p-4 rounded-xl border shadow-sm">
                        <div className="text-center">
                          <span className="text-4xl font-bold text-primary">{totalStock}</span>
                          <p className="text-sm text-muted-foreground mt-1">unités disponibles</p>
                        </div>
                        <div className="w-px h-12 bg-border"></div>
                        <Badge variant={stockStatus.variant} className="text-sm px-4 py-2">
                          {stockStatus.label}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Variantes avec pastilles améliorées */}
                  {product.variants && product.variants.length > 0 && (
                    <div className="bg-gradient-to-br from-muted/30 to-muted/20 p-6 rounded-2xl border">
                      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-primary rounded-full"></div>
                        Disponibilité par taille
                      </h3>
                      <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/10 scrollbar-track-transparent">
                        {product.variants.map((variant: any) => {
                          const getAvailabilityStatus = (stock: number) => {
                            if (stock === 0) return { 
                              label: 'Indisponible', 
                              variant: 'destructive' as const, 
                              color: 'bg-gradient-to-r from-red-500 to-red-600',
                              textColor: 'text-red-700',
                              bgColor: 'bg-red-50 border-red-200'
                            };
                            if (stock <= 5) return { 
                              label: 'Critique', 
                              variant: 'destructive' as const, 
                              color: 'bg-gradient-to-r from-orange-500 to-orange-600',
                              textColor: 'text-orange-700',
                              bgColor: 'bg-orange-50 border-orange-200'
                            };
                            if (stock <= 15) return { 
                              label: 'Modéré', 
                              variant: 'warning' as const, 
                              color: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
                              textColor: 'text-yellow-700',
                              bgColor: 'bg-yellow-50 border-yellow-200'
                            };
                            return { 
                              label: 'Disponible', 
                              variant: 'success' as const, 
                              color: 'bg-gradient-to-r from-green-500 to-green-600',
                              textColor: 'text-green-700',
                              bgColor: 'bg-green-50 border-green-200'
                            };
                          };

                          const status = getAvailabilityStatus(variant.stock);
                          
                          return (
                            <div key={variant.id} className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${status.bgColor}`}>
                              <div className="flex items-center gap-3">
                                <div className={`w-4 h-4 rounded-full ${status.color} shadow-sm`}></div>
                                <div>
                                  <span className="font-semibold">Taille {variant.size}</span>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    Seuils: Critique ≤5, Modéré ≤15, Disponible 16+
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className={`font-bold text-lg ${status.textColor}`}>
                                  {variant.stock}
                                </div>
                                <Badge variant={status.variant} className="text-xs mt-1">
                                  {status.label}
                                </Badge>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Légende modernisée */}
                      <div className="mt-6 p-4 bg-background/80 backdrop-blur-sm rounded-xl border">
                        <h5 className="font-semibold text-sm mb-3 text-center">Légende des seuils</h5>
                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-green-50 border border-green-200">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-600"></div>
                            <span className="font-medium">Disponible (16+)</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-yellow-50 border border-yellow-200">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600"></div>
                            <span className="font-medium">Modéré (6-15)</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-orange-50 border border-orange-200">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-500 to-orange-600"></div>
                            <span className="font-medium">Critique (1-5)</span>
                          </div>
                          <div className="flex items-center gap-2 p-2 rounded-lg bg-red-50 border border-red-200">
                            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-600"></div>
                            <span className="font-medium">Indisponible (0)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Section Reviews avec design premium */}
              <div className="bg-gradient-to-br from-muted/20 to-muted/10 p-8 rounded-3xl border">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold flex items-center gap-3">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/60 rounded-full"></div>
                    Avis clients
                  </h3>
                  {product.reviews && product.reviews.length > 0 && (
                    <div className="flex items-center gap-3 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm">
                      <div className="flex text-lg">
                        {[...Array(5)].map((_, i) => {
                          const avgRating = product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length;
                          return (
                            <span 
                              key={i} 
                              className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}
                            >
                              ★
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        ({product.reviews.length} avis)
                      </span>
                    </div>
                  )}
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <>
                    {/* Note moyenne avec design premium */}
                    <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border border-yellow-200 rounded-2xl p-6 mb-8 shadow-sm">
                      <div className="flex items-center justify-center gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-yellow-600 mb-2">
                            {(product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length).toFixed(1)}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">sur 5 étoiles</div>
                        </div>
                        <div className="text-center">
                          <div className="flex text-3xl mb-2">
                            {[...Array(5)].map((_, i) => {
                              const avgRating = product.reviews.reduce((sum: number, review: any) => sum + review.rating, 0) / product.reviews.length;
                              return (
                                <span 
                                  key={i} 
                                  className={i < Math.round(avgRating) ? 'text-yellow-400' : 'text-gray-300'}
                                >
                                  ★
                                </span>
                              );
                            })}
                          </div>
                          <div className="text-sm text-muted-foreground font-medium">
                            Basé sur {product.reviews.length} avis
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Liste des avis avec design amélioré et scroll */}
                    <div className="space-y-4 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent hover:scrollbar-thumb-primary/40 pr-2">
                      {product.reviews.map((review: any) => (
                        <div key={review.id} className="bg-background/80 backdrop-blur-sm p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all duration-200">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="flex text-lg">
                                {[...Array(5)].map((_, i) => (
                                  <span 
                                    key={i} 
                                    className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                              <Badge variant="secondary" className="font-medium">
                                {review.rating}/5
                              </Badge>
                            </div>
                            <span className="text-xs text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                              {new Date(review.created_at).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          {review.comment && (
                            <p className="text-sm leading-relaxed text-muted-foreground">{review.comment}</p>
                          )}
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4 opacity-50">💬</div>
                    <p className="text-xl font-semibold mb-2">Aucun avis pour le moment</p>
                    <p className="text-muted-foreground">Soyez le premier à donner votre avis sur ce produit</p>
                  </div>
                )}
              </div>

              {/* Métadonnées avec design épuré */}
              <div className="bg-gradient-to-br from-muted/20 to-muted/10 p-6 rounded-2xl border">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-1 h-5 bg-primary rounded-full"></div>
                  Informations système
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="bg-background/50 p-3 rounded-lg border">
                    <span className="font-medium text-muted-foreground block mb-1">Créé le</span>
                    <span className="font-semibold">{new Date(product.created_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg border">
                    <span className="font-medium text-muted-foreground block mb-1">Modifié le</span>
                    <span className="font-semibold">{new Date(product.updated_at).toLocaleDateString('fr-FR')}</span>
                  </div>
                  <div className="bg-background/50 p-3 rounded-lg border">
                    <span className="font-medium text-muted-foreground block mb-1">ID</span>
                    <span className="font-mono text-xs">{product.id}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}