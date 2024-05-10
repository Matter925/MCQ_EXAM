import { CanActivateFn, Router } from '@angular/router';

import { inject } from '@angular/core';


export const authTwoGuard: CanActivateFn = (route, state) => {
 const router=inject(Router);
 // Retrieve the stringified object from localStorage
const storedModelString = localStorage.getItem('User');

// Parse the string back to an object
const storedModel = storedModelString ? JSON.parse(storedModelString) : router.navigate(['/home']);
  return storedModel.role=='doctors'? true : router.navigate(['/home']);
};


