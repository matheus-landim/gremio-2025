
import React, { useState } from 'react';
import { Share2, Heart, Printer, MapPin, Clock, Calendar, Trophy, Target, ClipboardList, Shield } from 'lucide-react';
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
  likedBy: string[];
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
      likedBy: [],
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
      likedBy: [],
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
      likes: 0,
      likedBy: []
    },
    {
      id: 4,
      homeTeam: "Grêmio B",
      awayTeam: "Grêmio D",
      date: "2024-07-02",
      time: "16:00",
      venue: "Society Granja Viana", 
      status: "upcoming",
      likes: 0,
      likedBy: []
    }
  ]);

  const [userId] = useState(() => 'user_' + Math.random().toString(36).substr(2, 9));

  const finishedMatches = matches.filter(match => match.status === 'finished');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');

  const handleLike = (matchId: number) => {
    setMatches(prev => prev.map(match => {
      if (match.id === matchId) {
        if (match.likedBy.includes(userId)) {
          toast({
            title: "Você já curtiu esta partida!",
            description: "Cada usuário pode curtir apenas uma vez."
          });
          return match;
        }
        toast({
          title: "Curtida adicionada!",
          description: "Obrigado pelo seu apoio!"
        });
        return { 
          ...match, 
          likes: match.likes + 1,
          likedBy: [...match.likedBy, userId]
        };
      }
      return match;
    }));
  };

  const handleWhatsAppShare = (match: Match) => {
    const message = match.status === 'finished' 
      ? `CAMPEONATO INTERNO - Grêmio Cotia/SP\n\n${match.homeTeam} ${match.homeScore} x ${match.awayScore} ${match.awayTeam}\n${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.time}\n${match.venue}\n\n${match.bestPlayers ? `Melhores jogadores: ${match.bestPlayers.join(', ')}` : ''}`
      : `CAMPEONATO INTERNO - Grêmio Cotia/SP\n\nPróximo jogo:\n${match.homeTeam} x ${match.awayTeam}\n${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.time}\n${match.venue}`;
    
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handlePrint = (section: string) => {
    const printableElements = document.querySelectorAll('.printable-section');
    printableElements.forEach(el => {
      (el as HTMLElement).style.display = 'none';
    });
    
    const targetSection = document.querySelector(`.${section}`);
    if (targetSection) {
      (targetSection as HTMLElement).style.display = 'block';
    }
    
    window.print();
    
    printableElements.forEach(el => {
      (el as HTMLElement).style.display = 'block';
    });
  };

  const TeamBadge = ({ teamName }: { teamName: string }) => (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 bg-gradient-to-br from-[#0099D8] to-[#0272E7] rounded-full flex items-center justify-center text-white shadow-lg">
        <Shield className="w-5 h-5" />
      </div>
      <span className="font-semibold text-[#1C1C1C] text-lg">{teamName}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white py-8 print:py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Trophy className="w-8 h-8" />
            <h1 className="text-4xl font-bold print:text-2xl">CAMPEONATO INTERNO</h1>
            <Trophy className="w-8 h-8" />
          </div>
          <p className="text-xl opacity-90 print:text-base">Grêmio Cotia/SP</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 print:py-4">
        {/* Resultados */}
        <section className="mb-12 print:mb-8 printable-section results-section">
          <div className="flex justify-between items-center mb-6 print:mb-4">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-[#0099D8]" />
              <h2 className="text-3xl font-bold text-[#1C1C1C] print:text-xl">Tabela de Resultados</h2>
            </div>
            <Button onClick={() => handlePrint('results-section')} variant="outline" className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
          
          <div className="grid gap-6">
            {finishedMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-4 gap-6 items-center">
                    {/* Teams and Score */}
                    <div className="md:col-span-2">
                      <div className="flex items-center justify-between mb-6">
                        <TeamBadge teamName={match.homeTeam} />
                        <div className="text-4xl font-bold text-[#0099D8] mx-6">
                          {match.homeScore} - {match.awayScore}
                        </div>
                        <TeamBadge teamName={match.awayTeam} />
                      </div>
                    </div>
                    
                    {/* Match Info */}
                    <div className="space-y-3 text-gray-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-base">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-base">{match.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-base">{match.venue}</span>
                      </div>
                    </div>
                    
                    {/* Actions and Best Players */}
                    <div className="space-y-4">
                      <div className="flex gap-3 print:hidden">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLike(match.id)}
                          className="flex items-center gap-2"
                          disabled={match.likedBy.includes(userId)}
                        >
                          <Heart className={`w-4 h-4 ${match.likedBy.includes(userId) ? 'fill-red-500 text-red-500' : ''}`} />
                          {match.likes}
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleWhatsAppShare(match)}
                          className="flex items-center gap-2"
                        >
                          <Share2 className="w-4 h-4" />
                          WhatsApp
                        </Button>
                      </div>
                      
                      {match.bestPlayers && (
                        <div className="text-sm">
                          <p className="font-semibold text-[#0272E7] mb-2 flex items-center gap-2">
                            <Trophy className="w-4 h-4" />
                            Melhores jogadores:
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {match.bestPlayers.map((player, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {player}
                              </Badge>
                            ))}
                          </div>
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
        <section className="mb-12 print:mb-8 printable-section upcoming-section">
          <div className="flex justify-between items-center mb-6 print:mb-4">
            <div className="flex items-center gap-3">
              <Target className="w-8 h-8 text-[#0099D8]" />
              <h2 className="text-3xl font-bold text-[#1C1C1C] print:text-xl">Próximos Jogos</h2>
            </div>
            <Button onClick={() => handlePrint('upcoming-section')} variant="outline" className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white">
                  <CardTitle className="text-center text-xl">
                    {match.homeTeam} x {match.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <TeamBadge teamName={match.homeTeam} />
                      <span className="text-3xl font-bold text-[#0272E7]">VS</span>
                      <TeamBadge teamName={match.awayTeam} />
                    </div>
                    
                    <div className="text-center space-y-3 text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <span className="text-base">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-5 h-5" />
                        <span className="text-base">{match.time}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-5 h-5" />
                        <span className="text-base">{match.venue}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-3 pt-4 print:hidden">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(match.id)}
                        className="flex items-center gap-2"
                        disabled={match.likedBy.includes(userId)}
                      >
                        <Heart className={`w-4 h-4 ${match.likedBy.includes(userId) ? 'fill-red-500 text-red-500' : ''}`} />
                        {match.likes}
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleWhatsAppShare(match)}
                        className="flex items-center gap-2"
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
        <section className="mb-8 printable-section table-section">
          <div className="flex justify-between items-center mb-6 print:mb-4">
            <div className="flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-[#0099D8]" />
              <h2 className="text-3xl font-bold text-[#1C1C1C] print:text-xl">Tabela Completa</h2>
            </div>
            <div className="flex gap-2 print:hidden">
              <Button onClick={() => handlePrint('table-section')} variant="outline">
                <Printer className="w-4 h-4 mr-2" />
                Imprimir
              </Button>
              <Button 
                onClick={() => {
                  const message = `CAMPEONATO INTERNO - Grêmio Cotia/SP\n\nProgramação Completa:\n\n${matches.map(match => 
                    `${match.homeTeam} x ${match.awayTeam}\n${new Date(match.date).toLocaleDateString('pt-BR')} - ${match.time}\n${match.venue}\n${match.status === 'finished' ? `Resultado: ${match.homeScore}-${match.awayScore}` : 'A realizar'}\n`
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
                      <th className="px-6 py-4 text-left font-semibold">Data</th>
                      <th className="px-6 py-4 text-left font-semibold">Horário</th>
                      <th className="px-6 py-4 text-left font-semibold">Partida</th>
                      <th className="px-6 py-4 text-left font-semibold">Resultado</th>
                      <th className="px-6 py-4 text-left font-semibold">Local</th>
                      <th className="px-6 py-4 text-left font-semibold print:hidden">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, index) => (
                      <tr key={match.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-medium text-base">
                          {new Date(match.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-6 py-4 text-base">{match.time}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#0099D8]" />
                              <span className="font-semibold">{match.homeTeam}</span>
                            </div>
                            <span className="text-gray-500">x</span>
                            <div className="flex items-center gap-2">
                              <Shield className="w-4 h-4 text-[#0099D8]" />
                              <span className="font-semibold">{match.awayTeam}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          {match.status === 'finished' ? (
                            <span className="text-xl font-bold text-[#0099D8]">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <Badge variant="outline" className="text-sm">A realizar</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-base text-gray-600">{match.venue}</td>
                        <td className="px-6 py-4 print:hidden">
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleLike(match.id)}
                              disabled={match.likedBy.includes(userId)}
                              className="flex items-center gap-1"
                            >
                              <Heart className={`w-4 h-4 ${match.likedBy.includes(userId) ? 'fill-red-500 text-red-500' : ''}`} />
                              {match.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleWhatsAppShare(match)}
                              className="flex items-center gap-1"
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
