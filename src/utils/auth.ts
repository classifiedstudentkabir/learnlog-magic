
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simple authentication service for demo purposes
export const auth = {
  isAuthenticated: (): boolean => {
    return localStorage.getItem('userType') !== null;
  },
  
  getUserType: (): string | null => {
    return localStorage.getItem('userType');
  },
  
  getUsername: (): string | null => {
    return localStorage.getItem('username');
  },
  
  login: (userType: string, username: string): void => {
    localStorage.setItem('userType', userType);
    localStorage.setItem('username', username);
  },
  
  logout: (): void => {
    localStorage.removeItem('userType');
    localStorage.removeItem('username');
  }
};

// Protected route hook
export const useRequireAuth = (allowedUserTypes: string[] = []) => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!auth.isAuthenticated()) {
      navigate('/login');
      return;
    }
    
    const userType = auth.getUserType();
    
    if (allowedUserTypes.length > 0 && userType && !allowedUserTypes.includes(userType)) {
      navigate(`/${userType}`);
    }
  }, [navigate, allowedUserTypes]);
  
  return { userType: auth.getUserType(), username: auth.getUsername() };
};
