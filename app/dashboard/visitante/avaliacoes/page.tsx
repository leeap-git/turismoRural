"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { 
  User, 
  Settings, 
  LogOut, 
  Search,
  Calendar,
  Star,
  MapPin,
  MessageSquare,
  Heart,
  Edit,
  ThumbsUp
} from "lucide-react"

const avaliacoes = [
  {
    id: "1",
    propriedade: "Fazenda Bela Vista",
    imagem: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80",
    local: "Ourinhos, SP",
    dataVisita: "15/02/2026",
    nota: 5,
    comentario: "Experiência incrível! A fazenda é muito bem cuidada e os anfitriões são super atenciosos. As trilhas são maravilhosas e a comida caseira é deliciosa. Recomendo para quem quer desconectar da cidade.",
    dataAvaliacao: "20/02/2026",
    resposta: "Muito obrigado pela avaliação, Maria! Foi um prazer recebê-la. Esperamos vê-la novamente em breve!",
    util: 12,
  },
  {
    id: "2",
    propriedade: "Sítio Recanto Verde",
    imagem: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
    local: "Marília, SP",
    dataVisita: "10/01/2026",
    nota: 4,
    comentario: "Lugar muito bonito e tranquilo. As atividades são bem organizadas. Único ponto de melhoria seria o café da manhã que poderia ter mais variedade. No geral, recomendo!",
    dataAvaliacao: "15/01/2026",
    resposta: null,
    util: 8,
  },
  {
    id: "3",
    propriedade: "Pousada Serra Azul",
    imagem: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400&q=80",
    local: "Assis, SP",
    dataVisita: "25/12/2025",
    nota: 5,
    comentario: "Passamos o réveillon aqui e foi simplesmente mágico. A vista da serra é de tirar o fôlego, especialmente ao nascer do sol. Os quartos são confortáveis e limpos.",
    dataAvaliacao: "02/01/2026",
    resposta: "Obrigado pela avaliação! Ficamos muito felizes que vocês tenham aproveitado o réveillon conosco. Voltem sempre!",
    util: 24,
  },
]

const avaliacoesPendentes = [
  {
    id: "4",
    propriedade: "Chácara Água Viva",
    imagem: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=400&q=80",
    local: "Presidente Prudente, SP",
    dataVisita: "01/03/2026",
  },
]

export default function AvaliacoesVisitantePage() {
  const [editandoId, setEditandoId] = useState<string | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full md:w-64 shrink-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <User className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">João da Silva</h2>
                    <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
                    <Badge variant="secondary" className="mt-2">Visitante</Badge>
                  </div>

                  <nav className="space-y-1">
                    <Link 
                      href="/dashboard/visitante" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Calendar className="h-4 w-4" />
                      Minhas Reservas
                    </Link>
                    <Link 
                      href="/dashboard/visitante/favoritos" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Heart className="h-4 w-4" />
                      Favoritos
                    </Link>
                    <Link 
                      href="/dashboard/visitante/avaliacoes" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      <Star className="h-4 w-4" />
                      Minhas Avaliações
                    </Link>
                    <Link 
                      href="/dashboard/visitante/mensagens" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagens
                    </Link>
                    <Link 
                      href="/propriedades" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Search className="h-4 w-4" />
                      Buscar Propriedades
                    </Link>
                    <Link 
                      href="/dashboard/visitante/perfil" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      Configurações
                    </Link>
                    <button className="flex items-center gap-3 px-3 py-2 rounded-md text-destructive hover:bg-destructive/10 transition-colors w-full">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </aside>

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              <div>
                <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Minhas Avaliações
                </h1>
                <p className="text-muted-foreground">
                  Gerencie suas avaliações e veja as respostas dos empreendedores
                </p>
              </div>

              {/* Avaliações Pendentes */}
              {avaliacoesPendentes.length > 0 && (
                <Card className="border-accent">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-accent" />
                      Avaliações Pendentes
                    </CardTitle>
                    <CardDescription>
                      Você visitou estes lugares recentemente. Que tal deixar uma avaliação?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {avaliacoesPendentes.map((pendente) => (
                        <div key={pendente.id} className="flex items-center gap-4 p-4 bg-accent/10 rounded-lg">
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={pendente.imagem}
                              alt={pendente.propriedade}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-foreground">{pendente.propriedade}</h3>
                            <p className="text-sm text-muted-foreground">
                              <MapPin className="h-3 w-3 inline mr-1" />
                              {pendente.local} - Visitado em {pendente.dataVisita}
                            </p>
                          </div>
                          <Button>
                            <Star className="h-4 w-4 mr-2" />
                            Avaliar
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Avaliações Realizadas */}
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-foreground">Avaliações Realizadas</h2>
                
                {avaliacoes.map((avaliacao) => (
                  <Card key={avaliacao.id}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={avaliacao.imagem}
                            alt={avaliacao.propriedade}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <Link 
                                href={`/propriedades/${avaliacao.id}`}
                                className="font-semibold text-foreground hover:text-primary transition-colors"
                              >
                                {avaliacao.propriedade}
                              </Link>
                              <p className="text-sm text-muted-foreground">
                                <MapPin className="h-3 w-3 inline mr-1" />
                                {avaliacao.local}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`h-4 w-4 ${i < avaliacao.nota ? "text-accent fill-accent" : "text-muted"}`} 
                                />
                              ))}
                            </div>
                          </div>

                          <div className="text-sm text-muted-foreground">
                            Visitado em {avaliacao.dataVisita} | Avaliado em {avaliacao.dataAvaliacao}
                          </div>

                          {editandoId === avaliacao.id ? (
                            <div className="space-y-3">
                              <Textarea 
                                defaultValue={avaliacao.comentario}
                                rows={3}
                              />
                              <div className="flex gap-2">
                                <Button size="sm">Salvar</Button>
                                <Button size="sm" variant="outline" onClick={() => setEditandoId(null)}>
                                  Cancelar
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-foreground">{avaliacao.comentario}</p>
                          )}

                          <div className="flex items-center gap-4 text-sm">
                            <button className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                              <ThumbsUp className="h-4 w-4" />
                              {avaliacao.util} pessoas acharam útil
                            </button>
                            <button 
                              onClick={() => setEditandoId(avaliacao.id)}
                              className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                              Editar
                            </button>
                          </div>

                          {avaliacao.resposta && (
                            <div className="mt-4 p-4 bg-muted rounded-lg">
                              <p className="text-sm font-medium text-foreground mb-1">
                                Resposta do empreendedor:
                              </p>
                              <p className="text-sm text-muted-foreground">{avaliacao.resposta}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Estatísticas */}
              <Card>
                <CardHeader>
                  <CardTitle>Suas Estatísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold text-foreground">{avaliacoes.length}</p>
                      <p className="text-sm text-muted-foreground">Avaliações</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold text-foreground">4.7</p>
                      <p className="text-sm text-muted-foreground">Média</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold text-foreground">44</p>
                      <p className="text-sm text-muted-foreground">Úteis</p>
                    </div>
                    <div className="text-center p-4 bg-muted rounded-lg">
                      <p className="text-3xl font-bold text-foreground">2</p>
                      <p className="text-sm text-muted-foreground">Respostas</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
