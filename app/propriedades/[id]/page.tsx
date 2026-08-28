"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { 
  MapPin, 
  Star, 
  Users, 
  Bed, 
  Phone, 
  Mail, 
  Wifi, 
  Car,
  UtensilsCrossed,
  Trees,
  CalendarIcon,
  Send,
  ChevronLeft,
  ChevronRight,
  Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

const property = {
  id: "1",
  name: "Fazenda Bela Vista",
  location: "Ourinhos, SP",
  address: "Estrada Rural Km 12, Zona Rural",
  description: "Uma autêntica fazenda de café com mais de 100 anos de história, cercada por trilhas ecológicas, piscina natural e a melhor culinária típica do interior paulista. Ideal para famílias e grupos que buscam tranquilidade e contato com a natureza.",
  images: [
    "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=1200&q=80",
    "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=1200&q=80",
    "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=1200&q=80",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
  ],
  rating: 4.8,
  reviews: 124,
  price: 320,
  capacity: 8,
  rooms: 4,
  tags: ["Fazenda", "Café", "Trilhas", "Família"],
  amenities: [
    { icon: Wifi, label: "Wi-Fi gratuito" },
    { icon: Car, label: "Estacionamento" },
    { icon: UtensilsCrossed, label: "Café da manhã incluso" },
    { icon: Trees, label: "Trilhas ecológicas" },
  ],
  phone: "(14) 99999-1234",
  email: "contato@fazendabelavista.com.br",
}

const atividades = [
  {
    id: "1",
    name: "Trilha Ecológica da Mata",
    description: "Caminhada guiada de 3km pela mata nativa",
    price: 80,
    date: "Sábados e Domingos",
  },
  {
    id: "2",
    name: "Colheita de Café",
    description: "Experiência completa de colheita, do pé à xícara",
    price: 120,
    date: "Terça a Sexta",
  },
  {
    id: "3",
    name: "Passeio a Cavalo",
    description: "Cavalgada pelo campo com parada para piquenique",
    price: 150,
    date: "Todos os dias",
  },
]

export default function PropertyDetailPage() {
  const [currentImage, setCurrentImage] = useState(0)
  const [checkIn, setCheckIn] = useState<Date>()
  const [checkOut, setCheckOut] = useState<Date>()
  const [guests, setGuests] = useState(2)

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % property.images.length)
  }

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + property.images.length) % property.images.length)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Image Gallery */}
        <div className="relative h-[400px] md:h-[500px] bg-muted">
          <Image
            src={property.images[currentImage]}
            alt={property.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
          
          <button
            onClick={prevImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Imagem anterior"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors"
            aria-label="Próxima imagem"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {property.images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentImage ? "bg-card" : "bg-card/50"
                )}
                aria-label={`Ver imagem ${index + 1}`}
              />
            ))}
          </div>

          <button className="absolute top-4 right-4 w-10 h-10 bg-card/90 rounded-full flex items-center justify-center hover:bg-card transition-colors">
            <Heart className="h-5 w-5" />
          </button>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
                <h1 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {property.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-accent text-accent" />
                    <span className="font-medium text-foreground">{property.rating}</span>
                    <span>({property.reviews} avaliações)</span>
                  </div>
                </div>
              </div>

              <Tabs defaultValue="sobre" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="sobre">Sobre</TabsTrigger>
                  <TabsTrigger value="atividades">Atividades</TabsTrigger>
                  <TabsTrigger value="contato">Contato</TabsTrigger>
                </TabsList>

                <TabsContent value="sobre" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Descrição</h2>
                    <p className="text-muted-foreground leading-relaxed">{property.description}</p>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Informações</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Users className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Capacidade</p>
                          <p className="font-semibold">{property.capacity} pessoas</p>
                        </CardContent>
                      </Card>
                      <Card>
                        <CardContent className="p-4 text-center">
                          <Bed className="h-6 w-6 text-primary mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground">Quartos</p>
                          <p className="font-semibold">{property.rooms} quartos</p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Comodidades</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2 text-muted-foreground">
                          <amenity.icon className="h-5 w-5 text-primary" />
                          <span>{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="atividades" className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Atividades Disponíveis</h2>
                  {atividades.map((atividade) => (
                    <Card key={atividade.id}>
                      <CardContent className="p-4 flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-foreground">{atividade.name}</h3>
                          <p className="text-sm text-muted-foreground">{atividade.description}</p>
                          <p className="text-sm text-muted-foreground">{atividade.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">R$ {atividade.price.toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">por pessoa</p>
                          <Button size="sm" className="mt-2">Reservar</Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </TabsContent>

                <TabsContent value="contato" className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground mb-4">Entre em Contato</h2>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="h-5 w-5 text-primary" />
                        <span>{property.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Mail className="h-5 w-5 text-primary" />
                        <span>{property.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-5 w-5 text-primary" />
                        <span>{property.address}</span>
                      </div>
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Enviar Mensagem</CardTitle>
                      <CardDescription>
                        Tire suas dúvidas diretamente com o empreendedor
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="nome">Nome</Label>
                          <Input id="nome" placeholder="Seu nome" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">E-mail</Label>
                          <Input id="email" type="email" placeholder="seu@email.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="mensagem">Mensagem</Label>
                        <Textarea id="mensagem" placeholder="Escreva sua mensagem..." rows={4} />
                      </div>
                      <Button className="w-full">
                        <Send className="h-4 w-4 mr-2" />
                        Enviar Mensagem
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar - Booking */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">R$ {property.price.toFixed(2)}</span>
                      <span className="text-muted-foreground">/noite</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-4 w-4 fill-accent text-accent" />
                      <span className="font-medium">{property.rating}</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label>Check-in</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkIn ? format(checkIn, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkIn}
                            onSelect={setCheckIn}
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="space-y-2">
                      <Label>Check-out</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className="w-full justify-start text-left font-normal">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {checkOut ? format(checkOut, "dd/MM/yyyy", { locale: ptBR }) : "Selecionar"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={checkOut}
                            onSelect={setCheckOut}
                            locale={ptBR}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Hóspedes</Label>
                    <Input
                      id="guests"
                      type="number"
                      min={1}
                      max={property.capacity}
                      value={guests}
                      onChange={(e) => setGuests(parseInt(e.target.value))}
                    />
                    <p className="text-xs text-muted-foreground">Máximo {property.capacity} pessoas</p>
                  </div>

                  <Button className="w-full" size="lg">
                    Reservar Agora
                  </Button>

                  <p className="text-center text-sm text-muted-foreground">
                    Você ainda não será cobrado
                  </p>

                  <div className="border-t border-border pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">R$ {property.price.toFixed(2)} x 2 noites</span>
                      <span>R$ {(property.price * 2).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Taxa de serviço</span>
                      <span>R$ 50,00</span>
                    </div>
                    <div className="flex justify-between font-semibold pt-2 border-t border-border">
                      <span>Total</span>
                      <span>R$ {(property.price * 2 + 50).toFixed(2)}</span>
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
