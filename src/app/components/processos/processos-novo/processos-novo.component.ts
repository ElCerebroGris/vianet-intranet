import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GeneralConstants } from 'src/app/constants/GeneralConstants';
import { Process } from 'src/app/models/process';
import { QRCode } from 'src/app/models/qr_code';
import { AuthService } from 'src/app/services/auth.service';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-processos-novo',
  templateUrl: './processos-novo.component.html',
  styleUrls: ['./processos-novo.component.css'],
})
export class ProcessosNovoComponent implements OnInit {
  baseUrl = 'https://api-intranet.laboro.click'

  loading = false;
  addForm!: FormGroup;
  errorForm = false;

  areas = GeneralConstants.AREAS.toArray();
  tipoOrigem = [
    { code: 1, info: 'INTERNO' },
    { code: 2, info: 'EXTERNO' },
  ];
  origemProcesso: number = 0;

  qrCode: QRCode = new QRCode();
  process: Process = new Process();

  constructor(
    private service: GeneralService,
    private auth: AuthService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      name: ['', Validators.required],
      areaId: [''],
      sourceAreaId: [''],
      targetAreaId: ['', Validators.required],
      source: ['', Validators.required],
      entityName: [''],
      entityNIF: [''],
    });
  }

  async salvar() {
    if (!this.addForm.valid) {
      this.errorForm = true;
      return;
    }
    this.errorForm = false;
    this.loading = true;

    this.process.name = this.addForm.value.name;
    this.process.createdBy = this.auth.getUserName()!;
    this.process.areaId = this.addForm.value.targetAreaId;
    this.process.sourceAreaId = this.addForm.value.sourceAreaId || 0;
    this.process.targetAreaId = this.addForm.value.targetAreaId;
    this.process.source = this.addForm.value.source;
    this.process.entityName = this.addForm.value.entityName || '';
    this.process.entityNIF = this.addForm.value.entityNIF || '';
    this.process.qrCodeUuid = this.qrCode.uuid;

    this.loading = true;

    await this.service.postter('processes', this.process).subscribe(
      (res) => {
        this.process.uuid = res.uuid
        this.uploadFile();
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }

  gerarQRCode() {
    this.loading = true;
    this.qrCode.code = '' + Date.parse(new Date().toISOString());
    this.service.postter('qr-codes?code=' + this.qrCode.code, null).subscribe(
      (res) => {
        this.qrCode = res;
        this.loading = false;
      },
      (error) => {
        this.errorForm = true;
        this.loading = false;
      }
    );
  }

  file!: File;

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('description', this.file.name);
    formData.append('areaId', this.process.areaId + '');
    formData.append('processUuid', this.process.uuid);
    formData.append('file', this.file);

    this.loading = true;

    this.service.postter('files', formData).subscribe(
      (res) => {
        this.loading = false;
        this.router.navigate(['/processos']);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  print() {
    const printWindow = window.open('', '_blank');
    printWindow!.document.write(`
      <html>
        <head>
          <title>QR Code</title>
          <style>
            @page {
              size: A6;
              margin: 0;
            }
            body {
              width: 100%;
              height: 100%;
              margin: 0;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            img {
              max-width: 100%;
              max-height: 100%;
            }
          </style>
        </head>
        <body>
          <img src="${this.qrCode.imageURL}" style="max-width: 100%;" />
          <script type="text/javascript">
            window.onload = function() {
              window.print();
              window.onafterprint = function() {
                window.close();
              };
            };
          </script>
        </body>
      </html>
    `);
    printWindow!.document.close();
  }
}
