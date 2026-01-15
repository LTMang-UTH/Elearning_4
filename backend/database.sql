-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 15, 2026 at 04:01 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vue3_blog`
--

-- --------------------------------------------------------

--
-- Table structure for table `blogs`
--

CREATE TABLE `blogs` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `author_id` int(11) NOT NULL,
  `category_id` int(11) DEFAULT NULL,
  `status` enum('draft','published','archived') DEFAULT 'draft',
  `views` int(11) DEFAULT 0,
  `likes` int(11) DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `published_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blogs`
--

INSERT INTO `blogs` (`id`, `title`, `slug`, `content`, `excerpt`, `image`, `author_id`, `category_id`, `status`, `views`, `likes`, `created_at`, `updated_at`, `published_at`) VALUES
(1, 'Khởi đầu với Vue 3 - Framework JavaScript hiện đại', 'khoi-dau-voi-vue-3', '<h2>Vue 3 là gì?</h2><p>Vue 3 là phiên bản mới nhất của framework JavaScript phổ biến, mang đến nhiều cải tiến về hiệu năng và trải nghiệm lập trình. Với Composition API mới, bạn có thể tổ chức code tốt hơn và tái sử dụng logic dễ dàng hơn.</p><h3>Tính năng nổi bật:</h3><ul><li>Composition API</li><li>Performance tốt hơn 40%</li><li>TypeScript support</li><li>Teleport & Suspense</li></ul>', 'Tìm hiểu các tính năng mới và cách bắt đầu với Vue 3', '/src/assets/images/photo-1633356122544-f134324a6cee.jpg', 1, 2, 'published', 450, 67, '2026-01-15 12:28:26', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(2, 'Xây dựng RESTful API với Express.js', 'xay-dung-restful-api-voi-express', '<h2>Express.js</h2><p>Express.js là framework web tối giản và linh hoạt cho Node.js. Nó cung cấp các tính năng mạnh mẽ để xây dựng ứng dụng web và API một cách nhanh chóng.</p><h3>Các bước cơ bản:</h3><ol><li>Cài đặt Express</li><li>Tạo server</li><li>Định nghĩa routes</li><li>Xử lý middleware</li><li>Kết nối database</li></ol>', 'Hướng dẫn chi tiết xây dựng API chuyên nghiệp với Express', '/src/assets/images/photo-1558494949-ef010cbdcc31.jpg', 1, 2, 'published', 520, 82, '2026-01-15 12:28:26', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(3, 'TailwindCSS - CSS Framework hiện đại', 'tailwindcss-css-framework-hien-dai', '<h2>TailwindCSS</h2><p>TailwindCSS là một CSS framework utility-first giúp bạn xây dựng giao diện nhanh chóng và dễ dàng tùy biến.</p><h3>Ưu điểm:</h3><ul><li>Utility-first approach</li><li>Responsive design dễ dàng</li><li>Tùy biến cao</li><li>File size nhỏ với PurgeCSS</li></ul>', 'Làm chủ TailwindCSS để thiết kế giao diện đẹp', '/src/assets/images/photo-1507721999472-8ed4421c4af2.jpg', 2, 3, 'published', 381, 58, '2026-01-15 12:28:26', '2026-01-15 12:56:02', '2026-01-15 12:28:26'),
(4, 'JavaScript ES6+ - Tính năng hiện đại', 'javascript-es6-tinh-nang-hien-dai', '<h2>JavaScript hiện đại</h2><p>JavaScript đã phát triển đáng kể với ES6+. Các tính năng mới giúp code ngắn gọn, dễ đọc và hiệu quả hơn.</p><h3>Tính năng quan trọng:</h3><ul><li>Arrow Functions</li><li>Destructuring</li><li>Async/Await</li><li>Modules (import/export)</li><li>Template Literals</li></ul>', 'Khám phá các tính năng JavaScript hiện đại nhất', '/src/assets/images/photo-1579468118864-1b9ea3c0db4a.jpg', 2, 2, 'published', 612, 94, '2026-01-15 12:28:26', '2026-01-15 12:58:50', '2026-01-15 12:28:26'),
(5, 'MySQL Database Design Best Practices', 'mysql-database-design-best-practices', '<h2>Thiết kế Database chuyên nghiệp</h2><p>Database design là nền tảng của mọi ứng dụng. Một thiết kế tốt sẽ đảm bảo hiệu năng, khả năng mở rộng và bảo trì dễ dàng.</p><h3>Nguyên tắc cơ bản:</h3><ol><li>Normalization (1NF, 2NF, 3NF)</li><li>Indexing strategies</li><li>Foreign keys và relationships</li><li>Query optimization</li></ol>', 'Hướng dẫn thiết kế database MySQL hiệu quả', '/src/assets/images/photo-1544383835-bda2bc66a55d.jpg', 3, 1, 'published', 295, 45, '2026-01-15 12:28:26', '2026-01-15 12:28:26', '2026-01-15 12:28:26');

-- --------------------------------------------------------

--
-- Table structure for table `blog_likes`
--

CREATE TABLE `blog_likes` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `blog_tags`
--

CREATE TABLE `blog_tags` (
  `blog_id` int(11) NOT NULL,
  `tag_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `blog_tags`
--

INSERT INTO `blog_tags` (`blog_id`, `tag_id`) VALUES
(1, 1),
(1, 2),
(2, 2),
(2, 5),
(3, 6),
(3, 8),
(4, 2),
(4, 3),
(5, 10);

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `slug` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Technology', 'technology', 'Technology related articles', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(2, 'Programming', 'programming', 'Programming tutorials and tips', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(3, 'Web Development', 'web-development', 'Web development guides', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(4, 'Mobile', 'mobile', 'Mobile app development', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(5, 'Design', 'design', 'UI/UX Design articles', '2026-01-15 12:28:26', '2026-01-15 12:28:26');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `blog_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `parent_id` int(11) DEFAULT NULL,
  `content` text NOT NULL,
  `status` enum('pending','approved','rejected') DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `slug` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`id`, `name`, `slug`, `created_at`) VALUES
(1, 'Vue.js', 'vuejs', '2026-01-15 12:28:26'),
(2, 'JavaScript', 'javascript', '2026-01-15 12:28:26'),
(3, 'TypeScript', 'typescript', '2026-01-15 12:28:26'),
(4, 'React', 'react', '2026-01-15 12:28:26'),
(5, 'Node.js', 'nodejs', '2026-01-15 12:28:26'),
(6, 'CSS', 'css', '2026-01-15 12:28:26'),
(7, 'HTML', 'html', '2026-01-15 12:28:26'),
(8, 'TailwindCSS', 'tailwindcss', '2026-01-15 12:28:26'),
(9, 'MongoDB', 'mongodb', '2026-01-15 12:28:26'),
(10, 'MySQL', 'mysql', '2026-01-15 12:28:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `role` enum('user','admin') DEFAULT 'user',
  `status` enum('active','inactive','banned') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `avatar`, `phone`, `bio`, `role`, `status`, `created_at`, `updated_at`) VALUES
(1, 'Admin User', 'admin@gmail.com', '$2a$10$SXorTDCoBmyYtTZ1NvPntuvJAdyp1f1ZWPNyrKeA1f6IZjjkrsjyq', 'https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff&size=200', NULL, 'System Administrator', 'admin', 'active', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(2, 'Thanh Nhung', 'nhung@gmail.com', '$2a$10$juXBdeaJlenu1aS./37HnO1xoErEdLXAzOziLCEbhCKmH7.2cQ0T6', 'https://ui-avatars.com/api/?name=Thanh+Nhung&background=6366F1&color=fff&size=200', NULL, 'Web Developer and Tech Enthusiast', 'user', 'active', '2026-01-15 12:28:26', '2026-01-15 12:28:26'),
(3, 'Bích My', 'my@gmail.com', '$2a$10$QrMdPK1m1Tv9YM/6sQoE9uxtOA2Qx6anTIVEDm.8Q7ONSgESqR6CG', 'https://ui-avatars.com/api/?name=Bich+My&background=EC4899&color=fff&size=200', NULL, 'UI/UX Designer', 'user', 'active', '2026-01-15 12:28:26', '2026-01-15 12:28:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `blogs`
--
ALTER TABLE `blogs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`),
  ADD KEY `idx_author` (`author_id`),
  ADD KEY `idx_category` (`category_id`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created_at` (`created_at`);
ALTER TABLE `blogs` ADD FULLTEXT KEY `idx_search` (`title`,`content`);

--
-- Indexes for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_like` (`blog_id`,`user_id`),
  ADD KEY `idx_blog` (`blog_id`),
  ADD KEY `idx_user` (`user_id`);

--
-- Indexes for table `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD PRIMARY KEY (`blog_id`,`tag_id`),
  ADD KEY `idx_blog` (`blog_id`),
  ADD KEY `idx_tag` (`tag_id`);

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_blog` (`blog_id`),
  ADD KEY `idx_user` (`user_id`),
  ADD KEY `idx_parent` (`parent_id`),
  ADD KEY `idx_status` (`status`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `slug` (`slug`),
  ADD KEY `idx_slug` (`slug`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_email` (`email`),
  ADD KEY `idx_role` (`role`),
  ADD KEY `idx_status` (`status`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `blogs`
--
ALTER TABLE `blogs`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `blog_likes`
--
ALTER TABLE `blog_likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `blogs`
--
ALTER TABLE `blogs`
  ADD CONSTRAINT `blogs_ibfk_1` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blogs_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;

--
-- Constraints for table `blog_likes`
--
ALTER TABLE `blog_likes`
  ADD CONSTRAINT `blog_likes_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_likes_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `blog_tags`
--
ALTER TABLE `blog_tags`
  ADD CONSTRAINT `blog_tags_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `blog_tags_ibfk_2` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`blog_id`) REFERENCES `blogs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `comments_ibfk_3` FOREIGN KEY (`parent_id`) REFERENCES `comments` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
