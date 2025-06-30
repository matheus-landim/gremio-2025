
import React, { useState } from 'react';
import { Share2, Heart, Printer, MapPin, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface Match {
  id: number;
  homeTeam: string;
  awayTeam: string;
  homeScore?: number;
  awayScore?: number;
  date: string;
  time: string;
  venue: string;
  status: 'finished' | 'upcoming';
  likes: number;
  bestPlayers?: string[];
}

const Index = () => {
  const [matches, setMatches] = useState<Match[]>([
    {
      id: 1,
      homeTeam: "Grêmio A",
      awayTeam: "Grêmio B", 
      homeScore: 3,
      awayScore: 1,
      date: "2024-06-25",
      time: "14:00",
      venue: "Society Granja Viana",
      status: "finished",
      likes: 15,
      bestPlayers: ["João Silva", "Pedro Santos"]
    },
    {
      id: 2,
      homeTeam: "Grêmio C",
      awayTeam: "Grêmio D",
      homeScore: 2,
      awayScore: 2, 
      date: "2024-06-25",
      time: "16:00",
      venue: "Society Granja Viana",
      status: "finished",
      likes: 8,
      bestPlayers: ["Carlos Lima", "André Costa"]
    },
    {
      id: 3,
      homeTeam: "Grêmio A",
      awayTeam: "Grêmio C",
      date: "2024-07-02",
      time: "14:00", 
      venue: "Society Granja Viana",
      status: "upcoming",
      likes: 0
    },
    {
      id: 4,
      homeTeam: "Grêmio B",
      awayTeam: "Grêmio D",
      date: "2024-07-02",
      time: "16:00",
      venue: "Society Granja Viana", 
      status: "upcoming",
      likes: 0
    }
  ]);

  const finishedMatches = matches.filter(match => match.status === 'finished');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');

  const handleLike = (matchId: number) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, likes: match.likes + 1 }
        : match
    ));
    toast({
      title: "Curtida adicionada!",
      description: "Obrigado pelo seu apoio!"
    });
  };

  const handleWhatsAppShare = (match: Match) => {
    const message = match.status === 'finished' 
      ? `🏆 CAMPEONATO INTERNO - Grêmio Cotia/SP\n\n${match.homeTeam} ${match.homeScore} x ${match.awayScore} ${match.awayTeam}\n📅 ${new Date(match.date).toLocaleDateString('pt-BR')}\n⏰ ${match.time}\n📍 ${match.venue}\n\n${match.bestPlayers ? `⭐ Melhores jogadores: ${match.bestPlayers.join(', ')}` : ''}`
      : `🏆 CAMPEONATO INTERNO - Grêmio Cotia/SP\n\n📅 Próximo jogo:\n${match.homeTeam} x ${match.awayTeam}\n📅 ${new Date(match.date).toLocaleDateString('pt-BR')}\n⏰ ${match.time}\n📍 ${match.venue}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = () => {
    window.print();
  };

  const TeamBadge = ({ teamName }: { teamName: string }) => (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-[#0099D8] to-[#0272E7] rounded-full flex items-center justify-center text-white font-bold text-sm">
        {teamName.split(' ')[1] || teamName.charAt(0)}
      </div>
      <span className="font-semibold text-[#1C1C1C]">{teamName}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white py-8 print:py-4">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2 print:text-2xl">CAMPEONATO INTERNO</h1>
          <p className="text-xl opacity-90 print:text-base">Grêmio Cotia/SP</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 print:py-4">
        {/* Resultados */}
        <section className="mb-12 print:mb-8">
          <div className="flex justify-between items-center mb-6 print:mb-4">
            <h2 className="text-3xl font-bold text-[#1C1C1C] print:text-xl">📊 Tabela de Resultados</h2>
            <Button onClick={handlePrint} variant="outline" className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
          
          <div className="grid gap-4">
            {finishedMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-4 gap-4 items-center">
                    {/* Teams and Score */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-4">
                        <TeamBadge teamName={match.homeTeam} />
                        <div className="text-3xl font-bold text-[#0099D8] mx-4">
                          {match.homeScore} - {match.awayScore}
                        </div>
                        <TeamBadge teamName={match.awayTeam} />
                      </div>
                    </div>
                    
                    {/* Match Info */}
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(match.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {match.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </div>
                    </div>
                    
                    {/* Actions and Best Players */}
                    <div className="space-y-3">
                      <div className="flex gap-2 print:hidden">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLike(match.id)}
                          className="flex items-center gap-1"
                        >
                          <Heart className="w-4 h-4" />
                          {match.likes}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsAppShare(match)}
                          className="flex items-center gap-1"
                        >
                          <Share2 className="w-4 h-4" />
                          WhatsApp
                        </Button>
                      </div>
                      
                      {match.bestPlayers && (
                        <div className="text-sm">
                          <p className="font-semibold text-[#0272E7] mb-1">⭐ Melhores jogadores:</p>
                          {match.bestPlayers.map((player, index) => (
                            <Badge key={index} variant="secondary" className="mr-1 mb-1">
                              {player}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Próximos Jogos */}
        <section className="mb-12 print:mb-8">
          <h2 className="text-3xl font-bold text-[#1C1C1C] mb-6 print:text-xl print:mb-4">🎯 Próximos Jogos</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white">
                  <CardTitle className="text-center">
                    {match.homeTeam} x {match.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <TeamBadge teamName={match.homeTeam} />
                      <span className="text-2xl font-bold text-[#0272E7]">VS</span>
                      <TeamBadge teamName={match.awayTeam} />
                    </div>
                    
                    <div className="text-center space-y-2 text-gray-600">
                      <div className="flex items-center justify-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(match.date).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        {match.time}
                      </div>
                      <div className="flex items-center justify-center gap-1">
                        <MapPin className="w-4 h-4" />
                        {match.venue}
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-2 pt-4 print:hidden">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(match.id)}
                        className="flex items-center gap-1"
                      >
                        <Heart className="w-4 h-4" />
                        {match.likes}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWhatsAppShare(match)}
                        className="flex items-center gap-1"
                      >
                        <Share2 className="w-4 h-4" />
                        WhatsApp
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Tabela Completa */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-6 print:mb-4">
            <h2 className="text-3xl font-bold text-[#1C1C1C] print:text-xl">📋 Tabela Completa</h2>
            <div className="flex gap-2 print:hidden">
              <Button onClick={handlePrint} variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button 
                onClick={() => {
                  const message = `🏆 CAMPEONATO INTERNO - Grêmio Cotia/SP\n\n📋 Programação Completa:\n\n${matches.map(match => 
                    `${match.homeTeam} x ${match.awayTeam}\n📅 ${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.time}\n📍 ${match.venue}\n${match.status === 'finished' ? `Resultado: ${match.homeScore}-${match.awayScore}` : 'A realizar'}\n`
                  ).join('\n')}`;
                  
                  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
                  window.open(whatsappUrl, '_blank');
                }}
                variant="outline"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white">
                    <tr>
                      <th className="px-4 py-3 text-left">Data</th>
                      <th className="px-4 py-3 text-left">Horário</th>
                      <th className="px-4 py-3 text-left">Partida</th>
                      <th className="px-4 py-3 text-left">Resultado</th>
                      <th className="px-4 py-3 text-left">Local</th>
                      <th className="px-4 py-3 text-left print:hidden">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, index) => (
                      <tr key={match.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-4 py-3 font-medium">
                          {new Date(match.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-4 py-3">{match.time}</td>
                        <td className="px-4 py-3">
                          <div className="font-semibold">
                            {match.homeTeam} x {match.awayTeam}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          {match.status === 'finished' ? (
                            <span className="text-lg font-bold text-[#0099D8]">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <Badge variant="outline">A realizar</Badge>
                          )}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-600">{match.venue}</td>
                        <td className="px-4 py-3 print:hidden">
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleLike(match.id)}
                            >
                              <Heart className="w-4 h-4" />
                              {match.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleWhatsAppShare(match)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white py-6 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Grêmio Cotia/SP - Campeonato Interno</p>
          <p className="text-sm opacity-75 mt-1">Society Granja Viana</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
