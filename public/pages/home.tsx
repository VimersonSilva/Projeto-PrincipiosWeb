import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../models/product';
import axios from 'axios';
import React from 'react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get<Product[]>('/api/products');
        setProducts(response.data);
      } catch (err) {
        setError('Erro ao carregar produtos');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) return <div>Carregando produtos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="home">
      <h1>Nossos Produtos</h1>
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <Link to={`/product/${product.id}`}>
              <div className="product-image-placeholder"></div>
              <h3>{product.name}</h3>
              <p>R$ {product.price.toFixed(2)}</p>
              <p className="stock">
                {product.stock > 0 
                  ? `${product.stock} disponíveis` 
                  : 'Esgotado'}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}