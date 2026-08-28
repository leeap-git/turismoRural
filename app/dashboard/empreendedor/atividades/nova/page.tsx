"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload, X, Calendar, Clock, Users, DollarSign, Tag, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { addAtividade, getPropriedadesByEmpreendedor } from "@/lib/db"
import type { Empreendedor } from "@/lib/types"

const tiposAtividade = [
  { value: "passeio", label: "Passeio" },
  { value: "workshop", label: "Workshop / Oficina" },
  { value: "gastronomia", label: "Gastronomia" },
  { value: "aventura", label: "Aventura" },
  { value: "cultural", label: "Cultural / Evento" },
  { value: "infantil", label: "Infantil" },
]

export default function NovaAtividadePage() {
  const router = useRouter()
  const { user, userType, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    propriedade: "",
    nome: "",
    tipo: "" as "passeio" | "workshop" | "gastronomia" | "aventura" | "cultural" | "infantil" | "",
    descricao: "",
    dataEvento: "",
    horario: "",
    valor: "",
    vagas: "",
    duracao: "",
    incluso: [] as string[],
    requisitos: [] as string[],
  })

  const [imagens, setImagens] = useState<string[]>([])
  const [novoRequisito, setNovoRequisito] = useState("")

  // Verifica autenticação
  if (!isAuthenticated || userType !== "empreendedor") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-4">Você precisa estar logado como empreendedor para cadastrar atividades.</p>
            <Button asChild>
              <Link href="/login">Fazer Login</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const empreendedor = user as Empreendedor
  const propriedades = getPropriedadesByEmpreendedor(empreendedor.id)

  const inclusosOpcoes = [
    "Café da manhã",
    "Almoço",
    "Lanche",
    "Equipamentos",
    "Guia especializado",
    "Transporte local",
    "Seguro",
    "Água",
  ]

  const handleInclusoChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, incluso: [...formData.incluso, item] })
    } else {
      setFormData({ ...formData, incluso: formData.incluso.filter((i) => i !== item) })
    }
  }

  const handleAddRequisito = () => {
    if (novoRequisito.trim()) {
      setFormData({ ...formData, requisitos: [...formData.requisitos, novoRequisito.trim()] })
      setNovoRequisito("")
    }
  }

  const handleRemoveRequisito = (index: number) => {
    setFormData({ ...formData, requisitos: formData.requisitos.filter((_, i) => i !== index) })
  }

  const handleImagemUpload = () => {
    const novaImagem = `/placeholder.svg?height=300&width=400&text=Imagem ${imagens.length + 1}`
    setImagens([...imagens, novaImagem])
  }

  const removerImagem = (index: number) => {
    setImagens(imagens.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    // Validações
    if (!formData.nome || !formData.tipo || !formData.valor || !formData.vagas || !formData.descricao) {
      setError("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setIsLoading(true)

    try {
      // Simula delay
      await new Promise(resolve => setTimeout(resolve, 500))

      addAtividade({
        propriedadeId: formData.propriedade || undefined,
        empreendedorId: empreendedor.id,
        nome: formData.nome,
        descricao: formData.descricao,
        tipo: formData.tipo as "passeio" | "workshop" | "gastronomia" | "aventura" | "cultural" | "infantil",
        preco: parseFloat(formData.valor),
        duracao: formData.duracao || "2 horas",
        vagas: parseInt(formData.vagas),
        imagem: imagens[0] || "/placeholder.svg?height=300&width=400",
        dataEvento: formData.dataEvento || undefined,
        horario: formData.horario || undefined,
        inclui: formData.incluso,
        requisitos: formData.requisitos,
        ativo: true,
      })

      setSuccess("Atividade cadastrada com sucesso!")
      
      setTimeout(() => {
        router.push("/dashboard/empreendedor/atividades")
      }, 1000)
    } catch {
      setError("Erro ao cadastrar atividade. Tente novamente.")
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/dashboard/empreendedor/atividades" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às Atividades
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Cadastrar Nova Atividade</h1>
              <p className="text-muted-foreground">Preencha os dados da atividade ou evento</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-primary bg-primary/10">
                  <CheckCircle className="h-4 w-4 text-primary" />
                  <AlertDescription className="text-primary">{success}</AlertDescription>
                </Alert>
              )}

              {/* Informações Básicas */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações Básicas</CardTitle>
                  <CardDescription>Dados principais da atividade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {propriedades.length > 0 && (
                    <div className="space-y-2">
                      <Label htmlFor="propriedade">Vincular a Propriedade (opcional)</Label>
                      <Select
                        value={formData.propriedade}
                        onValueChange={(value) => setFormData({ ...formData, propriedade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione uma propriedade" />
                        </SelectTrigger>
                        <SelectContent>
                          {propriedades.map((prop) => (
                            <SelectItem key={prop.id} value={prop.id}>
                              {prop.nome}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da Atividade *</Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Trilha Ecológica pela Mata"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Atividade *</Label>
                      <Select
                        value={formData.tipo}
                        onValueChange={(value) => setFormData({ ...formData, tipo: value as typeof formData.tipo })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposAtividade.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>
                              {tipo.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva a atividade em detalhes..."
                      rows={4}
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Data e Horário */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Data e Horário
                  </CardTitle>
                  <CardDescription>Defina quando a atividade estará disponível</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="dataEvento">Data do Evento</Label>
                      <Input
                        id="dataEvento"
                        type="date"
                        value={formData.dataEvento}
                        onChange={(e) => setFormData({ ...formData, dataEvento: e.target.value })}
                      />
                      <p className="text-xs text-muted-foreground">Deixe em branco se for permanente</p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="horario">Horário</Label>
                      <div className="relative">
                        <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="horario"
                          placeholder="Ex: 09:00"
                          className="pl-10"
                          value={formData.horario}
                          onChange={(e) => setFormData({ ...formData, horario: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="duracao">Duração</Label>
                      <Input
                        id="duracao"
                        placeholder="Ex: 3 horas"
                        value={formData.duracao}
                        onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Preço e Vagas */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Preço e Disponibilidade
                  </CardTitle>
                  <CardDescription>Defina o valor e número de vagas</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="valor">Valor por Pessoa (R$) *</Label>
                      <Input
                        id="valor"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="Ex: 120.00"
                        value={formData.valor}
                        onChange={(e) => setFormData({ ...formData, valor: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="vagas">Número de Vagas *</Label>
                      <div className="relative">
                        <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="vagas"
                          type="number"
                          min="1"
                          placeholder="Ex: 20"
                          className="pl-10"
                          value={formData.vagas}
                          onChange={(e) => setFormData({ ...formData, vagas: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* O que está incluso */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    O que está incluso
                  </CardTitle>
                  <CardDescription>Selecione o que está incluído na atividade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
                    {inclusosOpcoes.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={formData.incluso.includes(item)}
                          onCheckedChange={(checked) => handleInclusoChange(item, checked as boolean)}
                        />
                        <label
                          htmlFor={item}
                          className="text-sm font-medium leading-none cursor-pointer"
                        >
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Requisitos */}
              <Card>
                <CardHeader>
                  <CardTitle>Requisitos para Participação</CardTitle>
                  <CardDescription>Adicione requisitos que os participantes precisam atender</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Ex: Idade mínima: 8 anos"
                      value={novoRequisito}
                      onChange={(e) => setNovoRequisito(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddRequisito())}
                    />
                    <Button type="button" onClick={handleAddRequisito} variant="secondary">
                      Adicionar
                    </Button>
                  </div>
                  {formData.requisitos.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {formData.requisitos.map((req, index) => (
                        <span key={index} className="inline-flex items-center gap-1 bg-muted px-3 py-1 rounded-full text-sm">
                          {req}
                          <button type="button" onClick={() => handleRemoveRequisito(index)} className="hover:text-destructive">
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Imagens */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagem da Atividade</CardTitle>
                  <CardDescription>Adicione uma foto para ilustrar a atividade</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {imagens.map((img, index) => (
                      <div key={index} className="relative aspect-video bg-muted rounded-lg overflow-hidden">
                        <img src={img} alt={`Imagem ${index + 1}`} className="object-cover w-full h-full" />
                        <button
                          type="button"
                          onClick={() => removerImagem(index)}
                          className="absolute top-2 right-2 p-1 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={handleImagemUpload}
                      className="aspect-video border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary hover:bg-primary/5 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Adicionar imagem</span>
                    </button>
                  </div>
                </CardContent>
              </Card>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/empreendedor/atividades">Cancelar</Link>
                </Button>
                <Button type="submit" className="gap-2" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Publicar Atividade"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
