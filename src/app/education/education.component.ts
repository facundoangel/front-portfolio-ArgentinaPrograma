import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ResourceAjaxService } from '../services/resources-ajax.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../interfaces/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  switchFormEdit: Boolean;
  switchFormCreate: Boolean;
  switchFormDelete: Boolean;
  educations: education[];
  form: FormGroup;
  constructor(
    private Auth: AuthService,
    private formBuilder: FormBuilder,
    private ajax: ResourceAjaxService
  ) {
    this.form = this.formBuilder.group({
      nombre: ['', []],
      institucion: ['', []],
      titulo: ['', []],
      fechaInicio: ['', []],
      fechaFin: ['', []],
      presente: ['', []],
    });
    this.getEducations();
  }

  public getEducations(): void {
    this.ajax.getEducations().subscribe((data) => {
      this.educations = data;
    });
  }

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }
  ngOnInit(): void {}

  public showModal(typeModal: string) {
    switch (typeModal) {
      case 'create':
        this.switchFormCreate = true;
        break;
      case 'edit':
        this.switchFormEdit = true;
        break;
      case 'delete':
        this.switchFormDelete = true;
        break;
    }
  }

  public closeModal() {
    this.switchFormCreate = false;
    this.switchFormEdit = false;
    this.switchFormDelete = false;
  }

  public handleSubmit($event: any) {
    let fecha = $event.target[3].value;

    //convertir la fecha a formato dd/mm/yyyy
    let fechaInicio =
      fecha.substring(8, 10) +
      '/' +
      fecha.substring(6, 7) +
      '/' +
      fecha.substring(0, 4);

    alert(
      `
      nombre: ${$event.target[0].value}
      fecha de inicio: ${fechaInicio}
      Presente: ${$event.target[5].checked}
      `
    );
    $event.target.reset();
    this.closeModal();
  }
}
