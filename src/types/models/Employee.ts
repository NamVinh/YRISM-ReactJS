export type Id = string | number;

export type CdnUrl = string;

export interface Image {
  id: Id;
  cdnUrl: CdnUrl;
  cdnUrls: CdnUrl[];
  displayOrder: number;
}

export interface ToolLanguage {
  id: Id;
  toolLanguageResourceId: Id;
  displayOrder: Id;
  from: number;
  to: number;
  description: string;
  images: Image[];
}

export interface Position {
  id: Id;
  positionResourceId: Id;
  displayOrder: Id;
  toolLanguages: ToolLanguage[];
  name: string;
}

export interface Employee {
  id: Id;
  name: string;
  positions: Position[];
}
