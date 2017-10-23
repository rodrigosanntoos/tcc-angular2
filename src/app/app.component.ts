import { Component, OnInit } from '@angular/core';
import { Repository } from "./models/repository";
import { RepositoryService } from "./services/repository.service";
import { Subject } from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  cache = {
    repositories: [],
    selectedRepository: [],
  };

  repositories: Repository[] = [];
  search: Subject <string> = new Subject < string > ();
  selectedRepository: Repository = new Repository();
  loadingFollowers: boolean = false;

  constructor(private repositoryService: RepositoryService) {
    this.search.debounceTime(200).distinctUntilChanged().subscribe((searchTerm) => {
      this.repositoryService.search(searchTerm).subscribe(res => {
        this.repositories = res.items as Repository[];
      });
    })
  }

  ngOnInit() {
    this.repositoryService.getRepositories().subscribe(res => {
      this.cache.repositories = res; 
      this.repositories = res;
    }, error => {
    });
  }

  onSearch(q: string) {
    if (q !== "") {
      this.search.next(q);
    } else {
      this.repositories = this.cache.repositories;
    }
  }

  go(s: string) {
    if (s == 'home') {
      this.selectedRepository = new Repository();
      this.repositories = this.cache.repositories;
    }
  }

  viewRepository(repository: Repository) {
    this.repositoryService.getRepository(repository.full_name).subscribe(res => {
      this.selectedRepository = res; 
    }, error => {
      this.selectedRepository = repository;
    });
  }

  cacheSelectRepository(repository: Repository) {
    if (!this.findRepositoryInCache(repository)) {
      this.cache.selectedRepository.push(repository);
    }

  }
  
  findRepositoryInCache(repository: Repository): Repository {
    for (var i = 0; i < this.cache.selectedRepository.length; i++) {
      if (this.cache.selectedRepository[i].full_name == repository.full_name) {
        return this.cache.selectedRepository[i];
      }
    }
    return null;
  }
}