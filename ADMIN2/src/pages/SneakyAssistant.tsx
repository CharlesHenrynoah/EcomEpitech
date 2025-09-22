import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { MessageCircle, Send, Bot, User, Loader2, Brain, Database, Zap } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SneakyAssistantPage = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: '🤖 Salut ! Je suis **Sneaky**, votre assistant IA de gestion Sneakertreet.\n\n🧠 **Mes capacités :**\n• Analyse complète de vos données (produits, commandes, clients)\n• Statistiques et métriques en temps réel\n• Recommandations stratégiques personnalisées\n• Analyse des tendances et prévisions\n• Support technique et aide à la décision\n\n📊 J\'ai accès à toutes vos données : base clients, historique des commandes, inventaire, catégories, et bien plus !\n\n**Comment puis-je vous aider aujourd\'hui ?**',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [contextInfo, setContextInfo] = useState<any>(null);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    // Évite l'auto-scroll au premier rendu pour garder l'écran au même état initial
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    // Auto-scroll vers le bas quand de nouveaux messages arrivent après le premier rendu
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Forcer une position de départ cohérente quand la page s'ouvre
    window.scrollTo({ top: 0, behavior: 'auto' });
    // S'assurer que les suggestions sont visibles à l'ouverture de la page
    setShowSuggestions(true);
  }, []);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    // Cacher les suggestions quand on envoie un message
    setShowSuggestions(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('sneaky-assistant', {
        body: { question: input.trim() }
      });

      if (error) {
        throw error;
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.answer || 'Désolé, je n\'ai pas pu traiter votre question.',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);

      // Mettre à jour les informations de contexte
      if (data.context_info) {
        setContextInfo(data.context_info);
      }

    } catch (error) {
      console.error('Erreur lors de l\'envoi du message:', error);
      toast({
        title: "Erreur",
        description: "Impossible de communiquer avec Sneaky. Veuillez réessayer.",
        variant: "destructive",
      });

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: '❌ Désolé, j\'ai rencontré un problème technique. Pouvez-vous reformuler votre question ?',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatMessage = (content: string) => {
    // Remplacer le markdown simple
    return content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br/>');
  };

  const quickQuestions = [
    "Analyse l'activité de cette semaine",
    "Quels sont les produits les plus vendus ?",
    "Combien de nouveaux clients ce mois ?",
    "Quel est le chiffre d'affaires total ?",
    "Montre-moi les statistiques des commandes",
    "Quelles catégories performent le mieux ?"
  ];

  return (
    <div className="space-y-6 animate-fade-in max-w-6xl mx-auto w-full">
      {/* Header avec statistiques */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Bot className="h-8 w-8 text-primary" />
            Sneaky Assistant IA
          </h1>
          <p className="text-muted-foreground">
            Votre assistant intelligent pour la gestion de Sneakertreet
          </p>
        </div>

        {contextInfo && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <Database className="h-4 w-4 text-primary" />
              <span>Accès à {contextInfo.products_count} produits, {contextInfo.customers_count} clients</span>
            </div>
            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Capacités de Sneaky */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Brain className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Analyse Intelligente</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Analyse approfondie de vos données et recommandations stratégiques
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Database className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Accès Complet</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Accès en temps réel à tous vos produits, clients et commandes
          </p>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap className="h-5 w-5 text-primary" />
            <h3 className="font-semibold">Réponses Rapides</h3>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Réponses instantanées et aide à la prise de décision
          </p>
        </Card>
      </div>

      {/* Interface de chat */}
      <Card className="flex flex-col h-[600px] max-w-5xl mx-auto w-full">
        {/* Messages */}
        <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <Avatar className={`h-8 w-8 shrink-0 ${message.type === 'user' ? 'bg-secondary' : 'bg-primary text-primary-foreground'}`}>
                  {message.type === 'user' ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </Avatar>
                <div className={`max-w-[85%] ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <div 
                      className="text-sm whitespace-pre-wrap"
                      dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-2">
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </Avatar>
                <div className="bg-muted rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm">Sneaky analyse vos données...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Suggestions défilantes */}
        {showSuggestions && (
          <div className="px-4 pb-2 animate-fade-in">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2">
              {quickQuestions.map((question, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap text-xs shrink-0 h-8"
                  onClick={() => {
                    setInput(question);
                    setShowSuggestions(false);
                  }}
                  disabled={isLoading}
                >
                  <MessageCircle className="h-3 w-3 mr-1" />
                  {question}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t bg-background/50">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Posez votre question à Sneaky..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={sendMessage} 
              disabled={!input.trim() || isLoading}
              size="icon"
              className="shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Sneaky peut analyser vos produits, commandes, clients et donner des conseils de gestion
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SneakyAssistantPage;