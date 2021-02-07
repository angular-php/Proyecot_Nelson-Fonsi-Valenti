import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Ranking } from 'src/app/models/ranking.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  nickname: string;
  usuario: Usuario;
  rankingArray: Ranking[] = [];

  perfilForm: FormGroup;


  validation_messages = {
    fname: [
      { type: 'required', message: 'El campo nombre es obligatorio' },
      { type: 'minlength', message: 'El campo nombre debe contener como mínimo 3 carácteres' },
    ],
    lname: [
      { type: 'required', message: 'El campo apellidos es obligatorio' },
      { type: 'minlength', message: 'El campo apellidos debe contener como mínimo 3 carácteres' },
    ],
    email: [
      { type: 'required', message: 'El campo e-mail es obligatorio' },
      { type: 'minlength', message: 'El campo e-mail debe contener como mínimo 5 carácteres' },
      { type: 'email', message: 'El campo e-mail no tiene buen formato' },
    ],
    password: [
      { type: 'required', message: 'El campo contraseña es obligatorio' },
      { type: 'minlength', message: 'El campo contraseña debe contener como mínimo 6 carácteres' },
    ],
  };


  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {

    this.perfilForm = this.formBuilder.group({

      fname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      lname: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.minLength(5), Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  ngOnInit(): void {
    this.selectUser(1);
    this.rankingArray.push(new Ranking('BONUS_DAW', 16));
    this.rankingArray.push(new Ranking('BONUS_DAM', 21));

    //this.usuario = new Usuario('QuimMP','Quim','Martinez Pique', 'qmartinez@useit.es', '123456', true, this.rankingArray, null, "ILERNA");
  }

  selectUser(id) {
    this.usuarioService.getUsuario(id).subscribe((resp => {
      this.usuario = new Usuario(resp[0].nick, resp[0].firstname, resp[0].lastname, resp[0].email, resp[0].password, this.rankingArray);
      console.log(this.usuario);
      this.nickname = resp[0].nick;
      this.perfilForm.setValue({
        fname: this.usuario.firstname,
        lname: this.usuario.lastname,
        email: this.usuario.email,
        password: this.usuario.password
      });


    }), (e => {
      console.log(e);
    }));
  }

}
