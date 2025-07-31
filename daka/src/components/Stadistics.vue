<template>
  <div class="mb-8">
    <h2 class="text-3xl md:text-3xl font-semibold text-[#212F5A] mb-6 px-4 sm:px-0">Estadísticas</h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 sm:px-0">
      <div class="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border border-gray-100">
        <div class="flex-shrink-0">
          <div class="bg-[#212F5A]/10 p-3 rounded-full flex items-center justify-center">
            <ShoppingCart class="h-6 w-6 text-[#212F5A]" />
          </div>
        </div>
        <div>
          <p class="text-gray-600 text-sm md:text-base font-medium mb-1"><strong>Total de Productos</strong></p>
          <p class="text-[#333333] text-3xl md:text-4xl font-extrabold">{{ filteredProducts.length }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border border-gray-100">
        <div class="flex-shrink-0">
          <div class="bg-[#212F5A]/10 p-3 rounded-full flex items-center justify-center">
            <Star class="h-6 w-6 text-green-500" />
          </div>
        </div>
        <div>
          <p class="text-gray-600 text-sm md:text-base font-medium mb-1"><strong>Categorías Únicas</strong></p>
          <p class="text-[#333333] text-3xl md:text-4xl font-extrabold">{{ uniqueFilteredCategories.length }}</p>
        </div>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-sm flex items-start space-x-4 border border-gray-100">
        <div class="flex-shrink-0">
          <div class="bg-[#FFD700]/20 p-3 rounded-full flex items-center justify-center">
            <DollarSign class="h-6 w-6 text-[#FFD700]" />
          </div>
        </div>
        <div>
          <p class="text-gray-600 text-sm md:text-base font-medium mb-1"><strong>Precio Promedio</strong></p>
          <p class="text-[#333333] text-3xl md:text-4xl font-extrabold">${{ averagePrice.toFixed(2) }}</p>
          <p class="text-gray-500 text-m mt-1">{{ formatVESPrice(averagePrice * exchangeRate) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
import type { ProductsWithBs } from '@/interfaces/products.interfaces';
import { DollarSign, ShoppingCart, Star } from 'lucide-vue-next';


const props = defineProps<{
  filteredProducts: ProductsWithBs[];
  exchangeRate: number;
}>();

// Precio promedio
const averagePrice = computed(() => {
  if (props.filteredProducts.length === 0) return 0;
  const total = props.filteredProducts.reduce((sum, p) => sum + p.priceUSD, 0);
  return total / props.filteredProducts.length;
});

// Categorías únicas entre productos filtrados
const uniqueFilteredCategories = computed(() => {
  const set = new Set(props.filteredProducts.map(p => p.category));
  return Array.from(set);
});

const formatVESPrice = (value: number): string => {
  return `Bs. ${value.toFixed(2).replace('.', ',')}`;
};
</script>

<style></style>

<style></style>