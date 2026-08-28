"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Plus, Edit, Trash2, Eye, MapPin, Calendar, MoreHorizontal, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const propriedadesData = [
  {
    id: "1",
    nome: "Fazenda Esperança",
    cidade: "Ourinhos",
    estado: "SP",
    status: "ativa",
    atividades: 5,
    reservas: 23,
    imagem: "/placeholder.svg?height=200&width=300",
    dataCriacao: "15/01/2024",
  },
  {
    id: "2",
    nome: "Sítio Bela Vista",
    cidade: "Santa Cruz do Rio Pardo",
    estado: "SP",
    status: "ativa",
    atividades: 3,
    reservas: 12,
    imagem: "/placeholder.svg?height=200&width=300",
    dataCriacao: "20/02/2024",
  },
  {
    id: "3",
    nome: "Rancho do Sol",
    cidade: "Chavantes",
    estado: "SP",
    status: "inativa",
    atividades: 2,
    reservas: 0,
    imagem: "/placeholder.svg?height=200&width=300",
    dataCriacao: "10/03/2024",
  },
]

export default function PropriedadesEmpreendedorPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const filteredPropriedades = propriedadesData.filter((prop) =>
    prop.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    prop.cidade.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setSelectedId(id)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/empreendedor" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar ao Painel
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Minhas Propriedades</h1>
              <p className="text-muted-foreground">Gerencie suas propriedades rurais cadastradas</p>
            </div>
            <Button asChild>
              <Link href="/dashboard/empreendedor/propriedades/nova" className="gap-2">
                <Plus className="h-4 w-4" />
                Nova Propriedade
              </Link>
            </Button>
          </div>

          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou cidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPropriedades.map((prop) => (
              <Card key={prop.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={prop.imagem}
                    alt={prop.nome}
                    className="object-cover w-full h-full"
                  />
                  <Badge 
                    className="absolute top-2 right-2"
                    variant={prop.status === "ativa" ? "default" : "secondary"}
                  >
                    {prop.status === "ativa" ? "Ativa" : "Inativa"}
                  </Badge>
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{prop.nome}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/propriedades/${prop.id}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            Visualizar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/empreendedor/propriedades/${prop.id}/editar`}>
                            <Edit className="h-4 w-4 mr-2" />
                            Editar
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-destructive"
                          onClick={() => handleDelete(prop.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {prop.cidade}, {prop.estado}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{prop.atividades} atividades</span>
                    <span>{prop.reservas} reservas</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    Criada em {prop.dataCriacao}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPropriedades.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Nenhuma propriedade encontrada.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir Propriedade</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir esta propriedade? Esta ação não pode ser desfeita e todas as atividades e reservas associadas serão removidas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
