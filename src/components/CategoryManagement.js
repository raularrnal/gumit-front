import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/CategoryManagement.css';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState('');
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategoryDescription, setEditedCategoryDescription] = useState('');

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8081/management/category/categories');
      setCategories(response.data.categoryList);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEditCategory = (categoryId, currentDescription) => {
    setEditingCategoryId(categoryId);
    setEditedCategoryDescription(currentDescription);
  };

  const handleCancelEdit = () => {
    setEditingCategoryId(null);
    setEditedCategoryDescription('');
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:8081/management/category/update`, {
        id: editingCategoryId,
        description: editedCategoryDescription,
      });
      fetchCategories();
      setEditingCategoryId(null);
      setEditedCategoryDescription('');
    } catch (error) {
      console.error(`Error updating category with ID ${editingCategoryId}:`, error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8081/management/category/remove/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.error(`Error deleting category with ID ${categoryId}:`, error);
    }
  };

  const handleAddCategory = async () => {
    try {
      await axios.post('http://localhost:8081/management/category/add', { description: newCategory });
      fetchCategories();
      setNewCategory('');
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  return (
    <div className="category-management">
      <h2>Administrar Categorías</h2>
      <div>
        {categories.map((category) => (
          <li key={category.id} className="category-item">
            {editingCategoryId === category.id ? (
              <>
                <input
                  type="text"
                  value={editedCategoryDescription}
                  onChange={(e) => setEditedCategoryDescription(e.target.value)}
                />
                <button className="save-button" onClick={handleSaveEdit}>
                  💾 Guardar
                </button>
                <button className="cancel-button" onClick={handleCancelEdit}>
                  ❌ Cancelar
                </button>
              </>
            ) : (
              <>
                <span className="category-description">{category.description}</span>
                <button className="edit-button" onClick={() => handleEditCategory(category.id, category.description)}>
                  🖊️ Editar
                </button>
                <button className="delete-button" onClick={() => handleDeleteCategory(category.id)}>
                  🗑️ Borrar
                </button>
              </>
            )}
          </li>
        ))}
      </div>
      <div className="add-category">
        <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <button className="add-button" onClick={handleAddCategory}>
          ➕ Agregar Categoría
        </button>
      </div>
    </div>
  );
};

export default CategoryManagement;
