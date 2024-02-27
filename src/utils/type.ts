// File for manage type interface that use in this project
export interface AbilityType {
  name: string;
  text: string;
  type: string;
}

export interface AttacksType {
  cost: string[];
  name: string;
  text: string;
  damage: string;
  convertedEnergyCost: number;
}

export interface TypeNValue {
  type: string;
  value: string;
}

export interface SetImageType {
  logo: string;
  symbol: string;
}

export interface SetType {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: LegalitiesType;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImageType;
}

export interface ImageType {
  small: string;
  large: string;
}

export interface LegalitiesType {
  expanded: string;
  unlimited: string;
  standard: string;
}

export interface TcgPlayerType {
  url: string;
  updatedAt: string;
  prices: string;
}

export interface CardMarketType {
  url: string;
  updatedAt: string;
  prices: CardMarketPriceType;
}

export interface CardMarketPriceType {
  averageSellPrice: number;
  lowPrice: number;
  trendPrice: number;
  germanProLow: number;
  suggestedPrice: number;
  reverseHoloSell: number;
  reverseHoloLow: number;
  reverseHoloTrend: number;
  lowPriceExPlus: number;
  avg1: number;
  avg7: number;
  avg30: number;
  reverseHoloAvg1: number;
  reverseHoloAvg7: number;
  reverseHoloAvg30: number;
}

export interface PokemonListType {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  level: string;
  hp: string;
  types: string[];
  evolvesFrom: string;
  evolvesTo: string[];
  rules: string[];
  ancientTrait: string;
  abilities: AbilityType;
  attacks: AttacksType;
  weaknesses: TypeNValue;
  resistances: TypeNValue;
  retreatCost: string[];
  convertedRetreatCost: number;
  set: SetType;
  number: string;
  artist: string;
  rarity: string;
  flavorText: string;
  nationalPokedexNumberxs: number[];
  legalities: LegalitiesType;
  regulationMark: string;
  images: ImageType;
  tcgplayer: TcgPlayerType;
  cardmarket: CardMarketType;
}

export interface CartItemType {
  cardImage: string;
  name: string;
  cardPrice: number;
  totalCard: number;
  totalPrice: number;
}
