import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import UserService from "../../../@shared/services/UserService"; // Certifique-se de importar o UserService

interface User {
  id: number;
  nome: string;
  email: string;
  senha: string;
  tipo: string;
  message: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); 

  useEffect(() => {
    const checkAuth = async () => {
      if (UserService.isAuthenticated()) {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    try {
      const response = await UserService.login({ email, senha });
      if (response.message === "Login bem-sucedido") {
        setUser(response.user);
      } else {
        console.error("Falha no login", response.message);
      }
    } catch (error) {
      console.error("Erro ao tentar logar", error);
    }
  };

  const logout = () => {
    UserService.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
