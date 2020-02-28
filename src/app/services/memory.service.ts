import { Injectable } from '@angular/core';
import { MsSearch, MapSearch, SetSearch } from '../classes/general';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 msSearches : MsSearch[] = [];
 mapSearches : MapSearch[] = [];
  constructor() { }
}
