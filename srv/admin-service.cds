using { sap.capire.bookshop as my } from '../db/src/schema';
service AdminService @(requires_:'admin') {
  entity Books as projection on my.Books;
  entity Authors as projection on my.Authors;
}