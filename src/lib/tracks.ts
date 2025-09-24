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
    { name: 'Alexandre Nobre de Souza Carvalho', url: 'https://drive.google.com/uc?export=download&id=12o5bRQhvfKZ9uq9dd84r97R9fNkqZTLb' },
    { name: 'Arthur da Silva Rodrigues', url: 'https://drive.google.com/uc?export=download&id=1X_9dzSfsU0yB1gFeRPWdTf0gQrFKKW2I' },
    { name: 'Bernardo Oliveira Souza Beldoino', url: 'https://drive.google.com/uc?export=download&id=12kOwPcoNAOuTBlAkpIroPoh-jn63k2uJ' },
    { name: 'Daniel Silva Serra', url: 'https://drive.google.com/uc?export=download&id=1uvLrCYA5aWlByBCjIJgt2JQgWMFyF3Fu' },
    { name: 'Enzo Gabriel Santos da Silva', url: 'https://drive.google.com/uc?export=download&id=1b2R4nsOar_DM8p1XUa4JeWB88WueQgaq' },
    { name: 'Enzo Gomes Leal', url: 'https://drive.google.com/uc?export=download&id=16eKtJugLnIBUkR6mYiSoBlE1bUY_qKDd' },
    { name: 'Giovanna Dantas da Silva', url: 'https://drive.google.com/uc?export=download&id=124g2Lambtabwg2oJE2S4MA-IWTtMXNn3' },
    { name: 'Heloísa Gomes Rocha', url: 'https://drive.google.com/uc?export=download&id=1F4PpbZJ9IYoX5E-WfeP2FirFAoyCj5ZP' },
    { name: 'Jorge Miguel Dias Piedade', url: 'https://drive.google.com/uc?export=download&id=1YA0niSchPJU0rDkkIF2pz2Q8UWTLV3w0' },
    { name: 'Matheus Luna Santiago', url: 'https://drive.google.com/uc?export=download&id=1-_adqgWskWiuf3JHBwxurNHvvuP3L2e9' },
    { name: 'Matheus Rocha Queiroz', url: 'https://drive.google.com/uc?export=download&id=13yPgZLiqByefLdoccppltuhEo8x_8e4y' },
    { name: 'Milena Cristina Jesus Lima', url: 'https://drive.google.com/uc?export=download&id=1ROMw7CNOGvhFPaNid20hmBtmAF7RTB0S' },
    { name: 'Pedro Caetano Fernandes', url: 'https://drive.google.com/uc?export=download&id=1lutQ-mIJHHzErGsArsyyi8RfChMj-MJc' },
    { name: 'Pedro Gardenal de Andrade', url: 'https://drive.google.com/uc?export=download&id=1Zso5JaNzPk-Zb87C6Xuz39E6MYmEGtMG' },
    { name: 'Ryan Ramos Mafaldo', url: 'https://drive.google.com/uc?export=download&id=1Xs1hr9DLr3bsfDN7JQHCPqfhY0evL-J9' },
    { name: 'Sofia Oliveira Brito', url: 'https://drive.google.com/uc?export=download&id=1GFshaxsybaNnOCB76NAy0XY3IEXMClBy' },
    { name: 'Sophia Bonifácio da Silva', url: 'https://drive.google.com/uc?export=download&id=1ww4RxARtQTNnTAEssO8U_Jq75oewYi22' },
    { name: 'Sophia Vinecarti de Oliveira', url: 'https://drive.google.com/uc?export=download&id=11N4kfra7V3e335Doav7ytWLndJ2UpmAC' },
    { name: 'Theo Knablen de Souza', url: 'https://drive.google.com/uc?export=download&id=1F2Rl2tLUsZSnWP77SW5F5mCjsQHSa0R6' },
    { name: 'Victor Hugo dos Santos Queiroz', url: 'https://drive.google.com/uc?export=download&id=1z5OaUdxnEYevukPiWyyhP1JOPVbHJdwD' },
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

const getDriveIdFromUrl = (url: string) => {
    const regex = /[?&]id=([^&]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};

export const tracks: Track[] = trackData.map((item, index) => {
  const placeholder = PlaceHolderImages.find(p => p.id === String(index + 1));
  const driveId = getDriveIdFromUrl(item.url);
  
  return {
    id: index + 1,
    name: item.name,
    slug: slugify(item.name),
    audioUrl: driveId ? `https://drive.google.com/uc?export=download&id=${driveId}` : '',
    imageUrl: placeholder?.imageUrl || `https://picsum.photos/seed/${index + 1}/400/400`,
    imageHint: placeholder?.imageHint || 'abstract',
  };
});
