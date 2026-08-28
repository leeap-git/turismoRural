"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Users, CreditCard, Check, MapPin, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const atividadeSelecionada = {
  id: "1",
  nome: "Trilha Ecológica pela Mata Atlântica",
  propriedade: "Fazenda Esperança",
  local: "Ourinhos, SP",
  preco: 70.00,
  duracao: "3 horas",
  vagasDisponiveis: 15,
  imagem: "/placeholder.svg?height=200&width=300",
  incluso: ["Guia especializado", "Lanche", "Equipamentos"],
}

export default function NovaReservaPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    data: "",
    horario: "",
    pessoas: 1,
    observacoes: "",
    formaPagamento: "cartao",
  })

  const totalValor = atividadeSelecionada.preco * formData.pessoas

  const horarios = ["08:00", "10:00", "14:00", "16:00"]

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <Link 
              href="/atividades" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar às atividades
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-foreground mb-2">Realizar Reserva</h1>
            <p className="text-muted-foreground mb-8">Complete os dados para reservar sua atividade</p>

            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-8">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step >= s
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step > s ? <Check className="h-4 w-4" /> : s}
                  </div>
                  <span className={`text-sm ${step >= s ? "text-foreground" : "text-muted-foreground"}`}>
                    {s === 1 ? "Data e Horário" : s === 2 ? "Participantes" : "Confirmação"}
                  </span>
                  {s < 3 && <div className={`w-12 h-0.5 ${step > s ? "bg-primary" : "bg-muted"}`} />}
                </div>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {/* Formulário */}
              <div className="lg:col-span-2 space-y-6">
                {step === 1 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Escolha a Data e Horário
                      </CardTitle>
                      <CardDescription>Selecione quando deseja realizar a atividade</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="data">Data *</Label>
                        <Input
                          id="data"
                          type="date"
                          value={formData.data}
                          onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Horário Disponível *</Label>
                        <RadioGroup
                          value={formData.horario}
                          onValueChange={(value) => setFormData({ ...formData, horario: value })}
                          className="grid grid-cols-2 md:grid-cols-4 gap-3"
                        >
                          {horarios.map((horario) => (
                            <div key={horario}>
                              <RadioGroupItem
                                value={horario}
                                id={horario}
                                className="peer sr-only"
                              />
                              <Label
                                htmlFor={horario}
                                className="flex items-center justify-center gap-2 rounded-lg border-2 border-muted bg-card p-4 hover:bg-muted/50 peer-data-[state=checked]:border-primary cursor-pointer transition-colors"
                              >
                                <Clock className="h-4 w-4" />
                                {horario}
                              </Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-end">
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!formData.data || !formData.horario}
                      >
                        Continuar
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {step === 2 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        Número de Participantes
                      </CardTitle>
                      <CardDescription>Informe quantas pessoas participarão</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="pessoas">Quantidade de Pessoas *</Label>
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setFormData({ ...formData, pessoas: Math.max(1, formData.pessoas - 1) })}
                            disabled={formData.pessoas <= 1}
                          >
                            -
                          </Button>
                          <span className="text-2xl font-bold w-12 text-center">{formData.pessoas}</span>
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => setFormData({ ...formData, pessoas: Math.min(atividadeSelecionada.vagasDisponiveis, formData.pessoas + 1) })}
                            disabled={formData.pessoas >= atividadeSelecionada.vagasDisponiveis}
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {atividadeSelecionada.vagasDisponiveis} vagas disponíveis
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="observacoes">Observações (opcional)</Label>
                        <Input
                          id="observacoes"
                          placeholder="Alguma informação importante?"
                          value={formData.observacoes}
                          onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button variant="outline" onClick={() => setStep(1)}>
                        Voltar
                      </Button>
                      <Button onClick={() => setStep(3)}>
                        Continuar
                      </Button>
                    </CardFooter>
                  </Card>
                )}

                {step === 3 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        Confirmação e Pagamento
                      </CardTitle>
                      <CardDescription>Revise os dados e escolha a forma de pagamento</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                        <h4 className="font-medium">Resumo da Reserva</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <span className="text-muted-foreground">Data:</span>
                          <span>{new Date(formData.data).toLocaleDateString("pt-BR")}</span>
                          <span className="text-muted-foreground">Horário:</span>
                          <span>{formData.horario}</span>
                          <span className="text-muted-foreground">Participantes:</span>
                          <span>{formData.pessoas} pessoa(s)</span>
                          <span className="text-muted-foreground">Valor por pessoa:</span>
                          <span>R$ {atividadeSelecionada.preco.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Forma de Pagamento *</Label>
                        <RadioGroup
                          value={formData.formaPagamento}
                          onValueChange={(value) => setFormData({ ...formData, formaPagamento: value })}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem value="cartao" id="cartao" />
                            <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                              <span className="font-medium">Cartão de Crédito/Débito</span>
                              <p className="text-sm text-muted-foreground">Pagamento imediato</p>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem value="pix" id="pix" />
                            <Label htmlFor="pix" className="flex-1 cursor-pointer">
                              <span className="font-medium">PIX</span>
                              <p className="text-sm text-muted-foreground">Pagamento via QR Code</p>
                            </Label>
                          </div>
                          <div className="flex items-center space-x-3 rounded-lg border p-4">
                            <RadioGroupItem value="local" id="local" />
                            <Label htmlFor="local" className="flex-1 cursor-pointer">
                              <span className="font-medium">Pagamento no Local</span>
                              <p className="text-sm text-muted-foreground">Pague ao chegar na propriedade</p>
                            </Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex items-start gap-2 p-4 bg-primary/5 rounded-lg">
                        <Info className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <p className="text-sm text-muted-foreground">
                          Após a confirmação, você receberá um e-mail com todos os detalhes da reserva.
                          Cancelamentos podem ser feitos até 24h antes da atividade.
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="justify-between">
                      <Button variant="outline" onClick={() => setStep(2)}>
                        Voltar
                      </Button>
                      <Button asChild>
                        <Link href="/dashboard/visitante">
                          Confirmar Reserva - R$ {totalValor.toFixed(2)}
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                )}
              </div>

              {/* Resumo da Atividade */}
              <div className="lg:col-span-1">
                <Card className="sticky top-8">
                  <div className="aspect-video relative">
                    <img
                      src={atividadeSelecionada.imagem}
                      alt={atividadeSelecionada.nome}
                      className="object-cover w-full h-full rounded-t-lg"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{atividadeSelecionada.nome}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {atividadeSelecionada.propriedade} - {atividadeSelecionada.local}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Duração: {atividadeSelecionada.duracao}
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Incluso:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {atividadeSelecionada.incluso.map((item) => (
                          <li key={item} className="flex items-center gap-2">
                            <Check className="h-3 w-3 text-primary" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          R$ {atividadeSelecionada.preco.toFixed(2)} x {formData.pessoas} pessoa(s)
                        </span>
                        <span>R$ {totalValor.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span className="text-primary">R$ {totalValor.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
