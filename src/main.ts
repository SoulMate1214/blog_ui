import Vue from "vue"
import Component from "vue-class-component"
// @ts-ignore
import App from "./App.vue"
import router from "./router"
import store from "./store/index"
import service from "./utils/https"
import urls from "./utils/urls"
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import {
  Image,
  Calendar,
  Pagination,
  Dialog,
  Autocomplete,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Table,
  TableColumn,
  DatePicker,
  TimeSelect,
  TimePicker,
  Popover,
  Tooltip,
  Breadcrumb,
  BreadcrumbItem,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Tag,
  Tree,
  Alert,
  Slider,
  Icon,
  Row,
  Col,
  Upload,
  Progress,
  Badge,
  Card,
  Rate,
  Steps,
  Step,
  Carousel,
  CarouselItem,
  Collapse,
  CollapseItem,
  Cascader,
  ColorPicker,
  Transfer,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Loading,
  MessageBox,
  Message,
  Notification,
  Timeline,
  TimelineItem
} from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import CollapseTransition from "element-ui/lib/transitions/collapse-transition"

// 按需引用 element 组件
Vue.component(Image.name, Image)
Vue.component(Calendar.name, Calendar)
Vue.component(Dialog.name, Dialog)
Vue.component(Form.name, Form)
Vue.component(FormItem.name, FormItem)
Vue.component(Input.name, Input)
Vue.component(Button.name, Button)
Vue.component(Message.name, Message)
Vue.component(Menu.name, Menu)
Vue.component(MenuItem.name, MenuItem)
Vue.component(Row.name, Row)
Vue.component(Col.name, Col)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(CollapseTransition.name, CollapseTransition)
Vue.component(Timeline.name, Timeline)
Vue.component(TimelineItem.name, TimelineItem)
Vue.component(Card.name, Card)
Vue.component(Tag.name, Tag)
Vue.component(Pagination.name, Pagination)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Submenu.name, Submenu)
Vue.component(MenuItemGroup.name, MenuItemGroup)
Vue.component(InputNumber.name, InputNumber)
Vue.component(Radio.name, Radio)
Vue.component(RadioGroup.name, RadioGroup)
Vue.component(RadioButton.name, RadioButton)
Vue.component(Checkbox.name, Checkbox)
Vue.component(CheckboxButton.name, CheckboxButton)
Vue.component(CheckboxGroup.name, CheckboxGroup)
Vue.component(Switch.name, Switch)
Vue.component(Select.name, Select)
Vue.component(Option.name, Option)
Vue.component(OptionGroup.name, OptionGroup)
Vue.component(ButtonGroup.name, ButtonGroup)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(DatePicker.name, DatePicker)
Vue.component(TimeSelect.name, TimeSelect)
Vue.component(TimePicker.name, TimePicker)
Vue.component(Popover.name, Popover)
Vue.component(Tooltip.name, Tooltip)
Vue.component(Breadcrumb.name, Breadcrumb)
Vue.component(BreadcrumbItem.name, BreadcrumbItem)
Vue.component(Tabs.name, Tabs)
Vue.component(Tree.name, Tree)
Vue.component(TabPane.name, TabPane)
Vue.component(Alert.name, Alert)
Vue.component(Slider.name, Slider)
Vue.component(DropdownItem.name, DropdownItem)
Vue.component(Icon.name, Icon)
Vue.component(Upload.name, Upload)
Vue.component(Progress.name, Progress)
Vue.component(Badge.name, Badge)
Vue.component(Rate.name, Rate)
Vue.component(Steps.name, Steps)
Vue.component(Step.name, Step)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Collapse.name, Collapse)
Vue.component(CollapseItem.name, CollapseItem)
Vue.component(Cascader.name, Cascader)
Vue.component(ColorPicker.name, ColorPicker)
Vue.component(Transfer.name, Transfer)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Footer.name, Footer)
Vue.component(Aside.name, Aside)
Vue.component(MessageBox.name, MessageBox)
Vue.component(Notification.name, Notification)

Vue.use(Loading.directive)
Vue.use(mavonEditor)
Vue.config.productionTip = false
Vue.prototype.$urls = urls // 其他页面在使用URLS的时候直接  this.$urls就可以了
Vue.prototype.$https = service // 其他页面在使用axios的时候直接  this.$http就可以了
Vue.prototype.$message = Message // 其他页面在使用message的时候直接this.$message就可以了
Vue.prototype.$loading = Loading.service // 其他页面在使用Loading的时候直接  this.$loading就可以了

// 不起作用
Component.registerHooks([
  "beforeRouteEnter",
  "beforeRouteLeave",
  "beforeRouteUpdate"
])

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app")
