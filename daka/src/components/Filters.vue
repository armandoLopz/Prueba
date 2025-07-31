<template>
  <h2 class="text-2xl md:text-3xl font-semibold text-[#212F5A] mb-6">Filtros</h2>

  <div class="mb-8 p-4 sm:p-6 lg:p-8 bg-white shadow-lg rounded-lg border border-gray-100">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 items-end">
      <!-- Categoría -->
      <div>
        <label for="category" class="block text-gray-700 text-sm font-medium mb-2">Categoría</label>
        <div class="relative">
          <select
            id="category"
            v-model="localCategory"
            class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent text-gray-700 appearance-none bg-white pr-8"
          >
            <option value="">Todas las categorías</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ capitalize(category) }}
            </option>
          </select>
          <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
            </svg>
          </div>
        </div>
      </div>

      <!-- Precio mínimo -->
      <div>
        <label for="minPrice" class="block text-gray-700 text-sm font-medium mb-2">Precio Mínimo (USD)</label>
        <input
          id="minPrice"
          type="number"
          min="0"
          step="0.01"
          placeholder="0.00"
          :value="localPriceRange.min ?? ''"
          @input="onPriceChange('min', $event)"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent text-gray-700"
        />
      </div>

      <!-- Precio máximo -->
      <div>
        <label for="maxPrice" class="block text-gray-700 text-sm font-medium mb-2">Precio Máximo (USD)</label>
        <input
          id="maxPrice"
          type="number"
          min="0"
          step="0.01"
          placeholder="1000.00"
          :value="localPriceRange.max ?? ''"
          @input="onPriceChange('max', $event)"
          class="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FFD700] focus:border-transparent text-gray-700"
        />
      </div>
    </div>

    <p v-if="priceValidationMessage" class="mb-4 text-red-600 text-sm">
      {{ priceValidationMessage }}
    </p>

    <p class="mb-6 text-gray-500 text-sm italic">
      Consideración: Al filtrar los productos se toma en cuenta tanto la categoría como el precio indicado
    </p>

    <div class="flex justify-end">
      <button
        @click="clearFilters"
        class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-md shadow-sm transition duration-150 ease-in-out"
      >
        Limpiar Filtros
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  categories: string[];
  selectedCategory: string;
  priceRange: { min: number | null; max: number | null };
}>();

const emit = defineEmits<{
  (e: 'update:selectedCategory', value: string): void;
  (e: 'update:priceRange', value: { min: number | null; max: number | null }): void;
  (e: 'update:filters', filters: { category: string; min: number | null; max: number | null }): void;
  (e: 'clear'): void;
}>();

const priceValidationMessage = ref('');

const localCategory = ref(props.selectedCategory);
const localPriceRange = ref({ ...props.priceRange });

// Sincronizar cambios de props externas
watch(() => props.selectedCategory, (value) => {
  localCategory.value = value;
});
watch(() => props.priceRange, (value) => {
  localPriceRange.value = { ...value };
});

// Emitir cuando cambia la categoría
watch(localCategory, (value) => {
  emit('update:selectedCategory', value);
  validateAndEmit();
});

// Emitir cuando cambia el precio mínimo o máximo
function onPriceChange(type: 'min' | 'max', event: Event) {
  const value = (event.target as HTMLInputElement).value;
  const parsed = value === '' ? null : Number(value);
  localPriceRange.value[type] = parsed;
  emit('update:priceRange', { ...localPriceRange.value });
  validateAndEmit();
}

// Validación y emisión de filtros
function validateAndEmit() {
  const { min, max } = localPriceRange.value;

  if (min !== null && max !== null && min > max) {
    priceValidationMessage.value = 'El precio mínimo no puede ser mayor al máximo.';
    return;
  }

  if ((min !== null && min < 0) || (max !== null && max < 0)) {
    priceValidationMessage.value = 'Los precios no pueden ser negativos.';
    return;
  }

  priceValidationMessage.value = '';

  emit('update:filters', {
    category: localCategory.value,
    min,
    max,
  });
}

// Limpiar filtros
function clearFilters() {
  localCategory.value = '';
  localPriceRange.value = { min: null, max: null };
  priceValidationMessage.value = '';
  emit('clear');
}

// Capitalizar texto
function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
</script>
