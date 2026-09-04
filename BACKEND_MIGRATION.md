# Migração para backend e banco de dados

A versão atual corrige a lógica no cliente para permitir validar os fluxos antes da API. O `localStorage` deverá ser substituído por chamadas ao backend; ele não deve ser usado como mecanismo de segurança.

## Entidades

- `users`: visitantes e empreendedores, com `role` (`visitante`/`empreendedor`), e-mail único.
- `entrepreneurs`: perfil empresarial 1:1 com `users` empreendedores.
- `properties`: propriedade pertencente a um empreendedor.
- `activities`: atividade pertencente a uma propriedade/empreendedor.
- `reservations`: reserva vinculada a usuário e, conforme o caso, propriedade e/ou atividade.
- `messages`: remetente, destinatário, assunto, conteúdo, lida, timestamps.
- `reviews`: autor e destino avaliado, com nota de 1 a 5.
- `favorites`: relação única usuário + propriedade.
- `availability_blocks`: bloqueios manuais por propriedade e data.

## Regras que já estão protegidas no protótipo

1. Proprietário só pode alterar sua própria propriedade ou atividade.
2. Reserva nunca aceita `valorTotal` enviado pelo cliente como fonte de verdade; o total é recalculado a partir dos preços cadastrados.
3. Não é possível reservar item inexistente/inativo.
4. Número de pessoas não pode exceder capacidade/vagas.
5. Reservas conflitantes consomem capacidade; canceladas não consomem.
6. Atividade com `dataEvento` só aceita reserva na data do evento.
7. Visitante só pode cancelar a própria reserva; alteração de status pelo empreendedor fica restrita ao recurso vinculado a ele.
8. Reserva cancelada não volta a ser aberta e reserva concluída não é reaberta.
9. Mensagem só pode ser editada pelo remetente e marcada como lida pelo destinatário.
10. Avaliação valida o destino e evita duplicidade por usuário/destino.
11. Favorito valida usuário e propriedade ativa.
12. Exclusão de conta remove relações dependentes para não deixar reservas/atividades órfãs.
13. Avaliação nova exige reserva concluída para o destino.
14. Bloqueios manuais de disponibilidade impedem novas reservas nessas datas.

## Recomendações para a API

As mesmas regras devem existir no servidor e ser aplicadas dentro de transações quando houver concorrência (principalmente reservas, capacidade e pagamento). O frontend deve tratar o backend como fonte de verdade.

Para produção, autenticação deve usar sessão segura/cookie httpOnly ou mecanismo equivalente; senha nunca deve ser armazenada em texto puro. O fluxo de recuperação de senha deve usar token expirável e envio real de e-mail.

## Ponto crítico de concorrência

Na criação/confirmação de uma reserva, validar disponibilidade e persistir a reserva atomicamente. Duas requisições simultâneas não podem ultrapassar `capacidade` ou `vagas`.
