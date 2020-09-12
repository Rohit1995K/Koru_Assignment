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

    public closeResult = '';
    public userData: any = [];
    public dataTable: any;
    public item: any;
    public myForm: FormGroup;
    public data: any = [];
    public dataId: any = [];
    public datatable = $('#dataTable').DataTable();

    constructor(
        private modalService: NgbModal,
        private commonService: CommonService,
    ) { }

    ngOnInit() {
        this.userList();
    }

    /* Function for Open Modal */

    public open(content) {

        setTimeout(function () {
            $(function () {
                let table = $('#dataTable').DataTable().order(['id','desc']);
            })
        }, 100);

        this.modalService.open(content, { size: 'xl' }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });

        this.myForm = new FormGroup({
            'name': new FormControl("", [Validators.required]),
            'description': new FormControl("", [Validators.required]),
            'webReference': new FormControl("", [Validators.required]),
        }, { updateOn: 'change' });
    }

    /* Function for Close Modal */

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    /* Function for User Data Listing */

    public userList(data = []) {

        this.commonService.getUserList().subscribe(resp => {
            this.userData = resp.data;
            if (data.length > 0) {
                this.userData.push(data);
            }
        })
    }

    /* Function for Adding new data */

    public onSubmit() {
        let formData: FormData = new FormData();
        formData.append('name', this.myForm.get('name').value);
        formData.append('description', this.myForm.get('description').value);
        formData.append('webReference', this.myForm.get('webReference').value);
        
        this.userData.push(
            {
                id: this.getLastId(),
                name: this.myForm.get('name').value,
                description: this.myForm.get('description').value,
                webReference: this.myForm.get('webReference').value
            }
        );
        this.myForm.reset();
    }

    /* Function for Checked row */

    checkValue(event) {
        this.dataId.push(event);
    }

    /* Function for Delete row */

    public deleteRow(index) {

        for (var i = 0; i < index.length; i++) {
            var indx = this.userData.findIndex(obj => obj.id == index[i]);
            if (indx !== -1) {
                this.userData.splice(indx, 1);
                this.userData.sort();
            }
        }
        this.dataId = [];
    }

    /* Function for fetching last Record Id */

    public getLastId(){
        if(this.userData.length == 0){
            return 0;
        }
        let data = this.userData[this.userData.length-1];
        return data.id + 1;
    }

}
