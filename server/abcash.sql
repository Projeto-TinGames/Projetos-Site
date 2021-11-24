-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 29-Ago-2021 às 06:09
-- Versão do servidor: 10.4.17-MariaDB
-- versão do PHP: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `abcash`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `entradas`
--

CREATE TABLE `entradas` (
  `id_usuario` int(11) NOT NULL,
  `id_questao` int(11) NOT NULL,
  `id_resposta` int(11) NOT NULL,
  `data` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `entradas`
--

INSERT INTO `entradas` (`id_usuario`, `id_questao`, `id_resposta`, `data`) VALUES
(1, 1, 1, '2021-05-10 19:03:50'),
(1, 2, 4, '2021-05-10 19:03:50'),
(1, 3, 5, '2021-05-10 19:03:50'),
(1, 4, 9, '2021-05-10 19:03:50'),
(1, 5, 11, '2021-05-10 19:03:50'),
(1, 6, 14, '2021-05-10 19:03:50'),
(1, 7, 18, '2021-05-10 19:03:50'),
(1, 8, 20, '2021-05-10 19:03:50'),
(1, 9, 25, '2021-05-10 19:03:50'),
(1, 10, 27, '2021-05-10 19:03:50'),
(2, 1, 1, '2021-07-14 12:40:07'),
(2, 2, 4, '2021-07-14 12:40:07'),
(2, 3, 5, '2021-07-14 12:40:07'),
(2, 4, 7, '2021-07-14 12:40:07'),
(2, 5, 10, '2021-07-14 12:40:07'),
(2, 6, 14, '2021-07-14 12:40:07'),
(2, 7, 17, '2021-07-14 12:40:07'),
(2, 8, 19, '2021-07-14 12:40:07'),
(2, 9, 25, '2021-07-14 12:40:07'),
(2, 10, 28, '2021-07-14 12:40:07'),
(3, 1, 1, '2021-07-20 19:25:54'),
(3, 2, 4, '2021-07-20 19:25:54'),
(3, 3, 5, '2021-07-20 19:25:54'),
(3, 4, 7, '2021-07-20 19:25:54'),
(3, 5, 10, '2021-07-20 19:25:54'),
(3, 6, 15, '2021-07-20 19:25:54'),
(3, 7, 16, '2021-07-20 19:25:54'),
(3, 8, 19, '2021-07-20 19:25:54'),
(3, 9, 25, '2021-07-20 19:25:54'),
(3, 10, 28, '2021-07-20 19:25:54'),
(4, 1, 1, '2021-07-20 19:26:51'),
(4, 2, 3, '2021-07-20 19:26:51'),
(4, 3, 5, '2021-07-20 19:26:51'),
(4, 4, 7, '2021-07-20 19:26:51'),
(4, 5, 10, '2021-07-20 19:26:51'),
(4, 6, 15, '2021-07-20 19:26:51'),
(4, 7, 17, '2021-07-20 19:26:51'),
(4, 8, 19, '2021-07-20 19:26:51'),
(4, 9, 25, '2021-07-20 19:26:51'),
(4, 10, 28, '2021-07-20 19:26:51'),
(5, 1, 1, '2021-08-26 19:09:58'),
(5, 2, 4, '2021-08-26 19:09:58'),
(5, 3, 6, '2021-08-26 19:09:58'),
(5, 4, 7, '2021-08-26 19:09:58'),
(5, 5, 10, '2021-08-26 19:09:58'),
(5, 6, 15, '2021-08-26 19:09:58'),
(5, 7, 16, '2021-08-26 19:09:58'),
(5, 8, 19, '2021-08-26 19:09:58'),
(5, 9, 25, '2021-08-26 19:09:58'),
(5, 10, 28, '2021-08-26 19:09:58');

-- --------------------------------------------------------

--
-- Estrutura da tabela `questoes`
--

CREATE TABLE `questoes` (
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `questoes`
--

INSERT INTO `questoes` (`id`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10);

-- --------------------------------------------------------

--
-- Estrutura da tabela `respostas`
--

CREATE TABLE `respostas` (
  `id` int(11) NOT NULL,
  `texto` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `respostas`
--

INSERT INTO `respostas` (`id`, `texto`) VALUES
(1, 'Ele sai logo da cama.'),
(2, 'Ele fica alguns minutos na cama.'),
(3, 'Pegar o transporte coletivo para ir ao serviço.'),
(4, 'Acorda mais cedo e vai caminhando para o serviço.'),
(5, 'Optar por se organizar e fazer sua própria marmita.'),
(6, 'Ir no restaurante próximo ao local do trabalho.'),
(7, ' Ir para a sala de descanso com seu livro e dar uma lida.'),
(8, 'Ir para a sala de descanso da empresa e dormir.'),
(9, ' Usar o tempo para navegar em suas redes.'),
(10, 'Economizar para comprar a vista mais pra frente.'),
(11, 'Não comprar o produto, pois não está precisando.'),
(12, 'Comprar pelo cartão de crédito em várias parcelas.'),
(13, 'Ele pega um sanduíche vegetariano.'),
(14, 'Ele pega um sanduíche de carne.'),
(15, 'Ele pega um sanduíche de frango.'),
(16, 'Trabalha o máximo possível no próximo tempo livre.'),
(17, 'Trabalha ao menos 30 min por dia no trabalho.'),
(18, 'Não está muito preocupado com o trabalho.'),
(19, 'Decide ignorar ele por enquanto.'),
(20, 'Visita lojas comparando modelos e preços.'),
(21, 'Visita lojas online buscando pelo aparelho anunciado.'),
(22, 'Ele vai guardando o que der.'),
(23, 'Ele separa a quantia que sobrar todos os meses.'),
(24, 'Ele não estipula um valor fixo, mas planeja poupar.'),
(25, 'Ele planeja poupar uma quantia boa todos os meses.'),
(26, 'Não deixa nada arrumado.'),
(27, 'Coloca o despertador um pouco mais cedo.'),
(28, 'Já arruma tudo que vai precisar para amanhã.');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nome` varchar(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `nome`) VALUES
(1, 'Teste'),
(2, 'lorenzo costa'),
(3, 'Gabriel'),
(4, 'Paola'),
(5, 'Gabriela');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `entradas`
--
ALTER TABLE `entradas`
  ADD PRIMARY KEY (`id_usuario`,`id_questao`,`id_resposta`),
  ADD KEY `id_questao` (`id_questao`),
  ADD KEY `id_resposta` (`id_resposta`);

--
-- Índices para tabela `questoes`
--
ALTER TABLE `questoes`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `respostas`
--
ALTER TABLE `respostas`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `entradas`
--
ALTER TABLE `entradas`
  ADD CONSTRAINT `entradas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `entradas_ibfk_2` FOREIGN KEY (`id_questao`) REFERENCES `questoes` (`id`),
  ADD CONSTRAINT `entradas_ibfk_3` FOREIGN KEY (`id_resposta`) REFERENCES `respostas` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

CREATE USER 'projetos'@'localhost' IDENTIFIED BY '123456'; 
GRANT ALL PRIVILEGES ON * . * TO 'projetos'@'localhost';
FLUSH PRIVILEGES;