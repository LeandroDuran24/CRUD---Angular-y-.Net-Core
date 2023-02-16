import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { ToastrService } from 'ngx-toastr/toastr/toastr.service';
import { ToastrService } from 'ngx-toastr';
import { TarjetaService } from 'src/app/services/tarjeta.service';
@Component({
  selector: 'app-tarjeta-credito',
  templateUrl: './tarjeta-credito.component.html',
  styleUrls: ['./tarjeta-credito.component.css']
})
export class TarjetaCreditoComponent implements OnInit {

  /* listaTarjetas: any[] = [{
     titular: "Leandro Duran",
     numeroTarjeta: "4824950000078750",
     fechaExpiracion: "11/25",
     cvv: "123"
   },
   {
     titular: "Jhayco Duran",
     numeroTarjeta: "4824950000078340",
     fechaExpiracion: "11/23",
     cvv: "987"
   }];*/

  listaTarjetas: any[] = [];
  accion = 'Agregar';
  form: FormGroup;
  id: number | undefined;




  constructor(private fb: FormBuilder, private toastr: ToastrService, private _tarjetaService: TarjetaService) {
    this.form = this.fb.group({
      titular: ["", Validators.required],
      numeroTarjeta: ["", [Validators.required, Validators.maxLength(16), Validators.minLength(16)]],
      fechaExpiracion: ["", [Validators.required, Validators.maxLength(5), Validators.minLength(5)]],
      cvv: ["", [Validators.required, Validators.maxLength(3), Validators.minLength(3)]]
    })

  }
  ngOnInit(): void {

    this.obtenerTarjetas();
  }


  obtenerTarjetas() {
    this._tarjetaService.getListTarjetas().subscribe(data => {

      console.log(data);
      this.listaTarjetas = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarTarjeta(id: number) {
    this._tarjetaService.deletetarjeta(id).subscribe(data => {
      this.toastr.error('La Tarjeta ha sido Eliminada...', 'Tarjeta Eliminada');
      this.obtenerTarjetas();//volver a cargar la lista
    }, error => {
      console.log(error);
    })
  }

  guardarTarjeta() {
    const tarjeta: any = {

      titular: this.form.get('titular')?.value,
      numeroTarjeta: this.form.get('numeroTarjeta')?.value,
      fechaExpiracion: this.form.get('fechaExpiracion')?.value,
      cvv: this.form.get('cvv')?.value,
    }
    //AGREGAMOS LA TARJETA
    if (this.id == undefined) {
      this._tarjetaService.guardarTarjeta(tarjeta).subscribe(data => {
        this.form.reset();
        this.toastr.success('La Tarjeta ha sido Agregada...', 'Tarjeta Registrada');
        this.obtenerTarjetas();

      }, error => {
        console.log(error);
      })
    }
    else {//EDITAMOS LA TARJETA

      tarjeta.id = this.id;

      this.accion = 'Agregar';
      this._tarjetaService.updatetarjeta(this.id, tarjeta).subscribe(data => {
        this.form.reset();
        this.toastr.success('La tarjeta fue modificada', 'Tarjeta Modificada');
        this.obtenerTarjetas();
      }, error => {
        console.log(error);
      })
    }


  }


  editarTarjeta(tarjeta: any) {

    this.accion = 'Editar';
    this.id = tarjeta.id;

    this.form.patchValue({
      titular: tarjeta.titular,
      numeroTarjeta: tarjeta.numeroTarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    })
  }





  /* agregarTarjeta() {
     console.log('Hola');
     const tarjeta: any = {
 
       titular: this.form.get('titular')?.value,
       numeroTarjeta: this.form.get('numeroTarjeta')?.value,
       fechaExpiracion: this.form.get('fechaExpiracion')?.value,
       cvv: this.form.get('cvv')?.value,
     }
 
     this.listaTarjetas.push(tarjeta);
     this.form.reset();
     this.toastr.success('La Tarjeta ha sido Agregada...', 'Tarjeta Registrada');
   }*/

  /*eliminarTarjeta(index: number) {
    console.log(index);
    this.listaTarjetas.splice(index, 1);
    this.toastr.error('La Tarjeta ha sido Eliminada...', 'Tarjeta Eliminada');
  }*/
}
