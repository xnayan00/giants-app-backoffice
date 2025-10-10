import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from "jwt-decode";
import { authenticate, login as loginService } from '../services/authService';

interface User {
  name: string;
  role: string;
}

interface AuthContextData {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, otp: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      const decodedToken: any = jwtDecode(storedToken);
      setUser({ name: decodedToken.name, role: decodedToken.role });
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const authenticateUser = async () => {
      try {
        const response = await authenticate();
        localStorage.setItem('api-token', response.token);
      } catch (error) {
        console.error(error);
      }
    };
    authenticateUser();
  }, []);

  const login = async (email: string, otp: string) => {
    setLoading(true);
    try {
      const response = await loginService(email, otp);
      setToken(response.token);
      localStorage.setItem('token', response.token);
      const decodedToken: any = jwtDecode(response.token);
      setUser({ name: decodedToken.name, role: decodedToken.role });
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ token, user, isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
