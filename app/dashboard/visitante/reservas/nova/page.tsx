"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/auth-context"
import { crudReserva, loadStore } from "@/lib/client-store"
import type { Propriedade } from "@/lib/types"

function calcularNoites(inicio: string, fim: string): number {
  if (!inicio || !fim) return 1
  const start = new Date(`${inicio}T00:00:00`)
  const end = new Date(`${fim}T00:00:00`)
  const diff = Math.ceil((end.getTime() - start.getTime()) / 86400000)
  return Math.max(1, diff)
}

export default function Page() {
  const { user } = useAuth()
  const router = useRouter()
  const [props, setProps] = useState<Propriedade[]>([])
  const [f, setF] = useState({
    propriedadeId: "",
    dataInicio: "",
    dataFim: "",
    pessoas: "1",
    valorTotal: "",
  })

  useEffect(() => {
    const active = loadStore().propriedades.filter((p) => p.ativo)
    setProps(active)
    setF((current) => ({ ...current, propriedadeId: current.propriedadeId || active[0]?.id || "" }))
  }, [])

  const property = props.find((p) => p.id === f.propriedadeId)
  const noites = useMemo(() => calcularNoites(f.dataInicio, f.dataFim), [f.dataInicio, f.dataFim])

  const totalCalculado = property
    ? property.preco * Math.max(1, Number(f.pessoas) || 1) * noites
    : 0

  const set = (key: string, value: string) => setF((x) => ({ ...x, [key]: value }))

  const save = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user || !property) return

    if (f.dataFim && f.dataFim < f.dataInicio) {
      alert("A data de saída deve ser igual ou posterior à entrada.")
      return
    }

    try {
      crudReserva(
        null,
        {
          propriedadeId: property.id,
          dataInicio: f.dataInicio,
          dataFim: f.dataFim || undefined,
          pessoas: Number(f.pessoas),
          valorTotal: totalCalculado,
          status: "pendente",
        },
        user.id,
      )
      router.push("/dashboard/visitante/reservas")
    } catch (error) {
      alert(error instanceof Error ? error.message : "Não foi possível criar a reserva.")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-8">
        <div className="max-w-2xl mx-auto px-4">
          <Card>
            <CardHeader><CardTitle>Nova Reserva</CardTitle></CardHeader>
            <CardContent>
              {!props.length ? (
                <p className="text-muted-foreground">Nenhuma propriedade disponível no momento.</p>
              ) : (
                <form className="space-y-4" onSubmit={save}>
                  <div>
                    <Label>Propriedade</Label>
                    <Select value={f.propriedadeId} onValueChange={(value) => set("propriedadeId", value)}>
                      <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>{props.map((p) => <SelectItem key={p.id} value={p.id}>{p.nome} — R$ {p.preco.toFixed(2)}/noite</SelectItem>)}</SelectContent>
                    </Select>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div><Label>Entrada</Label><Input type="date" required value={f.dataInicio} onChange={(e) => set("dataInicio", e.target.value)} /></div>
                    <div><Label>Saída</Label><Input type="date" min={f.dataInicio || undefined} value={f.dataFim} onChange={(e) => set("dataFim", e.target.value)} /></div>
                    <div><Label>Pessoas</Label><Input type="number" min="1" max={property?.capacidade} required value={f.pessoas} onChange={(e) => set("pessoas", e.target.value)} /></div>
                  </div>
                  <div className="rounded-lg border p-4 bg-muted/30">
                    <div className="flex justify-between"><span>Diária</span><span>R$ {(property?.preco || 0).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span>Noites</span><span>{noites}</span></div>
                    <div className="flex justify-between font-semibold mt-2 pt-2 border-t"><span>Total</span><span>R$ {totalCalculado.toFixed(2)}</span></div>
                  </div>
                  <Button type="submit">Criar reserva</Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  )
}
