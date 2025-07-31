<template>
    <div
        class="card bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-300 overflow-hidden group">
        <!-- Contenedor de imagen con altura fija -->
        <div class="relative h-52 sm:h-60 lg:h-64 overflow-hidden bg-white flex items-center justify-center p-3">
            <img :src="product.image" :alt="product.title"
                class="product-image w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                loading="lazy" />
            <!-- Overlay sutil en hover -->
            <div
                class="absolute inset-0 bg-[#212F5A] bg-opacity-0 group-hover:bg-opacity-5 transition-all duration-300">
            </div>
        </div>

        <!-- Contenido de la tarjeta -->
        <div class="p-4 sm:p-5">
            <!-- Título del producto -->
            <h3
                class="text-base sm:text-lg font-bold text-[#212F5A] mb-3 line-clamp-2 leading-tight min-h-[3rem] sm:min-h-[3.5rem]">
                {{ product.title }}
            </h3>

            <!-- Contenedor de precios -->
            <div class="space-y-2">
                <!-- Precio USD -->
                <div
                    class="flex items-center justify-between bg-gradient-to-r from-[#FFD700] to-[#FFC107] rounded-lg p-2.5 shadow-sm">
                    <span class="text-sm font-medium text-[#212F5A]">USD</span>
                    <span class="text-lg font-bold text-[#212F5A]">${{ product.priceUSD.toFixed(2) }}</span>
                </div>

                <!-- Precio VES -->
                <div class="flex items-center justify-between bg-[#212F5A] rounded-lg p-2.5 shadow-sm">
                    <span class="text-sm font-medium text-white">VES</span>
                    <span class="text-lg font-bold text-[#FFD700]">Bs. {{ product.priceVES }}</span>
                </div>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    product: {
        image: string
        title: string
        priceUSD: number
        priceVES: number
    }
}>();
</script>