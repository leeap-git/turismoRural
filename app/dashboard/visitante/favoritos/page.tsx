"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  Heart,
  MapPin,
  Star,
  Calendar,
  Users,
  Trash2
} from "lucide-react"

const propriedadesFavoritas = [
  {
    id: 1,
    nome: "Fazenda Boa Vista",
    localizacao: "Ourinhos, SP",
    imagem: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    avaliacao: 4.8,
    avaliacoes: 124,
    preco: 150,
    tipo: "Fazenda",
  },
  {
    id: 2,
    nome: "Sítio das Flores",
    localizacao: "Assis, SP",
    imagem: "https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=800&q=80",
    avaliacao: 4.6,
    avaliacoes: 89,
    preco: 120,
    tipo: "Sítio",
  },
  {
    id: 3,
    nome: "Recanto Verde",
    localizacao: "Marília, SP",
    imagem: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80",
    avaliacao: 4.9,
    avaliacoes: 156,
    preco: 180,
    tipo: "Chácara",
  },
]

const atividadesFavoritas = [
  {
    id: 1,
    nome: "Trilha Ecológica na Mata",
    propriedade: "Fazenda Boa Vista",
    imagem: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
    preco: 45,
    data: "15 Dez 2025",
    vagas: 8,
    tipo: "Trilha",
  },
  {
    id: 2,
    nome: "Colheita de Frutas Orgânicas",
    propriedade: "Sítio das Flores",
    imagem: "https://images.unsplash.com/photo-1574856344991-aaa31b6f4ce3?w=800&q=80",
    preco: 35,
    data: "18 Dez 2025",
    vagas: 3,
    tipo: "Colheita",
  },
  {
    id: 3,
    nome: "Passeio a Cavalo",
    propriedade: "Recanto Verde",
    imagem: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?w=800&q=80",
    preco: 80,
    data: "20 Dez 2025",
    vagas: 4,
    tipo: "Passeio",
  },
]

export default function FavoritosPage() {
  const [propriedades, setPropriedades] = useState(propriedadesFavoritas)
  const [atividades, setAtividades] = useState(atividadesFavoritas)

  const removerPropriedade = (id: number) => {
    setPropriedades(propriedades.filter((p) => p.id !== id))
  }

  const removerAtividade = (id: number) => {
    setAtividades(atividades.filter((a) => a.id !== id))
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/visitante" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao painel
            </Link>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground">Meus Favoritos</h1>
            <p className="text-muted-foreground mt-1">
              Propriedades e atividades que você salvou
            </p>
          </div>

          <Tabs defaultValue="propriedades" className="space-y-6">
            <TabsList>
              <TabsTrigger value="propriedades" className="gap-2">
                <Heart className="h-4 w-4" />
                Propriedades ({propriedades.length})
              </TabsTrigger>
              <TabsTrigger value="atividades" className="gap-2">
                <Calendar className="h-4 w-4" />
                Atividades ({atividades.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="propriedades">
              {propriedades.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Heart className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma propriedade favorita</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Explore as propriedades e salve suas favoritas aqui
                    </p>
                    <Button asChild>
                      <Link href="/propriedades">Explorar Propriedades</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {propriedades.map((propriedade) => (
                    <Card key={propriedade.id} className="overflow-hidden group">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={propriedade.imagem}
                          alt={propriedade.nome}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                          onClick={() => removerPropriedade(propriedade.id)}
                        >
                          <Heart className="h-5 w-5 fill-destructive text-destructive" />
                        </Button>
                        <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                          {propriedade.tipo}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{propriedade.nome}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                          <MapPin className="h-3 w-3" />
                          {propriedade.localizacao}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-accent text-accent" />
                            <span className="font-medium">{propriedade.avaliacao}</span>
                            <span className="text-sm text-muted-foreground">
                              ({propriedade.avaliacoes})
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="font-semibold text-primary">
                              R$ {propriedade.preco}
                            </span>
                            <span className="text-sm text-muted-foreground">/noite</span>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button asChild className="flex-1">
                            <Link href={`/propriedades/${propriedade.id}`}>Ver Detalhes</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removerPropriedade(propriedade.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="atividades">
              {atividades.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Nenhuma atividade favorita</h3>
                    <p className="text-muted-foreground text-center mb-4">
                      Explore as atividades e salve suas favoritas aqui
                    </p>
                    <Button asChild>
                      <Link href="/atividades">Explorar Atividades</Link>
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {atividades.map((atividade) => (
                    <Card key={atividade.id} className="overflow-hidden group">
                      <div className="relative aspect-[4/3]">
                        <Image
                          src={atividade.imagem}
                          alt={atividade.nome}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute top-2 right-2 bg-background/80 hover:bg-background"
                          onClick={() => removerAtividade(atividade.id)}
                        >
                          <Heart className="h-5 w-5 fill-destructive text-destructive" />
                        </Button>
                        <Badge className="absolute top-2 left-2 bg-background/80 text-foreground">
                          {atividade.tipo}
                        </Badge>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{atividade.nome}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                          <MapPin className="h-3 w-3" />
                          {atividade.propriedade}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {atividade.data}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {atividade.vagas} vagas
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-primary text-lg">
                            R$ {atividade.preco}
                          </span>
                          <span className="text-sm text-muted-foreground">por pessoa</span>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button asChild className="flex-1">
                            <Link href={`/atividades/${atividade.id}`}>Ver Detalhes</Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => removerAtividade(atividade.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
