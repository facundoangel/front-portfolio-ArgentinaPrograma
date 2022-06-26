import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css'],
})
export class SkillComponent implements OnInit {
  switchForm: Boolean;
  constructor(private Auth: AuthService) {}

  public get isOnLine(): boolean {
    return this.Auth.logIn;
  }

  ngOnInit(): void {}

  public showModal() {
    this.switchForm = true;
  }

  public closeModal() {
    this.switchForm = false;
  }
}
