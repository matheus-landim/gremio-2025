
import React, { useState } from 'react';
import { Share2, Heart, Printer, MapPin, Clock, Calendar, Trophy, Target, ClipboardList } from 'lucide-react';
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
      id: 0,
      homeTeam: "Time B",
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
    /* Próximos jogos */
    {
      id: 2,
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
      id: 2.1,
      homeTeam: "Grêmio B",
      awayTeam: "Grêmio D",
      date: "2024-07-02",
      time: "16:00",
      venue: "Society Granja Viana", 
      status: "upcoming",
      likes: 0,
      likedBy: []
    },
    {
      id: 2.2,
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
      id: 2.3,
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
        const hasLiked = match.likedBy.includes(userId);
        
        if (hasLiked) {
          // Remove like
          toast({
            title: "Curtida removida!",
            description: "Sua curtida foi removida."
          });
          return { 
            ...match, 
            likes: match.likes - 1,
            likedBy: match.likedBy.filter(id => id !== userId)
          };
        } else {
          // Add like
          toast({
            title: "Curtida adicionada! ♥",
            description: "Obrigado pelo seu apoio!"
          });
          return { 
            ...match, 
            likes: match.likes + 1,
            likedBy: [...match.likedBy, userId]
          };
        }
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
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0099D8] to-[#0272E7] rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=40&h=40&fit=crop&crop=center" 
          alt={`Escudo ${teamName}`}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-semibold text-[#1C1C1C] text-sm sm:text-base lg:text-lg">{teamName}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white py-6 sm:py-8 print:py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold print:text-2xl">CAMPEONATO INTERNO</h1>
            <Trophy className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
          <p className="text-lg sm:text-xl opacity-90 print:text-base">Grêmio Cotia/SP</p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8 print:py-4">
        {/* Resultados */}
        <section className="mb-8 sm:mb-12 print:mb-8 printable-section results-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Trophy className="w-6 h-6 sm:w-8 sm:h-8 text-[#0099D8]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] print:text-xl">Tabela de Resultados</h2>
            </div>
            <Button onClick={() => handlePrint('results-section')} variant="outline" className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
          
          <div className="grid gap-4 sm:gap-6">
            {finishedMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-4 sm:p-6 lg:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 items-center">
                    {/* Teams and Score */}
                    <div className="lg:col-span-2">
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 mb-4 sm:mb-6">
                        <TeamBadge teamName={match.homeTeam} />
                        <div className="text-3xl sm:text-4xl font-bold text-[#0099D8] mx-2 sm:mx-6">
                          {match.homeScore} - {match.awayScore}
                        </div>
                        <TeamBadge teamName={match.awayTeam} />
                      </div>
                    </div>
                    
                    {/* Match Info */}
                    <div className="space-y-2 sm:space-y-3 text-gray-600 text-center lg:text-left">
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{match.time}</span>
                      </div>
                      <div className="flex items-center justify-center lg:justify-start gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{match.venue}</span>
                      </div>
                    </div>
                    
                    {/* Actions and Best Players */}
                    <div className="space-y-4">
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 print:hidden">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleLike(match.id)}
                          className="flex items-center gap-2"
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
                          <p className="font-semibold text-[#0272E7] mb-2 flex items-center justify-center lg:justify-start gap-2">
                            <Trophy className="w-4 h-4" />
                            Melhores jogadores:
                          </p>
                          <div className="flex flex-wrap gap-1 justify-center lg:justify-start">
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
        <section className="mb-8 sm:mb-12 print:mb-8 printable-section upcoming-section">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <Target className="w-6 h-6 sm:w-8 sm:h-8 text-[#0099D8]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] print:text-xl">Próximos Jogos</h2>
            </div>
            <Button onClick={() => handlePrint('upcoming-section')} variant="outline" className="print:hidden">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            {upcomingMatches.map((match) => (
              <Card key={match.id} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white">
                  <CardTitle className="text-center text-lg sm:text-xl">
                    {match.homeTeam} x {match.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                      <TeamBadge teamName={match.homeTeam} />
                      <span className="text-2xl sm:text-3xl font-bold text-[#0272E7]">VS</span>
                      <TeamBadge teamName={match.awayTeam} />
                    </div>
                    
                    <div className="text-center space-y-2 sm:space-y-3 text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{new Date(match.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{match.time}</span>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{match.venue}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 pt-4 print:hidden">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleLike(match.id)}
                        className="flex items-center gap-2"
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 print:mb-4">
            <div className="flex items-center gap-2 sm:gap-3">
              <ClipboardList className="w-6 h-6 sm:w-8 sm:h-8 text-[#0099D8]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] print:text-xl">Tabela Completa</h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 print:hidden">
              <Button onClick={() => handlePrint('table-section')} variant="outline" className="text-sm">
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
                className="text-sm"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
          
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[600px]">
                  <thead className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Data</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Horário</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Partida</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Resultado</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base">Local</th>
                      <th className="px-3 sm:px-6 py-3 sm:py-4 text-left font-semibold text-sm sm:text-base print:hidden">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matches.map((match, index) => (
                      <tr key={match.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 font-medium text-sm sm:text-base">
                          {new Date(match.date).toLocaleDateString('pt-BR')}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">{match.time}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-gradient-to-br from-[#0099D8] to-[#0272E7]">
                                <img 
                                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop&crop=center" 
                                  alt={`Escudo ${match.homeTeam}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-semibold text-sm sm:text-base">{match.homeTeam}</span>
                            </div>
                            <span className="text-gray-500 text-sm sm:text-base">x</span>
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-gradient-to-br from-[#0099D8] to-[#0272E7]">
                                <img 
                                  src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=24&h=24&fit=crop&crop=center" 
                                  alt={`Escudo ${match.awayTeam}`}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="font-semibold text-sm sm:text-base">{match.awayTeam}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          {match.status === 'finished' ? (
                            <span className="text-lg sm:text-xl font-bold text-[#0099D8]">
                              {match.homeScore} - {match.awayScore}
                            </span>
                          ) : (
                            <Badge variant="outline" className="text-xs sm:text-sm">A realizar</Badge>
                          )}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base text-gray-600">{match.venue}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 print:hidden">
                          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleLike(match.id)}
                              className="flex items-center gap-1 text-xs sm:text-sm"
                            >
                              <Heart className={`w-3 h-3 sm:w-4 sm:h-4 ${match.likedBy.includes(userId) ? 'fill-red-500 text-red-500' : ''}`} />
                              {match.likes}
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleWhatsAppShare(match)}
                              className="flex items-center gap-1 text-xs sm:text-sm"
                            >
                              <Share2 className="w-3 h-3 sm:w-4 sm:h-4" />
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
      <footer className="bg-[#1C1C1C] text-white py-4 sm:py-6 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2025 Grêmio Cotia/SP - Campeonato Interno</p>
          <p className="text-xs sm:text-sm opacity-75 mt-1">Society Granja Viana • Agência Amplios</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
