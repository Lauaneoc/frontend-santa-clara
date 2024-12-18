import { createContext, ReactNode, useContext, useState, useEffect } from "react";
import UserService from "../../../@shared/services/UserService";

interface User {
  id: number;
  nome: string;
  email: string;
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
          setUser(JSON.parse(storedUser)); // Atualiza o estado com dados do localStorage
        }
      }
      setLoading(false); // Finaliza o carregamento, mesmo que o usuário não tenha sido encontrado
    };

    checkAuth();
  }, []);

  const login = async (email: string, senha: string) => {
    setLoading(true); // Durante o login, definimos loading como true
    try {
      const response = await UserService.login({ email, senha });
      if (response.message === "Login bem-sucedido" && response.user) {
        setUser(response.user);
        localStorage.setItem("user", JSON.stringify(response.user)); // Salva o usuário no localStorage
      } else {
        console.error("Falha no login", response.message);
        // Aqui você pode mostrar um toast de erro para o usuário, por exemplo
      }
    } catch (error) {
      console.error("Erro ao tentar logar", error);
      // Aqui você pode mostrar um toast de erro para o usuário
    } finally {
      setLoading(false); // Finaliza o carregamento após a tentativa de login
    }
  };

  const logout = () => {
    UserService.logout();
    setUser(null);
    localStorage.removeItem("user"); // Remove o usuário do localStorage
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? (
        <div>Loading...</div> // Exibe algo enquanto carrega
      ) : (
        children
      )}
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
