<template>
  <div class="home-page-modern">
      <!-- Hero Section with Animation -->
      <section class="hero-modern relative overflow-hidden rounded-3xl mb-16 shadow-2xl">
        <div class="hero-gradient absolute inset-0"></div>
        <div class="hero-pattern absolute inset-0 opacity-10"></div>
        
        <div class="relative z-10 text-center py-24 px-6">
          <div class="hero-content">
            <div class="mb-6">
              <span class="inline-block px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold text-sm mb-6">
                <i class="fas fa-star mr-2"></i>Chào mừng đến không gian sáng tạo -NHÓM 8
              </span>
            </div>
            
            <h1 class="hero-title text-6xl md:text-7xl font-black text-white mb-6 leading-tight">
              Chia sẻ
              <span class="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Câu chuyện tuyệt vời
              </span>
            </h1>
            
            <p class="text-2xl text-white/90 mb-10 max-w-2xl mx-auto font-light">
              Tham gia cộng đồng nhà văn và độc giả. Tạo, chia sẻ và khám phá nội dung truyền cảm hứng.
            </p>
            
            <div class="flex flex-wrap gap-4 justify-center">
              <RouterLink to="/blogs/create" class="hero-btn-primary group">
                <i class="fas fa-pen-fancy mr-3"></i>
                <span>Bắt đầu viết</span>
                <i class="fas fa-arrow-right ml-3 group-hover:translate-x-2 transition-transform"></i>
              </RouterLink>
              
              <RouterLink to="/blogs" class="hero-btn-secondary">
                <i class="fas fa-book-open mr-3"></i>
                <span>Khám phá Blog</span>
              </RouterLink>
            </div>
          </div>
        </div>
        
        <!-- Animated Floating Elements -->
        <div class="absolute top-20 left-10 animate-float">
          <div class="w-16 h-16 bg-white/20 rounded-full blur-xl"></div>
        </div>
        <div class="absolute bottom-20 right-20 animate-float-delayed">
          <div class="w-24 h-24 bg-purple-300/20 rounded-full blur-xl"></div>
        </div>
      </section>

      <!-- Popular Blogs Section -->
      <section class="popular-blogs mb-16">
        <div class="flex items-center justify-between mb-8">
          <div>
            <h2 class="section-title text-4xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              <i class="fas fa-fire text-orange-500 mr-3"></i>Blog Nổi Bật
            </h2>
            <p class="text-gray-600 mt-2">Các bài viết được yêu thích nhất</p>
          </div>
          <RouterLink to="/blogs" class="text-indigo-600 hover:text-indigo-700 font-semibold flex items-center">
            Xem tất cả <i class="fas fa-arrow-right ml-2"></i>
          </RouterLink>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="blog in popularBlogs" :key="blog.id" class="blog-card-modern group">
            <div class="card-image-wrapper">
              <img :src="blog.image || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800'" 
                   :alt="blog.title" 
                   class="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500">
              <div class="card-overlay">
                <span class="badge-popular">
                  <i class="fas fa-fire mr-1"></i>Phổ biến
                </span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex items-center gap-3 mb-3">
                <div class="flex items-center text-sm text-gray-500">
                  <i class="fas fa-eye mr-1"></i>
                  <span>{{ blog.views || 0 }}</span>
                </div>
                <div class="flex items-center text-sm text-gray-500">
                  <i class="fas fa-heart mr-1"></i>
                  <span>{{ blog.likes || 0 }}</span>
                </div>
              </div>
              
              <!-- Author Info -->
              <div class="flex items-center gap-2 mb-3">
                <img 
                  :src="blog.author_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(blog.author_name || 'Author') + '&background=random'" 
                  :alt="blog.author_name" 
                  class="w-8 h-8 rounded-full object-cover"
                >
                <span class="text-sm text-gray-700 font-medium">{{ blog.author_name || 'Unknown Author' }}</span>
              </div>
              
              <h3 class="text-xl font-bold mb-3 text-gray-800 group-hover:text-indigo-600 transition-colors line-clamp-2">
                {{ blog.title }}
              </h3>
              
              <p class="text-gray-600 mb-4 line-clamp-3">{{ blog.excerpt || blog.content?.substring(0, 100) + '...' }}</p>
              
              <RouterLink :to="`/blogs/${blog.id}`" class="read-more-btn">
                Đọc tiếp
                <i class="fas fa-arrow-right ml-2 group-hover:translate-x-2 transition-transform"></i>
              </RouterLink>
            </div>
          </div>
        </div>
      </section>

      <!-- Latest Blogs Section -->
      <section class="latest-blogs">
        <div class="mb-8">
          <h2 class="section-title text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            <i class="fas fa-clock text-blue-500 mr-3"></i>Bài viết mới
          </h2>
          <p class="text-gray-600 mt-2">Nội dung mới nhất từ các tác giả</p>
        </div>
        
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div v-for="blog in latestBlogs" :key="blog.id" class="latest-blog-card group">
            <div class="flex gap-5">
              <div class="latest-image-wrapper">
                <img :src="blog.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400'" 
                     :alt="blog.title" 
                     class="w-40 h-32 object-cover rounded-2xl group-hover:scale-105 transition-transform duration-300">
              </div>
              
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-2">
                  <span class="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
                    <i class="fas fa-tag mr-1"></i>Mới
                  </span>
                  <span class="text-xs text-gray-500">
                    <i class="fas fa-calendar-alt mr-1"></i>
                    {{ new Date(blog.created_at).toLocaleDateString('vi-VN') }}
                  </span>
                </div>
                
                <!-- Author Info -->
                <div class="flex items-center gap-2 mb-2">
                  <img 
                    :src="blog.author_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(blog.author_name || 'Author') + '&background=random'" 
                    :alt="blog.author_name" 
                    class="w-6 h-6 rounded-full object-cover"
                  >
                  <span class="text-xs text-gray-700 font-medium">{{ blog.author_name || 'Unknown Author' }}</span>
                </div>
                
                <h3 class="text-lg font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {{ blog.title }}
                </h3>
                
                <p class="text-sm text-gray-600 mb-3 line-clamp-2">{{ blog.excerpt || blog.content?.substring(0, 80) + '...' }}</p>
                
                <RouterLink :to="`/blogs/${blog.id}`" class="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center">
                  Đọc tiếp <i class="fas fa-chevron-right ml-2 text-xs"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import { useBlogStore } from '@/store/blog'

const blogStore = useBlogStore()

const popularBlogs = ref([])
const latestBlogs = ref([])

onMounted(async () => {
  await blogStore.fetchPopularBlogs(6)
  await blogStore.fetchLatestBlogs(5)
  
  popularBlogs.value = blogStore.popularBlogs
  latestBlogs.value = blogStore.latestBlogs
})
</script>

<style scoped>
.home-page-modern {
  @apply container mx-auto px-6 py-8;
}

/* Hero Section Styles */
.hero-modern {
  position: relative;
  animation: fadeInUp 0.8s ease-out;
}

.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
}

.hero-pattern {
  background-image: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
  background-size: 30px 30px;
}

.hero-title {
  animation: fadeInUp 1s ease-out 0.2s backwards;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  font-family: 'Playfair Display', serif;
}

.hero-content {
  animation: fadeInUp 1s ease-out 0.3s backwards;
}

.hero-btn-primary {
  @apply px-8 py-4 bg-white text-indigo-700 rounded-2xl font-bold text-lg
         hover:shadow-2xl hover:scale-105 transition-all duration-300 
         inline-flex items-center shadow-xl;
}

.hero-btn-secondary {
  @apply px-8 py-4 bg-white/10 backdrop-blur-sm text-white border-2 border-white
         rounded-2xl font-bold text-lg hover:bg-white hover:text-indigo-700
         transition-all duration-300 inline-flex items-center;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}

@keyframes float-delayed {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-30px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
  animation: float-delayed 4s ease-in-out infinite;
}

/* Section Title */
.section-title {
  font-family: 'Playfair Display', serif;
  animation: fadeInLeft 0.8s ease-out;
}

/* Blog Card Modern */
.blog-card-modern {
  @apply bg-white rounded-2xl shadow-lg overflow-hidden 
         hover:shadow-2xl transition-all duration-300
         hover:-translate-y-2 cursor-pointer;
  animation: fadeInUp 0.6s ease-out backwards;
}

.blog-card-modern:nth-child(1) { animation-delay: 0.1s; }
.blog-card-modern:nth-child(2) { animation-delay: 0.2s; }
.blog-card-modern:nth-child(3) { animation-delay: 0.3s; }

.card-image-wrapper {
  @apply relative overflow-hidden;
}

.card-overlay {
  @apply absolute top-0 left-0 right-0 p-4 
         bg-gradient-to-b from-black/50 to-transparent;
}

.badge-popular {
  @apply inline-block px-3 py-1 bg-orange-500 text-white text-xs font-bold rounded-full;
}

.read-more-btn {
  @apply inline-flex items-center font-bold text-indigo-600 
         hover:text-indigo-700 transition-colors;
}

/* Latest Blog Card */
.latest-blog-card {
  @apply bg-white rounded-2xl p-5 shadow-md 
         hover:shadow-xl transition-all duration-300 cursor-pointer
         border border-gray-100 hover:border-indigo-200;
  animation: fadeInRight 0.6s ease-out backwards;
}

.latest-blog-card:nth-child(odd) { animation-delay: 0.1s; }
.latest-blog-card:nth-child(even) { animation-delay: 0.2s; }

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
