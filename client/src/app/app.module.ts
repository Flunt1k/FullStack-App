import { BrowserModule } from "@angular/platform-browser"
import { NgModule } from "@angular/core"
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http"
import { AppRoutingModule } from "./app-routing.module"

import { AppComponent } from "./app.component"
import { LoginPageComponent } from "./login-page/login-page.component"
import { AuthLayoutComponent } from "./shared/layouts/auth-layout/auth-layout.component"
import { SiteLayoutComponent } from "./shared/layouts/site-layout/site-layout.component"
import { RegisterPageComponent } from "./register-page/register-page.component"
import { TokenInterceptor } from "./shared/classes/token.interceptor"
import { OverviewPageComponent } from "./overview-page/overview-page.component"
import { AnalyticsPageComponent } from "./analytics-page/analytics-page.component"
import { HistoryPageComponent } from "./history-page/history-page.component"
import { OrderPageComponent } from "./order-page/order-page.component"
import { CategoriesPageComponent } from "./categories-page/categories-page.component"
import { LoaderComponent } from "./shared/components/loader/loader.component"
import { CategoriesFormatPageComponent } from "./categories-page/categories-format-page/categories-format-page.component"
import { CategoriesPositionsFormComponent } from "./categories-page/categories-format-page/categories-positions-form/categories-positions-form.component"
import { OrderCategoriesComponent } from "./order-page/order-categories/order-categories.component"
import { OrderPositionsComponent } from "./order-page/order-positions/order-positions.component"

@NgModule({
	declarations: [
		AppComponent,
		LoginPageComponent,
		AuthLayoutComponent,
		SiteLayoutComponent,
		RegisterPageComponent,
		OverviewPageComponent,
		AnalyticsPageComponent,
		HistoryPageComponent,
		OrderPageComponent,
		CategoriesPageComponent,
		LoaderComponent,
		CategoriesFormatPageComponent,
		CategoriesPositionsFormComponent,
		OrderCategoriesComponent,
		OrderPositionsComponent,
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, multi: true, useClass: TokenInterceptor },
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
