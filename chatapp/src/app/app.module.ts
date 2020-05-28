import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { AuthModule } from './modules/auth.module';
import { StreamsRoutingModule } from './modules/streams-routing.module';
import { StreamsModule } from './modules/streams.module';
import { TokenInterceptor } from './services/token-interceptor';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AuthModule,
		AuthRoutingModule,
		StreamsModule,
		StreamsRoutingModule
	],
	providers: [
		CookieService,
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
