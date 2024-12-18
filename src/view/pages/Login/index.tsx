import { useState, useEffect } from "react";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 
import UserService from "../../../@shared/services/UserService";

function Page() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (UserService.isAuthenticated()) {
      navigate("/");
    } else {
        navigate("/login");
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !senha) {
      toast.error("Por favor, preencha todos os campos.");
      return;
    }

    setLoading(true); 

    try {
      const response = await UserService.login({ email, senha });
      toast.success("Login bem-sucedido!");
      console.log("Usuário logado:", response);
      
      navigate("/");

    } catch (error) {
      toast.error("Falha no login. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-semibold text-gray-700">Login</h2>
        
        <form onSubmit={handleLogin} className="space-y-6 mt-6">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full"
            />
          
            <Input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              className="w-full"
            />

          <div>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Entrar"}
            </Button>
          </div>
        </form>
        
        <div className="text-center mt-4">
          <a href="#" className="text-sm text-blue-500 hover:text-blue-700">Esqueceu sua senha?</a>
        </div>
      </div>
    </div>
  );
}

export function LoginPage() {
  return (
    <Page />
  );
}
