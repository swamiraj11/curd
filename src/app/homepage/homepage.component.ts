import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../shared/api.service';
import { HomepageModel } from './homepage.model';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  // formValue will br assigned to <form> in html
  formValue !: FormGroup;
  homepageModelObj: HomepageModel = new HomepageModel();
  userData !: any;
  showUpdate !: boolean;
  showAdd !: boolean;

  // Inject ApiService.ts here in constructor
  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      avatar: [''],
      name: [''],
      email: [''],
      age: [''],
      country: [''],
    })
    // Call the getUserDetails() method here
    this.getUserDetails();
  }

  // To show the data and button in update and remove button and data in Add user button
  clickAddUser(){
    this.formValue.reset();
    this.showUpdate = false;
    this.showAdd = true;
  }

  // Post the User Deatils in Add User and call the method on click for save in Add User modal
  postUserDetails(){
    this.homepageModelObj.avatar = this.formValue.value.avatar;
    this.homepageModelObj.name = this.formValue.value.name;
    this.homepageModelObj.email = this.formValue.value.email;
    this.homepageModelObj.age = this.formValue.value.age;
    this.homepageModelObj.country = this.formValue.value.country;

    // Api Call - private api: ApiService
    this.api.postUsers(this.homepageModelObj).subscribe(res=>{
      console.log(res);
      // toastr
      this.toastr.success("User Added Successfully");
      // alert('User Added Successfully');
      
      // To cancel the form user details
      let ref = document.getElementById('cancelUser');
      ref?.click();
      // After clicking on save/cancel, the form should get reset
      this.formValue.reset();
      // Call the getUserDetails() here to display the data in th card on the output or UI
      this.getUserDetails();
    },
      err=>{
        // toastr
        this.toastr.warning("Something Went Wrong");
      // alert('Something Went Wrong');
    })
  }

  // Get the User details
  getUserDetails() {
    this.api.getUsers()
    .subscribe(res=>{
      this.userData = res;
    })
  }

  // Delete the User Details
  deleteUserDetails(body: any) {
    this.api.deleteUsers(body.id).subscribe(res=>{
      // toastr
      this.toastr.error("User deleted Successfully");
      // alert("User Deleted");
      // Refresh the data automtically
      this.getUserDetails();
    })
  }

  // Edit / Update the User Details
  editUserDetails(body: any){
    this.showUpdate = true;
    this.showAdd = false;

    this.homepageModelObj.id = body.id;

    this.formValue.controls['avatar'].setValue(body.avatar);
    this.formValue.controls['name'].setValue(body.name);
    this.formValue.controls['email'].setValue(body.email);
    this.formValue.controls['age'].setValue(body.age);
    this.formValue.controls['country'].setValue(body.country);
  }

  // Update the User Detials
  updateUserDetails(){
    this.homepageModelObj.avatar = this.formValue.value.avatar;
    this.homepageModelObj.name = this.formValue.value.name;
    this.homepageModelObj.email = this.formValue.value.email;
    this.homepageModelObj.age = this.formValue.value.age;
    this.homepageModelObj.country = this.formValue.value.country;

    // Api Call for update
    this.api.updateUsers(this.homepageModelObj, this.homepageModelObj.id)
    .subscribe(res=>{
      // toastr
      this.toastr.success("Updated Successfully");
      // alert("Updated Successfully");
      
      let ref = document.getElementById('cancelUser');
      ref?.click();
      // After clicking on save/cancel, the form should get reset
      this.formValue.reset();
      // Call the getUserDetails() here to display the data in th card on the output or UI
      this.getUserDetails();
    })
  }
 
}
