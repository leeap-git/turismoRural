"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Usuario, Empreendedor } from "@/lib/types"
import { usuarios, empreendedores } from "@/lib/data"

type UserType = Usuario | Empreendedor | null

interface AuthContextType {
  user: UserType
  userType: "visitante" | "empreendedor" | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, senha: string) => Promise<{ success: boolean; message: string; userType?: string }>
  logout: () => void
  register: (dados: RegisterData) => Promise<{ success: boolean; message: string }>
}

interface RegisterData {
  nome: string
  email: string
  senha: string
  telefone: string
  cpf: string
  tipo: "visitante" | "empreendedor"
  // Campos do empreendedor
  nomeEmpresa?: string
  cnpj?: string
  endereco?: string
  cidade?: string
  estado?: string
  descricao?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Simula armazenamento de senhas (em produção seria hash)
const senhasUsuarios: Record<string, string> = {
  "maria@email.com": "123456",
  "joao@email.com": "123456",
  "ana@email.com": "123456",
}

const senhasEmpreendedores: Record<string, string> = {
  "carlos@fazendaboavista.com": "123456",
  "fernanda@sitiosaojoao.com": "123456",
  "roberto@recantoverde.com": "123456",
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType>(null)
  const [userType, setUserType] = useState<"visitante" | "empreendedor" | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Carrega usuário do localStorage ao iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem("turismo_rural_user")
    const savedUserType = localStorage.getItem("turismo_rural_user_type")
    
    if (savedUser && savedUserType) {
      setUser(JSON.parse(savedUser))
      setUserType(savedUserType as "visitante" | "empreendedor")
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, senha: string): Promise<{ success: boolean; message: string; userType?: string }> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))

    // Verifica se é um usuário (visitante)
    const usuario = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (usuario) {
      const senhaCorreta = senhasUsuarios[usuario.email]
      if (senhaCorreta === senha) {
        setUser(usuario)
        setUserType("visitante")
        localStorage.setItem("turismo_rural_user", JSON.stringify(usuario))
        localStorage.setItem("turismo_rural_user_type", "visitante")
        return { success: true, message: "Login realizado com sucesso!", userType: "visitante" }
      }
      return { success: false, message: "Senha incorreta" }
    }

    // Verifica se é um empreendedor
    const empreendedor = empreendedores.find(e => e.email.toLowerCase() === email.toLowerCase())
    if (empreendedor) {
      const senhaCorreta = senhasEmpreendedores[empreendedor.email]
      if (senhaCorreta === senha) {
        setUser(empreendedor)
        setUserType("empreendedor")
        localStorage.setItem("turismo_rural_user", JSON.stringify(empreendedor))
        localStorage.setItem("turismo_rural_user_type", "empreendedor")
        return { success: true, message: "Login realizado com sucesso!", userType: "empreendedor" }
      }
      return { success: false, message: "Senha incorreta" }
    }

    return { success: false, message: "E-mail não cadastrado" }
  }

  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem("turismo_rural_user")
    localStorage.removeItem("turismo_rural_user_type")
  }

  const register = async (dados: RegisterData): Promise<{ success: boolean; message: string }> => {
    // Simula delay de rede
    await new Promise(resolve => setTimeout(resolve, 500))

    // Verifica se email já existe
    const emailExisteUsuario = usuarios.some(u => u.email.toLowerCase() === dados.email.toLowerCase())
    const emailExisteEmp = empreendedores.some(e => e.email.toLowerCase() === dados.email.toLowerCase())
    
    if (emailExisteUsuario || emailExisteEmp) {
      return { success: false, message: "E-mail já cadastrado" }
    }

    // Cria novo usuário/empreendedor
    const novoId = `${dados.tipo === "visitante" ? "user" : "emp"}-${Date.now()}`
    
    if (dados.tipo === "visitante") {
      const novoUsuario: Usuario = {
        id: novoId,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cpf: dados.cpf,
        tipo: "visitante",
        createdAt: new Date().toISOString().split("T")[0]
      }
      
      // Adiciona ao array (em memória)
      usuarios.push(novoUsuario)
      senhasUsuarios[dados.email] = dados.senha
      
      // Faz login automático
      setUser(novoUsuario)
      setUserType("visitante")
      localStorage.setItem("turismo_rural_user", JSON.stringify(novoUsuario))
      localStorage.setItem("turismo_rural_user_type", "visitante")
      
    } else {
      const novoEmpreendedor: Empreendedor = {
        id: novoId,
        nome: dados.nome,
        email: dados.email,
        telefone: dados.telefone,
        cpf: dados.cpf,
        tipo: "empreendedor",
        nomeEmpresa: dados.nomeEmpresa || "",
        cnpj: dados.cnpj || "",
        endereco: dados.endereco || "",
        cidade: dados.cidade || "",
        estado: dados.estado || "",
        descricao: dados.descricao || "",
        createdAt: new Date().toISOString().split("T")[0]
      }
      
      // Adiciona ao array (em memória)
      empreendedores.push(novoEmpreendedor)
      senhasEmpreendedores[dados.email] = dados.senha
      
      // Faz login automático
      setUser(novoEmpreendedor)
      setUserType("empreendedor")
      localStorage.setItem("turismo_rural_user", JSON.stringify(novoEmpreendedor))
      localStorage.setItem("turismo_rural_user_type", "empreendedor")
    }

    return { success: true, message: "Cadastro realizado com sucesso!" }
  }

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        userType, 
        isAuthenticated: !!user, 
        isLoading,
        login, 
        logout,
        register
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider")
  }
  return context
}
