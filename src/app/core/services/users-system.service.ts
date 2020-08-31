import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { UserModel} from '../model/users-system.model';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { environment} from '../../../environments/environment';
import {Role} from '../auth';
import {ServicesModel} from '../model/services.model';
import {ServicesCategories} from '../model/servicesCategories.model';
import {ServicesType} from '../model/servicesType.model';
import {ClientsModel} from '../model/clients.model';
import {StatesModel} from '../model/states.model';
import {CitiesModel} from '../model/cities.model';
import {ProvidersModel} from '../model/providers.model';
import {EmployeesModel} from '../model/employees.model';
import {RecurrencesModel} from '../model/recurrences.model';
import {CepsModel} from '../model/ceps.model';
import {OccupationsModel} from '../model/occupations.model';
import {ProposalsModel} from '../model/proposals.model';
import {ContractsModel} from '../model/contracts.model';
import {PermissionsModel} from '../model/permissions.model';
import {ProductsModel} from '../model/products.model';
import {ChargingsModel} from '../model/chargings.model';
const API_CURRENT_VERSION = 'v1';
const API_AUTH = environment.auth.domain;
const API_USERS_URL = environment.api + '/' + API_CURRENT_VERSION + '/users';
const API_EMPLOYEES_URL = environment.api + '/' + API_CURRENT_VERSION + '/employees';
const API_SERVICES_URL = environment.api + '/' + API_CURRENT_VERSION + '/services';
const API_TYPE_SERVICES_URL = environment.api + '/' + API_CURRENT_VERSION + '/service_types';
const API_RECURRENCE_URL = environment.api + '/' + API_CURRENT_VERSION + '/recurrences';
const API_CLIENTS_URL = environment.api + '/' + API_CURRENT_VERSION + '/clients';
const API_PROVIDERS_URL = environment.api + '/' + API_CURRENT_VERSION + '/providers';
const API_PROPOSALS_URL = environment.api + '/' + API_CURRENT_VERSION + '/proposals';
const API_CATEGORIES_URL = environment.api + '/' + API_CURRENT_VERSION + '/service_categories';
const API_CONTRACTS_URL = environment.api + '/' + API_CURRENT_VERSION + '/contracts';
const API_PRODUCTS_URL = environment.api + '/' + API_CURRENT_VERSION + '/products';
const API_CHARGINGS_URL = environment.api + '/' + API_CURRENT_VERSION + '/chargings';
const API_URL = environment.api + '/' + API_CURRENT_VERSION;
const API_PERMISSION_URL = environment.api + '/' + API_CURRENT_VERSION +  '/permissions';
const API_ROLES_URL = environment.api + '/' + API_CURRENT_VERSION + '/roles';


@Injectable({
  providedIn: 'root'
})
export class UsersSystemService {
  constructor(
    private http: HttpClient
  ) { }
  // SELECTS BOXES
  getStates(): Observable<StatesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<StatesModel>(API_URL + `/states`, {headers: httpHeaders});
  }
  getOccupations(): Observable<OccupationsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<OccupationsModel>(API_URL + `/occupations`, {headers: httpHeaders});
  }
  getCepDetails(cep): Observable<CepsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<CepsModel>(API_URL + `/ceps` + `/${cep}`, {headers: httpHeaders});
  }
  getCities(): Observable<CitiesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<CitiesModel>(API_URL + `/cities`, {headers: httpHeaders});
  }
  getPermissions(userId): Observable<PermissionsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<PermissionsModel>(API_URL + `/users/` + userId + `/permissions`, {headers: httpHeaders});
  }

  getPaymentCategory(arg): Observable<any>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(API_URL + `/payment-categories/` + arg, {headers: httpHeaders});
  }

  getNegociationTypes(): Observable<any>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(API_URL + `/negociation-types/`, {headers: httpHeaders});
  }

  getProductCategory(): Observable<any>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(API_URL + `/product-categories/`, {headers: httpHeaders});
  }

  getProductMargins(): Observable<any>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<any>(API_URL + `/product-margins/`, {headers: httpHeaders});
  }

  getCityById(id: number): Observable<CitiesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<CitiesModel>(API_URL + `/cities/byState` + `/${id}`,{headers: httpHeaders});
  }
  getRecurrences(): Observable<RecurrencesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<RecurrencesModel>(API_URL + `/recurrences`, {headers: httpHeaders});
  }

  getUserById(userId: number): Observable<UserModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<UserModel>(API_USERS_URL + `/${userId}`,{headers: httpHeaders});
  }
  getUsers(): Observable<UserModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<UserModel>(API_USERS_URL, {headers: httpHeaders});
  }
  createUser(user: UserModel): Observable<UserModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<UserModel>(API_USERS_URL, user, {headers: httpHeaders});
  }
  deleteUser(user: number): Observable<UserModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_USERS_URL}/${user}`;
    return this.http.delete<UserModel>(url, {headers: httpHeaders});
  }
  updateUser(user: UserModel): Observable<UserModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<UserModel>(API_USERS_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  // serviços
  getServices(): Observable<ServicesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesModel>(API_SERVICES_URL, {headers: httpHeaders});
  }
  createService(service: ServicesModel): Observable<ServicesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ServicesModel>(API_SERVICES_URL, service, {headers: httpHeaders});
  }
  getServiceById(serviceId: number): Observable<ServicesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesModel>(API_SERVICES_URL + `/${serviceId}`,{headers: httpHeaders});
  }
  getAllServiceType(): Observable<ServicesType>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesType>(API_URL + `/service_types`, {headers: httpHeaders});
  }
  updateServices(user: ServicesModel): Observable<ServicesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ServicesModel>(API_SERVICES_URL + `/${user.id}`, user, {headers: httpHeaders});
  }
  deleteService(id: number): Observable<ServicesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_SERVICES_URL}/${id}`;
    return this.http.delete<ServicesModel>(url, {headers: httpHeaders});
  }

  // clientes
  getClients(): Observable<ClientsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ClientsModel>(API_CLIENTS_URL, {headers: httpHeaders});
  }
  searchClient(args: any): Observable<ClientsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ClientsModel>(API_CLIENTS_URL, {
      params: new HttpParams()
          .set('filter', args.filter.words)
          .set('sortOrder', args.sortOrder)
          .set('pageNumber', args.pageNumber.toString())
          .set('pageSize', args.pageSize.toString()),
      headers: httpHeaders});
  }
  createClient(client: ClientsModel): Observable<ClientsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ClientsModel>(API_CLIENTS_URL, client, {headers: httpHeaders});
  }
  getClientById(id: number): Observable<ClientsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ClientsModel>(API_CLIENTS_URL + `/${id}`,{headers: httpHeaders});
  }
  deleteClient(id: number): Observable<ClientsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_CLIENTS_URL}/${id}`;
    return this.http.delete<ClientsModel>(url, {headers: httpHeaders});
  }
  updateClient(data: ClientsModel): Observable<ClientsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ClientsModel>(API_CLIENTS_URL + `/${data.id}`, data, {headers: httpHeaders});
  }

  // fornecedores
  getProviders(): Observable<ProvidersModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProvidersModel>(API_PROVIDERS_URL, {headers: httpHeaders});
  }
  createProvider(provider: ProvidersModel): Observable<ProvidersModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ProvidersModel>(API_PROVIDERS_URL, provider, {headers: httpHeaders});
  }
  getProviderById(id: number): Observable<ProvidersModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProvidersModel>(API_PROVIDERS_URL + `/${id}`,{headers: httpHeaders});
  }
  updateProvider(user: ProvidersModel): Observable<ProvidersModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ProvidersModel>(API_PROVIDERS_URL + `/${user.id}`, user, {headers: httpHeaders});
  }
  deleteProvider(id: number): Observable<ProvidersModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_PROVIDERS_URL}/${id}`;
    return this.http.delete<ProvidersModel>(url, {headers: httpHeaders});
  }

  // funcionarios
  getEmployeesById(userId: number): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<EmployeesModel>(API_EMPLOYEES_URL + `/${userId}`,{headers: httpHeaders});
  }
  getEmployees(): Observable<EmployeesModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<EmployeesModel>(API_EMPLOYEES_URL, {headers: httpHeaders});
  }
  createEmployees(user: EmployeesModel): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<EmployeesModel>(API_EMPLOYEES_URL, user, {headers: httpHeaders});
  }
  deleteEmployees(user: number): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_EMPLOYEES_URL}/${user}`;
    return this.http.delete<EmployeesModel>(url, {headers: httpHeaders});
  }
  getEmployeeById(id: number): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<EmployeesModel>(API_EMPLOYEES_URL + `/${id}`,{headers: httpHeaders});
  }
  updateEmployee(user: EmployeesModel): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<EmployeesModel>(API_EMPLOYEES_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  searchEmployees(words: string, sort: string, order: string, page: number): Observable<EmployeesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_USERS_URL}`;
    const requestUrl =
      `${url}?q=${words}&sort=${sort}&order=${order}&page=${page + 1}`;
    return this.http.get<EmployeesModel>(API_EMPLOYEES_URL, {headers: httpHeaders});
  }

  // CATEGORIAS
  getAllCategories(): Observable<ServicesCategories>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesCategories>(API_URL + `/service_categories`, {headers: httpHeaders});
  }
  getCategories(): Observable<ServicesCategories>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesCategories>(API_CATEGORIES_URL, {headers: httpHeaders});
  }
  createCategories(user: ServicesCategories): Observable<ServicesCategories> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ServicesCategories>(API_CATEGORIES_URL, user, {headers: httpHeaders});
  }
  deleteCategory(user: number): Observable<ServicesCategories> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_CATEGORIES_URL}/${user}`;
    return this.http.delete<ServicesCategories>(url, {headers: httpHeaders});
  }
  getCategoryById(id: number): Observable<ServicesCategories> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesCategories>(API_CATEGORIES_URL + `/${id}`,{headers: httpHeaders});
  }
  updateCategory(user: ServicesCategories): Observable<ServicesCategories> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ServicesCategories>(API_CATEGORIES_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  // TIPOS DE SERVIÇOS
  getTypesServices(): Observable<ServicesType>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesType>(API_TYPE_SERVICES_URL, {headers: httpHeaders});
  }
  createTypesServices(user: ServicesType): Observable<ServicesType> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ServicesType>(API_TYPE_SERVICES_URL, user, {headers: httpHeaders});
  }
  deleteTypesServices(user: number): Observable<ServicesType> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_TYPE_SERVICES_URL}/${user}`;
    return this.http.delete<ServicesType>(url, {headers: httpHeaders});
  }
  getTypesServicesById(id: number): Observable<ServicesType> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ServicesType>(API_TYPE_SERVICES_URL + `/${id}`,{headers: httpHeaders});
  }
  updateTypesServices(user: ServicesType): Observable<ServicesType> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ServicesType>(API_TYPE_SERVICES_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  // RECORRENCIAS
  createRecurrence(user: RecurrencesModel): Observable<RecurrencesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<RecurrencesModel>(API_RECURRENCE_URL, user, {headers: httpHeaders});
  }
  deleteRecurrence(user: number): Observable<RecurrencesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_RECURRENCE_URL}/${user}`;
    return this.http.delete<RecurrencesModel>(url, {headers: httpHeaders});
  }
  getRecurrencesById(id: number): Observable<RecurrencesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<RecurrencesModel>(API_RECURRENCE_URL + `/${id}`,{headers: httpHeaders});
  }
  updateRecurrence(user: ServicesType): Observable<RecurrencesModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<RecurrencesModel>(API_RECURRENCE_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  // TIPOS DE SERVIÇOS
  getProposals(): Observable<ProposalsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProposalsModel>(API_PROPOSALS_URL, {headers: httpHeaders});
  }
  createProposals(user: ProposalsModel): Observable<ProposalsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ProposalsModel>(API_PROPOSALS_URL, user, {headers: httpHeaders});
  }
  deleteProposals(user: number): Observable<ProposalsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_PROPOSALS_URL}/${user}`;
    return this.http.delete<ProposalsModel>(url, {headers: httpHeaders});
  }
  getProposalsById(id: number): Observable<ProposalsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProposalsModel>(API_PROPOSALS_URL + `/${id}`,{headers: httpHeaders});
  }
  updateProposals(user: ProposalsModel): Observable<ProposalsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ProposalsModel>(API_PROPOSALS_URL + `/${user.id}`, user, {headers: httpHeaders});
  }
  searchProposals(args: any): Observable<ProposalsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProposalsModel>(API_PROPOSALS_URL, {
      params: new HttpParams()
          .set('filter', args.filter.words)
          .set('sortOrder', args.sortOrder)
          .set('pageNumber', args.pageNumber.toString())
          .set('pageSize', args.pageSize.toString()),
      headers: httpHeaders});
  }

  // TIPOS DE SERVIÇOS
  getProducts(): Observable<ProductsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProductsModel>(API_PRODUCTS_URL, {headers: httpHeaders});
  }
  createProduct(user: ProductsModel): Observable<ProductsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ProductsModel>(API_PRODUCTS_URL, user, {headers: httpHeaders});
  }
  deleteProduct(user: number): Observable<ProductsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_PRODUCTS_URL}/${user}`;
    return this.http.delete<ProductsModel>(url, {headers: httpHeaders});
  }
  getProductById(id: number): Observable<ProductsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProductsModel>(API_PRODUCTS_URL + `/${id}`,{headers: httpHeaders});
  }
  updateProduct(user: ProductsModel): Observable<ProductsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ProductsModel>(API_PRODUCTS_URL + `/${user.id}`, user, {headers: httpHeaders});
  }
  searchProduct(args: any): Observable<ProductsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ProductsModel>(API_PRODUCTS_URL, {
      params: new HttpParams()
          .set('filter', args.filter.words)
          .set('sortOrder', args.sortOrder)
          .set('pageNumber', args.pageNumber.toString())
          .set('pageSize', args.pageSize.toString()),
      headers: httpHeaders});
  }


  // TIPOS DE SERVIÇOS
  getContracts(): Observable<ContractsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ContractsModel>(API_CONTRACTS_URL, {headers: httpHeaders});
  }
  createContract(user: ContractsModel): Observable<ContractsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ContractsModel>(API_CONTRACTS_URL, user, {headers: httpHeaders});
  }
  deleteContract(user: number): Observable<ContractsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    const url = `${API_CONTRACTS_URL}/${user}`;
    return this.http.delete<ContractsModel>(url, {headers: httpHeaders});
  }
  getContractById(id: number): Observable<ContractsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ContractsModel>(API_CONTRACTS_URL + `/${id}`,{headers: httpHeaders});
  }
  updateContract(user: ContractsModel): Observable<ContractsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.put<ContractsModel>(API_CONTRACTS_URL + `/${user.id}`, user, {headers: httpHeaders});
  }

  // COBRANÇAS
  GetChargings(): Observable<ChargingsModel>{
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.get<ChargingsModel>(API_CHARGINGS_URL, {headers: httpHeaders});
  }
  createChargings(user: ChargingsModel): Observable<ChargingsModel> {
    const userToken = localStorage.getItem(environment.authTokenKey);
    let httpHeaders = new HttpHeaders();
    httpHeaders = httpHeaders.set('Authorization', 'Bearer ' + userToken);
    return this.http.post<ChargingsModel>(API_CHARGINGS_URL, user, {headers: httpHeaders});
  }
}

