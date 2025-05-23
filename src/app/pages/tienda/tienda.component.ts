import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { animate, stagger } from 'animejs';

type Product = {
  id: number;
  name: string;
  brand: string;
  category: string;
  goal: string;
  features: string[];
  price: number;
  inStock: boolean;
  stockQuantity: number;
  isNew: boolean;
  topSeller: boolean;
  discount: boolean;
  image: string;
};

@Component({
  selector: 'app-tienda',
  imports: [CommonModule, FormsModule],
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css'
})
export default class TiendaComponent implements OnInit {

   products: Product[] = [
    {
      id: 1,
      name: 'Proteína Whey',
      brand: 'Optimum Nutrition',
      category: 'Suplementos',
      goal: 'Ganar Masa',
      features: ['Alta Proteína', 'Sin Gluten'],
      price: 45,
      inStock: true,
      stockQuantity: 10,
      isNew: false,
      topSeller: true,
      discount: true,
      image: './assets/img/prod1.jpg',
    },
    {
      id: 2,
      name: 'Creatina Monohidratada',
      brand: 'Universal',
      category: 'Suplementos',
      goal: 'Recuperación',
      features: ['Vegano'],
      price: 35,
      inStock: true,
      stockQuantity: 5,
      isNew: true,
      topSeller: false,
      discount: false,
      image: './assets/img/bi.png',
    },
    {
      id: 3,
      name: 'Shaker Pro',
      brand: 'GNC',
      category: 'Accesorios',
      goal: 'Energía',
      features: ['Sin Gluten'],
      price: 10,
      inStock: false,
      stockQuantity: 0,
      isNew: false,
      topSeller: true,
      discount: true,
      image: 'https://picsum.photos/id/103/400/300',
    },
    // Puedes añadir más productos aquí
  ];

  // Wishlist guardada en localStorage
  wishlist: Product[] = [];

  // Filtros
  categories = ['Suplementos', 'Accesorios'];
  brands = ['Optimum Nutrition', 'GNC', 'Universal', 'BSN'];
  goals = ['Ganar Masa', 'Perder Grasa', 'Energía', 'Recuperación'];
  features = ['Vegano', 'Sin Gluten', 'Alta Proteína', 'Bajo Azúcar'];

  searchTerm = '';
  selectedCategory = '';
  selectedBrand = '';
  selectedGoal = '';
  selectedFeatures: string[] = [];

  priceMin = 0;
  priceMax = 0;

  onlyAvailable = false;
  onlyNew = false;
  onlyTopSeller = false;
  onlyDiscounted = false;

  // Paginación
  currentPage = 1;
  pageSize = 6;
  filteredProducts: Product[] = [];
  paginatedProducts: Product[] = [];

  ngOnInit() {
    this.loadWishlist();
    this.filterProducts();
  }

  loadWishlist() {
    const wishlistData = localStorage.getItem('wishlist');
    if (wishlistData) {
      this.wishlist = JSON.parse(wishlistData);
    }
  }

  addToWishlist(product: Product) {
    const isInWishlist = this.wishlist.some((item) => item.id === product.id);
    if (!isInWishlist) {
      this.wishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(this.wishlist));
      console.log('Producto añadido a la lista de deseos:', product);
    } else {
      console.log('Este producto ya está en tu lista de deseos.');
    }
  }

  // Aplicar todos los filtros
  filterProducts() {
    this.currentPage = 1;
    this.filteredProducts = this.products.filter((product) =>
      (!this.searchTerm || product.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (!this.selectedCategory || product.category === this.selectedCategory) &&
      (!this.selectedBrand || product.brand === this.selectedBrand) &&
      (!this.selectedGoal || product.goal === this.selectedGoal) &&
      (this.selectedFeatures.length === 0 || this.selectedFeatures.every((f) => product.features.includes(f))) &&
      (!this.priceMin || product.price >= this.priceMin) &&
      (!this.priceMax || product.price <= this.priceMax) &&
      (!this.onlyAvailable || product.inStock) &&
      (!this.onlyNew || product.isNew) &&
      (!this.onlyTopSeller || product.topSeller) &&
      (!this.onlyDiscounted || product.discount)
    );

    this.updatePagination();
  }

  toggleFeature(feature: string) {
    const index = this.selectedFeatures.indexOf(feature);
    if (index >= 0) {
      this.selectedFeatures.splice(index, 1);
    } else {
      this.selectedFeatures.push(feature);
    }
    this.filterProducts();
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedProducts = this.filteredProducts.slice(start, end);

    // Animación de entrada con anime.js
    setTimeout(() => {
      animate('.card', {
        opacity: [0, 1],
        translateX: [-150, 0],
        scale: [0.7, 1],
        delay: stagger(200),
        duration: 1200,
        easing: 'easeOutExpo',
      });
    }, 0);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagination();
  }

  totalPagesArray(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredProducts.length / this.pageSize);
  }

  viewDetail(product: Product) {
    alert(`Detalle de: ${product.name}`);
  }

  addToCart(product: Product) {
    alert(`${product.name} agregado al carrito. porfavor inicia sesion para continuar`);
  }

  getDiscountedPrice(product: Product): number {
    const discountPercentage = 20; // Ajusta si es variable
    return product.discount ? product.price * (1 - discountPercentage / 100) : product.price;
  }

  isInWishlist(product: Product): boolean {
  return this.wishlist.some(p => p.id === product.id);
}

}
