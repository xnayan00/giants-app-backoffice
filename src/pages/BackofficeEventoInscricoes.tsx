import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columns } from "./BackofficeEventoInscricoesColumns";
import { DataTable } from "@/components/reusable/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLoading } from "@/hooks/useLoading";
import { getPessoas } from "@/services/companyService";
import { PessoaDataType } from "@/types/company";
import {
	approveInscricao,
	reproveInscricao,
} from "@/services/eventsService";
import { Button } from "@/components/ui/button";

export default function BackofficeEventoInscricoes() {
  const { id, origem } = useParams<{ id: string, origem: string}>();
  const [inscricoes, setInscricoes] = useState<PessoaDataType[]>([]);
  const [filteredInscricoes, setFilteredInscricoes] = useState<PessoaDataType[]>([]);
  const [activeTab, setActiveTab] = useState("todos");
  const { showLoading, hideLoading } = useLoading();
  const [rowSelection, setRowSelection] = useState({});

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

  const [table, dataTableComponent] = DataTable({
    columns: columns(fetchInscricoes),
    data: filteredInscricoes,
    rowSelection,
    setRowSelection,
  });

  const handleBulkApprove = async () => {
    showLoading();
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    try {
      await Promise.all(
        selectedRows.map((row) => approveInscricao(row.original.pes_id))
      );
      fetchInscricoes();
      table.resetRowSelection();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

  const handleBulkReprove = async () => {
    showLoading();
    const selectedRows = table.getFilteredSelectedRowModel().rows;
    try {
      await Promise.all(
        selectedRows.map((row) => reproveInscricao(row.original.pes_id))
      );
      fetchInscricoes();
      table.resetRowSelection();
    } catch (error) {
      console.error(error);
    } finally {
      hideLoading();
    }
  };

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
        <div className=" flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="todos">Todos</TabsTrigger>
            <TabsTrigger value="pendente de aprovação">Pendentes</TabsTrigger>
            <TabsTrigger value="presença autorizada">Aprovados</TabsTrigger>
            <TabsTrigger value="presença não autorizada">Reprovados</TabsTrigger>
          </TabsList>
          
          {Object.keys(rowSelection).length > 0 && ((activeTab === "todos" && table.getFilteredSelectedRowModel().rows.every(row => row.original.status_origem === "pendente de aprovação")) || activeTab === "pendente de aprovação") && (
            <div className="flex gap-2 mb-4">
              <Button onClick={handleBulkReprove} disabled={Object.keys(rowSelection).length === 0} variant="destructive">Reprovar {Object.keys(rowSelection).length} selecionados</Button>
              <Button onClick={handleBulkApprove} disabled={Object.keys(rowSelection).length === 0}>Aprovar {Object.keys(rowSelection).length} selecionados</Button>
            </div>
          )}
        </div>
        <TabsContent value="todos">
            {dataTableComponent}
        </TabsContent>
        <TabsContent value="pendente de aprovação">
            {dataTableComponent}
        </TabsContent>
        <TabsContent value="presença autorizada">
            {dataTableComponent}
        </TabsContent>
        <TabsContent value="presença não autorizada">
            {dataTableComponent}
        </TabsContent>
      </Tabs>
    </div>
  );
}
