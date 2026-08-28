"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarCheck,
  ArrowLeft,
  Upload,
  X,
  Save,
  Clock,
  Users,
  DollarSign
} from "lucide-react"

export default function EditarAtividadePage() {
  const params = useParams()
  const [imagens, setImagens] = useState([
    "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80",
    "https://images.unsplash.com/photo-1501555088652-021faa106b9b?w=400&q=80",
  ])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-64 shrink-0">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Building2 className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="font-semibold text-foreground">Fazenda Bela Vista</h2>
                    <p className="text-sm text-muted-foreground">Ourinhos, SP</p>
                    <Badge className="mt-2">Empreendedor</Badge>
                  </div>

                  <nav className="space-y-1">
                    <Link 
                      href="/dashboard/empreendedor" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Painel Geral
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/propriedade" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <Building2 className="h-4 w-4" />
                      Minha Propriedade
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/atividades" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      <Calendar className="h-4 w-4" />
                      Atividades/Eventos
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/reservas" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <CalendarCheck className="h-4 w-4" />
                      Reservas
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/mensagens" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Mensagens
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/relatorios" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
                    >
                      <BarChart3 className="h-4 w-4" />
                      Relatórios
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/configuracoes" 
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
              <div className="flex items-center gap-4">
                <Button variant="outline" size="icon" asChild>
                  <Link href="/dashboard/empreendedor/atividades">
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground">
                    Editar Atividade
                  </h1>
                  <p className="text-muted-foreground">
                    Atualize as informações da atividade
                  </p>
                </div>
              </div>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Informações Básicas</CardTitle>
                    <CardDescription>Dados principais da atividade</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="nome">Nome da Atividade *</Label>
                        <Input id="nome" defaultValue="Trilha Ecológica" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="categoria">Categoria *</Label>
                        <Input id="categoria" defaultValue="Aventura" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="descricao">Descrição *</Label>
                      <Textarea 
                        id="descricao" 
                        rows={4}
                        defaultValue="Trilha guiada pela mata nativa da fazenda, com duração de aproximadamente 3 horas. Durante o percurso, os visitantes poderão observar a fauna e flora local, além de conhecer pontos históricos da propriedade."
                      />
                    </div>

                    <div className="grid gap-4 md:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="duracao">Duração</Label>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <Input id="duracao" defaultValue="3 horas" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="capacidade">Capacidade máxima</Label>
                        <div className="flex items-center gap-2">
                          <Users className="h-4 w-4 text-muted-foreground" />
                          <Input id="capacidade" type="number" defaultValue="15" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="preco">Preço por pessoa</Label>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <Input id="preco" type="number" defaultValue="80" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Fotos da Atividade</CardTitle>
                    <CardDescription>Adicione fotos atraentes (mínimo 2 fotos)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {imagens.map((img, index) => (
                        <div key={index} className="relative group aspect-square rounded-lg overflow-hidden">
                          <Image
                            src={img}
                            alt={`Foto ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button 
                            onClick={() => setImagens(imagens.filter((_, i) => i !== index))}
                            className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      <button className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                        <Upload className="h-8 w-8" />
                        <span className="text-sm">Adicionar</span>
                      </button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Requisitos e Observações</CardTitle>
                    <CardDescription>O que os visitantes precisam saber</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="requisitos">Requisitos</Label>
                      <Textarea 
                        id="requisitos" 
                        rows={3}
                        defaultValue="- Idade mínima: 10 anos&#10;- Usar calçado fechado apropriado&#10;- Levar água e protetor solar"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="incluso">O que está incluso</Label>
                      <Textarea 
                        id="incluso" 
                        rows={2}
                        defaultValue="- Guia especializado&#10;- Lanche durante a trilha&#10;- Equipamentos de segurança"
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button variant="outline" asChild>
                    <Link href="/dashboard/empreendedor/atividades">Cancelar</Link>
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
