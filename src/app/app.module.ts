import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatStepperModule } from "@angular/material/stepper";
import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from "@angular/router";
import { ServiceWorkerModule } from "@angular/service-worker";

import { environment } from "../environments/environment";
import { AppComponent } from "./app.component";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/login/login.component";
import { NavItemComponent } from "./shell/nav-item/nav-item.component";
import { NavSubheadingComponent } from "./shell/nav-subheading/nav-subheading.component";
import { ShellComponent } from "./shell/shell.component";

const routes: Routes = [
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "",
        component: ShellComponent,
        loadChildren: () => import("./shell/shell.module").then(mod => mod.ShellModule),
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard]
    }
];

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ShellComponent,
        NavItemComponent,
        NavSubheadingComponent
    ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(routes),
        BrowserAnimationsModule,
        HttpClientModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        ServiceWorkerModule.register("ngsw-worker.js", { enabled: environment.production }),
        ReactiveFormsModule,
        MatStepperModule,
        MatProgressSpinnerModule,
        MatSnackBarModule
    ],
    providers: [],
    exports: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
