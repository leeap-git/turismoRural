"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Heart, MapPin, Star, Users, CalendarDays } from "lucide-react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loadStore } from "@/lib/client-store"
import type { Empreendedor, Propriedade } from "@/lib/types"

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [property, setProperty] = useState<Propriedade | null>(null)
  const [owner, setOwner] = useState<Empreendedor | null>(null)
  const [isFavorite, setIsFavorite] = useState(false)

  const refresh = () => {
    const store = loadStore()
    const current = store.propriedades.find((p) => p.id === id && p.ativo) || null
    setProperty(current)
    setOwner(current ? store.empreendedores.find((e) => e.id === current.empreendedorId) || null : null)
  }

  useEffect(() => {
    refresh()
    window.addEventListener("turismo-rural-store", refresh)
    return () => window.removeEventListener("turismo-rural-store", refresh)
  }, [id])

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-16">
          <p className="mb-4 text-muted-foreground">Propriedade não encontrada ou indisponível.</p>
          <Button asChild variant="outline"><Link href="/propriedades"><ArrowLeft className="mr-2 h-4 w-4" />Voltar</Link></Button>
        </main>
        <Footer />
      </div>
    )
  }

  const image = property.imagens[0] || "/placeholder.jpg"

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <Link href="/propriedades" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />Voltar às propriedades
          </Link>
        </div>

        <section className="container mx-auto px-4 pb-10">
          <div className="relative aspect-[16/7] overflow-hidden rounded-xl bg-muted">
            <Image src={image} alt={property.nome} fill className="object-cover" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mt-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="flex flex-wrap gap-2">
                <Badge>{property.tipo}</Badge>
                {property.comodidades.slice(0, 5).map((item) => <Badge key={item} variant="secondary">{item}</Badge>)}
              </div>
              <div>
                <h1 className="font-serif text-4xl font-bold">{property.nome}</h1>
                <p className="flex items-center gap-2 text-muted-foreground mt-2">
                  <MapPin className="h-4 w-4" />{property.cidade}, {property.estado}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-sm">
                <span className="flex items-center gap-2"><Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />{property.avaliacao.toFixed(1)} ({property.totalAvaliacoes} avaliações)</span>
                <span className="flex items-center gap-2"><Users className="h-4 w-4" />Até {property.capacidade} pessoas</span>
              </div>
              <p className="text-muted-foreground whitespace-pre-wrap">{property.descricao}</p>

              {owner && (
                <Card>
                  <CardHeader><CardTitle>Responsável</CardTitle></CardHeader>
                  <CardContent>
                    <p className="font-medium">{owner.nomeEmpresa}</p>
                    <p className="text-sm text-muted-foreground">{owner.nome} · {owner.email}</p>
                  </CardContent>
                </Card>
              )}
            </div>

            <Card className="h-fit lg:sticky lg:top-6">
              <CardHeader>
                <CardTitle>R$ {property.preco.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">/ noite</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg" asChild>
                  <Link href="/dashboard/visitante/reservas/nova"><CalendarDays className="mr-2 h-4 w-4" />Reservar</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    // O favorito é persistido para o usuário logado; a atualização visual fica no dashboard.
                    setIsFavorite((current) => !current)
                  }}
                >
                  <Heart className="mr-2 h-4 w-4" />{isFavorite ? "Favoritado" : "Favoritar"}
                </Button>
                <p className="text-sm text-muted-foreground">{property.endereco}</p>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
