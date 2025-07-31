// Admin Login Page - Autenticação para painel administrativo

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import energeeLogo from "@/assets/logo-energee-blue.png";

export default function AdminLogin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check credentials against custom admin_users table
      const { data, error } = await supabase
        .rpc('verify_admin_login', {
          input_email: formData.email,
          input_password: formData.password
        });

      if (error) {
        console.error('Login error:', error);
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
        return;
      }

      if (data === true) {
        // Store admin session in localStorage
        localStorage.setItem('adminSession', JSON.stringify({
          email: formData.email,
          loginTime: new Date().toISOString()
        }));
        
        toast({
          title: "Login realizado com sucesso!",
          description: "Redirecionando para o painel administrativo...",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Erro no login",
          description: "Credenciais inválidas. Tente novamente.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: "Erro no sistema",
        description: "Ocorreu um erro inesperado. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-2 sm:p-4">
      <Card className="w-full max-w-sm sm:max-w-md mx-2 sm:mx-0">
        <CardHeader className="text-center pb-4 sm:pb-6 px-4 sm:px-6">
          <div className="flex justify-center mb-3 sm:mb-4">
            <img 
              src={energeeLogo} 
              alt="Energee" 
              className="h-10 sm:h-12 w-auto"
            />
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold">
            Painel Administrativo
          </CardTitle>
          <p className="text-sm sm:text-base text-muted-foreground">
            Faça login para acessar o painel de controle
          </p>
        </CardHeader>
        
        <CardContent className="px-4 sm:px-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm sm:text-base">E-mail</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="admin@energee.org.br"
                required
                className="mt-1 h-10 sm:h-12 text-sm sm:text-base"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-sm sm:text-base">Senha</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                required
                className="mt-1 h-10 sm:h-12 text-sm sm:text-base"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full h-10 sm:h-12 text-sm sm:text-base"
              disabled={isLoading}
            >
              {isLoading ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-4 sm:mt-6 text-center">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/")}
              className="text-xs sm:text-sm"
            >
              ← Voltar ao site
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}