# Auditoria de bugs — 03/09/2026

## Corrigidos nesta revisão
- Leitura inicial do `localStorage` em componentes de página foi removida para evitar divergência de hidratação SSR/cliente.
- O botão “Manter conectado” agora usa `localStorage` quando marcado e `sessionStorage` quando desmarcado, preservando a escolha ao atualizar o perfil.
- Datas de negócio usam a data local do navegador em vez da data UTC, evitando troca de dia perto da meia-noite.
- Operações de favoritos e avaliações agora exigem conta de visitante.
- Pagamentos não podem confirmar reservas cuja data de início já passou.
- Corrigida referência inexistente de `propertyId`/`propriedadeId` no bloqueio de disponibilidade.
- Validação de papel: operações de propriedade/atividade exigem empreendedor; criação de reserva exige visitante.
- Datas inválidas como `2026-02-31` agora são rejeitadas.
- Confirmação de reserva revalida disponibilidade/capacidade antes de confirmar.
- Exclusão de conta não apaga as senhas dos demais usuários.
- Bloqueios de disponibilidade passaram a integrar o mesmo store e agora impedem reservas nas datas bloqueadas.
- Atividade não pode ser publicada em propriedade inativa.
- `useSearchParams` do formulário de nova reserva agora está dentro de `Suspense`.
- `next.config.mjs` não ignora mais erros de TypeScript durante o build.
- Avaliação nova exige reserva concluída para o destino.
- Corrigida autorização do CRUD de reservas: empreendedores agora podem confirmar/cancelar reservas das próprias propriedades/atividades; somente visitantes podem criar novas reservas.
- Criada a rota `/como-funciona`, eliminando links que levavam a 404.
- Formulário de atividade não exibe mais “Noites” nem exige data de saída; eventos com data definida usam a data do evento.
- Datas dos eventos demonstrativos foram atualizadas para 2026 para não aparecerem como eventos já encerrados.
- Regras de senha de cadastro foram alinhadas às regras de alteração (8+ caracteres, maiúscula, número e símbolo).

## Limitações que continuam por serem do protótipo
- Autenticação e senhas ainda são locais; não são segurança de produção.
- Pagamento é apenas simulado.
- Recuperação de senha ainda é uma simulação visual e não envia e-mail real.
- `localStorage` continua sendo a persistência provisória.
- Concorrência entre abas/processos não é transacional.
- Essas regras precisam ser replicadas no backend/banco e protegidas por autorização no servidor.
