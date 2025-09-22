import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Star, ChevronDown, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { Product } from "@/lib/supabaseClient"
import { supabaseServer } from "@/lib/supabaseServer"

export const dynamic = "force-dynamic";

const filters = [
  { name: "Trier par", options: ["Prix croissant", "Prix décroissant", "Nouveautés", "Popularité"] },
  { name: "Marques", options: ["Nike", "Adidas", "Puma", "New Balance", "Converse"] },
  { name: "Tailles", options: ["40", "41", "42", "43", "44", "45", "46"] },
  { name: "Catégories", options: ["Running", "Lifestyle", "Basketball", "Tennis"] },
  { name: "Coloris", options: ["Noir", "Blanc", "Rouge", "Bleu", "Vert"] },
  { name: "Prix", options: ["0-50€", "50-100€", "100-150€", "150€+"] },
  { name: "Promotion", options: ["En promotion", "Nouveautés", "Édition limitée"] },
  { name: "Sous-catégories", options: ["Sneakers", "Baskets", "Chaussures de sport"] },
  { name: "Collections", options: ["Printemps 2024", "Été 2024", "Automne 2024"] },
  { name: "Avis clients", options: ["5 étoiles", "4+ étoiles", "3+ étoiles"] },
]

async function getProducts() {
  if (!supabaseServer) {
    console.error("Supabase server client is not configured. Check environment variables.")
    return []
  }

  const { data: products, error } = await supabaseServer.from("products").select("*").eq("gender", "homme")

  if (error) {
    console.error("Error fetching products:", error)
    return []
  }

  return products as Product[]
}

export default async function HommePage() {
  const products = await getProducts()
  console.log("products", products)

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-muted-foreground mb-4">
          <Link href="/" className="hover:text-foreground">
            ACCUEIL
          </Link>
          <span className="mx-2">›</span>
          <span className="text-foreground font-medium">Homme</span>
        </nav>

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Homme</h1>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground">{products.length} Résultat(s)</span>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <SlidersHorizontal className="h-4 w-4" />
              Masquer filtres et tri
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 space-y-6">
            {filters.map((filter, index) => (
              <div key={index} className="space-y-2">
                <button className="flex items-center justify-between w-full text-left font-medium text-foreground hover:text-primary">
                  {filter.name}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {filter.name === "Promotion" && (
                  <div className="pl-2">
                    <Badge variant="secondary" className="bg-black text-white">
                      Promotions
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={`/abstract-geometric-shapes.png?key=jfurb&height=256&width=256&query=${encodeURIComponent(product.name)}`}
                        alt={product.name}
                        className="w-full h-64 object-cover rounded-t-lg"
                      />
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {/* {product.isPromo && ( */}
                          <Badge variant="secondary" className="bg-black text-white">
                            Promotions
                          </Badge>
                        {/* )} */}
                        {/* {product.isLimited && ( */}
                          <div className="bg-white rounded-full p-2">
                            <div className="text-xs font-bold text-center">
                              <div className="text-orange-500">ÉDITION LIMITÉE</div>
                              <div className="text-orange-500 text-[10px]">ÉDITION LIMITÉE</div>
                            </div>
                          </div>
                        {/* )} */}
                      </div>
                      <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                        <Heart className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="p-4 space-y-2">
                      {/* <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-orange-400 text-orange-400" />
                        <span className="text-sm text-orange-400 font-medium">{product.rating}</span>
                      </div> */}

                      <div className="space-y-1">
                        {/* <p className="text-xs text-muted-foreground font-medium">{product.brand}</p> */}
                        <h3 className="font-medium text-foreground">{product.name}</h3>
                        <p className="text-xs text-muted-foreground">Homme</p>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* {product.discount && <span className="text-sm text-orange-500 font-medium">À partir de</span>} */}
                        <span className="font-bold text-foreground">{Number(product.price).toFixed(2)} €</span>
                        {/* {product.originalPrice && (
                          <>
                            <span className="text-sm text-muted-foreground line-through">
                              {product.originalPrice.toFixed(2)} €
                            </span>
                            <span className="text-sm text-orange-500 font-medium">Jusqu'à {product.discount}</span>
                          </>
                        )} */}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
