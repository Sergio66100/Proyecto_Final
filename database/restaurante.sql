-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-04-2026 a las 03:44:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `restaurante`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `items_pedido`
--

CREATE TABLE `items_pedido` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `items_pedido`
--

INSERT INTO `items_pedido` (`id`, `id_pedido`, `id_producto`, `cantidad`) VALUES
(1, 2, 4, 1),
(2, 2, 5, 3),
(3, 3, 4, 1),
(4, 3, 5, 1),
(5, 5, 6, 1),
(6, 5, 5, 3),
(7, 6, 4, 1),
(8, 6, 5, 3),
(9, 6, 6, 2),
(10, 7, 5, 2),
(11, 7, 4, 1),
(12, 7, 7, 1),
(13, 7, 29, 1),
(14, 7, 30, 6),
(15, 8, 5, 2),
(16, 8, 4, 1),
(17, 8, 7, 1),
(18, 8, 29, 1),
(19, 8, 30, 6),
(20, 9, 4, 1),
(21, 9, 6, 3),
(22, 10, 4, 1),
(23, 10, 6, 3),
(24, 11, 6, 1),
(25, 11, 19, 1),
(26, 11, 20, 3),
(27, 12, 6, 1),
(28, 12, 19, 1),
(29, 12, 20, 3),
(30, 13, 4, 1),
(31, 13, 6, 3),
(32, 13, 5, 1),
(33, 14, 4, 1),
(34, 14, 6, 3),
(35, 14, 5, 1),
(36, 15, 6, 1),
(37, 15, 5, 1),
(38, 16, 6, 1),
(39, 16, 5, 1),
(40, 17, 6, 1),
(41, 17, 5, 1),
(42, 17, 4, 1),
(43, 18, 6, 1),
(44, 18, 5, 1),
(45, 18, 4, 1),
(46, 18, 13, 1),
(47, 18, 14, 1),
(48, 19, 6, 1),
(49, 19, 5, 1),
(50, 19, 4, 1),
(51, 19, 13, 1),
(52, 19, 14, 1),
(53, 20, 30, 3),
(54, 20, 29, 2),
(55, 20, 25, 1),
(56, 20, 4, 1),
(57, 21, 5, 1),
(58, 22, 6, 1),
(59, 22, 17, 1),
(60, 23, 24, 1),
(61, 23, 11, 2),
(62, 24, 4, 1),
(63, 24, 5, 1),
(64, 25, 7, 1),
(65, 26, 4, 1),
(66, 26, 26, 2),
(67, 26, 9, 1),
(68, 26, 18, 1),
(69, 27, 4, 1),
(70, 27, 5, 1),
(71, 28, 6, 1),
(72, 28, 5, 1),
(73, 29, 24, 1),
(74, 29, 21, 2),
(75, 30, 5, 2),
(76, 31, 6, 1),
(77, 31, 5, 1),
(78, 32, 13, 2),
(79, 32, 29, 1),
(80, 33, 6, 1),
(81, 34, 26, 1),
(82, 34, 15, 1),
(83, 34, 19, 1),
(84, 34, 18, 1),
(85, 35, 5, 2),
(86, 36, 5, 1),
(87, 36, 6, 2),
(88, 37, 4, 1),
(89, 37, 5, 1),
(90, 38, 6, 2),
(91, 38, 5, 1),
(92, 39, 24, 2),
(93, 39, 7, 1),
(94, 40, 25, 1),
(95, 40, 24, 2),
(96, 40, 13, 1),
(97, 40, 23, 2),
(98, 41, 6, 1),
(99, 42, 5, 1),
(100, 42, 6, 2),
(101, 43, 17, 1),
(102, 44, 22, 1),
(103, 44, 31, 1),
(104, 44, 6, 1),
(105, 44, 15, 1),
(106, 45, 5, 1),
(107, 46, 7, 2),
(108, 46, 30, 1),
(109, 47, 4, 1),
(110, 47, 5, 1),
(111, 48, 6, 1),
(112, 49, 6, 1),
(113, 50, 4, 1),
(114, 50, 5, 1),
(115, 51, 13, 2),
(116, 51, 5, 1),
(117, 51, 25, 1),
(118, 52, 5, 1),
(119, 52, 6, 1),
(120, 53, 6, 1),
(121, 54, 5, 1),
(122, 54, 6, 1),
(123, 55, 4, 1),
(124, 55, 17, 2),
(125, 55, 13, 2),
(126, 55, 5, 2),
(127, 56, 20, 1),
(128, 56, 12, 1),
(129, 56, 11, 2),
(130, 57, 9, 1),
(131, 57, 28, 1),
(132, 58, 6, 1),
(133, 59, 6, 1),
(134, 59, 5, 1),
(135, 60, 27, 2),
(136, 60, 18, 2),
(137, 60, 14, 1),
(138, 61, 6, 1),
(139, 62, 6, 2),
(140, 62, 5, 2),
(141, 63, 13, 1),
(142, 63, 12, 1),
(143, 64, 10, 1),
(144, 64, 20, 1),
(145, 64, 22, 2),
(146, 65, 6, 1),
(147, 66, 5, 2),
(148, 66, 6, 1),
(149, 67, 6, 2),
(150, 68, 28, 1),
(151, 68, 7, 1),
(152, 69, 4, 1),
(153, 69, 16, 1),
(154, 69, 20, 1),
(155, 70, 6, 1),
(156, 70, 5, 2),
(157, 71, 6, 1),
(158, 72, 5, 2),
(159, 73, 13, 1),
(160, 74, 6, 1),
(161, 75, 5, 1),
(162, 76, 5, 1),
(163, 76, 6, 1),
(164, 77, 31, 2),
(165, 77, 11, 1),
(166, 77, 15, 2),
(167, 78, 6, 1),
(168, 79, 5, 1),
(169, 79, 6, 1),
(170, 80, 6, 1),
(171, 81, 30, 1),
(172, 81, 24, 1),
(173, 81, 12, 1),
(174, 82, 5, 2),
(175, 83, 5, 1),
(176, 83, 6, 1),
(177, 84, 6, 1),
(178, 85, 24, 1),
(179, 85, 21, 2),
(180, 86, 5, 1),
(181, 86, 6, 1),
(182, 87, 5, 1),
(183, 88, 6, 1),
(184, 89, 5, 1),
(185, 90, 14, 1),
(186, 90, 31, 1),
(187, 91, 4, 1),
(188, 91, 5, 1),
(189, 92, 27, 1),
(190, 92, 25, 1),
(191, 93, 10, 1),
(192, 93, 9, 1),
(193, 93, 24, 2),
(194, 93, 27, 1),
(195, 94, 8, 1),
(196, 94, 24, 1),
(197, 94, 13, 2),
(198, 94, 20, 2),
(199, 95, 9, 1),
(200, 95, 26, 1),
(201, 96, 5, 1),
(202, 97, 25, 1),
(203, 97, 26, 1),
(204, 98, 6, 1),
(205, 99, 6, 2),
(206, 100, 30, 2),
(207, 100, 13, 2),
(208, 101, 9, 1),
(209, 101, 11, 1),
(210, 102, 6, 1),
(211, 103, 6, 1),
(212, 104, 29, 1),
(213, 104, 16, 1),
(214, 104, 22, 1),
(215, 104, 12, 1),
(216, 105, 22, 2),
(217, 105, 15, 1),
(218, 105, 30, 2),
(219, 106, 4, 1),
(220, 106, 20, 2),
(221, 107, 19, 1),
(222, 107, 12, 1),
(223, 107, 20, 1),
(224, 107, 17, 1),
(225, 108, 5, 1),
(226, 108, 6, 1),
(227, 109, 6, 1),
(228, 110, 5, 1),
(229, 110, 6, 1),
(230, 111, 5, 1),
(231, 111, 6, 2),
(232, 112, 5, 2),
(233, 113, 6, 1),
(234, 114, 5, 2),
(235, 115, 6, 1),
(236, 115, 5, 1),
(237, 116, 5, 1),
(238, 117, 6, 2),
(239, 118, 5, 1),
(240, 118, 6, 1),
(241, 119, 6, 2),
(242, 120, 6, 1),
(243, 120, 5, 2),
(244, 121, 6, 1),
(245, 121, 5, 1),
(246, 122, 6, 2),
(247, 123, 5, 1),
(248, 124, 29, 1),
(249, 124, 10, 1),
(250, 124, 11, 1),
(251, 124, 30, 2),
(252, 125, 5, 2),
(253, 125, 27, 1),
(254, 125, 28, 1),
(255, 126, 5, 1),
(256, 127, 6, 1),
(257, 127, 5, 1),
(258, 128, 5, 1),
(259, 129, 8, 2),
(260, 129, 29, 1),
(261, 129, 9, 1),
(262, 130, 5, 1),
(263, 131, 4, 1),
(264, 131, 5, 1),
(265, 132, 5, 2),
(266, 133, 18, 2),
(267, 133, 5, 1),
(268, 133, 16, 2),
(269, 134, 6, 1),
(270, 134, 5, 1),
(271, 135, 31, 1),
(272, 135, 8, 2),
(273, 135, 4, 1),
(274, 135, 13, 1),
(275, 136, 5, 1),
(276, 137, 6, 1),
(277, 138, 6, 2),
(278, 139, 4, 1),
(279, 139, 5, 1),
(280, 140, 4, 1),
(281, 140, 5, 1),
(282, 141, 30, 1),
(283, 141, 29, 1),
(284, 141, 22, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mesas`
--

CREATE TABLE `mesas` (
  `id_mesa` int(11) NOT NULL,
  `capacidad` int(11) NOT NULL DEFAULT 4,
  `estado` enum('disponible','ocupada','reservada') DEFAULT 'disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mesas`
--

INSERT INTO `mesas` (`id_mesa`, `capacidad`, `estado`) VALUES
(1, 2, 'disponible'),
(2, 2, 'disponible'),
(3, 4, 'disponible'),
(4, 4, 'disponible'),
(5, 6, 'disponible'),
(6, 8, 'disponible');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `producto` varchar(100) NOT NULL,
  `estado` varchar(50) DEFAULT 'pendiente',
  `fecha` datetime DEFAULT current_timestamp(),
  `total` decimal(8,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`id`, `producto`, `estado`, `fecha`, `total`) VALUES
(2, '', 'pendiente', '2026-04-05 01:20:42', 0.00),
(3, '', 'pendiente', '2026-04-05 02:01:59', 0.00),
(4, '', 'pendiente', '2026-04-05 02:02:03', 0.00),
(5, '', 'pendiente', '2026-04-05 02:02:09', 0.00),
(6, '', 'pendiente', '2026-04-05 02:05:32', 0.00),
(7, '', 'pendiente', '2026-04-05 00:53:20', 56.00),
(8, '', 'pagado', '2026-04-05 02:53:21', 56.00),
(9, '', 'pendiente', '2026-04-05 00:57:48', 38.50),
(10, '', 'pagado', '2026-04-05 02:57:49', 38.50),
(11, '', 'pendiente', '2026-04-05 01:00:55', 41.90),
(12, '', 'pagado', '2026-04-05 03:00:56', 41.90),
(13, '', 'pendiente', '2026-04-05 01:03:35', 48.00),
(14, '', 'pagado', '2026-04-05 03:03:36', 48.00),
(15, '', 'pendiente', '2026-04-05 01:05:45', 19.50),
(16, '', 'pagado', '2026-04-05 03:05:48', 19.50),
(17, '', 'pendiente', '2026-04-05 01:06:33', 28.00),
(18, '', 'pendiente', '2026-04-05 01:06:57', 47.20),
(19, '', 'pagado', '2026-04-05 03:06:59', 47.20),
(20, '', 'pagado', '2026-04-05 03:52:20', 25.00),
(21, '', 'pagado', '2026-03-02 01:13:29', 11.43),
(22, '', 'pagado', '2026-01-28 17:58:29', 13.46),
(23, '', 'pagado', '2026-02-24 20:28:29', 13.88),
(24, '', 'pagado', '2026-04-08 19:58:29', 14.02),
(25, '', 'pagado', '2026-04-16 17:28:29', 9.00),
(26, '', 'pagado', '2026-04-17 23:58:29', 36.41),
(27, '', 'pagado', '2026-04-21 15:43:29', 20.17),
(28, '', 'pagado', '2026-01-28 23:58:29', 20.55),
(29, '', 'pagado', '2026-03-11 22:58:29', 13.89),
(30, '', 'pagado', '2026-04-24 01:13:29', 6.91),
(31, '', 'pagado', '2026-04-13 16:13:29', 19.32),
(32, '', 'pagado', '2026-04-06 16:13:29', 13.67),
(33, '', 'pagado', '2026-01-29 01:43:29', 7.84),
(34, '', 'pagado', '2026-03-21 01:58:29', 36.34),
(35, '', 'pagado', '2026-04-06 00:28:29', 8.59),
(36, '', 'pagado', '2026-03-27 18:43:29', 20.82),
(37, '', 'pagado', '2026-02-25 15:43:29', 16.65),
(38, '', 'pagado', '2026-04-17 23:28:29', 14.07),
(39, '', 'pagado', '2026-02-13 17:28:29', 21.64),
(40, '', 'pagado', '2026-03-20 17:43:29', 31.30),
(41, '', 'pagado', '2026-03-14 16:28:29', 10.77),
(42, '', 'pagado', '2026-04-08 18:43:29', 18.15),
(43, '', 'pagado', '2026-03-04 16:43:29', 9.29),
(44, '', 'pagado', '2026-03-24 15:13:29', 45.18),
(45, '', 'pagado', '2026-03-25 21:58:29', 8.36),
(46, '', 'pagado', '2026-03-24 21:43:29', 17.26),
(47, '', 'pagado', '2026-02-08 19:43:29', 18.41),
(48, '', 'pagado', '2026-04-03 17:43:29', 9.72),
(49, '', 'pagado', '2026-02-27 15:58:29', 6.22),
(50, '', 'pagado', '2026-01-27 19:58:29', 16.89),
(51, '', 'pagado', '2026-02-18 18:43:29', 33.19),
(52, '', 'pagado', '2026-02-23 20:28:29', 13.17),
(53, '', 'pagado', '2026-03-25 20:13:29', 8.19),
(54, '', 'pagado', '2026-04-08 19:28:29', 15.22),
(55, '', 'pagado', '2026-01-31 18:58:29', 41.77),
(56, '', 'pagado', '2026-01-30 00:43:29', 20.32),
(57, '', 'pagado', '2026-03-29 01:28:29', 18.21),
(58, '', 'pagado', '2026-04-25 18:13:29', 7.69),
(59, '', 'pagado', '2026-03-02 21:13:29', 14.00),
(60, '', 'pagado', '2026-04-27 01:58:29', 34.86),
(61, '', 'pagado', '2026-03-19 00:43:29', 8.67),
(62, '', 'pagado', '2026-02-08 01:28:29', 15.21),
(63, '', 'pagado', '2026-03-02 22:13:29', 12.35),
(64, '', 'pagado', '2026-04-20 18:28:29', 33.35),
(65, '', 'pagado', '2026-03-07 22:13:29', 6.80),
(66, '', 'pagado', '2026-04-01 17:58:29', 17.79),
(67, '', 'pagado', '2026-04-24 15:43:29', 9.59),
(68, '', 'pagado', '2026-02-05 19:43:29', 17.28),
(69, '', 'pagado', '2026-02-24 21:28:29', 31.00),
(70, '', 'pagado', '2026-02-25 16:28:29', 20.06),
(71, '', 'pagado', '2026-02-19 23:58:29', 9.18),
(72, '', 'pagado', '2026-03-22 00:43:29', 9.51),
(73, '', 'pagado', '2026-02-16 18:43:29', 10.32),
(74, '', 'pagado', '2026-01-26 16:13:29', 8.15),
(75, '', 'pagado', '2026-03-01 00:28:29', 8.36),
(76, '', 'pagado', '2026-03-06 01:43:29', 19.13),
(77, '', 'pagado', '2026-03-30 15:58:29', 33.28),
(78, '', 'pagado', '2026-03-31 18:43:29', 9.21),
(79, '', 'pagado', '2026-03-02 16:28:29', 20.83),
(80, '', 'pagado', '2026-04-07 15:28:29', 9.36),
(81, '', 'pagado', '2026-04-23 22:28:29', 23.67),
(82, '', 'pagado', '2026-03-29 15:28:29', 8.72),
(83, '', 'pagado', '2026-02-07 21:58:29', 13.95),
(84, '', 'pagado', '2026-03-03 17:58:29', 9.25),
(85, '', 'pagado', '2026-03-09 17:58:29', 17.70),
(86, '', 'pagado', '2026-04-07 00:13:29', 16.46),
(87, '', 'pagado', '2026-03-13 19:58:29', 7.39),
(88, '', 'pagado', '2026-03-07 18:13:29', 7.31),
(89, '', 'pagado', '2026-04-19 22:43:29', 11.47),
(90, '', 'pagado', '2026-02-25 18:58:29', 14.27),
(91, '', 'pagado', '2026-03-20 23:28:29', 18.45),
(92, '', 'pagado', '2026-02-23 00:28:29', 16.27),
(93, '', 'pagado', '2026-04-12 19:58:29', 26.92),
(94, '', 'pagado', '2026-03-03 16:43:29', 39.57),
(95, '', 'pagado', '2026-04-05 21:28:29', 23.39),
(96, '', 'pagado', '2026-03-01 23:13:29', 10.04),
(97, '', 'pagado', '2026-04-12 01:58:29', 22.91),
(98, '', 'pagado', '2026-02-15 21:43:29', 9.85),
(99, '', 'pagado', '2026-03-13 01:43:29', 6.96),
(100, '', 'pagado', '2026-04-25 21:28:29', 20.79),
(101, '', 'pagado', '2026-03-19 17:58:29', 16.77),
(102, '', 'pagado', '2026-03-20 00:43:29', 6.67),
(103, '', 'pagado', '2026-03-04 01:28:29', 8.52),
(104, '', 'pagado', '2026-02-15 22:43:29', 24.63),
(105, '', 'pagado', '2026-02-18 17:58:29', 29.92),
(106, '', 'pagado', '2026-02-17 00:43:29', 23.98),
(107, '', 'pagado', '2026-04-11 16:28:29', 45.58),
(108, '', 'pagado', '2026-01-29 20:58:29', 13.08),
(109, '', 'pagado', '2026-02-26 16:28:29', 8.19),
(110, '', 'pagado', '2026-02-11 18:28:29', 15.73),
(111, '', 'pagado', '2026-01-26 18:13:29', 23.64),
(112, '', 'pagado', '2026-03-06 17:28:29', 10.18),
(113, '', 'pagado', '2026-02-22 22:58:29', 7.09),
(114, '', 'pagado', '2026-02-06 20:28:29', 11.20),
(115, '', 'pagado', '2026-03-03 23:13:29', 22.99),
(116, '', 'pagado', '2026-04-19 22:43:29', 7.11),
(117, '', 'pagado', '2026-03-18 00:58:29', 6.28),
(118, '', 'pagado', '2026-02-03 16:28:29', 16.62),
(119, '', 'pagado', '2026-03-23 00:13:29', 8.77),
(120, '', 'pagado', '2026-02-03 21:43:29', 14.33),
(121, '', 'pagado', '2026-03-30 00:58:29', 12.55),
(122, '', 'pagado', '2026-04-19 22:13:29', 11.61),
(123, '', 'pagado', '2026-02-18 15:58:29', 7.06),
(124, '', 'pagado', '2026-03-31 17:28:29', 36.73),
(125, '', 'pagado', '2026-02-14 16:43:29', 33.18),
(126, '', 'pagado', '2026-02-07 23:43:29', 7.16),
(127, '', 'pagado', '2026-04-19 16:13:29', 19.60),
(128, '', 'pagado', '2026-03-18 16:13:29', 8.38),
(129, '', 'pagado', '2026-03-16 20:13:29', 22.14),
(130, '', 'pagado', '2026-02-14 01:58:29', 6.31),
(131, '', 'pagado', '2026-04-09 18:28:29', 14.59),
(132, '', 'pagado', '2026-02-15 17:43:29', 8.16),
(133, '', 'pagado', '2026-02-28 23:13:29', 18.07),
(134, '', 'pagado', '2026-03-01 01:28:29', 23.81),
(135, '', 'pagado', '2026-02-16 19:13:29', 46.04),
(136, '', 'pagado', '2026-03-27 22:28:29', 8.30),
(137, '', 'pagado', '2026-03-10 15:43:29', 6.75),
(138, '', 'pagado', '2026-03-13 22:13:29', 9.34),
(139, '', 'pagado', '2026-03-30 01:58:29', 17.27),
(140, '', 'pagado', '2026-03-30 18:13:29', 18.04),
(141, '', 'pagado', '2026-04-26 03:26:21', 10.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `precio` decimal(10,2) NOT NULL,
  `imagen` varchar(255) DEFAULT NULL,
  `categoria` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `precio`, `imagen`, `categoria`) VALUES
(4, 'Hamburguesa Clásica', 8.50, 'https://www.carniceriademadrid.es/wp-content/uploads/2022/09/smash-burger-que-es.jpg', 'Hamburguesas'),
(5, 'Hamburguesa BBQ', 9.50, 'https://chefeel.com/chefgeneralfiles/2021/07/front-view-burger-on-stand-scaled.jpg', 'Hamburguesas'),
(6, 'Hamburguesa Doble Queso', 10.00, 'https://media-cdn.tripadvisor.com/media/photo-s/1c/c7/15/d1/holy-cheese-doble-hamburguesa.jpg', 'Hamburguesas'),
(7, 'Hamburguesa Vegana', 9.00, 'https://nutririana.com/wp-content/uploads/2022/03/BURGER-VEGANA-DE-TOFU-Y-VERDURAS-receta-nutririana.jpg', 'Hamburguesas'),
(8, 'Pizza Margarita', 8.00, 'https://cdn.blog.paulinacocina.net/wp-content/uploads/2023/09/pizza-margherita-paulina-cocina-recetas.jpg', 'Pizzas'),
(9, 'Pizza Pepperoni', 9.50, 'https://www.sortirambnens.com/wp-content/uploads/2019/02/pizza-de-peperoni.jpg', 'Pizzas'),
(10, 'Pizza Cuatro Quesos', 10.50, 'https://www.novachef.es/media/images/pizza-cuatro-quesos.jpg', 'Pizzas'),
(11, 'Pizza Barbacoa', 10.00, 'https://cecotec.es/recetas/wp-content/uploads/2022/06/Cecofry_Pizza_Barbacoa_RRSS.jpg', 'Pizzas'),
(12, 'Espaguetis Boloñesa', 8.90, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2025/08/espaguetis-a-la-bolonesa-1024x683.jpg', 'Pasta'),
(13, 'Carbonara', 9.20, 'https://recetasdecocina.elmundo.es/wp-content/uploads/2024/09/espaguetis-a-la-carbonara.jpg', 'Pasta'),
(14, 'Lasaña', 10.00, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYVNzlCs4bbpneJekln3cOZOS6rLZg69Ipzw&s', 'Pasta'),
(15, 'Pollo Asado', 9.00, 'https://sandersonfarms.com/wp-content/uploads/2017/04/Recipes_Roast_Chicken_with_Garlic_and_Lime_Thumb_420x420.jpg', 'Pollo'),
(16, 'Alitas BBQ', 7.50, 'https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/NOLA/calcmenu/recipes/col-recipies/fruco/ALITAS-SALSA-1024X1024-px.jpg', 'Pollo'),
(17, 'Nuggets', 6.00, 'https://wp-cdn.typhur.com/wp-content/uploads/2025/02/air-fryer-frozen-chicken-nuggets.jpg', 'Pollo'),
(18, 'Tacos', 7.00, 'https://www.pequerecetas.com/wp-content/uploads/2020/10/tacos-mexicanos.jpg', 'Mexicano'),
(19, 'Burrito', 8.50, 'https://rumbameats.com/wp-content/uploads/2025/11/Thai-Beef-Cheek-Burritos.jpg', 'Mexicano'),
(20, 'Quesadilla', 7.80, 'https://www.kikkoman.es/fileadmin/_processed_/e/4/csm_F1011-recipe-page-fruity-asian-duck-quesadilla_Mobile_6e71e300a2.webp', 'Mexicano'),
(21, 'Ensalada César', 6.50, 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/b876d8ea-fc9b-4b04-9958-9c70fe1c74e0/Derivates/fb3399fa-df15-4d0d-9beb-83a79a37a16e.jpg', 'Ensaladas'),
(22, 'Ensalada Mixta', 5.50, 'https://e00-xlk-cooking-elmundo.uecdn.es/files/article_main_microformat_4_3/uploads/2023/02/28/63fe840cb1d16.jpeg', 'Ensaladas'),
(23, 'Patatas Fritas', 3.00, 'https://www.lanacion.com.ar/resizer/v2/papas-fritas-estilo-french-fries-con-V3HQTRWMCRF3HBDBKQJUYFTAL4.jpg?auth=b1859780e4d3e7869de3df2412ebe454c37bedebf1576b58e779c992c8b1c63c&width=420&height=280&quality=70&smart=true', 'Extras'),
(24, 'Aros de Cebolla', 3.50, 'https://cdn.blog.paulinacocina.net/wp-content/uploads/2021/12/aros-de-cebolla-fritos.jpg', 'Extras'),
(25, 'Tarta de Chocolate', 4.50, 'https://i.blogs.es/4c1903/tarta-de-chocolate-facil-y-rapida/840_560.jpg', 'Postres'),
(26, 'Cheesecake', 4.80, 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/B4908103-C61E-4BCC-9609-03919F55CE7E/Derivates/60B07F46-E017-4FDD-A6A9-BDA7A09C6240.jpg', 'Postres'),
(27, 'Helado Chocolate', 3.50, 'https://editorialtelevisa.brightspotcdn.com/60/3e/e866f2f148c49544e20c7d0f786a/heladodechocolatecremoso.jpg', 'Postres'),
(28, 'Refresco', 2.50, 'https://lh5.googleusercontent.com/proxy/RBqHqL8tX4GpmlASnhbau5l2HcazmvEvAAeP7Sq7reu7_uKt7oCm3gp3jDEOwwzsVk9e0QSLWS7Dxxg_wm6au7JvnyLRifUOtoc7abA03lFdDaPj3xW5twORkiw', 'Bebidas'),
(29, 'Agua', 1.50, 'https://5sentidos.es/wp-content/uploads/2023/12/Agua-Mineral-Font-Vella-Botella-1.5-Litros-600px-1200x900.png', 'Bebidas'),
(30, 'Cerveza', 3.00, 'https://www.cruzcampo.es/static/img/beers/front-bottle-cana.png', 'Bebidas'),
(31, 'Café', 1.80, 'https://a.storyblok.com/f/112937/568x400/65868734b8/coffee-around-the-world-what-to-order-where-square-568x400.jpg/m/620x0/filters:quality(70)/', 'Bebidas');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `telefono` varchar(15) NOT NULL,
  `fecha` date NOT NULL,
  `hora` time NOT NULL,
  `num_personas` int(11) NOT NULL DEFAULT 1,
  `notas` text DEFAULT NULL,
  `estado` enum('activa','cancelada','completada') DEFAULT 'activa',
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`id_reserva`, `id_cliente`, `nombre`, `email`, `telefono`, `fecha`, `hora`, `num_personas`, `notas`, `estado`, `creado_en`) VALUES
(1, 2, 'Sergio', 'sergiogomezcarrasco2006@gmail.com', '642184521', '2026-04-06', '14:20:00', 4, 'Alergia a la cerveza', 'activa', '2026-04-05 03:27:02'),
(2, 2, 'Sergio', 'sergiogomezcarrasco2006@gmail.com', '642184521', '2026-04-07', '20:30:00', 4, 'Alergia a la cerveza', 'activa', '2026-04-05 03:30:28'),
(3, 2, 'Sergio', 'sergiogomezcarrasco2006@gmail.com', '642184521', '2026-04-08', '21:50:00', 4, 'Alergia a nanasjhw', 'activa', '2026-04-05 03:53:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` char(64) NOT NULL,
  `rol` enum('cliente','admin') DEFAULT 'cliente',
  `creado_en` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `nombre`, `email`, `password_hash`, `rol`, `creado_en`) VALUES
(2, 'Sergio', 'sergiogomezcarrasco2006@gmail.com', '8be35e716f0a5b1f7f87b696a4e5a492bd1f4e2e2f43a7d352dc92de97d25c7c', 'cliente', '2026-04-05 00:31:42'),
(3, 'Admin', 'admin@restaurante.com', '47f30f1318c94e068d04f2521d498c2173999e43a20c6aaf2666c911d78194d4', 'cliente', '2026-04-26 01:38:27'),
(4, 'Cliente', 'cliente@test.com', '07480fb9e85b9396af06f006cf1c95024af2531c65fb505cfbd0add1e2f31573', 'cliente', '2026-04-26 01:38:56');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `mesas`
--
ALTER TABLE `mesas`
  ADD PRIMARY KEY (`id_mesa`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`id_reserva`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=285;

--
-- AUTO_INCREMENT de la tabla `mesas`
--
ALTER TABLE `mesas`
  MODIFY `id_mesa` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=142;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `id_reserva` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `items_pedido`
--
ALTER TABLE `items_pedido`
  ADD CONSTRAINT `items_pedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `items_pedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
