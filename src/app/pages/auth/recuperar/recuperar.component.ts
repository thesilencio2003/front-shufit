import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { createTimer, utils } from 'animejs';



@Component({
  selector: 'app-recuperar',
  imports: [RouterModule],
  templateUrl: './recuperar.component.html',
  styleUrl: './recuperar.component.css'
})
export default class RecuperarComponent implements OnInit {

  //colors
  //#1A5319
  //#212423
  //#FFFFFF
  //#72AD9D
  //#F0F3BD

  currentTime: number = 30;
  isDisabled: boolean = true;

  ngOnInit(): void {
    this.iniciarTemporizador();
  }

  iniciarTemporizador(): void {
    this.isDisabled = true;

    createTimer({
      duration: 30000,
      onUpdate: self => {
        this.currentTime = 30 - Math.floor(self.currentTime);
      },
      onComplete: () => {
        this.isDisabled = false;
        this.currentTime = 0;
      }
    });

  }

  reenviarCodigo(): void {
    this.currentTime = 30;
    this.iniciarTemporizador();
  }

}
