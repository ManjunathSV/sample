import { NgModule, ErrorHandler }      from '@angular/core';

import { AppComponent }  from './app.component';


const appRoutes:any = [
  {  }
]


@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ 
    AppComponent, HomeComponent
  ]
  .concat(adminDeclarations)
  .concat(loginDeclarations)
  .concat(staffDeclarations)
  .concat(dashboardDeclarations)
  .concat(partialDeclarations)
  ,
  providers: [
    AUTH_PROVIDERS,
    {
      provide: ErrorHandler,
      useClass : RavenErrorHandler
    }
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
