import { Component, OnInit } from '@angular/core';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Person } from 'src/app/models/person';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-pessoas',
  templateUrl: './pessoas.component.html',
  styleUrls: ['./pessoas.component.css']
})
export class PessoasComponent implements OnInit {

  persons: Person[] = [];

  constructor(private service: GeneralService) { }

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('persons').subscribe(
      (res) => {
        this.persons = res.content;
      },
      (error) => {}
    );
  }

  getArea(id: number) {
    return GeneralConstants.AREAS.getInfo(id);
}

}
