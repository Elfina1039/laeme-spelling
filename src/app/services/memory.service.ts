import { Injectable } from '@angular/core';
import { Search, MapSearch } from '../classes/general';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 msSearches : Search[] = [];
 mapSearches : MapSearch[] = [];
  constructor() { }
}
