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

  public ngOnInit(): void {
    this.defineDifficultyValues(this.difficultyChosen);
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
    this.defineDifficultyValues(this.difficultyChosen);
  }

  private defineDifficultyValues(difficultyChosen: string | null): void {
    switch (difficultyChosen) {
      case 'easy':
        this.secretNumber = this.numberRandomizer(1, 10);
        this.maxAttempts = 10;
        break;
      case 'normal':
        this.secretNumber = this.numberRandomizer(1, 50);
        this.maxAttempts = 5;
        break;
      case 'hard':
        this.secretNumber = this.numberRandomizer(1, 100);
        this.maxAttempts = 3;
        break;
      case null:
        return;
    }
  }

  private numberRandomizer(min: number, max: number): number {
    const minNumberCeiled = Math.ceil(min);
    const maxNumberCeiled = Math.floor(max);

    return Math.floor(Math.random() * (maxNumberCeiled - minNumberCeiled + 1) + minNumberCeiled);
  }
}
