import Link from "next/link"
import { ArrowLeft, MapPin, Clock, Users, Calendar, Star, Check, Share2, Heart, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Dados simulados da atividade
const atividadeData = {
  id: "1",
  nome: "Trilha Ecológica pela Mata Atlântica",
  tipo: "Trilha",
  descricao: `Venha explorar uma das mais belas trilhas da região! Nossa Trilha Ecológica oferece uma experiência única de contato com a natureza, passando por diferentes ecossistemas da Mata Atlântica.

Durante o percurso de aproximadamente 5km, você poderá observar diversas espécies de aves, plantas nativas e até mesmo pequenos animais silvestres. O trajeto conta com pontos de descanso estratégicos e mirantes com vistas panorâmicas incríveis.

A trilha é guiada por profissionais experientes que compartilharão conhecimentos sobre a fauna e flora local, tornando a experiência ainda mais enriquecedora.`,
  propriedade: {
    id: "1",
    nome: "Fazenda Esperança",
    cidade: "Ourinhos",
    estado: "SP",
  },
  preco: 70.00,
  duracao: "3 horas",
  vagas: 15,
  vagasDisponiveis: 8,
  dificuldade: "Moderada",
  distancia: "5 km",
  avaliacao: 4.8,
  totalAvaliacoes: 47,
  imagens: [
    "/placeholder.svg?height=500&width=800&text=Trilha 1",
    "/placeholder.svg?height=500&width=800&text=Trilha 2",
    "/placeholder.svg?height=500&width=800&text=Trilha 3",
  ],
  incluso: [
    "Guia especializado",
    "Lanche (frutas e água)",
    "Equipamentos de segurança",
    "Seguro pessoal",
  ],
  naoIncluso: [
    "Transporte até a fazenda",
    "Refeições completas",
    "Equipamentos pessoais",
  ],
  requisitos: [
    "Idade mínima: 12 anos",
    "Condicionamento físico básico",
    "Usar roupas e calçados adequados",
    "Menores acompanhados de responsável",
  ],
  proximasDatas: [
    { data: "15/04/2024", horario: "08:00", vagas: 8 },
    { data: "16/04/2024", horario: "08:00", vagas: 12 },
    { data: "20/04/2024", horario: "08:00", vagas: 15 },
    { data: "21/04/2024", horario: "14:00", vagas: 10 },
  ],
  avaliacoes: [
    {
      id: "1",
      usuario: "Maria Silva",
      nota: 5,
      comentario: "Experiência incrível! O guia foi muito atencioso e a trilha é maravilhosa. Recomendo demais!",
      data: "10/03/2024",
    },
    {
      id: "2",
      usuario: "Carlos Santos",
      nota: 4,
      comentario: "Muito bom! A natureza é linda e o percurso bem sinalizado. Só achei um pouco puxado no final.",
      data: "05/03/2024",
    },
  ],
}

export default async function AtividadeDetalhePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Navegação */}
        <div className="container mx-auto px-4 py-4">
          <Link 
            href="/atividades" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar às atividades
          </Link>
        </div>

        {/* Galeria de Imagens */}
        <section className="container mx-auto px-4 mb-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={atividadeData.imagens[0]}
                alt={atividadeData.nome}
                className="object-cover w-full h-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {atividadeData.imagens.slice(1).map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden">
                  <img
                    src={img}
                    alt={`${atividadeData.nome} ${index + 2}`}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conteúdo Principal */}
        <section className="container mx-auto px-4 pb-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Informações da Atividade */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge>{atividadeData.tipo}</Badge>
                  <Badge variant="outline">Dificuldade: {atividadeData.dificuldade}</Badge>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {atividadeData.nome}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                  <Link 
                    href={`/propriedades/${atividadeData.propriedade.id}`}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    {atividadeData.propriedade.nome} - {atividadeData.propriedade.cidade}, {atividadeData.propriedade.estado}
                  </Link>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-foreground">{atividadeData.avaliacao}</span>
                    <span>({atividadeData.totalAvaliacoes} avaliações)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <span>Duração: {atividadeData.duracao}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <span>Distância: {atividadeData.distancia}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <span>Máx: {atividadeData.vagas} pessoas</span>
                </div>
              </div>

              <Separator />

              {/* Descrição */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Sobre a atividade</h2>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                  {atividadeData.descricao.split("\n\n").map((paragrafo, index) => (
                    <p key={index} className="text-muted-foreground mb-4">{paragrafo}</p>
                  ))}
                </div>
              </div>

              <Separator />

              {/* O que está incluso */}
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h2 className="text-xl font-semibold mb-4">O que está incluso</h2>
                  <ul className="space-y-2">
                    {atividadeData.incluso.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-green-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Não incluso</h2>
                  <ul className="space-y-2">
                    {atividadeData.naoIncluso.map((item) => (
                      <li key={item} className="flex items-center gap-2 text-muted-foreground">
                        <span className="w-4 h-4 flex items-center justify-center">-</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Separator />

              {/* Requisitos */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Requisitos</h2>
                <ul className="space-y-2">
                  {atividadeData.requisitos.map((req) => (
                    <li key={req} className="flex items-center gap-2 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Separator />

              {/* Avaliações */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Avaliações</h2>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-lg">{atividadeData.avaliacao}</span>
                    <span className="text-muted-foreground">({atividadeData.totalAvaliacoes} avaliações)</span>
                  </div>
                </div>
                <div className="space-y-4">
                  {atividadeData.avaliacoes.map((avaliacao) => (
                    <Card key={avaliacao.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarFallback>{avaliacao.usuario.split(" ").map(n => n[0]).join("")}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{avaliacao.usuario}</p>
                              <span className="text-sm text-muted-foreground">{avaliacao.data}</span>
                            </div>
                            <div className="flex items-center gap-1 mb-2">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < avaliacao.nota ? "fill-yellow-400 text-yellow-400" : "text-muted"}`}
                                />
                              ))}
                            </div>
                            <p className="text-muted-foreground">{avaliacao.comentario}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver todas as avaliações
                </Button>
              </div>
            </div>

            {/* Card de Reserva */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <div className="flex items-baseline justify-between">
                    <CardTitle className="text-2xl">
                      R$ {atividadeData.preco.toFixed(2)}
                    </CardTitle>
                    <span className="text-muted-foreground">por pessoa</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <p className="text-sm font-medium mb-3">Próximas datas disponíveis:</p>
                    <div className="space-y-2">
                      {atividadeData.proximasDatas.slice(0, 3).map((data, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{data.data}</p>
                              <p className="text-sm text-muted-foreground">{data.horario}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">{data.vagas} vagas</Badge>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="lg" asChild>
                    <Link href="/dashboard/visitante/reservas/nova">
                      Reservar Agora
                    </Link>
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2">
                      <Heart className="h-4 w-4" />
                      Favoritar
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                  </div>

                  <Separator />

                  <div className="text-sm text-muted-foreground space-y-2">
                    <p>Cancelamento gratuito até 24h antes</p>
                    <p>Pagamento seguro pela plataforma</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
