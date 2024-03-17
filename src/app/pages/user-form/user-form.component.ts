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
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{1,25}$')
      ]),
      last_name: new FormControl('',[
        Validators.required,
        Validators.pattern('^[A-Z]{1}[a-z]{1,25}\ [A-Z]{1}[a-z]{1,25}$')
      ]),
      email: new FormControl('',[
        Validators.required,
        Validators.email
      ]),
      username: new FormControl('',[
        Validators.required,
        Validators.pattern('^[a-z]{3,}[\.]{1,1}[a-z]{3,}$')
      ]),
      image: new FormControl('',[
        Validators.required,
        Validators.pattern('^https://.{1,}$')
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
              Validators.required,
              Validators.pattern('^[A-Z]{1}[a-z]{1,25}$')
            ]),
            last_name: new FormControl(this.userForm?.last_name,[
              Validators.required,
              Validators.pattern('^[A-Z]{1}[a-z]{1,25}\ [A-Z]{1}[a-z]{1,25}$')
            ]),
            email: new FormControl(this.userForm?.email,[
              Validators.required,
              Validators.email
            ]),
            username: new FormControl(this.userForm?.username,[
              Validators.required,
              Validators.pattern('^[a-z]{3,}[\.]{1,1}[a-z]{3,}$')
            ]),
            image: new FormControl(this.userForm?.image,[
              Validators.required,
              Validators.pattern('^https://.{1,}$')            ])
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
        // console.log(result)
        // ESTE SI NOS DEVUELVE UN OBJETO CON _id correcto (el insert no)
        if(result._id){ //PODEMOS USARLO
          alert(`El usuario ${result.username} se ha actualizado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Algo falló')
        }
      })
    } else {
      // INSERT
      await this.usersServices.insert(this.usersForm.value).subscribe((result: IUser) => {
        // console.log(result)
        // LA RESPUESTA DE LA API DEVUELVE EL ._id en el .id, comportamiento anomalo
        // if(result._id){ // NO PUEDO USAR ESTA LOGICA YA QUE SI NO NOS AVISA DE QUE SE CREO EL USUARIO CORRECRTAMENTE NI NOS LLEVA AL HOME
        if(result.id){ // ESTE .id es el ._id, LA RESPUESTA DE LA API NO ES CORRECTA
          alert(`El usuario ${result.username} se ha creado correctamente`)
          this.router.navigate(['/home'])
        }else{
          alert('Algo falló')
        }
      });
    }


  }

  goHome() {
    if(this.button2_value === 'Cancelar'){
      this.router.navigate(['/home'])
    }
  }
}
