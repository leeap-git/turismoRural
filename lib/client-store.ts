"use client"

import { atividades as seedAtividades, avaliacoes as seedAvaliacoes, favoritos as seedFavoritos, mensagens as seedMensagens, propriedades as seedPropriedades, reservas as seedReservas, usuarios as seedUsuarios, empreendedores as seedEmpreendedores } from "./data"
import type { Atividade, Avaliacao, Favorito, Mensagem, Propriedade, Reserva, Usuario, Empreendedor } from "./types"

type Store = { propriedades: Propriedade[]; atividades: Atividade[]; reservas: Reserva[]; mensagens: Mensagem[]; avaliacoes: Avaliacao[]; favoritos: Favorito[]; usuarios: Usuario[]; empreendedores: Empreendedor[] }

const KEY = "turismo_rural_crud_v1"

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)) }
function seeds(): Store { return clone({ propriedades: seedPropriedades, atividades: seedAtividades, reservas: seedReservas, mensagens: seedMensagens, avaliacoes: seedAvaliacoes, favoritos: seedFavoritos, usuarios: seedUsuarios, empreendedores: seedEmpreendedores }) }

export function loadStore(): Store {
  if (typeof window === "undefined") return seeds()
  const raw = localStorage.getItem(KEY)
  if (!raw) { const initial = seeds(); localStorage.setItem(KEY, JSON.stringify(initial)); return initial }
  try { return JSON.parse(raw) as Store } catch { const initial = seeds(); localStorage.setItem(KEY, JSON.stringify(initial)); return initial }
}

export function saveStore(store: Store) { localStorage.setItem(KEY, JSON.stringify(store)); window.dispatchEvent(new Event("turismo-rural-store")) }
export function resetStore() { const initial = seeds(); saveStore(initial); return initial }
export function newId(prefix: string) { return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }

export function crudPropriedade(id: string | null, dados: Partial<Propriedade>, empreendedorId: string): Propriedade {
  const store = loadStore()
  if (id) {
    const index = store.propriedades.findIndex(p => p.id === id)
    if (index < 0) throw new Error("Propriedade não encontrada")
    store.propriedades[index] = { ...store.propriedades[index], ...dados }
    saveStore(store); return store.propriedades[index]
  }
  const item: Propriedade = { id: newId("prop"), empreendedorId, nome: dados.nome || "Nova propriedade", descricao: dados.descricao || "", endereco: dados.endereco || "", cidade: dados.cidade || "", estado: dados.estado || "SP", preco: Number(dados.preco || 0), capacidade: Number(dados.capacidade || 1), imagens: dados.imagens || ["/placeholder.jpg"], comodidades: dados.comodidades || [], tipo: (dados.tipo as Propriedade["tipo"]) || "sitio", avaliacao: 0, totalAvaliacoes: 0, ativo: true, createdAt: new Date().toISOString().slice(0,10) }
  store.propriedades.push(item); saveStore(store); return item
}
export function deletePropriedade(id: string) { const s=loadStore(); const i=s.propriedades.findIndex(x=>x.id===id); if(i<0)return false; s.propriedades[i].ativo=!s.propriedades[i].ativo; saveStore(s); return true }

export function crudAtividade(id: string | null, dados: Partial<Atividade>, empreendedorId: string): Atividade {
  const s=loadStore()
  if(id){const i=s.atividades.findIndex(x=>x.id===id);if(i<0)throw new Error("Atividade não encontrada");s.atividades[i]={...s.atividades[i],...dados};saveStore(s);return s.atividades[i]}
  const item:Atividade={id:newId("ativ"),empreendedorId,propriedadeId:dados.propriedadeId||s.propriedades.find(p=>p.empreendedorId===empreendedorId)?.id||"",nome:dados.nome||"Nova atividade",descricao:dados.descricao||"",tipo:(dados.tipo as Atividade["tipo"])||"passeio",preco:Number(dados.preco||0),duracao:dados.duracao||"1 hora",vagas:Number(dados.vagas||1),imagem:dados.imagem||"/placeholder.jpg",dataEvento:dados.dataEvento,horario:dados.horario,inclui:dados.inclui||[],requisitos:dados.requisitos||[],ativo:true,createdAt:new Date().toISOString().slice(0,10)}
  s.atividades.push(item);saveStore(s);return item
}
export function deleteAtividade(id:string){const s=loadStore();const i=s.atividades.findIndex(x=>x.id===id);if(i<0)return false;s.atividades[i].ativo=!s.atividades[i].ativo;saveStore(s);return true}

export function crudReserva(id:string|null,dados:Partial<Reserva>,usuarioId:string):Reserva{
 const s=loadStore(); if(id){const i=s.reservas.findIndex(x=>x.id===id);if(i<0)throw new Error("Reserva não encontrada");s.reservas[i]={...s.reservas[i],...dados};saveStore(s);return s.reservas[i]}
 const item:Reserva={id:newId("res"),usuarioId,propriedadeId:dados.propriedadeId,atividadeId:dados.atividadeId,dataInicio:dados.dataInicio||new Date().toISOString().slice(0,10),dataFim:dados.dataFim,pessoas:Number(dados.pessoas||1),valorTotal:Number(dados.valorTotal||0),status:dados.status||"pendente",metodoPagamento:dados.metodoPagamento,observacoes:dados.observacoes,createdAt:new Date().toISOString().slice(0,10)};s.reservas.push(item);saveStore(s);return item
}
export function deleteReserva(id:string){const s=loadStore();const i=s.reservas.findIndex(x=>x.id===id);if(i<0)return false;s.reservas.splice(i,1);saveStore(s);return true}

export function crudMensagem(id:string|null,dados:Partial<Mensagem>,remetenteId:string):Mensagem{
 const s=loadStore(); if(id){const i=s.mensagens.findIndex(x=>x.id===id);if(i<0)throw new Error("Mensagem não encontrada");s.mensagens[i]={...s.mensagens[i],...dados};saveStore(s);return s.mensagens[i]}
 const item:Mensagem={id:newId("msg"),remetenteId,destinatarioId:dados.destinatarioId||"user-1",assunto:dados.assunto||"Sem assunto",conteudo:dados.conteudo||"",lida:false,createdAt:new Date().toISOString().slice(0,10)};s.mensagens.push(item);saveStore(s);return item
}
export function deleteMensagem(id:string){const s=loadStore();const i=s.mensagens.findIndex(x=>x.id===id);if(i<0)return false;s.mensagens.splice(i,1);saveStore(s);return true}
export function marcarLida(id:string){const s=loadStore();const i=s.mensagens.findIndex(x=>x.id===id);if(i<0)return false;s.mensagens[i].lida=true;saveStore(s);return true}

export function crudAvaliacao(id:string|null,dados:Partial<Avaliacao>,usuarioId:string):Avaliacao{
 const s=loadStore();if(id){const i=s.avaliacoes.findIndex(x=>x.id===id);if(i<0)throw new Error("Avaliação não encontrada");s.avaliacoes[i]={...s.avaliacoes[i],...dados};saveStore(s);recalc(dados.propriedadeId);return s.avaliacoes[i]}
 const item:Avaliacao={id:newId("aval"),usuarioId,propriedadeId:dados.propriedadeId,atividadeId:dados.atividadeId,nota:Number(dados.nota||5),comentario:dados.comentario||"",createdAt:new Date().toISOString().slice(0,10)};s.avaliacoes.push(item);saveStore(s);recalc(item.propriedadeId);return item
}
export function deleteAvaliacao(id:string){const s=loadStore();const i=s.avaliacoes.findIndex(x=>x.id===id);if(i<0)return false;const p=s.avaliacoes[i].propriedadeId;s.avaliacoes.splice(i,1);saveStore(s);recalc(p);return true}
function recalc(propertyId?:string){if(!propertyId)return;const s=loadStore();const a=s.avaliacoes.filter(x=>x.propriedadeId===propertyId);const p=s.propriedades.find(x=>x.id===propertyId);if(p){p.totalAvaliacoes=a.length;p.avaliacao=a.length?Number((a.reduce((n,x)=>n+x.nota,0)/a.length).toFixed(1)):0;saveStore(s)}}

export function toggleFavorito(usuarioId:string,propriedadeId:string){const s=loadStore();const i=s.favoritos.findIndex(x=>x.usuarioId===usuarioId&&x.propriedadeId===propriedadeId);if(i>=0)s.favoritos.splice(i,1);else s.favoritos.push({id:newId("fav"),usuarioId,propriedadeId,createdAt:new Date().toISOString().slice(0,10)});saveStore(s)}
