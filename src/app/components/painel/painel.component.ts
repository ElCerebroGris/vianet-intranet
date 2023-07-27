import { Component, OnInit } from '@angular/core';
import { News } from 'src/app/models/news';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent implements OnInit {

  news: News[] = [];

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('news').subscribe(
      (res) => {
        this.news = res.content;
        this.news = this.news.slice(0, 3);
      },
      (error) => {}
    );
  }

}
