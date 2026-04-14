export interface CheckpointData {
  id: string;
  title: string;
  description: string;
  z: number;
}

export const checkpoints: CheckpointData[] = [
  {
    id: 'well-drilling',
    title: 'Perfuração de Poço',
    description: 'O primeiro passo é localizar o lençol freático e perfurar um poço artesiano para acessar a água subterrânea.',
    z: 50,
  },
  {
    id: 'pump-installation',
    title: 'Instalação de Bomba',
    description: 'Com o poço pronto, instalamos uma bomba submersa de alta eficiência para trazer a água à superfície.',
    z: 100,
  },
  {
    id: 'water-treatment',
    title: 'Tratamento de Água',
    description: 'A água passa por um sistema de filtragem e desinfecção para garantir que seja potável e segura para o consumo.',
    z: 140,
  },
  {
    id: 'distribution',
    title: 'Distribuição',
    description: 'Finalmente, a água chega às famílias através de chafarizes e caixas d\'água comunitárias.',
    z: 180,
  },
];
