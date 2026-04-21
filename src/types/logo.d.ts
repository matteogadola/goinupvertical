export interface LogoGroup {
  _key: string;
  _type: string;
  name: string;
  slug: { _type: string, current: string };
  logos: LogoItem[];
}

export interface LogoItem {
  _key: string;
  _type: string;
  name: string;
  url: string;
  imageUrl: string;
  cssClass: string;
}
