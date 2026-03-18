import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { getStoredProducts, setStoredProducts } from '../utils/productStorage.js';
import { Briefcase, Package, Users, CreditCard, Plus, Edit, Trash2, Tag, ShoppingCart } from 'lucide-react';

const AdminPanel = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [userFilter, setUserFilter] = useState('all');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    category: 'warzywa',
    image: '🥕',
    promo: false,
    oldPrice: ''
  });
  const [editingProduct, setEditingProduct] = useState(null);

  const loadUsers = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    setUsers(storedUsers);
    return storedUsers;
  };

  const loadOrders = () => {
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const allOrders = [];
    storedUsers.forEach(u => {
      const userOrders = JSON.parse(localStorage.getItem(`orders_${u.email}`) || '[]');
      allOrders.push(...userOrders);
    });
    setOrders(allOrders);
  };

  const loadProducts = () => {
    const stored = getStoredProducts();
    setProducts(stored);
  };

  useEffect(() => {
    loadUsers();
    loadOrders();
    loadProducts();

    const productsHandler = () => loadProducts();
    const ordersHandler = () => loadOrders();
    const storageHandler = () => {
      loadUsers();
      loadOrders();
      loadProducts();
    };

    window.addEventListener('productsUpdated', productsHandler);
    window.addEventListener('ordersUpdated', ordersHandler);
    window.addEventListener('storage', storageHandler);

    return () => {
      window.removeEventListener('productsUpdated', productsHandler);
      window.removeEventListener('ordersUpdated', ordersHandler);
      window.removeEventListener('storage', storageHandler);
    };
  }, []);

  useEffect(() => {
    if (activeTab === 'products') {
      loadProducts();
    }
  }, [activeTab]);

  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    setStoredProducts(updatedProducts);
  };

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;

    const product = {
      id: Date.now(),
      name: newProduct.name,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      image: newProduct.image,
      promo: newProduct.promo,
      oldPrice: newProduct.promo ? parseFloat(newProduct.oldPrice) : undefined
    };

    saveProducts([...products, product]);
    setNewProduct({
      name: '',
      price: '',
      category: 'warzywa',
      image: '🥕',
      promo: false,
      oldPrice: ''
    });
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setNewProduct({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      image: product.image,
      promo: product.promo || false,
      oldPrice: product.oldPrice ? product.oldPrice.toString() : ''
    });
  };

  const handleUpdateProduct = () => {
    if (!editingProduct) return;

    const updatedProducts = products.map(p =>
      p.id === editingProduct.id
        ? {
            ...p,
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            category: newProduct.category,
            image: newProduct.image,
            promo: newProduct.promo,
            oldPrice: newProduct.promo ? parseFloat(newProduct.oldPrice) : undefined
          }
        : p
    );

    saveProducts(updatedProducts);
    setEditingProduct(null);
    setNewProduct({
      name: '',
      price: '',
      category: 'warzywa',
      image: '🥕',
      promo: false,
      oldPrice: ''
    });
  };

  const handleDeleteProduct = (productId) => {
    if (window.confirm('Czy na pewno chcesz usunąć ten produkt?')) {
      saveProducts(products.filter(p => p.id !== productId));
    }
  };

  const togglePromo = (productId) => {
    const updatedProducts = products.map(p =>
      p.id === productId
        ? { ...p, promo: !p.promo, oldPrice: !p.promo ? p.price * 1.2 : undefined }
        : p
    );
    saveProducts(updatedProducts);
  };

  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const totalUsers = users.filter(u => u.role !== 'employee').length;

  const filteredUsers = users.filter(u => {
    if (userFilter === 'all') return true;
    if (userFilter === 'employee') return u.role === 'employee';
    return u.role !== 'employee';
  });

  if (!user || user.role !== 'employee') {
    return (
      <div className="admin-denied">
        <h1>Dostęp zabroniony</h1>
        <p>Tylko pracownicy mają dostęp do panelu administracyjnego.</p>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <h1>
          <Briefcase size={26} style={{ marginRight: 10 }} />
          Panel Pracownika
        </h1>
        <p>Witaj, {user.name} - Zarządzaj sklepem Warzywex</p>
      </div>

      <div className="admin-stats">
        <div className="stat-card">
          <Package size={24} />
          <div>
            <h3>{products.length}</h3>
            <p>Produktów</p>
          </div>
        </div>
        <div className="stat-card">
          <Users size={24} />
          <div>
            <h3>{totalUsers}</h3>
            <p>Klientów</p>
          </div>
        </div>
        <div className="stat-card">
          <ShoppingCart size={24} />
          <div>
            <h3>{totalOrders}</h3>
            <p>Zamówień</p>
          </div>
        </div>
        <div className="stat-card">
          <CreditCard size={24} />
          <div>
            <h3>{totalRevenue.toFixed(2)} zł</h3>
            <p>Przychody</p>
          </div>
        </div>
      </div>

      <div className="admin-tabs">
        <button
          className={activeTab === 'products' ? 'active' : ''}
          onClick={() => setActiveTab('products')}
        >
          <Package size={18} />
          Produkty
        </button>
        <button
          className={activeTab === 'promotions' ? 'active' : ''}
          onClick={() => setActiveTab('promotions')}
        >
          <Tag size={18} />
          Promocje
        </button>
        <button
          className={activeTab === 'orders' ? 'active' : ''}
          onClick={() => setActiveTab('orders')}
        >
          <ShoppingCart size={18} />
          Zamówienia
        </button>
        <button
          className={activeTab === 'users' ? 'active' : ''}
          onClick={() => setActiveTab('users')}
        >
          <Users size={18} />
          Użytkownicy
        </button>
      </div>

      <div className="admin-content">
        {activeTab === 'products' && (
          <div className="products-management">
            <h2>Lista najnowszych produktów Warzywex</h2>

            <div className="product-form">
              <h3>{editingProduct ? 'Edytuj produkt' : 'Dodaj nowy produkt'}</h3>
              <div className="form-grid">
                <input
                  type="text"
                  placeholder="Nazwa produktu"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                />
                <input
                  type="number"
                  step="0.01"
                  placeholder="Cena (zł)"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                />
                <select
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                >
                  <option value="warzywa">Warzywa</option>
                  <option value="owoce">Owoce</option>
                  <option value="przetwory">Przetwory</option>
                </select>
                <input
                  type="text"
                  placeholder="Emoji obrazka"
                  value={newProduct.image}
                  onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={newProduct.promo}
                    onChange={(e) => setNewProduct({...newProduct, promo: e.target.checked})}
                  />
                  <span className="checkmark"></span>
                  Promocja
                </label>
                {newProduct.promo && (
                  <input
                    type="number"
                    step="0.01"
                    placeholder="Stara cena (zł)"
                    value={newProduct.oldPrice}
                    onChange={(e) => setNewProduct({...newProduct, oldPrice: e.target.value})}
                  />
                )}
              </div>
              <div className="form-actions">
                {editingProduct ? (
                  <>
                    <button onClick={handleUpdateProduct} className="btn-primary">
                      <Edit size={18} />
                      Zaktualizuj
                    </button>
                    <button onClick={() => setEditingProduct(null)} className="btn-secondary">
                      Anuluj
                    </button>
                  </>
                ) : (
                  <button onClick={handleAddProduct} className="btn-primary">
                    <Plus size={18} />
                    Dodaj produkt
                  </button>
                )}
              </div>
            </div>

            <div className="products-list">
              <h3>Lista produktów ({products.length})</h3>
              <div className="products-grid-admin">
                {products.map(product => (
                  <div key={product.id} className="product-admin-card">
                    <div className="product-admin-image">{product.image}</div>
                    <div className="product-admin-info">
                      <h4>{product.name}</h4>
                      <p className="category">{product.category}</p>
                      <div className="price-info">
                        {product.promo ? (
                          <>
                            <span className="old-price">{product.oldPrice?.toFixed(2)} zł</span>
                            <span className="current-price">{product.price.toFixed(2)} zł</span>
                          </>
                        ) : (
                          <span className="current-price">{product.price.toFixed(2)} zł</span>
                        )}
                      </div>
                    </div>
                    <div className="product-admin-actions">
                      <button
                        onClick={() => handleEditProduct(product)}
                        className="btn-edit"
                        title="Edytuj"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => togglePromo(product.id)}
                        className={`btn-promo ${product.promo ? 'active' : ''}`}
                        title={product.promo ? 'Usuń z promocji' : 'Dodaj do promocji'}
                      >
                        <Tag size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="btn-delete"
                        title="Usuń"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'promotions' && (
          <div className="promotions-management">
            <h2>Aktualne Promocje</h2>
            <div className="promo-products">
              {products.filter(p => p.promo).map(product => (
                <div key={product.id} className="promo-item">
                  <div className="promo-image">{product.image}</div>
                  <div className="promo-info">
                    <h4>{product.name}</h4>
                    <div className="promo-prices">
                      <span className="old-price">{product.oldPrice?.toFixed(2)} zł</span>
                      <span className="new-price">{product.price.toFixed(2)} zł</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="orders-management">
            <h2>Wszystkie Zamówienia</h2>
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-admin-card">
                  <div className="order-header">
                    <span className="order-id">{order.id}</span>
                    <span className="order-status">{order.status}</span>
                    <span className="order-total">{order.total.toFixed(2)} zł</span>
                  </div>
                  <div className="order-details">
                    <p>Data: {new Date(order.createdAt).toLocaleString()}</p>
                    <p>Produkty: {order.items.length}</p>
                    <p>Płatność: {order.payment?.method} ****{order.payment?.card?.slice(-4)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="users-management">
            <h2>Wszyscy Użytkownicy</h2>
            <div className="user-filters">
              <button
                className={userFilter === 'all' ? 'active' : ''}
                onClick={() => setUserFilter('all')}
              >
                Wszyscy
              </button>
              <button
                className={userFilter === 'customer' ? 'active' : ''}
                onClick={() => setUserFilter('customer')}
              >
                Klienci
              </button>
              <button
                className={userFilter === 'employee' ? 'active' : ''}
                onClick={() => setUserFilter('employee')}
              >
                Pracownicy
              </button>
            </div>
            <div className="users-list">
              {filteredUsers.map(user => (
                <div key={user.email} className="user-admin-card">
                  <div className="user-info">
                    <h4>{user.name}</h4>
                    <p>{user.email}</p>
                    <span className={`user-role ${user.role}`}>{user.role === 'employee' ? 'Pracownik' : 'Klient'}</span>
                  </div>
                  {user.role === 'customer' && (
                    <div className="user-details">
                      <p>Telefon: {user.phone || 'Nie podano'}</p>
                      <p>Adres: {user.address ? `${user.address}, ${user.city} ${user.postalCode}` : 'Nie podano'}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
