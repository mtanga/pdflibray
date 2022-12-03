import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '../shared/services/auth.service';
import { FunctionsService } from '../shared/services/functions.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  phone_number : any;
  password : any;
  email : any;
  loginEmail : boolean = true;
  showo: boolean = false;
  sub: any;
  public loading = false;


  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private functions : FunctionsService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.sub = this.route
    .queryParams
    .subscribe( (params: { [x: string]: string; })  => {
      this.email = params['id'];
      this.password = params['pass'];
    })
/*     if(this.email!=null || this.password !=null){
      let params = {
        id : this.email,
        pass : this.password,
      }
      this.router.navigate(['/home'], { queryParams: params });
    } */
  }

  passwordo() {
    this.showo = !this.showo;
}


  login(){
   // console.log(data);
    if(this.email=="" || this.email==null){
        this.functions.showError("Identifiant", "Votre identifiant est correct incorrect");
    }
    else if(this.password=="" || this.password==null){
      this.functions.showError("Identifiant", "Votre identifiant est correct incorrect");
    }
    else{
      let data = {
        username : this.email,
        password : this.password,
        type : ""
      }
      console.log("mes donnéss:", data);
      this.loading = true;
      this.authService.getOne(data).snapshotChanges().pipe(
        map((changes: any) =>
          changes.map((c: any) =>
            ({ id: c.payload.doc.id, ...c.payload.doc.data() })
          )
        )
      ).subscribe((datas: any) => {
        console.log("ici", datas);
        this.loading = false;
        if(datas.length==0){
            //console.log("echouee");
           // this.loading = false;
            this.functions.showError("Identifiant", "Votre identifiant ou mot de passe est correct incorrect");
        }
        else{
          //console.log("reussie");
          localStorage.setItem('user', JSON.stringify(datas[0]));
          if(datas[0].type == "admin"){
            //console.log("admin");
           // this.loading = false;
            this.functions.showSuccess("Connexion réussie", "Hello "+datas[0].username);
            this.router.navigate(['/admin']);
          }
          else{
            //console.log("users");
           // this.loading = false;
            this.functions.showSuccess("Connexion réussie", "Hello "+datas[0].username);
            this.router.navigate(['/home']);
          }
        }
      });
    }
  }

}
