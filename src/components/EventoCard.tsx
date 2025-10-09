import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, Edit, Eye, MapPin, Users } from "lucide-react";

/**
 * Define a estrutura de dados para um objeto de evento.
 */
export type Evento = {
  id: number;
  name: string;
  time: string;
  location: "Presencial" | "On-live";
  address: string | null;
  participants: number;
  thumbnailUrl: string;
};

interface EventoCardProps {
  evento: Evento;
}

/**
 * Componente reutilizável para exibir um card de evento no backoffice.
 */
export function EventoCard({ evento }: EventoCardProps) {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <img src={evento.thumbnailUrl} alt={evento.name} className="w-full h-40 object-cover rounded-t-lg" />
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg">{evento.name}</CardTitle>
          <Badge variant={evento.location === 'Presencial' ? 'default' : 'secondary'}>
            {evento.location}
          </Badge>
        </div>
        <div className="space-y-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{new Date(evento.time).toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{new Date(evento.time).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span>{evento.participants} participantes</span>
          </div>
          {evento.location === 'Presencial' && evento.address && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{evento.address}</span>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex gap-2">
        <Button variant="outline" size="icon" className="w-10 h-10"><Edit className="h-4 w-4" /></Button>
        <Button variant="outline" size="icon" className="w-10 h-10"><Eye className="h-4 w-4" /></Button>
        <Button className="flex-grow">Inscreva-se</Button>
      </CardFooter>
    </Card>
  );
}