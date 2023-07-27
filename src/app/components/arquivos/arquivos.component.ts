import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Ficheiro } from 'src/app/models/ficheiro';
import { Process } from 'src/app/models/process';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-arquivos',
  templateUrl: './arquivos.component.html',
  styleUrls: ['./arquivos.component.css'],
})
export class ArquivosComponent implements OnInit {
  loading = true;
  idProcesso: string;
  processo: Process = new Process();
  ficheiros: Ficheiro[] = [];
  baseUrl = 'https://api-intranet.laboro.click';
  imageURL = '';

  constructor(private route: ActivatedRoute, private service: GeneralService) {
    this.idProcesso = route.snapshot.params['idProcesso'];
  }

  ngOnInit(): void {
    this.carregar();
  }

  carregar() {
    this.service.getter('processes/' + this.idProcesso).subscribe(
      (res) => {
        this.processo = res;
        if (this.processo.qrCodeUuid != null) {
          this.service.getter('qr-codes/' + this.processo.qrCodeUuid).subscribe(
            (res) => {
              this.imageURL = res.imageURL;
            },
            (error) => {}
          );
        }

        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('files/process/' + this.idProcesso).subscribe(
      (res) => {
        this.ficheiros = res.content;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadFile(file);
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('description', file.name);
    formData.append('areaId', this.processo.areaId + '');
    formData.append('processUuid', this.processo.uuid);
    formData.append('file', file);

    this.loading = true;

    this.service.postter('files', formData).subscribe(
      (res) => {
        this.carregar();
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  getArea(id: number) {
    return GeneralConstants.AREAS.getInfo(id);
  }
}
