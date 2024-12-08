export enum PagesTypes {
  MAIN = "main",
  USERS = "users",
  WORKERS = "workers",
  PRODUCTS = "products",
  DEPARTMENTS = "departments",
  BONUS = "bonus",
  PRODUCTION = "production"
}

export const pagesTitles = {
  [PagesTypes.MAIN]: "الصفحة الرئيسية",
  [PagesTypes.USERS]: "المشرفين",
  [PagesTypes.WORKERS]: "العمال",
  [PagesTypes.PRODUCTS]: "المنتجات",
  [PagesTypes.DEPARTMENTS]: "الأقسام",
  [PagesTypes.BONUS]: "الحوافز",
  [PagesTypes.PRODUCTION]: "الإنتاج"
}