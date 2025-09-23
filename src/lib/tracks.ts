import { PlaceHolderImages } from '@/lib/placeholder-images';

export interface Track {
  id: number;
  name: string;
  slug: string;
  audioUrl: string;
  imageUrl: string;
  imageHint: string;
}

const trackData: { name: string; url: string }[] = [
  { name: 'Alexandre Nobre de Souza Carvalho', url: 'https://drive.google.com/file/d/12o5bRQhvfKZ9uq9dd84r97R9fNkqZTLb/preview' },
  { name: 'Arthur da Silva Rodrigues', url: 'https://drive.google.com/file/d/1X_9dzSfsU0yB1gFeRPWdTf0gQrFKKW2I/preview' },
  { name: 'Bernardo Oliveira Souza Beldoino', url: 'https://drive.google.com/file/d/12kOwPcoNAOuTBlAkpIroPoh-jn63k2uJ/preview' },
  { name: 'Daniel Silva Serra', url: 'https://drive.google.com/file/d/1uvLrCYA5aWlByBCjIJgt2JQgWMFyF3Fu/preview' },
  { name: 'Enzo Gabriel Santos da Silva', url: 'https://drive.google.com/file/d/1b2R4nsOar_DM8p1XUa4JeWB88WueQgaq/preview' },
  { name: 'Enzo Gomes Leal', url: 'https://drive.google.com/file/d/16eKtJugLnIBUkR6mYiSoBlE1bUY_qKDd/preview' },
  { name: 'Giovanna Dantas da Silva', url: 'https://drive.google.com/file/d/124g2Lambtabwg2oJE2S4MA-IWTtMXNn3/preview' },
  { name: 'Heloísa Gomes Rocha', url: 'https://drive.google.com/file/d/1F4PpbZJ9IYoX5E-WfeP2FirFAoyCj5ZP/preview' },
  { name: 'Jorge Miguel Dias Piedade', url: 'https://drive.google.com/file/d/1YA0niSchPJU0rDkkIF2pz2Q8UWTLV3w0/preview' },
  { name: 'Matheus Luna Santiago', url: 'https://drive.google.com/file/d/1-_adqgWskWiuf3JHBwxurNHvvuP3L2e9/preview' },
  { name: 'Matheus Rocha Queiroz', url: 'https://drive.google.com/file/d/13yPgZLiqByefLdoccppltuhEo8x_8e4y/preview' },
  { name: 'Milena Cristina Jesus Lima', url: 'https://drive.google.com/file/d/1ROMw7CNOGvhFPaNid20hmBtmAF7RTB0S/preview' },
  { name: 'Pedro Caetano Fernandes', url: 'https://drive.google.com/file/d/1lutQ-mIJHHzErGsArsyyi8RfChMj-MJc/preview' },
  { name: 'Pedro Gardenal de Andrade', url: 'https://drive.google.com/file/d/1Zso5JaNzPk-Zb87C6Xuz39E6MYmEGtMG/preview' },
  { name: 'Ryan Ramos Mafaldo', url: 'https://drive.google.com/file/d/1Xs1hr9DLr3bsfDN7JQHCPqfhY0evL-J9/preview' },
  { name: 'Sofia Oliveira Brito', url: 'https://drive.google.com/file/d/1GFshaxsybaNnOCB76NAy0XY3IEXMClBy/preview' },
  { name: 'Sophia Bonifácio da Silva', url: 'https://drive.google.com/file/d/1ww4RxARtQTNnTAEssO8U_Jq75oewYi22/preview' },
  { name: 'Sophia Vinecarti de Oliveira', url: 'https://drive.google.com/file/d/11N4kfra7V3e335Doav7ytWLndJ2UpmAC/preview' },
  { name: 'Theo Knablen de Souza', url: 'https://drive.google.com/file/d/1F2Rl2tLUsZSnWP77SW5F5mCjsQHSa0R6/preview' },
  { name: 'Victor Hugo dos Santos Queiroz', url: 'https://drive.google.com/file/d/1z5OaUdxnEYevukPiWyyhP1JOPVbHJdwD/preview' },
];

const slugify = (text: string) =>
  text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');

const getDriveId = (url: string) => {
  const match = url.match(/file\/d\/([a-zA-Z0-9_-]+)\//);
  return match ? match[1] : null;
};

export const tracks: Track[] = trackData.map((item, index) => {
  const driveId = getDriveId(item.url);
  const placeholder = PlaceHolderImages.find(p => p.id === String(index + 1));
  
  return {
    id: index + 1,
    name: item.name,
    slug: slugify(item.name),
    audioUrl: driveId ? `https://drive.google.com/uc?export=download&id=${driveId}` : '',
    imageUrl: placeholder?.imageUrl || '',
    imageHint: placeholder?.imageHint || '',
  };
});
