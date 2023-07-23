// React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";

// React icons
import Shop from "examples/Icons/Shop";
import Office from "examples/Icons/Office";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import CreditCard from "examples/Icons/CreditCard";
import Users from "layouts/users";
import Verification from "layouts/authentication/Verification";
import Authentication from "layouts/authentication";
import Catalogs from "layouts/catalogs";
import Basket from "examples/Icons/Basket";
import CatalogPage from "layouts/CatalogPage";
import Admins from "layouts/admins";
import CatalogCreate from "layouts/catalogs/CatalogCreate";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: <Tables />,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: <Billing />,
  //   noCollapse: true,
  // },
  { type: "title", title: "User Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    route: "/admins",
    icon: <Office size="12px" />,
    component: <Admins />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Users",
    key: "users",
    route: "/users",
    icon: <Office size="12px" />,
    component: <Users />,
    noCollapse: true,
  },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: <Profile />,
  //   noCollapse: true,
  // },
  { type: "title", title: "Products Pages", key: "products-pages" },
  {
    type: "collapse",
    name: "Catalogs",
    key: "catalogs",
    route: "/catalogs",
    icon: <Shop size="12px" />,
    component: <Catalogs />,
    noCollapse: true,
  },
  {
    type: "",
    name: "catalogsUUid",
    key: "/catalogs/:uuid",
    route: "/catalogs/:uuid",
    icon: <Shop size="12px" />,
    component: <CatalogPage />,
    noCollapse: true,
  },
  {
    type: "",
    name: "catalogCreate",
    key: "/catalogCreate",
    route: "/catalogCreate",
    icon: <Shop size="12px" />,
    component: <CatalogCreate />,
    noCollapse: true,
  },
  {
    type: "",
    name: "Sign In",
    key: "sign-in",
    route: "/authentication/sign-in",
    icon: <Document size="12px" />,
    component: <Authentication />,
    noCollapse: true,
  },
  {
    type: "",
    name: "verify",
    key: "verify",
    route: "/authentication/verify",
    icon: <Document size="12px" />,
    component: <Verification />,
    noCollapse: true,
  }
];

export default routes;
