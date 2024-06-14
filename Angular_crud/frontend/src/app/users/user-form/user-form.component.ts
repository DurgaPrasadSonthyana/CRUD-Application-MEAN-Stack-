import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';  // Import from '@angular/router'
import User from '../../types/user';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule,MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})


export class UserFormComponent {


  
  formBuilder=inject(FormBuilder);
  userform:FormGroup=this.formBuilder.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    age:['',[Validators.required]],
    address:['',[Validators.required]],
    password:['',[Validators.required, Validators.minLength(8)]],
  });
  
  userService=inject(UserService)
  router=inject(Router);
  route=inject(ActivatedRoute);
  editUserId!:string
  ngOnInit(){
      this.editUserId=this.route.snapshot.params['id'];
      if(this.editUserId){
        this.userService.getUser(this.editUserId).subscribe(result=>{
          this.userform.patchValue(result);
        });
      }
  }

  addUser(){
    if(this.userform.invalid){
      alert('Please Provide Valid Data');
      return;
    }
    const model:User= this.userform.value;
    this.userService.addUser(model).subscribe(result=>{
       alert("User added Successfully");
       this.router.navigateByUrl('/');
    });
  }

  updateUser(){
    if (this.userform.invalid){
      alert("Pleasse Provide Valid Data")
      return;
    }
    const model: User=this.userform.value;
    this.userService.updateUser(this.editUserId,model).subscribe((result)=>{
      alert('User update successfully');
      this.router.navigateByUrl('/');
    });
  }
}
