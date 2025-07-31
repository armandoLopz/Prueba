# Prueba tecnica Armando Lopez

# 🏪 Panel de Control - Tiendas Daka

Panel de control para Tiendas Daka desarrollado con Vue 3, que permite gestionar y visualizar productos con estadísticas en tiempo real, filtros avanzados y conversión de moneda USD/VES.

## 🚀 Características Principales

- **📊 Tablero de Control**: Estadísticas en tiempo real (total productos, categorías, precio promedio)
- **🛍️ Gestión de Productos**: Listado con paginación (5 productos por página)
- **🔍 Filtros Avanzados**: Por categoría y rango de precios
- **💱 Conversión de Moneda**: Precios en USD y VES con tasa de cambio actualizada
- **📱 Diseño Responsive**: Optimizado para todos los dispositivos
- **⚡ Carga Diferida**: Optimización de imágenes para mejor rendimiento

## 🛠️ Tecnologías Utilizadas

- **Vue 3** 
- **TypeScript**
- **Vite** 
- **Tailwind CSS** 
- **Axios** 
- **Lucide Vue Next**

## 📋 Requisitos del Sistema

- **Node.js**: `^20.19.0 || >=22.12.0`
- **npm** o **yarn**

## ⚙️ Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <url-del-repositorio>
cd daka
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Inicializar Tailwind (de ser necesario)

```bash
npm run tailwind-init
```

## 🚀 Comandos Disponibles

### Desarrollo
```bash
npm run dev
```
Inicia el servidor de desarrollo en `http://localhost:5173`


## 📁 Estructura del Proyecto

```
daka/
├── src/
│   ├── components/           # Componentes Vue reutilizables
│   │   ├── ButtonPagination.vue
│   │   ├── CardProduct.vue
│   │   ├── Filters.vue
│   │   ├── ListProducts.vue
│   │   └── Statistics.vue
│   ├── interfaces/           # Interfaces de TypeScript
│   │   ├── dollar.interfaces.ts
│   │   └── products.interfaces.ts
│   ├── pages/               # Páginas de la aplicación
│   │   └── Dashboard.vue
│   ├── services/            # Servicios para llamadas a APIs
│   │   ├── dollar.services.ts
│   │   └── products.services.ts
│   ├── App.vue             
│   └── main.ts             
├── public/                 
├── tailwind.config.js     # Configuración de Tailwind
├── tsconfig.json          # Configuración de TypeScript
├── vite.config.ts         # Configuración de Vite
└── package.json           # Dependencias y scripts
```

## 🎨 Personalización

Para el estilo de la página, tome en cuenta la identidad visual de Tiendas Daka por lo que use colores que se asemejen lo mas posible
a su identidad corporativo, los colores seleccionados fueron :

### Colores: 
- **Azul Corporativo**: `#212F5A`
- **Dorado**: `#FFD700`
- **Fondo**: `#F9FAFB` (gray-50)

## Decisiones tecnicas relevantes

### Uso de TypeScript en el proyecto
Se optó por la implementación de TypeScript en el desarrollo del proyecto con el objetivo principal de aprovechar las interfaces para el tipado de las APIs externas. Esta decisión técnica permite una mayor comodidad y seguridad al momento de interactuar con los datos recibidos de FakeStore API y PyDolarVenezuela API.
Adicionalmente, TypeScript proporciona detección temprana de errores durante el tiempo de compilación, lo que reduce significativamente los bugs en producción.

### Dashboard como "Smart Component"
Se implementó el archivo Dashboard.vue como el componente inteligente de la aplicación, estableciéndolo como el punto central de orquestación de toda la aplicación. Este componente se encarga exclusivamente de:

Gestión de estado global: Manejo centralizado de los datos de productos, filtros y estados de carga
Llamadas a APIs: Comunicación con los servicios externos (productos y tasa de cambio)
Distribución de datos: Propaga la información procesada hacia los componentes hijos
Coordinación de componentes: Orquesta la interacción entre Statistics, Filters y ListProducts
---

**Desarrollado por Armando López para Tiendas Daka**