import { Injectable } from '@angular/core';
import { Search } from '../classes/general';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
 msSearches : Search[] = [];
  constructor() { }
}
