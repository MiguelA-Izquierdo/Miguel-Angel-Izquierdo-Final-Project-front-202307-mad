import { NgOptimizedImage } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { StoreService } from "./services/store/store.service";
import { TripsModule } from "./trips/trips.module";
import { UsersModule } from "./users/users.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    CoreModule,
    UsersModule,
    TripsModule,
    NgOptimizedImage,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
  ],
  providers: [StoreService],
  bootstrap: [AppComponent],
})
export class AppModule {}
