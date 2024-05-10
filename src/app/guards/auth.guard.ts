import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router=inject(Router);
 // Retrieve the stringified object from localStorage
const storedModelString = localStorage.getItem('User');

// Parse the string back to an object
const storedModel = storedModelString ? JSON.parse(storedModelString) : router.navigate(['/home']);
  return storedModel.role=='doctors' || storedModel.role=='students' ? true : router.navigate(['/home']);
};
