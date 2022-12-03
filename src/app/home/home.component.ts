import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PDFDocumentProxy } from 'ng2-pdf-viewer';
import { PrintService } from '../shared/services/print.service';
import WebViewer from '@pdftron/pdfjs-express'
import { ApiService } from '../shared/services/api.service';
import ConvertApi from 'convertapi-js'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  password : any;
  email : any;
  sub: any;
  pdfSrc = "assets/pyd.pdf";
  private pdf: PDFDocumentProxy
  src = "assets/pyd.pdf";
  isPdfLoaded = false;
  page: number = 1;
  totalPages: number = 0;
  isLoaded: boolean = false;
  user : any;


  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private printService : PrintService,
    private apiService : ApiService
  ) { 

    
  }



  ngOnInit(): void {
    if(localStorage.getItem('user')==null || localStorage.getItem('user')==undefined){
      this.router.navigate(['/login']);
    }
    else{
      let d = localStorage.getItem('user') || "";
      this.user = JSON.parse(d);
      if(this.user.type=="user"){
        console.log("user", this.user);
        this.watermark(this.user.book.url);
        //this.getBooks();
      }
      else{
        this.router.navigate(['/login']);
      }
    }
  }


  async watermark(url){
    let convertApi = ConvertApi.auth('D5ipXgyyL4UGLnGB');
    let params = convertApi.createParams()
   // params.add('File', "https://cdn.filestackcontent.com/seUi1QlDQCShrnW4m0Eb");
    params.add('file', new URL(url));
    params.add('Text', 'Propriétaire : '+this.user.username);
    params.add('VerticalAlignment', 'top');
   // params.add('VerticalAlignment', 'top');
    let result = await convertApi.convert('pdf', 'watermark', params);
    console.log("icic", result);
    console.log("icic", result.files[0].Url);
    this.pdfSrc =  result.files[0].Url;
  }


  onLoaded(pdf: PDFDocumentProxy) {
    this.pdf = pdf;
    this.isPdfLoaded = true;
    this.totalPages = pdf.numPages;
    this.isLoaded = true;
  } 



  print() {
    this.pdf.getData().then((u8) => {
        let blob = new Blob([u8.buffer], {
            type: 'application/pdf'
        });

        const blobUrl = window.URL.createObjectURL((blob));
        const iframe = document.createElement('iframe');
        iframe.style.display = 'none';
        iframe.src = blobUrl;
        document.body.appendChild(iframe);
        iframe.contentWindow.print();
    }); 
  }


  check(){
    //getPrinters().then(console.log);
  }


  nextPage() {
    this.page++;
  }

  prevPage() {
    this.page--;
  }

  logout(){
    this.router.navigate(['/login']);
  }

}
