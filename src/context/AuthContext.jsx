import React, { createContext, useState, useEffect } from 'react';


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = (email, password, isEmployee = false) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      const userWithoutPassword = {
        email: foundUser.email,
        name: foundUser.name,
        role: foundUser.role || 'customer',
        phone: foundUser.phone || '',
        address: foundUser.address || '',
        city: foundUser.city || '',
        postalCode: foundUser.postalCode || '',
      };

      // Check if trying to login as employee but user is not employee
      if (isEmployee && userWithoutPassword.role !== 'employee') {
        return false;
      }

      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const register = (name, email, password, isEmployee = false) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) return false;
    users.push({
      name,
      email,
      password,
      role: isEmployee ? 'employee' : 'customer',
      phone: '',
      address: '',
      city: '',
      postalCode: '',
    });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateUser = (data) => {
    setUser(prev => {
      const updated = { ...prev, ...data };
      localStorage.setItem('user', JSON.stringify(updated));

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map(u =>
        u.email === updated.email ? { ...u, ...data } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));

      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser, isAuthModalOpen, setIsAuthModalOpen }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuth };