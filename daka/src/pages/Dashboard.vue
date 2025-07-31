<template>
  <div class="min-h-screen bg-gray-50">
    <h1 class="text-4xl md:text-5xl font-extrabold text-[#212F5A] mb-8 text-center p-4">
      Panel de control <span class="text-[#FFD700]">Tiendas Daka</span>
    </h1>

    <div v-if="isLoading"
      class="flex items-center justify-center p-6 bg-white text-[#212F5A] text-lg font-medium rounded-lg shadow-md max-w-md mx-auto">
      <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-[#FFD700]" xmlns="http://www.w3.org/2000/svg" fill="none"
        viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
      </svg>
      Cargando datos, por favor espere...
    </div>

    <div v-else-if="error"
      class="p-6 bg-red-100 border border-red-400 text-red-700 text-lg font-medium rounded-lg shadow-md max-w-md mx-auto">
      Error: {{ error }}
    </div>

    <div v-else class="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-100 shadow-lg rounded-lg">
      <Stadistics :filtered-products="filteredProducts" :exchange-rate="exchangeRate" />

      <div class="my-8 border-t border-gray-200"></div>

      <Filters :key="filtersKey" :categories="categories" v-model:selected-category="selectedCategory"
        v-model:price-range="priceRange" @update:filters="onFilterChange" @clear="clearFilters" />

      <div class="my-8 border-t border-gray-200"></div>

      <!-- Exchange Rate Info -->
      <div class="bg-[#212F5A] rounded-md p-4 mb-6 flex items-center justify-between text-white text-sm">
        <div>
          <strong class="font-bold">Tasa de cambio actual:</strong>
          <span v-if="exchangeRate" class="text-[#ffe656]"> 1 USD = {{ exchangeRate.toFixed(2) }} Bs</span>
          <span v-else class="text-red-400">No disponible</span>
        </div>
      </div>

      <ListProducts :products="filteredProducts" :is-loading="isLoading" :error="error" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';

import Filters from '@/components/Filters.vue';
import ListProducts from '@/components/ListProducts.vue';
import Stadistics from '@/components/Stadistics.vue';

import { productService } from '@/services/product.service';
import { dolarService } from '@/services/dolar.service';

import type { ProductsApiResponse, ProductsWithBs } from '@/interfaces/products.interfaces';

interface FilterPreferences {
  category: string;
  priceMin: number;
  priceMax: number;
}

const FILTER_PREFERENCES_KEY = 'daka-filter-preferences';

const allProducts = ref<ProductsWithBs[]>([]);
const categories = ref<string[]>([]);
const selectedCategory = ref('');
const priceRange = ref<{ min: number | null; max: number | null }>({ min: null, max: null });
const filtersKey = ref(0);
const exchangeRate = ref<number | null>(null);

const isLoading = ref(true);
const error = ref<string | null>(null);

// LocalStorage helpers
function saveFilterPreferences() {
  try {
    const preferences: FilterPreferences = {
      category: selectedCategory.value,
      priceMin: priceRange.value.min || 0,
      priceMax: priceRange.value.max || 1000,
    };
    localStorage.setItem(FILTER_PREFERENCES_KEY, JSON.stringify(preferences));
  } catch (err) {
    console.warn('Error al guardar preferencias:', err);
  }
}

function loadFilterPreferences(): FilterPreferences | null {
  try {
    const saved = localStorage.getItem(FILTER_PREFERENCES_KEY);
    return saved ? JSON.parse(saved) : null;
  } catch (err) {
    console.warn('Error al cargar preferencias:', err);
    return null;
  }
}

function clearFilterPreferences() {
  localStorage.removeItem(FILTER_PREFERENCES_KEY);
}

function applyStoredPreferences() {
  const stored = loadFilterPreferences();
  if (stored) {
    selectedCategory.value = stored.category;
    priceRange.value = {
      min: stored.priceMin > 0 ? stored.priceMin : null,
      max: stored.priceMax < 1000 ? stored.priceMax : null,
    };
  } else {
    selectedCategory.value = '';
    priceRange.value = { min: null, max: null };
  }
}

watch([selectedCategory, () => priceRange.value.min, () => priceRange.value.max], () => {
  if (!isLoading.value) saveFilterPreferences();
}, { deep: true });

// Carga inicial de datos: tasa de cambio, productos y categorías
onMounted(async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const [dolarResponse, productsFromApi, fetchedCategories] = await Promise.all([
      dolarService.getDolarPrice(),
      productService.getProducts(),
      productService.getCategories(),
    ]);

    const rate = dolarResponse?.monitors?.bcv?.price;

    if (!rate || typeof rate !== 'number') {
      throw new Error('No se pudo obtener la tasa de cambio del BCV.');
    }

    exchangeRate.value = rate;

    allProducts.value = productsFromApi.map((product: ProductsApiResponse) => ({
      id: product.id,
      title: product.title,
      priceUSD: product.price,
      priceVES: parseFloat((product.price * rate).toFixed(2)),
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    }));

    categories.value = fetchedCategories;

    applyStoredPreferences();

    if (selectedCategory.value && !fetchedCategories.includes(selectedCategory.value)) {
      selectedCategory.value = '';
      saveFilterPreferences();
    }

    filtersKey.value++;

  } catch (err: any) {
    console.error('Error al cargar datos:', err);
    error.value = err?.message || 'Ocurrió un error inesperado.';
  } finally {
    isLoading.value = false;
  }
});

// Manejador: actualiza los filtros cuando cambian en el componente filters
function onFilterChange(filters: { category: string; min: number | null; max: number | null }) {
  selectedCategory.value = filters.category;
  priceRange.value = { min: filters.min, max: filters.max };
}
// filtra la lista de productos según la categoría y rango de precios
const filteredProducts = computed(() =>
  allProducts.value.filter((product) => {
    const matchesCategory =
      selectedCategory.value === '' || product.category === selectedCategory.value;

    const matchesPrice =
      (priceRange.value.min === null || product.priceUSD >= priceRange.value.min) &&
      (priceRange.value.max === null || product.priceUSD <= priceRange.value.max);

    return matchesCategory && matchesPrice;
  })
);

// Función: restablece todos los filtros y preferencias guardadas
function clearFilters() {
  selectedCategory.value = '';
  priceRange.value = { min: null, max: null };
  filtersKey.value++;
  clearFilterPreferences();
}
</script>