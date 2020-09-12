import { Component, OnInit } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonService } from './../common.service';
declare var $;

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  closeResult = '';
  public userData :any = [];
  public dataTable : any;
  item: any;
  public myForm: FormGroup;
  data:any = [];


  constructor(
    private modalService: NgbModal,
    private commonService: CommonService,
    ) { }

  ngOnInit() {
    this.userList();  
  }

  open(content) {

    setTimeout(function(){
      $(function(){
        $('#dataTable').DataTable();
      })
    },100);  

    this.modalService.open(content, { size: 'xl' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

    this.myForm = new FormGroup({
      'name' : new FormControl("",[Validators.required]),
      'description' : new FormControl("",[Validators.required]),
      'webReference' : new FormControl("",[Validators.required]),
    },{ updateOn:'change' });    
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  public userList(data = []){

    // if(data.length > 0)
    // {
    //   this.userData = data;
    // } else {
      this.commonService.getUserList().subscribe(resp => {

        if(data.length > 0){
          this.userData = data;
        } else {
          this.userData = resp.data;
        }
        console.log(this.userData);
      })
    //}

  }

  public onSubmit() {
    let formData: FormData = new FormData();
    formData.append('name', this.myForm.get('name').value);
    formData.append('description', this.myForm.get('description').value);
    formData.append('webReference', this.myForm.get('webReference').value);
    
    this.userData.push(
      {
        id: 16,
        name: this.myForm.get('name').value,
        description: this.myForm.get('description').value,
        webReference: this.myForm.get('webReference').value
      }
    );
    this.userList(this.userData);
    console.log(this.userData);
}  

}
