import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  switchFormEdit: Boolean;
  switchFormCreate: Boolean;
  switchFormDelete: Boolean;
  form: FormGroup;

  constructor(private Auth: AuthService, private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      nombre: ['', []],
      imagen: ['', []],
      conocimiento: ['', []],
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
    let nombre = $event.target[0].value;
    let imagen = $event.target[1].value;
    let conocimiento = $event.target[2].value;

    alert(`
    Nombre tecnologia: ${nombre}
    Url de imagen: ${imagen}
    Nivel de conocimiento: ${conocimiento}
    `);
    $event.target.reset();
    this.closeModal();
  }
}
