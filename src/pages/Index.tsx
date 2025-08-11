import React, { useState } from 'react';
import { Share2, ThumbsUp, Printer, MapPin, Clock, Calendar, Trophy, Target, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

// Import sponsor logos
import sponsorTresAPlus from '@/assets/sponsor-tresaplus.svg';
import sponsorAlternativa from '@/assets/sponsor-alternativa.svg';
import sponsorAmplios from '@/assets/sponsor-amplios.svg';
import sponsorAya from '@/assets/sponsor-aya.svg';
import sponsorBorges from '@/assets/sponsor-borges.svg';
import sponsorCae from '@/assets/sponsor-cae.svg';
import sponsorVersatil from '@/assets/sponsor-versatil.svg';
import sponsorConstrubenx from '@/assets/sponsor-construbenx.svg';
import sponsorBrillus from '@/assets/sponsor-brillus.svg';
import sponsorCoralina from '@/assets/sponsor-coralina.svg';
import sponsorCsm from '@/assets/sponsor-csm.svg'; 
import sponsorKnn from '@/assets/sponsor-knn.svg';
import sponsorMadreiva from '@/assets/sponsor-madreiva.svg';
import sponsorMerciaballet from '@/assets/sponsor-merciaballet.svg';
import sponsorSociety from '@/assets/sponsor-society.svg';
import sponsorTonntech from '@/assets/sponsor-tonntech.svg';

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
  bestPlayers?: string[];
}

const Index = () => {
  // Estado para controlar a animação do botão específico
  const [animatingButtons, setAnimatingButtons] = useState<Set<string>>(new Set());

  // Função para formatar data corretamente (evita problema de fuso horário)
  const formatDateToBR = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    return date.toLocaleDateString('pt-BR');
  };

  // Team images mapping
  const teamImages: { [key: string]: string } = {
  "Inter Milan": "https://upload.wikimedia.org/wikipedia/commons/0/05/FC_Internazionale_Milano_2021.svg",
  "Al-Hilal": "https://upload.wikimedia.org/wikipedia/commons/5/55/Al_Hilal_SFC_Logo.svg",
  "Porto": "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
  "Real Madrid": "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  "Borussia Dortmund": "https://upload.wikimedia.org/wikipedia/commons/6/67/Borussia_Dortmund_logo.svg",
  "Red Bull Salzburg": "https://upload.wikimedia.org/wikipedia/pt/thumb/2/24/Red_Bull_Salzburg.png/250px-Red_Bull_Salzburg.png",
  "Inter Miami": "https://upload.wikimedia.org/wikipedia/en/thumb/5/5c/Inter_Miami_CF_logo.svg/1200px-Inter_Miami_CF_logo.svg.png",
  "Boca Juniors": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/CABJ70.png/1200px-CABJ70.png",
  "Manchester City": "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
  "Bayern": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg/1200px-FC_Bayern_M%C3%BCnchen_logo_%282024%29.svg.png",
  "Paris Saint-Germain": "https://upload.wikimedia.org/wikipedia/en/a/a7/Paris_Saint-Germain_F.C..svg",
  "Juventus": "https://upload.wikimedia.org/wikipedia/commons/f/fa/Juventus_FC_2017_logo_%28negative%29.jpg",
  "River Plate": "https://upload.wikimedia.org/wikipedia/commons/a/ac/Escudo_del_C_A_River_Plate.svg",
  "Benfica": "https://upload.wikimedia.org/wikipedia/pt/thumb/d/de/Sport_Lisboa_e_Benfica.svg/250px-Sport_Lisboa_e_Benfica.svg.png",
  "Chelsea": "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  "Atlético de Madrid": "https://upload.wikimedia.org/wikipedia/pt/thumb/c/c1/Atletico_Madrid_logo.svg/1200px-Atletico_Madrid_logo.svg.png"
};

  const [matches] = useState<Match[]>([
    /*
    {
      id: 1,
      homeTeam: "Chelsea",
      awayTeam: "Atlético de Madrid", 
      homeScore: 3,
      awayScore: 1,
      date: "2024-06-25",
      time: "14:00",
      venue: "Society Granja Viana",
      status: "finished",
      bestPlayers: []
    },
    */
   
    /* ------------- PRÓXIMOS JOGOS ------------- */
    
    {
    id: 1,
    homeTeam: "Benfica",
    awayTeam: "River Plate",
    date: "2025-08-24",
    time: "13:30",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 2,
    homeTeam: "Chelsea",
    awayTeam: "Juventus",
    date: "2025-08-24",
    time: "13:30",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 3,
    homeTeam: "Red Bull Salzburg",
    awayTeam: "Atlético de Madrid",
    date: "2025-08-24",
    time: "14:25",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 4,
    homeTeam: "Borussia Dortmund",
    awayTeam: "Inter Milan",
    date: "2025-08-24",
    time: "14:25",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 5,
    homeTeam: "Real Madrid",
    awayTeam: "Manchester City",
    date: "2025-08-24",
    time: "15:20",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 6,
    homeTeam: "Boca Juniors",
    awayTeam: "Inter Miami",
    date: "2025-08-24",
    time: "16:15",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 7,
    homeTeam: "Bayern",
    awayTeam: "Porto",
    date: "2025-08-24",
    time: "17:10",
    venue: "Society Granja Viana",
    status: "upcoming"
  },
  {
    id: 8,
    homeTeam: "Paris Saint-Germain",
    awayTeam: "Al-Hilal",
    date: "2025-08-24",
    time: "18:00",
    venue: "Society Granja Viana",
    status: "upcoming"
  }
  ]);

  const finishedMatches = matches.filter(match => match.status === 'finished');
  const upcomingMatches = matches.filter(match => match.status === 'upcoming');

  const handleSupport = (buttonId: string) => {
    // Ativar animação apenas para este botão específico
    setAnimatingButtons(prev => new Set(prev).add(buttonId));
    
    // Primeira mensagem: agradecimento
    toast({
      title: "Obrigado pelo seu apoio!",
      description: "Seu apoio é muito importante para nós!",
      duration: 700,
    });

    setTimeout(() => {
      setAnimatingButtons(prev => {
        const newSet = new Set(prev);
        newSet.delete(buttonId);
        return newSet;
      });
    }, 700);
  };

  const handleWhatsAppShare = (match: Match) => {
    const message = match.status === 'finished' 
      ? `CAMPEONATO INTERNO - Grêmio Cotia/SP\n\n${match.homeTeam} ${match.homeScore} x ${match.awayScore} ${match.awayTeam}\n${formatDateToBR(match.date)} - ${match.time}\n${match.venue}`
      : `CAMPEONATO INTERNO - Grêmio Cotia/SP\n\nPróximo jogo:\n${match.homeTeam} x ${match.awayTeam}\n${formatDateToBR(match.date)} - ${match.time}\n${match.venue}`;
    
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
      (targetSection as HTMLElement).classList.add('print-active');
    }
    
    window.print();
    
    printableElements.forEach(el => {
      (el as HTMLElement).style.display = 'block';
      el.classList.remove('print-active');
    });
  };

  const TeamBadge = ({ teamName }: { teamName: string }) => (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#0099D8] to-[#0272E7] rounded-full flex items-center justify-center overflow-hidden">
        <img 
          src={teamImages[teamName] || teamImages["Inter Milan"]} 
          alt={`Escudo ${teamName}`}
          className="w-full h-full object-cover"
        />
      </div>
      <span className="font-semibold text-[#1C1C1C] text-sm sm:text-base lg:text-lg">{teamName}</span>
    </div>
  );

  // Componente do botão de apoio com animação específica
  const SupportButton = ({ 
    size = "sm", 
    variant = "outline" as const, 
    className = "",
    buttonId 
  }: {
    size?: "sm" | "default" | "lg" | "icon";
    variant?: "outline" | "ghost";
    className?: string;
    buttonId: string;
  }) => {
    const isAnimating = animatingButtons.has(buttonId);
    
    return (
      <Button 
        variant={variant} 
        onClick={() => handleSupport(buttonId)}
        className={`flex items-center gap-2 transition-all duration-300 ${
          isAnimating 
            ? 'animate-pulse scale-110 bg-green-100 border-green-400 text-green-700 shadow-lg' 
            : 'hover:scale-105'
        } ${className}`}
      >
        <ThumbsUp className={`${size === "sm" ? "w-4 h-4" : "w-3 h-3 sm:w-4 sm:h-4"} ${
          isAnimating ? 'animate-bounce' : ''
        }`} />
        {size === "sm" ? "Dar Apoio" : "Apoio"}
      </Button>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white py-6 sm:py-8 print:py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col items-center justify-center mb-2">
            <img
              src="https://i.imgur.com/f8jmMBX.png"
              alt="Logo"
              className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto mb-2"
            />
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold print:text-2xl">
              CAMPEONATO INTERNO
            </h1>
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
                        <span className="text-sm sm:text-base">{formatDateToBR(match.date)}</span>
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
                        <SupportButton buttonId={`result-${match.id}`} />
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
                      
                      {match.bestPlayers && match.bestPlayers.length > 0 && (
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
                <CardHeader className="bg-gradient-to-r from-[#0099D8] to-[#0272E7] text-white print:hidden">
                  <CardTitle className="text-center text-lg sm:text-xl">
                    {match.homeTeam} x {match.awayTeam}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {/* Print format - simple list */}
                  <div className="hidden print:block match-print-format">
                    <span className="font-medium">{match.homeTeam} X {match.awayTeam}</span>
                    <span>{formatDateToBR(match.date)}</span>
                    <span>{match.time}</span>
                  </div>
                  
                  {/* Screen format - cards */}
                  <div className="space-y-4 print:hidden">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4">
                      <TeamBadge teamName={match.homeTeam} />
                      <span className="text-2xl sm:text-3xl font-bold text-[#0272E7]">VS</span>
                      <TeamBadge teamName={match.awayTeam} />
                    </div>
                    
                    <div className="text-center space-y-2 sm:space-y-3 text-gray-600">
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span className="text-sm sm:text-base">{formatDateToBR(match.date)}</span>
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
                    
                    <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 pt-4">
                      <SupportButton buttonId={`upcoming-${match.id}`} />
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
                          {formatDateToBR(match.date)}
                        </td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4 text-sm sm:text-base">{match.time}</td>
                        <td className="px-3 sm:px-6 py-3 sm:py-4">
                          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1 sm:gap-2">
                              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full overflow-hidden bg-gradient-to-br from-[#0099D8] to-[#0272E7]">
                                <img 
                                  src={teamImages[match.homeTeam] || teamImages["Inter Milan"]}
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
                                  src={teamImages[match.awayTeam] || teamImages["Inter Milan"]}
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
                            <SupportButton size="icon" variant="ghost" className="text-xs sm:text-sm" buttonId={`table-${match.id}`} />
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

        {/* Sponsors Section */}
        <section className="mb-8 sm:mb-12 print:hidden sponsors-grid">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1C1C1C] mb-4">Nossos Patrocinadores</h2>
          </div>
          
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6">
        {[
          { logo: sponsorTresAPlus, name: '3APlus', url: 'https://www.3aplus.com.br' },
          { logo: sponsorAlternativa, name: 'Alternativa', url: 'https://www.alternativacoberturas.net.br/' },
          { logo: sponsorAmplios, name: 'Amplios', url: 'https://www.agenciaamplios.com.br' },
          { logo: sponsorAya, name: 'Aya', url: 'https://www.clinicaaya.com.br/' },
          { logo: sponsorBorges, name: 'Borges', url: 'https://www.instagram.com/borges_consultoria' },
          { logo: sponsorCae, name: 'Cae', url: 'https://www.instagram.com/caeclubempresarios/' },
          { logo: sponsorVersatil, name: 'Versátil', url: 'https://www.versatilseg.com.br' },
          { logo: sponsorConstrubenx, name: 'Construbenx', url: 'hhttps://construbenx.com.br/' },
          { logo: sponsorBrillus, name: 'Brillus', url: 'https://www.instagram.com/brillusesteticaautomotiva/' },
          { logo: sponsorCoralina, name: 'Coralina', url: 'https://www.instagram.com/boutique.coralina/' },
          { logo: sponsorCsm, name: 'CSM', url: 'https://www.csm.com.br/' },
          { logo: sponsorKnn, name: 'KNN', url: 'https://www.knnidiomas.com.br/' },
          { logo: sponsorMadreiva, name: 'Madreiva', url: 'https://www.colegiomadreiva.com.br/' },
          { logo: sponsorMerciaballet, name: 'Mercia Ballet', url: 'https://www.merciaballet.com.br' },
          { logo: sponsorSociety, name: 'Society Granja Viana', url: 'https://www.societygranjaviana.com.br' },
          { logo: sponsorTonntech, name: 'Tonntech', url: 'https://www.instagram.com/tonn.tech/' },
        ].map((sponsor, index) => (
          <a 
            key={index}
            href={sponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 aspect-square flex items-center justify-center border border-gray-200"
          >
            {sponsor.logo ? (
              <img 
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                <span className="text-gray-400 text-xs sm:text-sm font-medium text-center">
                  {sponsor.name}
                </span>
              </div>
            )}
          </a>
        ))}
      </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-[#1C1C1C] text-white py-4 sm:py-6 print:hidden">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base">&copy; 2025 Grêmio Cotia/SP - Campeonato Interno</p>
          <p className="text-xs sm:text-sm opacity-75 mt-1">Society Granja Viana</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
