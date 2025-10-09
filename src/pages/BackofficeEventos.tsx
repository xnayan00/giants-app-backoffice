import { Evento, EventoCard } from "@/components/EventoCard";
import { Button } from "@/components/ui/button";

export default function BackofficeEventos() {
  const eventos: Evento[] = [
    {
      id: 1,
      name: 'Imersão Tech 2025',
      time: '2025-03-15T09:00:00Z',
      location: 'Presencial',
      address: 'São Paulo, SP',
      participants: 45,
      thumbnailUrl: 'https://placehold.co/600x400/7c3aed/FFFFFF/png?text=Imersão',
    },
    {
      id: 2,
      name: 'Encontro de Networking',
      time: '2025-03-22T19:00:00Z',
      location: 'On-live',
      address: null,
      participants: 78,
      thumbnailUrl: 'https://placehold.co/600x400/db2777/FFFFFF/png?text=Network',
    },
    {
      id: 3,
      name: 'Workshop de IA',
      time: '2025-04-05T14:00:00Z',
      location: 'Presencial',
      address: 'Belo Horizonte, MG',
      participants: 32,
      thumbnailUrl: 'https://placehold.co/600x400/16a34a/FFFFFF/png?text=IA'
    },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Eventos</h1>
          <p className="text-sm text-muted-foreground">Gerenciar eventos e imersões</p>
        </div>
        <Button>
          <i className="fi fi-ts-calendar-plus"></i>
          Novo Evento
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <EventoCard key={evento.id} evento={evento} />
        ))}
      </div>
    </div>
  );
}
