# Auditoria de bugs — 03/09/2026

## Corrigidos nesta revisão
- Validação de papel: operações de propriedade/atividade exigem empreendedor; criação de reserva exige visitante.
- Datas inválidas como `2026-02-31` agora são rejeitadas.
- Confirmação de reserva revalida disponibilidade/capacidade antes de confirmar.
- Exclusão de conta não apaga as senhas dos demais usuários.
- Bloqueios de disponibilidade passaram a integrar o mesmo store e agora impedem reservas nas datas bloqueadas.
- Atividade não pode ser publicada em propriedade inativa.
- `useSearchParams` do formulário de nova reserva agora está dentro de `Suspense`.
- `next.config.mjs` não ignora mais erros de TypeScript durante o build.
- Avaliação nova exige reserva concluída para o destino.

## Limitações que continuam por serem do protótipo
- Autenticação e senhas ainda são locais; não são segurança de produção.
- Pagamento é apenas simulado.
- `localStorage` continua sendo a persistência provisória.
- Concorrência entre abas/processos não é transacional.
- Essas regras precisam ser replicadas no backend/banco e protegidas por autorização no servidor.
