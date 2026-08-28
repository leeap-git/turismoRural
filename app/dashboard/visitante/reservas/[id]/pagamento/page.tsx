"use client"

import { useState, use } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { 
  ArrowLeft, 
  CreditCard,
  Building2,
  QrCode,
  FileText,
  Copy,
  Check,
  AlertCircle,
  Shield,
  Clock
} from "lucide-react"

// Dados mockados da reserva
const reserva = {
  id: "RES-2025-001",
  propriedade: "Fazenda Boa Vista",
  atividade: "Trilha Ecológica + Hospedagem",
  dataEntrada: "15/12/2025",
  dataSaida: "17/12/2025",
  pessoas: 4,
  valorDiaria: 150,
  noites: 2,
  valorAtividade: 180,
  taxaServico: 33,
}

export default function PagamentoPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [formaPagamento, setFormaPagamento] = useState("pix")
  const [copiado, setCopiado] = useState(false)
  const [processando, setProcessando] = useState(false)

  const valorTotal =
    reserva.valorDiaria * reserva.noites + reserva.valorAtividade + reserva.taxaServico

  const copiarCodigoPix = () => {
    navigator.clipboard.writeText("00020126580014BR.GOV.BCB.PIX0136...")
    setCopiado(true)
    setTimeout(() => setCopiado(false), 3000)
  }

  const finalizarPagamento = () => {
    setProcessando(true)
    // Simulação de processamento
    setTimeout(() => {
      router.push("/dashboard/visitante?pagamento=sucesso")
    }, 2000)
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

          <div className="mb-8">
            <h1 className="text-3xl font-serif font-bold text-foreground">Pagamento</h1>
            <p className="text-muted-foreground mt-1">
              Finalize o pagamento da sua reserva
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Resumo da reserva */}
            <div className="lg:col-span-1 lg:order-2">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Resumo da Reserva</CardTitle>
                  <CardDescription>{reserva.id}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{reserva.propriedade}</h4>
                    <p className="text-sm text-muted-foreground">{reserva.atividade}</p>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-in</span>
                      <span>{reserva.dataEntrada}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Check-out</span>
                      <span>{reserva.dataSaida}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Hóspedes</span>
                      <span>{reserva.pessoas} pessoas</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        R$ {reserva.valorDiaria} x {reserva.noites} noites
                      </span>
                      <span>R$ {reserva.valorDiaria * reserva.noites}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Atividades</span>
                      <span>R$ {reserva.valorAtividade}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Taxa de serviço</span>
                      <span>R$ {reserva.taxaServico}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-primary">R$ {valorTotal.toFixed(2)}</span>
                  </div>

                  <Alert>
                    <Shield className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      Pagamento 100% seguro. Seus dados estão protegidos.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </div>

            {/* Formas de pagamento */}
            <div className="lg:col-span-2 lg:order-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Forma de Pagamento</CardTitle>
                  <CardDescription>Escolha como deseja pagar</CardDescription>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formaPagamento}
                    onValueChange={setFormaPagamento}
                    className="space-y-4"
                  >
                    <div
                      className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        formaPagamento === "pix" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                      onClick={() => setFormaPagamento("pix")}
                    >
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <QrCode className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">PIX</p>
                            <p className="text-sm text-muted-foreground">
                              Pagamento instantâneo
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        formaPagamento === "cartao" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                      onClick={() => setFormaPagamento("cartao")}
                    >
                      <RadioGroupItem value="cartao" id="cartao" />
                      <Label htmlFor="cartao" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <CreditCard className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">Cartão de Crédito</p>
                            <p className="text-sm text-muted-foreground">
                              Parcele em até 12x
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        formaPagamento === "boleto" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                      onClick={() => setFormaPagamento("boleto")}
                    >
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <FileText className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">Boleto Bancário</p>
                            <p className="text-sm text-muted-foreground">
                              Vencimento em 3 dias úteis
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>

                    <div
                      className={`flex items-center space-x-4 rounded-lg border p-4 cursor-pointer transition-colors ${
                        formaPagamento === "transferencia" ? "border-primary bg-primary/5" : "hover:bg-muted"
                      }`}
                      onClick={() => setFormaPagamento("transferencia")}
                    >
                      <RadioGroupItem value="transferencia" id="transferencia" />
                      <Label htmlFor="transferencia" className="flex-1 cursor-pointer">
                        <div className="flex items-center gap-3">
                          <Building2 className="h-6 w-6 text-primary" />
                          <div>
                            <p className="font-medium">Transferência Bancária</p>
                            <p className="text-sm text-muted-foreground">
                              TED ou DOC
                            </p>
                          </div>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Detalhes da forma de pagamento selecionada */}
              {formaPagamento === "pix" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pagar com PIX</CardTitle>
                    <CardDescription>
                      Escaneie o QR Code ou copie o código
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex flex-col items-center">
                      <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center mb-4">
                        <QrCode className="h-32 w-32 text-foreground" />
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        Válido por 30 minutos
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label>Código PIX Copia e Cola</Label>
                      <div className="flex gap-2">
                        <Input
                          value="00020126580014BR.GOV.BCB.PIX0136..."
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button variant="outline" onClick={copiarCodigoPix}>
                          {copiado ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Após o pagamento, a confirmação é automática e instantânea.
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              )}

              {formaPagamento === "cartao" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dados do Cartão</CardTitle>
                    <CardDescription>
                      Insira os dados do seu cartão de crédito
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="numero">Número do Cartão</Label>
                      <Input
                        id="numero"
                        placeholder="0000 0000 0000 0000"
                        maxLength={19}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome no Cartão</Label>
                      <Input id="nome" placeholder="NOME COMO ESTÁ NO CARTÃO" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="validade">Validade</Label>
                        <Input id="validade" placeholder="MM/AA" maxLength={5} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input id="cvv" placeholder="000" maxLength={4} type="password" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="parcelas">Parcelas</Label>
                      <select
                        id="parcelas"
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
                      >
                        <option value="1">1x de R$ {valorTotal.toFixed(2)} (sem juros)</option>
                        <option value="2">2x de R$ {(valorTotal / 2).toFixed(2)} (sem juros)</option>
                        <option value="3">3x de R$ {(valorTotal / 3).toFixed(2)} (sem juros)</option>
                        <option value="6">6x de R$ {(valorTotal / 6).toFixed(2)} (sem juros)</option>
                        <option value="12">12x de R$ {((valorTotal * 1.1) / 12).toFixed(2)} (com juros)</option>
                      </select>
                    </div>

                    <Button className="w-full" onClick={finalizarPagamento} disabled={processando}>
                      {processando ? "Processando..." : `Pagar R$ ${valorTotal.toFixed(2)}`}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {formaPagamento === "boleto" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Boleto Bancário</CardTitle>
                    <CardDescription>
                      O boleto será gerado após a confirmação
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        O boleto tem vencimento em 3 dias úteis. Após o pagamento, a confirmação
                        pode levar até 2 dias úteis.
                      </AlertDescription>
                    </Alert>

                    <div className="p-4 bg-muted rounded-lg text-center">
                      <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Clique no botão abaixo para gerar o boleto
                      </p>
                    </div>

                    <Button className="w-full" onClick={finalizarPagamento} disabled={processando}>
                      {processando ? "Gerando boleto..." : "Gerar Boleto"}
                    </Button>
                  </CardContent>
                </Card>
              )}

              {formaPagamento === "transferencia" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Dados Bancários</CardTitle>
                    <CardDescription>
                      Realize a transferência para a conta abaixo
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="p-4 bg-muted rounded-lg space-y-3">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Banco</span>
                        <span className="font-medium">Banco do Brasil (001)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Agência</span>
                        <span className="font-medium">1234-5</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Conta</span>
                        <span className="font-medium">12345-6</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tipo</span>
                        <span className="font-medium">Conta Corrente</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Favorecido</span>
                        <span className="font-medium">Turismo Rural LTDA</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">CNPJ</span>
                        <span className="font-medium">12.345.678/0001-90</span>
                      </div>
                    </div>

                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Após realizar a transferência, envie o comprovante para confirmar o pagamento.
                        A confirmação pode levar até 1 dia útil.
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="comprovante">Enviar Comprovante</Label>
                      <Input id="comprovante" type="file" accept="image/*,.pdf" />
                    </div>

                    <Button className="w-full" onClick={finalizarPagamento} disabled={processando}>
                      {processando ? "Enviando..." : "Enviar Comprovante"}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
