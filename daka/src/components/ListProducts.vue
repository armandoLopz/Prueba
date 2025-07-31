<template>
  <div class="mb-8 p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg border border-gray-100">
    <h2 class="text-2xl md:text-3xl font-semibold text-[#212F5A] mb-6">Listado de Productos</h2>
    <div v-if="isLoading"
      class="flex items-center justify-center p-6 bg-white text-[#212F5A] text-lg font-medium rounded-lg shadow-md max-w-md mx-auto">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#FFD700]" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
        </path>
      </svg>
      Cargando productos, por favor espere...
    </div>
    <div v-else-if="error"
      class="p-6 bg-red-100 border border-red-400 text-red-700 text-lg font-medium rounded-lg shadow-md max-w-md mx-auto">
      Error: {{ error }}
    </div>
    <div v-else>
      <div v-if="products.length === 0" class="text-center text-gray-600 text-lg py-10">
        No hay productos disponibles con los filtros aplicados.
      </div>
      <div v-else>
        <!-- Layout especial para exactamente 5 productos -->
        <div v-if="paginatedProducts.length === 5" class="mb-12">
          <!-- Primera fila: 2 productos -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20 mb-12 lg:mb-16 justify-items-center max-w-5xl mx-auto px-4">
            <CardProduct v-for="product in paginatedProducts.slice(0, 2)" :key="product.id" :product="product"
              class="w-full max-w-xs sm:max-w-sm" />
          </div>
          <!-- Segunda fila: 2 productos -->
          <div
            class="grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-20 mb-12 lg:mb-16 justify-items-center max-w-5xl mx-auto px-4">
            <CardProduct v-for="product in paginatedProducts.slice(2, 4)" :key="product.id" :product="product"
              class="w-full max-w-xs sm:max-w-sm" />
          </div>
          <!-- Tercera fila: 1 producto centrado -->
          <div class="flex justify-center px-4">
            <CardProduct :product="paginatedProducts[4]" class="w-full max-w-xs sm:max-w-sm" />
          </div>
        </div>

        <!-- Layout por defecto para otros casos -->
        <div v-else
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 justify-items-center max-w-7xl mx-auto px-4">
          <CardProduct v-for="product in paginatedProducts" :key="product.id" :product="product"
            class="w-full max-w-xs sm:max-w-sm" />
        </div>

        <div class="flex justify-center items-center space-x-2 mt-8">
          <button @click="currentPage--" :disabled="currentPage === 1"
            class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Anterior
          </button>
          <button v-for="page in totalPages" :key="page" @click="currentPage = page" :class="{
            'bg-[#212F5A] text-white': page === currentPage,
            'bg-white text-gray-700 hover:bg-gray-100': page !== currentPage
          }" class="px-4 py-2 rounded-md font-semibold border border-gray-300 transition-colors">
            {{ page }}
          </button>
          <button @click="currentPage++" :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
            Siguiente
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import CardProduct from './CardProduct.vue';
import type { ProductsWithBs } from '@/interfaces/products.interfaces';

const props = defineProps<{
  products: ProductsWithBs[];
  isLoading: boolean;
  error: string | null;
}>();

const currentPage = ref(1);
const PRODUCTS_PER_PAGE = 5;

// Refresco de la vista si cambian los productos
watch(() => props.products, () => {
  currentPage.value = 1;
});

// Calculo de productos por página
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * PRODUCTS_PER_PAGE;
  const end = start + PRODUCTS_PER_PAGE;
  return props.products.slice(start, end);
});

const totalPages = computed(() =>
  Math.ceil(props.products.length / PRODUCTS_PER_PAGE)
);
</script>