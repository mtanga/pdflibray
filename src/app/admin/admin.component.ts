import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { FirebseService } from '../shared/services/firebse.service';
import { FunctionsService } from '../shared/services/functions.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  prenom : any;
  password : any;
  identifiant: any;
  link: any;
  apikey: string | undefined;
  books : any;
  livre : any;
  users : any = {};
  user : any;

  bookUploaded : any = {};

  afuConfig = {
    uploadAPI: {
      url:"https://www.filestackapi.com/api/file/Aeb5zkQS3RUWYRr9ZwJ6Dz"
    }
};


  constructor(
    private router: Router,
    private functions : FunctionsService,
    private bookService : FirebseService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('user')==null || localStorage.getItem('user')==undefined){
      this.router.navigate(['/login']);
    }
    else{
      let d = localStorage.getItem('user') || "";
      this.user = JSON.parse(d);
      if(this.user.type=="admin"){
        console.log("user", this.user);
        this.getBooks();
      }
      else{
        this.router.navigate(['/login']);
      }
    }

   
  }

  getBooks(){
    this.bookService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.books = data;
      console.log("books", this.books);
      this.getlinks();
    });
  }

  logout(){
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }


  getlinks(){
    this.authService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ id: c.payload.doc.id, ...c.payload.doc.data() })
        )
      )
    ).subscribe(data => {
      this.users = data[data.length-1];
      console.log("users", this.users);
    });
  }

  onUploadSuccess(res: object) {
    console.log('###uploadSuccess', res);
    this.bookUploaded = res;
    console.log('###uploadSuccess', this.bookUploaded.filesUploaded[0]);
    this.bookService.create(this.bookUploaded.filesUploaded[0]).then(() => {
      //console.log('Created new item successfully!');
      this.functions.showSuccess("Nouveau livre", "Livre ajouté avec succès");
    });

  }

  onUploadError(err: any) {
    console.log('###uploadError', err);
  }

  docUpload(event : any){
      console.log("event", event);
  }

  fileSelected(event: any){
    console.log("event", event);
  }

  open(){
   // const client = filestack.init(YOUR_API_KEY);
  //  const client = require('filestack-js').init('Aeb5zkQS3RUWYRr9ZwJ6Dz');
   // client.picker().open();         
  }

  generate(){
    if(this.prenom=="" || this.prenom==null){
      this.functions.showError("Prénom", "Le présnom incorrect.");
    }
    else if(this.livre=="" || this.livre==null){
      this.functions.showError("Livre", "Veuillez sélectionner un livre");
    }
    else{
      let ps = this.passwordGen();
      let data = {
        date : new Date(),
        book : this.books.find((service:any) => service.id == this.livre),
        password : ps,
        type : "user",
        username : this.prenom,
        link :"https://pdf.beyourself.cm/login?id="+this.prenom+"&pass="+ps
      }
      this.authService.create(data).then(() => {
        this.functions.showSuccess("Nouveau lien", "Lien généré avec succès");
        this.link = data.link;
        this.getlinks();
      });

    }
  }


  passwordGen(){
    var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 6;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber +1);
    }
    return password;

  }

}
