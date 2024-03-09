import { Component, Input } from '@angular/core';
import { IUser } from '../../interfaces/iuser.interface';
import { BotoneraUserCardComponent } from '../botonera-user-card/botonera-user-card.component';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [BotoneraUserCardComponent],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user?: IUser

}
