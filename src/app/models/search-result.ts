import { Story } from './story';

export interface SearchResult {
  hits: Story[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  query: string;
}
