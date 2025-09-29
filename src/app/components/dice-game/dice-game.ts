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
  public actualAttempt: number = 1;
  public maxAttempts: number = 10;
  public gameIsOver: boolean = false;
  public playerWon: boolean = false;
  public tipIsLowerThan: number = 100;
  public tipIsHigherThan: number = 1;
  private minNumber: number = 1;
  private maxNumber: number = 100;

  public ngOnInit(): void {
    this.defineMaxAttempts(this.difficultyChosen);
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  public guess(): void {
    if (this.actualAttempt == this.maxAttempts) {
      this.gameIsOver = true;
      return;
    }

    if (this.numberInput < this.secretNumber) {
      this.actualAttempt++;
      this.tipIsHigherThan = this.numberInput;
    } else if (this.numberInput > this.secretNumber) {
      this.actualAttempt++;
      this.tipIsLowerThan = this.numberInput;
    } else this.playerWon = true;
  }

  public restart(): void {
    this.numberInput = 1;
    this.tipIsHigherThan = 1;
    this.tipIsLowerThan = 100;
    this.actualAttempt = 1;
    this.gameIsOver = false;
    this.playerWon = false;
    this.secretNumber = this.numberRandomizer(this.minNumber, this.maxNumber);
  }

  private numberRandomizer(min: number, max: number): number {
    const minNumberCeiled = Math.ceil(min);
    const maxNumberCeiled = Math.floor(max);

    return Math.floor(Math.random() * (maxNumberCeiled - minNumberCeiled + 1) + minNumberCeiled);
  }

  private defineMaxAttempts(difficultyChosen: string | null): void {
    if (difficultyChosen === null) return;

    if (difficultyChosen == 'easy') this.maxAttempts = 10;
    else if (difficultyChosen == 'normal') this.maxAttempts = 5;
    else if (difficultyChosen == 'hard') this.maxAttempts = 3;
  }
}
