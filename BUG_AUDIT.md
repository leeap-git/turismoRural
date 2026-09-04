# Auditoria do protótipo — rodada final

Corrigidos nesta rodada:
- retorno ao destino original após login via `next`;
- disponibilidade real de vagas na Home;
- botão de atividade esgotada realmente desabilitado;
- Home e listagens ignoram atividades ligadas a propriedades inativas;
- atividades com data passada deixam de aparecer como próximas;
- fallback de imagens para arquivos existentes (`placeholder.jpg` / `placeholder-user.jpg`);
- edição de propriedade/atividade somente para o respectivo empreendedor no protótipo;
- redução de capacidade/vagas não pode deixar reservas ativas incompatíveis;
- alteração da data de atividade com reservas ativas é bloqueada;
- novas/alteradas atividades não aceitam data passada;
- formulário de reserva usa data mínima de hoje.

Fora do escopo desta rodada:
- autenticação segura, autorização server-side, banco de dados e storage de imagens (a implementação continua local para protótipo).
