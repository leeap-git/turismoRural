"use client"

import { use } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  MapPin,
  Calendar,
  Users,
  Clock,
  Phone,
  Mail,
  CreditCard,
  FileText,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  XCircle,
  Printer,
  Download
} from "lucide-react"

// Dados mockados da reserva
const reserva = {
  id: "RES-2025-001",
  status: "confirmada",
  propriedade: {
    id: 1,
    nome: "Fazenda Boa Vista",
    imagem: "https://images.unsplash.com/photo-1500076656116-558758c991c1?w=800&q=80",
    localizacao: "Ourinhos, SP",
    telefone: "(14) 99999-9999",
    email: "contato@fazendaboavista.com.br",
  },
  atividades: [
    { nome: "Trilha Ecológica", preco: 45 },
    { nome: "Passeio a Cavalo", preco: 80 },
    { nome: "Hospedagem (2 noites)", preco: 300 },
  ],
  dataEntrada: "2025-12-15",
  dataSaida: "2025-12-17",
  horarioCheckin: "14:00",
  horarioCheckout: "11:00",
  pessoas: 4,
  valorTotal: 458,
  taxaServico: 33,
  pagamento: {
    forma: "PIX",
    status: "pago",
    dataPagamento: "2025-12-10",
  },
  politicaCancelamento: "Cancelamento gratuito até 48h antes do check-in. Após esse prazo, será cobrado 50% do valor total.",
  observacoes: "Grupo de família com 2 crianças. Preferência por quarto com vista para o pasto.",
  criadoEm: "2025-12-08T10:30:00",
}

export default function DetalheReservaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmada":
        return <Badge className="bg-primary text-primary-foreground">Confirmada</Badge>
      case "pendente":
        return <Badge className="bg-accent text-accent-foreground">Pendente</Badge>
      case "concluida":
        return <Badge variant="secondary">Concluída</Badge>
      case "cancelada":
        return <Badge variant="destructive">Cancelada</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmada":
        return <CheckCircle className="h-5 w-5 text-primary" />
      case "pendente":
        return <Clock className="h-5 w-5 text-accent" />
      case "concluida":
        return <CheckCircle className="h-5 w-5 text-muted-foreground" />
      case "cancelada":
        return <XCircle className="h-5 w-5 text-destructive" />
      default:
        return <AlertCircle className="h-5 w-5" />
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="mb-6">
            <Link 
              href="/dashboard/visitante" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às reservas
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-serif font-bold text-foreground">
                  Reserva {reserva.id}
                </h1>
                {getStatusBadge(reserva.status)}
              </div>
              <p className="text-muted-foreground">
                Criada em {new Date(reserva.criadoEm).toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Printer className="h-4 w-4 mr-2" />
                Imprimir
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Informações principais */}
            <div className="lg:col-span-2 space-y-6">
              {/* Propriedade */}
              <Card>
                <CardHeader>
                  <CardTitle>Propriedade</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex gap-4">
                    <div className="relative w-32 h-24 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={reserva.propriedade.imagem}
                        alt={reserva.propriedade.nome}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{reserva.propriedade.nome}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mb-2">
                        <MapPin className="h-3 w-3" />
                        {reserva.propriedade.localizacao}
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <a
                          href={`tel:${reserva.propriedade.telefone}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Phone className="h-3 w-3" />
                          {reserva.propriedade.telefone}
                        </a>
                        <a
                          href={`mailto:${reserva.propriedade.email}`}
                          className="flex items-center gap-1 text-primary hover:underline"
                        >
                          <Mail className="h-3 w-3" />
                          {reserva.propriedade.email}
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Datas e pessoas */}
              <Card>
                <CardHeader>
                  <CardTitle>Detalhes da Estadia</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-in</p>
                      <p className="font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(reserva.dataEntrada).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        A partir das {reserva.horarioCheckin}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Check-out</p>
                      <p className="font-semibold flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {new Date(reserva.dataSaida).toLocaleDateString("pt-BR")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Até às {reserva.horarioCheckout}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Hóspedes</p>
                      <p className="font-semibold flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        {reserva.pessoas} pessoas
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Atividades */}
              <Card>
                <CardHeader>
                  <CardTitle>Atividades Reservadas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {reserva.atividades.map((atividade, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{atividade.nome}</span>
                        <span className="font-medium">R$ {atividade.preco.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Observações */}
              {reserva.observacoes && (
                <Card>
                  <CardHeader>
                    <CardTitle>Observações</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{reserva.observacoes}</p>
                  </CardContent>
                </Card>
              )}

              {/* Política de cancelamento */}
              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Política de Cancelamento</AlertTitle>
                <AlertDescription>{reserva.politicaCancelamento}</AlertDescription>
              </Alert>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Status da Reserva</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                    {getStatusIcon(reserva.status)}
                    <div>
                      <p className="font-semibold capitalize">{reserva.status}</p>
                      <p className="text-sm text-muted-foreground">
                        {reserva.status === "confirmada" && "Sua reserva está confirmada!"}
                        {reserva.status === "pendente" && "Aguardando confirmação"}
                        {reserva.status === "concluida" && "Estadia finalizada"}
                        {reserva.status === "cancelada" && "Reserva cancelada"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pagamento */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pagamento</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">{reserva.pagamento.forma}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {reserva.pagamento.status}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    {reserva.atividades.map((atividade, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-muted-foreground">{atividade.nome}</span>
                        <span>R$ {atividade.preco.toFixed(2)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de serviço</span>
                      <span>R$ {reserva.taxaServico.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-primary">
                      R$ {(reserva.valorTotal + reserva.taxaServico).toFixed(2)}
                    </span>
                  </div>

                  {reserva.pagamento.status === "pago" && (
                    <Button variant="outline" className="w-full" size="sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Ver Comprovante
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Ações */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Ações</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href={`/propriedades/${reserva.propriedade.id}`}>
                      <MapPin className="h-4 w-4 mr-2" />
                      Ver Propriedade
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Enviar Mensagem
                  </Button>
                  {reserva.status === "confirmada" && (
                    <Button variant="destructive" className="w-full">
                      <XCircle className="h-4 w-4 mr-2" />
                      Cancelar Reserva
                    </Button>
                  )}
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
