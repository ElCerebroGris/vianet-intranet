import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { News } from 'src/app/models/news';
import { GeneralService } from 'src/app/services/general.service';

@Component({
  selector: 'app-noticia-add',
  templateUrl: './noticia-add.component.html',
  styleUrls: ['./noticia-add.component.css'],
})
export class NoticiaAddComponent implements OnInit {
  loading = false;

  addForm!: FormGroup;
  file!: File;

  constructor(
    private service: GeneralService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.addForm = this._formBuilder.group({
      title: [''],
      description: [''],
      imageURL: [''],
    });
  }

  async salvar() {
    if (!this.addForm.valid) {
      return;
    }
    this.loading = true;

    const formData = new FormData();
    formData.append('description', this.addForm.value.description);
    formData.append('title', this.addForm.value.title);
    formData.append('file', this.file);

    formData.append('imageURL', this.addForm.value.imageURL);
    formData.append('visibility', 'true');
    formData.append('tags', '[true]');
    formData.append('status', 'true');
    formData.append('excerpt', 'true');

    this.loading = true;

    await this.service.postter('news', formData).subscribe(
      (res) => {
        this.router.navigate(['/noticias']);
      },
      (error) => {
        this.loading = false;
      }
    );
  }

  onFileSelected(event: any) {
    this.file = event.target.files[0];
  }
}
