import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { News } from 'src/app/models/news';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-noticiais',
  templateUrl: './noticiais.component.html',
  styleUrls: ['./noticiais.component.css'],
})
export class NoticiaisComponent implements OnInit {
  news: News[] = [];

  constructor(private service: GeneralService) {}

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('news').subscribe(
      (res) => {
        this.news = res.content;
      },
      (error) => {}
    );
  }

  getArea(id: number) {
    return GeneralConstants.AREAS.getInfo(id);
  }

}
