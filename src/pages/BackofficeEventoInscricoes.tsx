import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columns } from "./BackofficeEventoInscricoesColumns";
import { DataTable } from "@/components/reusable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoading } from "@/hooks/useLoading";
import { getPessoas } from "@/services/companyService";
import { PessoaDataType } from "@/types/company";

export default function BackofficeEventoInscricoes() {
  const { id, origem } = useParams<{ id: string, origem: string}>();
  const [inscricoes, setInscricoes] = useState<PessoaDataType[]>([]);
  const [filteredInscricoes, setFilteredInscricoes] = useState<PessoaDataType[]>([]);
  const [activeTab, setActiveTab] = useState("todos");
  const { showLoading, hideLoading } = useLoading();

  const fetchInscricoes = useCallback(() => {
    showLoading();
    getPessoas(198, {id_origem: id, origem: origem})
      .then(({data}) => {
        setInscricoes(data.data);                
      })
      .catch(console.error)
      .finally(() => {
        hideLoading();
      });
  }, []);

  useEffect(() => {
    fetchInscricoes();
  }, [fetchInscricoes]);

  useEffect(() => {
    if (activeTab === "todos") {
      setFilteredInscricoes(inscricoes);
    } else {
      setFilteredInscricoes(
        inscricoes.filter(
          (i) => i.status_origem.toLowerCase() === activeTab.toLowerCase()
        )
      );
    }
  }, [inscricoes, activeTab]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Inscrições para o Evento #{id}
        </h1>
        <p className="text-sm text-muted-foreground">
          Gerencie as inscrições dos participantes para este evento.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="todos">Todos</TabsTrigger>
          <TabsTrigger value="pendente de aprovação">Pendentes</TabsTrigger>
          <TabsTrigger value="presença autorizada">Aprovados</TabsTrigger>
          <TabsTrigger value="presença não autorizada">Reprovados</TabsTrigger>
        </TabsList>
        <TabsContent value="todos">
          <DataTable columns={columns(fetchInscricoes)} data={filteredInscricoes} />
        </TabsContent>
        <TabsContent value="pendente de aprovação">
          <DataTable columns={columns(fetchInscricoes)} data={filteredInscricoes} />
        </TabsContent>
        <TabsContent value="presença autorizada">
          <DataTable columns={columns(fetchInscricoes)} data={filteredInscricoes} />
        </TabsContent>
        <TabsContent value="presença não autorizada">
          <DataTable columns={columns(fetchInscricoes)} data={filteredInscricoes} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
