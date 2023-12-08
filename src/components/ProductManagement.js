import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/ProductManagement.css'; // Estilos generales
import '../css/ErrorStyles.css'; // Estilos específicos para mensajes de error

const ProductManagement = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [newProduct, setNewProduct] = useState({
    description: '',
    price: '',
    categoryId: null,
  });
  const [editingProductId, setEditingProductId] = useState(null);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/management/category/categories');
      setCategories(response.data.categoryList);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError('Error al obtener la lista de categorías. Por favor, inténtelo de nuevo.');
    }
  };

  const fetchProductsForCategory = async (categoryId) => {
    try {
      const response = await axios.get(`http://localhost:8081/management/product/products/${categoryId}`);
      setCategoryProducts((prev) => ({ ...prev, [categoryId]: response.data.productList }));
      setError(null);
    } catch (error) {
      console.error(`Error fetching products for category ${categoryId}:`, error);
      setError('Error al obtener la lista de productos. Por favor, inténtelo de nuevo.');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditProduct = (product) => {
    const productToEdit = product;
    setNewProduct({
    id : productToEdit.id,
      description: productToEdit.description,
      price: productToEdit.price,
      categoryId: productToEdit.category.id,
    });
    setEditingProductId(product);
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:8081/management/product/remove/${productId}`);
      fetchCategories(); // Recargar las categorías y productos asociados
      setEditingProductId(null);
      setError(null);
    } catch (error) {
      console.error(`Error deleting product with ID ${productId}:`, error);
      setError('Error al eliminar el producto. Por favor, inténtelo de nuevo.');
    }
  };

  const handleAddProduct = async () => {
    try {
      const categoryId = parseInt(newProduct.categoryId, 10);

      const isValidPrice = /^\d+(\.\d{1,2})?$/.test(newProduct.price);

      if (!isValidPrice) {
        setError('El precio debe ser un número válido (puede incluir hasta 2 decimales).');
        return;
      } else {
        setError(null);
      }

      if (editingProductId) {
        await axios.put(`http://localhost:8081/management/product/update`, {
          id: newProduct.id,
          description: newProduct.description,
          price: newProduct.price,
          categoryId: categoryId,
        });
      } else {
        await axios.post('http://localhost:8081/management/product/add', {
          description: newProduct.description,
          price: newProduct.price,
          categoryId: categoryId,
        });
      }

      setNewProduct({
        description: '',
        price: '',
        categoryId: categoryId,
      });
      setEditingProductId(null);
      toggleCategoryProducts(categoryId);
      setError(null);
    } catch (error) {
      console.error('Error adding/editing product:', error);
      setError('Error al agregar/editar el producto. Por favor, inténtelo de nuevo.');
      fetchCategories(); // Recargar las categorías y productos asociados

    }
  };

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const toggleCategoryProducts = async (categoryId) => {
    if (!categoryProducts[categoryId]) {
      await fetchProductsForCategory(categoryId);
    } else {
      setCategoryProducts((prev) => {
        const updated = { ...prev };
        delete updated[categoryId];
        return updated;
      });
    }
  };

  return (
    <div className="product-management-container">
      <h2>Administrar Productos</h2>
      {error && <p className="error-message">{error}</p>}
      <div>
        {categories.map((category) => (
          <div key={category.id} className="category-button" onClick={() => toggleCategoryProducts(category.id)}>
            {category.description}
            {categoryProducts[category.id] && (
              <ul className="category-products-list">
                {categoryProducts[category.id].map((product) => (
                  <li key={product.id} className="product-item">
                  <div className="product-info">
                    <span className="product-description">{product.description}</span>
                    <span className="product-price">Precio: {product.price} €</span>
                    <span className="product-category">Categoría: {product.category.description}</span>
                  </div>
                  <div className="product-buttons">
                    <button className="edit-button" onClick={() => handleEditProduct(product)}>
                      <span role="img" aria-label="Editar">🖊️</span> Editar
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteProduct(product.id)}>
                      <span role="img" aria-label="Borrar">🗑️</span> Borrar
                    </button>
                  </div>
                </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
  
      <div className="product-form-container">
        <h3>{editingProductId ? 'Editar Producto' : 'Añadir Producto'}</h3>
        <form>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={newProduct.description}
            onChange={handleChange}
          />
  
          <label htmlFor="price">Precio:</label>
          <input
            type="text"
            id="price"
            name="price"
            value={newProduct.price}
            onChange={handleChange}
            pattern="\d+(\.\d{1,2})?"
            title="Ingrese un número válido (puede incluir hasta 2 decimales)"
          />
  
          <label htmlFor="categoryId">Categoría:</label>
          <select
            id="categoryId"
            name="categoryId"
            value={newProduct.categoryId}
            onChange={handleChange}
          >
            <option value="">Seleccionar Categoría</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.description}
              </option>
            ))}
          </select>
  
          <button  className="add-button" type="button" onClick={handleAddProduct}>
            {editingProductId ? '💾 Guardar Cambios' : '➕ Agregar Producto'}
          </button>
        </form>
      </div>
    </div>
  );
  
};

export default ProductManagement;
