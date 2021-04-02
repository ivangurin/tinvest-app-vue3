import { createApp } from "vue";
import App from "@/App.vue";
import router from "@/router";

import "primevue/resources/themes/saga-blue/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";

import PrimeVue from "primevue/config";
import Sidebar from "primevue/sidebar";
import Panel from "primevue/panel";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import PanelMenu from "primevue/panelmenu";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import ProgressSpinner from "primevue/progressspinner";

const app = createApp(App);

app.use(router);
app.use(PrimeVue);
app.use(ToastService);

app.component("Panel", Panel);
app.component("Sidebar", Sidebar);
app.component("InputText", InputText);
app.component("Button", Button);
app.component("Toast", Toast);
app.component("PanelMenu", PanelMenu);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component(
  "ColumnGroup",
  ColumnGroup
);
app.component("Row", Row);
app.component(
  "ProgressSpinner",
  ProgressSpinner
);

app.mount("#app");
