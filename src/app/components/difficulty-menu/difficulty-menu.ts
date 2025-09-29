import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-difficulty-menu',
  imports: [FormsModule, RouterLink],
  templateUrl: './difficulty-menu.html',
  styleUrl: './difficulty-menu.scss',
})
export class DifficultyMenu implements OnInit {
  public difficultyChosen: string = '';
  private teste: string | null = localStorage.getItem('difficultyChosen');

  public ngOnInit(): void {
    if (this.teste !== null && this.teste.trim().length > 0) {
      this.difficultyChosen = this.teste;
    } else {
      this.difficultyChosen = 'hard';
    }
  }

  public confirm(): void {
    localStorage.setItem('difficultyChosen', this.difficultyChosen);
  }
}
