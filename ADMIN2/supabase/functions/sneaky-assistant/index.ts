import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    const { question } = await req.json();
    console.log('Question reçue:', question);

    if (!question) {
      throw new Error('Aucune question fournie');
    }

    // Créer le client Supabase avec les permissions admin
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Récupérer les données de toutes les tables importantes avec plus de détails
    const [
      { data: products, error: productsError },
      { data: categories, error: categoriesError },
      { data: orders, error: ordersError },
      { data: customers, error: customersError },
      { data: orderItems, error: orderItemsError },
      { data: profiles, error: profilesError },
      { data: reviews, error: reviewsError },
      { data: productVariants, error: variantsError }
    ] = await Promise.all([
      supabase.from('products').select(`
        id, brand, model_name, price, color, gender, description, 
        created_at, updated_at,
        categories(name)
      `).limit(100),
      supabase.from('categories').select('*'),
      supabase.from('orders').select(`
        id, total_amount, status, payment_status, created_at, updated_at,
        customers(first_name, last_name, email)
      `).limit(200),
      supabase.from('customers').select(`
        id, first_name, last_name, email, phone, created_at,
        avatar_url
      `).limit(100),
      supabase.from('order_items').select(`
        id, quantity, unit_price, order_id,
        products(id, brand, model_name, price, color),
        orders(total_amount, status, created_at)
      `).limit(200),
      supabase.from('profiles').select('email, role, created_at').limit(50),
      supabase.from('reviews').select(`
        id, rating, comment, created_at,
        products(brand, model_name),
        customers(first_name, last_name)
      `).limit(100),
      supabase.from('product_variants').select(`
        id, size, stock, product_id,
        products(brand, model_name)
      `).limit(100)
    ]);

    // Vérifier les erreurs
    if (productsError) console.log('Erreur produits:', productsError);
    if (categoriesError) console.log('Erreur catégories:', categoriesError);
    if (ordersError) console.log('Erreur commandes:', ordersError);
    if (customersError) console.log('Erreur clients:', customersError);
    if (orderItemsError) console.log('Erreur articles:', orderItemsError);
    if (profilesError) console.log('Erreur profils:', profilesError);
    if (reviewsError) console.log('Erreur avis:', reviewsError);
    if (variantsError) console.log('Erreur variantes:', variantsError);

    // Calculs statistiques avancés
    const totalRevenue = orders?.reduce((sum, order) => sum + parseFloat(order.total_amount || '0'), 0) || 0;
    const averageOrderValue = orders?.length ? totalRevenue / orders.length : 0;
    const completedOrders = orders?.filter(o => o.status === 'completed') || [];
    const pendingOrders = orders?.filter(o => o.status === 'pending') || [];
    const todaysOrders = orders?.filter(o => {
      const today = new Date().toDateString();
      return new Date(o.created_at).toDateString() === today;
    }) || [];

    // Analyse des clients
    const clientsThisMonth = customers?.filter(c => {
      const clientDate = new Date(c.created_at);
      const now = new Date();
      return clientDate.getMonth() === now.getMonth() && clientDate.getFullYear() === now.getFullYear();
    }) || [];

    // Top produits
    const productSales = {};
    orderItems?.forEach(item => {
      const productKey = `${item.products?.brand} ${item.products?.model_name}`;
      if (!productSales[productKey]) {
        productSales[productKey] = { quantity: 0, revenue: 0 };
      }
      productSales[productKey].quantity += item.quantity;
      productSales[productKey].revenue += item.quantity * parseFloat(item.unit_price);
    });

    const topProducts = Object.entries(productSales)
      .sort(([,a], [,b]) => b.quantity - a.quantity)
      .slice(0, 5);

    // Préparer le contexte enrichi pour l'IA
    const databaseContext = `
DONNÉES COMPLÈTES DE LA BOUTIQUE SNEAKERTREET:

=== STATISTIQUES GLOBALES ===
• Chiffre d'affaires total: ${totalRevenue.toFixed(2)}€
• Panier moyen: ${averageOrderValue.toFixed(2)}€
• Commandes totales: ${orders?.length || 0}
• Commandes complétées: ${completedOrders.length}
• Commandes en attente: ${pendingOrders.length}
• Commandes aujourd'hui: ${todaysOrders.length}
• Clients total: ${customers?.length || 0}
• Nouveaux clients ce mois: ${clientsThisMonth.length}
• Produits en catalogue: ${products?.length || 0}
• Catégories actives: ${categories?.length || 0}

=== TOP PRODUITS (Par quantité vendue) ===
${topProducts.map(([product, stats], index) => 
  `${index + 1}. ${product}: ${stats.quantity} vendus (${stats.revenue.toFixed(2)}€)`
).join('\n') || 'Aucune vente enregistrée'}

=== PRODUITS DÉTAILLÉS (${products?.length || 0} produits) ===
${products?.slice(0, 10).map(p => 
  `• ${p.brand} ${p.model_name}: ${p.price}€ (${p.color || 'N/A'}, ${p.gender || 'Unisexe'}) - Catégorie: ${p.categories?.name || 'N/A'}`
).join('\n') || 'Aucun produit'}

=== COMMANDES RÉCENTES (${orders?.length || 0} total) ===
${orders?.slice(0, 10).map(o => 
  `• #${o.id.slice(0, 8)}: ${o.total_amount}€ (${o.status}) - Client: ${o.customers?.first_name || 'N/A'} ${o.customers?.last_name || ''} - ${new Date(o.created_at).toLocaleDateString()}`
).join('\n') || 'Aucune commande'}

=== CLIENTS DÉTAILLÉS (${customers?.length || 0} clients) ===
${customers?.slice(0, 15).map(c => 
  `• ${c.first_name} ${c.last_name} - ${c.email} ${c.phone ? `(${c.phone})` : ''} - Inscrit: ${new Date(c.created_at).toLocaleDateString()}`
).join('\n') || 'Aucun client'}

=== AVIS CLIENTS (${reviews?.length || 0} avis) ===
${reviews?.slice(0, 10).map(r => 
  `• ${r.rating}/5 étoiles sur ${r.products?.brand} ${r.products?.model_name} par ${r.customers?.first_name || 'Client'} - "${r.comment?.slice(0, 50) || 'Pas de commentaire'}..."`
).join('\n') || 'Aucun avis'}

=== STOCK ET VARIANTES ===
${productVariants?.slice(0, 15).map(v => 
  `• ${v.products?.brand} ${v.products?.model_name} (Taille ${v.size}): ${v.stock} en stock`
).join('\n') || 'Aucune variante'}

=== CATÉGORIES ===
${categories?.map(c => 
  `• ${c.name}: ${c.description || 'Pas de description'}`
).join('\n') || 'Aucune catégorie'}

=== UTILISATEURS SYSTÈME (${profiles?.length || 0} comptes) ===
${profiles?.map(p => 
  `• ${p.email} (${p.role}) - Créé: ${new Date(p.created_at).toLocaleDateString()}`
).join('\n') || 'Aucun utilisateur'}
`;

    console.log('Contexte enrichi préparé, envoi à OpenAI...');

    // Envoyer à OpenAI avec le contexte enrichi
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `Tu es Sneaky, l'assistant IA expert de Sneakertreet, une boutique de sneakers en ligne.

EXPERTISE COMPLÈTE :
🧠 Analytics & Business Intelligence
🎯 Stratégie commerciale et recommandations
📊 Analyse des données clients et comportement d'achat
💰 Optimisation des ventes et du chiffre d'affaires
📈 Prévisions et tendances du marché
🔍 Analyse concurrentielle
👥 Segmentation client et personnalisation
📦 Gestion des stocks et approvisionnement

CAPACITÉS AVANCÉES :
• Analyse en temps réel de toutes les données de la boutique
• Calcul automatique de KPIs et métriques business
• Recommandations personnalisées basées sur les données réelles
• Détection de patterns et anomalies dans les ventes
• Prévisions de demande et optimisation des stocks
• Analyse des performances par produit/catégorie/période
• Conseils stratégiques pour l'amélioration du business

STYLE DE COMMUNICATION :
✅ Professionnel mais accessible
✅ Précis et basé sur les données réelles
✅ Proactif dans les recommandations
✅ Utilise des emojis et mise en forme pour clarifier
✅ Donne des insights actionnables
✅ Explique les métriques complexes simplement

Tu as accès à TOUTES les données actuelles ci-dessous. Utilise-les pour donner des réponses précises, des analyses détaillées et des recommandations stratégiques.

${databaseContext}`
          },
          {
            role: 'user',
            content: question
          }
        ],
        max_tokens: 1500,
        temperature: 0.3
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Erreur OpenAI:', errorText);
      throw new Error(`Erreur OpenAI: ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse OpenAI reçue');

    const answer = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      answer,
      context_info: {
        products_count: products?.length || 0,
        orders_count: orders?.length || 0,
        customers_count: customers?.length || 0,
        categories_count: categories?.length || 0,
        total_revenue: totalRevenue,
        avg_order_value: averageOrderValue,
        pending_orders: pendingOrders.length,
        completed_orders: completedOrders.length,
        new_clients_month: clientsThisMonth.length,
        reviews_count: reviews?.length || 0
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Erreur dans sneaky-assistant:', error);
    return new Response(JSON.stringify({ 
      error: 'Erreur lors du traitement de votre question',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});