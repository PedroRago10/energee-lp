import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Download, Search, Eye, Mail } from "lucide-react";

export default function FormSubmissions() {
  const [submissions, setSubmissions] = useState<any[]>([]);
  const [filteredSubmissions, setFilteredSubmissions] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check admin session
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    loadSubmissions();
  }, [navigate]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = submissions.filter(submission =>
        submission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        submission.phone.includes(searchTerm) ||
        submission.estado.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredSubmissions(filtered);
    } else {
      setFilteredSubmissions(submissions);
    }
  }, [searchTerm, submissions]);

  const loadSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
      setFilteredSubmissions(data || []);
    } catch (error) {
      console.error('Error loading submissions:', error);
      toast({
        title: "Erro ao carregar formulários",
        description: "Não foi possível carregar os formulários enviados.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = ['Nome', 'Email', 'Telefone', 'Estado', 'Consumo', 'Mensagem', 'Data'];
    const csvContent = [
      headers.join(','),
      ...filteredSubmissions.map(sub => [
        sub.name,
        sub.email,
        sub.phone,
        sub.estado,
        sub.consumption || '',
        (sub.message || '').replace(/,/g, ';'),
        new Date(sub.created_at).toLocaleString('pt-BR')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `formularios_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const sendEmail = (email: string, name: string) => {
    const subject = `Contato - Energee.org.br`;
    const body = `Olá ${name},\n\nObrigado por seu interesse na Energee!\n\n`;
    window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  if (isLoading) {
    return <div className="p-8">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container-xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline"
                onClick={() => navigate("/admin/dashboard")}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
              <h1 className="text-2xl font-bold text-foreground">
                Formulários Recebidos
              </h1>
            </div>
            <Button onClick={exportToCSV}>
              <Download className="h-4 w-4 mr-2" />
              Exportar CSV
            </Button>
          </div>
        </div>
      </header>

      <div className="container-xl px-4 py-8">
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar por nome, email, telefone ou estado..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredSubmissions.length} de {submissions.length} formulários
            </div>
          </div>
        </div>

        {selectedSubmission ? (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Detalhes do Formulário</CardTitle>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedSubmission(null)}
                >
                  Fechar
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <strong>Nome:</strong>
                  <p>{selectedSubmission.name}</p>
                </div>
                <div>
                  <strong>Email:</strong>
                  <p>{selectedSubmission.email}</p>
                </div>
                <div>
                  <strong>Telefone:</strong>
                  <p>{selectedSubmission.phone}</p>
                </div>
                <div>
                  <strong>Estado:</strong>
                  <p>{selectedSubmission.estado}</p>
                </div>
                <div>
                  <strong>Consumo:</strong>
                  <p>{selectedSubmission.consumption || 'Não informado'}</p>
                </div>
                <div>
                  <strong>Data:</strong>
                  <p>{new Date(selectedSubmission.created_at).toLocaleString('pt-BR')}</p>
                </div>
              </div>
              {selectedSubmission.message && (
                <div className="mt-4">
                  <strong>Mensagem:</strong>
                  <p className="mt-1 p-3 bg-muted rounded">{selectedSubmission.message}</p>
                </div>
              )}
              <div className="mt-6">
                <Button onClick={() => sendEmail(selectedSubmission.email, selectedSubmission.name)}>
                  <Mail className="h-4 w-4 mr-2" />
                  Responder por Email
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Consumo</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubmissions.map((submission) => (
                    <TableRow key={submission.id}>
                      <TableCell className="font-medium">
                        {submission.name}
                      </TableCell>
                      <TableCell>{submission.email}</TableCell>
                      <TableCell>{submission.phone}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{submission.estado}</Badge>
                      </TableCell>
                      <TableCell>
                        {submission.consumption || 'N/A'}
                      </TableCell>
                      <TableCell>
                        {new Date(submission.created_at).toLocaleDateString('pt-BR')}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedSubmission(submission)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => sendEmail(submission.email, submission.name)}
                          >
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}