import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RecipesService} from "./recipes/services/recipes.service";
import {DataStorageService} from "./shared/data-storage.service";
import {AuthService} from "./auth/auth.service";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/auth-interceptor.service";

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    RecipesService,
    DataStorageService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true
    }
  ],
})
export class CoreModule {}
