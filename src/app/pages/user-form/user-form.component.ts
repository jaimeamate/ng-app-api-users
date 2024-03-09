import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../interfaces/iuser.interface';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  usersForm: FormGroup;
  usersServices: UsersService = inject(UsersService)
  router: Router = inject(Router)
  activatedRoute: ActivatedRoute = inject(ActivatedRoute)

  button1_value: string = 'Actualizar'
  button2_value: string = 'Cancelar'
  button2_type: string = 'button'

  userForm!: IUser;

  constructor() {
    this.usersForm = new FormGroup({
      first_name: new FormControl('',[
        Validators.required
      ]),
      last_name: new FormControl('',[
        Validators.required
      ]),
      email: new FormControl('',[
        Validators.required
      ]),
      username: new FormControl('',[
        Validators.required
      ]),
      image: new FormControl('',[
        Validators.required
      ])
    }, [])
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(async (params: any) => {
      if(params._id){ 
        await this.usersServices.getById(params._id).subscribe((result: IUser) => {
          this.userForm = result;

          this.usersForm = new FormGroup({
            _id: new FormControl(this.userForm?._id),
            id: new FormControl(this.userForm?.id),
            first_name: new FormControl(this.userForm?.first_name,[
              Validators.required
            ]),
            last_name: new FormControl(this.userForm?.last_name,[
              Validators.required
            ]),
            email: new FormControl(this.userForm?.email,[
              Validators.required
            ]),
            username: new FormControl(this.userForm?.username,[
              Validators.required
            ]),
            image: new FormControl(this.userForm?.image,[
              Validators.required
            ])
          }, [])
        })
      } else {
        this.button1_value = 'Crear'
        this.button2_value = 'Borrar'
        this.button2_type = 'reset'
      }
    });
  }

  async getDataForm() {
    if(this.usersForm.value._id){
      // UPDATE
      await this.usersServices.update(this.usersForm.value).subscribe((result: IUser) => {
        if(result._id){
          alert(`El usuario ${result.username} se ha actualizado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Algo falló')
        }
      })
    } else {
      // INSERT
      await this.usersServices.insert(this.usersForm.value).subscribe((result: IUser) => {
        if(result._id){
          alert(`El usuario ${result.username} se ha creado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Algo falló')
        }
      });
    }


  }
}
