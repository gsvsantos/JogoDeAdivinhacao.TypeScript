import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dice-game',
  imports: [FormsModule, RouterLink],
  templateUrl: './dice-game.html',
  styleUrl: './dice-game.scss',
})
export class DiceGame implements OnInit {
  public difficultyChosen: string | null = localStorage.getItem('difficultyChosen');

  public numberInput: number = 1;
  public secretNumber: number = 0;
  public maxAttemps: number = 10;
  public gameIsOver: boolean = false;
  public tipIsLowerThan: number = 100;
  public tipIsHigherThan: number = 1;
  private minNumber: number = 1;
  private maxNumber: number = 100;

  public ngOnInit(): void {
    this.defineMaxAttemps(this.difficultyChosen);
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  public guess(): void {
    if (this.numberInput < this.secretNumber) this.tipIsHigherThan = this.numberInput;
    else if (this.numberInput > this.secretNumber) this.tipIsLowerThan = this.numberInput;
    else this.gameIsOver = true;
  }

  public restart(): void {
    this.numberInput = 1;
    this.tipIsHigherThan = 1;
    this.tipIsLowerThan = 100;
    this.gameIsOver = false;
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  private numberRandomizer(min: number, max: number): number {
    const minNumberCeiled = Math.ceil(min);
    const maxNumberCeiled = Math.floor(max);

    return Math.floor(Math.random() * (maxNumberCeiled - minNumberCeiled + 1) + minNumberCeiled);
  }

  private defineMaxAttemps(difficultyChosen: string | null): void {
    if (difficultyChosen === null) return;

    if (difficultyChosen == 'easy') this.maxAttemps = 10;
    else if (difficultyChosen == 'normal') this.maxAttemps = 5;
    else if (difficultyChosen == 'hard') this.maxAttemps = 3;
  }
}
