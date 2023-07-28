import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Ficheiro } from 'src/app/models/ficheiro';
import { Process, ProcessHistory } from 'src/app/models/process';
import { AuthService } from 'src/app/services/auth.service';
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
  historico: ProcessHistory[] = [];
  baseUrl = 'https://api-intranet.laboro.click';
  imageURL = '';
  obs = '';

  constructor(
    private route: ActivatedRoute,
    private service: GeneralService,
    private auth: AuthService
  ) {
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
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('files/process/' + this.idProcesso).subscribe(
      (res) => {
        this.ficheiros = res.content;
      },
      (error) => {
        this.loading = false;
      }
    );

    this.service.getter('processes/' + this.idProcesso + '/history').subscribe(
      (res) => {
        this.historico = res.content;
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  file!: File;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  actualizar() {
    console.log(this.file);
    if (this.obs != '') this.updateProcess();
    if (this.file != null) this.uploadFile();
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('description', this.file.name);
    formData.append('areaId', this.processo.areaId + '');
    formData.append('processUuid', this.processo.uuid);
    formData.append('file', this.file);

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

  updateProcess() {
    this.loading = true;

    this.processo.obs = this.obs;
    this.processo.createdBy = this.auth.getUserName()!;

    this.service
      .putter('processes/' + this.processo.uuid, this.processo)
      .subscribe(
        (res) => {
          this.obs = '';
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

  getFilename(id: string) {
    const file = this.ficheiros.filter((f) => f.uuid == id).pop();
    return file != null ? file.name : '';
  }
}
