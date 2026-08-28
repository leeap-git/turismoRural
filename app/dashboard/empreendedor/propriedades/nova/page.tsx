"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Upload, X, MapPin, Phone, Mail, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useAuth } from "@/contexts/auth-context"
import { addPropriedade } from "@/lib/db"
import type { Empreendedor } from "@/lib/types"

const comodidades = [
  "Wi-Fi",
  "Estacionamento",
  "Piscina",
  "Restaurante",
  "Café da manhã",
  "Trilhas",
  "Área para camping",
  "Churrasqueira",
  "Área de lazer",
  "Playground",
  "Pet friendly",
  "Acessibilidade",
]

const tiposPropriedade = [
  { value: "fazenda", label: "Fazenda" },
  { value: "sitio", label: "Sítio" },
  { value: "chacara", label: "Chácara" },
  { value: "pousada", label: "Pousada" },
  { value: "camping", label: "Camping" },
]

export default function NovaPropriedadePage() {
  const router = useRouter()
  const { user, userType, isAuthenticated } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [formData, setFormData] = useState({
    nome: "",
    tipo: "" as "fazenda" | "sitio" | "chacara" | "pousada" | "camping" | "",
    preco: "",
    capacidade: "",
    telefone: "",
    email: "",
    cep: "",
    endereco: "",
    cidade: "",
    estado: "",
    descricao: "",
    comodidades: [] as string[],
  })

  const [imagens, setImagens] = useState<string[]>([])

  // Verifica autenticação
  if (!isAuthenticated || userType !== "empreendedor") {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Acesso Restrito</h1>
            <p className="text-muted-foreground mb-4">Você precisa estar logado como empreendedor para cadastrar propriedades.</p>
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

  const handleComodidadeChange = (item: string, checked: boolean) => {
    if (checked) {
      setFormData({ ...formData, comodidades: [...formData.comodidades, item] })
    } else {
      setFormData({ ...formData, comodidades: formData.comodidades.filter((c) => c !== item) })
    }
  }

  const handleImagemUpload = () => {
    const novaImagem = `/placeholder.svg?height=400&width=600&text=Imagem ${imagens.length + 1}`
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
    if (!formData.nome || !formData.tipo || !formData.preco || !formData.descricao || !formData.cidade || !formData.estado) {
      setError("Por favor, preencha todos os campos obrigatórios")
      return
    }

    setIsLoading(true)

    try {
      // Simula delay
      await new Promise(resolve => setTimeout(resolve, 500))

      addPropriedade({
        empreendedorId: empreendedor.id,
        nome: formData.nome,
        descricao: formData.descricao,
        endereco: formData.endereco,
        cidade: formData.cidade,
        estado: formData.estado,
        preco: parseFloat(formData.preco),
        capacidade: parseInt(formData.capacidade) || 10,
        imagens: imagens.length > 0 ? imagens : ["/placeholder.svg?height=400&width=600"],
        comodidades: formData.comodidades,
        tipo: formData.tipo as "fazenda" | "sitio" | "chacara" | "pousada" | "camping",
        ativo: true,
      })

      setSuccess("Propriedade cadastrada com sucesso!")
      
      setTimeout(() => {
        router.push("/dashboard/empreendedor/propriedades")
      }, 1000)
    } catch {
      setError("Erro ao cadastrar propriedade. Tente novamente.")
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
              href="/dashboard/empreendedor/propriedades" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às Propriedades
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">Cadastrar Nova Propriedade</h1>
              <p className="text-muted-foreground">Preencha os dados da sua propriedade rural</p>
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
                  <CardDescription>Dados principais da propriedade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome da Propriedade *</Label>
                      <Input
                        id="nome"
                        placeholder="Ex: Fazenda Esperança"
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tipo">Tipo de Propriedade *</Label>
                      <Select 
                        value={formData.tipo} 
                        onValueChange={(value) => setFormData({ ...formData, tipo: value as typeof formData.tipo })}
                      >
                        <SelectTrigger id="tipo">
                          <SelectValue placeholder="Selecione o tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiposPropriedade.map((tipo) => (
                            <SelectItem key={tipo.value} value={tipo.value}>{tipo.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preco">Preço por Diária (R$) *</Label>
                      <Input
                        id="preco"
                        type="number"
                        placeholder="Ex: 250"
                        value={formData.preco}
                        onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="capacidade">Capacidade (pessoas)</Label>
                      <Input
                        id="capacidade"
                        type="number"
                        placeholder="Ex: 10"
                        value={formData.capacidade}
                        onChange={(e) => setFormData({ ...formData, capacidade: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="descricao">Descrição *</Label>
                    <Textarea
                      id="descricao"
                      placeholder="Descreva sua propriedade, suas características e diferenciais..."
                      rows={4}
                      value={formData.descricao}
                      onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Contato */}
              <Card>
                <CardHeader>
                  <CardTitle>Informações de Contato</CardTitle>
                  <CardDescription>Como os visitantes podem entrar em contato</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="telefone"
                          placeholder="(00) 00000-0000"
                          className="pl-10"
                          value={formData.telefone}
                          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="contato@fazenda.com"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Endereço */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Localização
                  </CardTitle>
                  <CardDescription>Endereço completo da propriedade</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="cep">CEP</Label>
                      <Input
                        id="cep"
                        placeholder="00000-000"
                        value={formData.cep}
                        onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="endereco">Endereço</Label>
                      <Input
                        id="endereco"
                        placeholder="Estrada Rural, Km 15"
                        value={formData.endereco}
                        onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="cidade">Cidade *</Label>
                      <Input
                        id="cidade"
                        placeholder="Ourinhos"
                        value={formData.cidade}
                        onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="estado">Estado *</Label>
                      <Select 
                        value={formData.estado} 
                        onValueChange={(value) => setFormData({ ...formData, estado: value })}
                      >
                        <SelectTrigger id="estado">
                          <SelectValue placeholder="Selecione" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                          <SelectItem value="PR">Paraná</SelectItem>
                          <SelectItem value="SC">Santa Catarina</SelectItem>
                          <SelectItem value="RS">Rio Grande do Sul</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="GO">Goiás</SelectItem>
                          <SelectItem value="MS">Mato Grosso do Sul</SelectItem>
                          <SelectItem value="MT">Mato Grosso</SelectItem>
                          <SelectItem value="BA">Bahia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Comodidades */}
              <Card>
                <CardHeader>
                  <CardTitle>Comodidades</CardTitle>
                  <CardDescription>Selecione o que sua propriedade oferece</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {comodidades.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox
                          id={item}
                          checked={formData.comodidades.includes(item)}
                          onCheckedChange={(checked) => handleComodidadeChange(item, checked as boolean)}
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

              {/* Imagens */}
              <Card>
                <CardHeader>
                  <CardTitle>Imagens da Propriedade</CardTitle>
                  <CardDescription>Adicione fotos para apresentar sua propriedade aos visitantes</CardDescription>
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
                        {index === 0 && (
                          <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                            Imagem principal
                          </span>
                        )}
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
                  <p className="text-xs text-muted-foreground mt-2">
                    A primeira imagem será usada como capa. Clique para simular upload de imagem.
                  </p>
                </CardContent>
              </Card>

              {/* Botões */}
              <div className="flex flex-col sm:flex-row gap-4 justify-end">
                <Button type="button" variant="outline" asChild>
                  <Link href="/dashboard/empreendedor/propriedades">Cancelar</Link>
                </Button>
                <Button type="submit" className="gap-2" disabled={isLoading}>
                  <Save className="h-4 w-4" />
                  {isLoading ? "Salvando..." : "Publicar Propriedade"}
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
