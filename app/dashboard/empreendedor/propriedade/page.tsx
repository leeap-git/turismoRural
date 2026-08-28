"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Building2, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  LogOut,
  CalendarCheck,
  MapPin,
  Upload,
  X,
  Save,
  Eye,
  Wifi,
  Car,
  Coffee,
  Utensils,
  Trees,
  Dog
} from "lucide-react"

const comodidades = [
  { id: "wifi", label: "Wi-Fi", icon: Wifi },
  { id: "estacionamento", label: "Estacionamento", icon: Car },
  { id: "cafe", label: "Café da manhã", icon: Coffee },
  { id: "refeicoes", label: "Refeições inclusas", icon: Utensils },
  { id: "trilhas", label: "Trilhas", icon: Trees },
  { id: "pets", label: "Aceita pets", icon: Dog },
]

export default function MinhaPropriedadePage() {
  const [selectedComodidades, setSelectedComodidades] = useState<string[]>(["wifi", "estacionamento", "cafe", "trilhas"])
  const [imagens, setImagens] = useState([
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=400&q=80",
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=400&q=80",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&q=80",
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
                      className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
                    >
                      <Building2 className="h-4 w-4" />
                      Minha Propriedade
                    </Link>
                    <Link 
                      href="/dashboard/empreendedor/atividades" 
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-muted-foreground hover:bg-muted transition-colors"
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
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="font-serif text-2xl md:text-3xl font-bold text-foreground mb-2">
                    Minha Propriedade
                  </h1>
                  <p className="text-muted-foreground">
                    Gerencie as informações da sua propriedade rural
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" asChild>
                    <Link href="/propriedades/1">
                      <Eye className="h-4 w-4 mr-2" />
                      Visualizar
                    </Link>
                  </Button>
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    Salvar Alterações
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="informacoes" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="informacoes">Informações</TabsTrigger>
                  <TabsTrigger value="fotos">Fotos</TabsTrigger>
                  <TabsTrigger value="comodidades">Comodidades</TabsTrigger>
                  <TabsTrigger value="localizacao">Localização</TabsTrigger>
                </TabsList>

                <TabsContent value="informacoes">
                  <Card>
                    <CardHeader>
                      <CardTitle>Informações da Propriedade</CardTitle>
                      <CardDescription>Dados básicos que aparecerão no seu perfil público</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome da Propriedade *</Label>
                          <Input id="nome" defaultValue="Fazenda Bela Vista" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="tipo">Tipo de Propriedade *</Label>
                          <Input id="tipo" defaultValue="Fazenda" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="descricao">Descrição *</Label>
                        <Textarea 
                          id="descricao" 
                          rows={5}
                          defaultValue="A Fazenda Bela Vista oferece uma experiência única de turismo rural no interior de São Paulo. Com mais de 50 hectares de área verde, proporcionamos aos nossos visitantes contato direto com a natureza, atividades ao ar livre e a autêntica vida no campo."
                        />
                        <p className="text-sm text-muted-foreground">Mínimo de 100 caracteres. Descreva o que torna sua propriedade especial.</p>
                      </div>

                      <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                          <Label htmlFor="capacidade">Capacidade de hóspedes</Label>
                          <Input id="capacidade" type="number" defaultValue="20" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="quartos">Quartos disponíveis</Label>
                          <Input id="quartos" type="number" defaultValue="8" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="area">Área (hectares)</Label>
                          <Input id="area" type="number" defaultValue="50" />
                        </div>
                      </div>

                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label htmlFor="checkin">Horário de Check-in</Label>
                          <Input id="checkin" type="time" defaultValue="14:00" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="checkout">Horário de Check-out</Label>
                          <Input id="checkout" type="time" defaultValue="11:00" />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="regras">Regras da propriedade</Label>
                        <Textarea 
                          id="regras" 
                          rows={3}
                          defaultValue="- Não é permitido fumar nas áreas internas&#10;- Silêncio após às 22h&#10;- Crianças devem estar acompanhadas de adultos nas atividades"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="fotos">
                  <Card>
                    <CardHeader>
                      <CardTitle>Galeria de Fotos</CardTitle>
                      <CardDescription>Adicione fotos atraentes da sua propriedade (mínimo 4 fotos)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
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
                            {index === 0 && (
                              <Badge className="absolute bottom-2 left-2">Capa</Badge>
                            )}
                          </div>
                        ))}
                        <button className="aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary">
                          <Upload className="h-8 w-8" />
                          <span className="text-sm">Adicionar foto</span>
                        </button>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Arraste para reordenar. A primeira foto será usada como capa.
                      </p>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="comodidades">
                  <Card>
                    <CardHeader>
                      <CardTitle>Comodidades</CardTitle>
                      <CardDescription>Selecione o que sua propriedade oferece</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {comodidades.map((comodidade) => {
                          const Icon = comodidade.icon
                          const isSelected = selectedComodidades.includes(comodidade.id)
                          return (
                            <div
                              key={comodidade.id}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedComodidades(selectedComodidades.filter(c => c !== comodidade.id))
                                } else {
                                  setSelectedComodidades([...selectedComodidades, comodidade.id])
                                }
                              }}
                              className={`flex items-center gap-3 p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                                isSelected 
                                  ? "border-primary bg-primary/5" 
                                  : "border-border hover:border-primary/50"
                              }`}
                            >
                              <Checkbox checked={isSelected} />
                              <Icon className={`h-5 w-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
                              <span className={isSelected ? "text-foreground font-medium" : "text-muted-foreground"}>
                                {comodidade.label}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="localizacao">
                  <Card>
                    <CardHeader>
                      <CardTitle>Localização</CardTitle>
                      <CardDescription>Informe o endereço completo da propriedade</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2 md:col-span-2">
                          <Label htmlFor="endereco">Endereço *</Label>
                          <Input id="endereco" defaultValue="Estrada Rural Municipal, Km 15" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cidade">Cidade *</Label>
                          <Input id="cidade" defaultValue="Ourinhos" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="estado">Estado *</Label>
                          <Input id="estado" defaultValue="SP" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cep">CEP *</Label>
                          <Input id="cep" defaultValue="19900-000" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pais">País</Label>
                          <Input id="pais" defaultValue="Brasil" disabled />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="instrucoes">Instruções de acesso</Label>
                        <Textarea 
                          id="instrucoes" 
                          rows={3}
                          defaultValue="Saindo de Ourinhos, seguir pela SP-270 em direção a Assis. No Km 15, virar à direita na placa indicando 'Fazenda Bela Vista'. Seguir por 2km de estrada de terra."
                        />
                      </div>

                      <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <MapPin className="h-12 w-12 mx-auto mb-2" />
                          <p>Mapa da localização</p>
                          <p className="text-sm">Latitude: -22.9705 | Longitude: -49.8637</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
