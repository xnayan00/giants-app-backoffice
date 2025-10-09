import { AppBar } from '@/components/AppBar';

export default function Palestras() {
  const categories = [
    {
      name: 'DESENVOLVOVLIMENTO PESSOAL & MENTALIDADE',
      palestras: [
        {
          id: 1,
          speaker: 'PAULO MUZY',
          title: 'MODELOS MENTAIS',
          thumbnail: '👨‍⚕️',
        },
        {
          id: 2,
          speaker: 'LINCOLN NUNES',
          title: 'MENTALIDADE EXPONENCIAL: SUPERANDO OS...',
          thumbnail: '👨‍💼',
        },
        {
          id: 3,
          speaker: 'JOÃO MARTINS',
          title: 'CONFIANÇA E INTELIGÊNCIA HUMANA',
          thumbnail: '👨‍🏫',
        },
      ],
    },
    {
      name: 'FINANCEIRO & EXPANSÃO',
      palestras: [
        {
          id: 4,
          speaker: 'RODOLFO OLIVEIRA',
          title: 'APRENDA A JOGAR COM O CAPITALISMO A SEU FAVOR',
          thumbnail: '👨‍💻',
        },
        {
          id: 5,
          speaker: 'RODOLFO OLIVEIRA',
          title: 'COMO FICAR RICO NO JOGO DO CAPITALISMO?',
          thumbnail: '👨‍💻',
        },
      ],
    },
    {
      name: 'GESTÃO EMPRESARIAL & ESTRATÉGIA',
      palestras: [
        {
          id: 6,
          speaker: 'RAUL SENA',
          title: 'REINVENTE AGORA',
          thumbnail: '👨‍💼',
        },
        {
          id: 7,
          speaker: 'RENATA VICHI',
          title: 'ESTRATÉGIA E CRM',
          thumbnail: '👩‍💼',
        },
        {
          id: 8,
          speaker: 'TIAGO DIAS',
          title: 'MINDSET EMPREENDEDOR',
          thumbnail: '👨‍💼',
        },
      ],
    },
  ];

  return (
    <div className="app-container">
      {/* Header */}
      <header className="bg-surface-elevated border-b border-border p-6 space-y-3">
        <h1 className="text-2xl font-bold text-foreground text-center">Palestras</h1>
        <p className="text-lg text-center text-foreground/90 leading-relaxed px-4">
          Não se preocupe com as falhas, você só precisa acertar uma vez.
        </p>
      </header>

      {/* Categories and Lectures */}
      <main className="p-6 pb-24 space-y-8 animate-fade-in">
        {categories.map((category, categoryIndex) => (
          <section key={categoryIndex} className="space-y-4">
            {/* Category Title */}
            <h2 className="text-sm font-bold text-foreground/80 tracking-wide">
              {category.name}
            </h2>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide">
              {category.palestras.map((palestra, index) => (
                <div
                  key={palestra.id}
                  className="card-elevated overflow-hidden flex-shrink-0 w-[280px] transition-smooth hover:scale-[1.02]"
                  style={{ animationDelay: `${(categoryIndex * 3 + index) * 0.1}s` }}
                >
                  {/* Lecture Card */}
                  <div className="relative h-48 bg-gradient-to-br from-surface to-surface-elevated flex items-end p-6">
                    <div className="absolute top-4 right-4 w-24 h-24 rounded-full bg-surface-hover border-2 border-border flex items-center justify-center text-4xl">
                      {palestra.thumbnail}
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold text-foreground">
                        {palestra.speaker}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4">
                    <h4 className="text-sm font-semibold text-foreground line-clamp-2 min-h-[40px]">
                      {palestra.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      <AppBar />
    </div>
  );
}
