import './sass/style.scss'
import { fetchFavoriteProducts } from './services/product-service';

const favoriteProductsResponse = await fetchFavoriteProducts();
console.log('Favorite Products:', favoriteProductsResponse.data);
