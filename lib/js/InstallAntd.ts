import type { App } from 'vue'
import {
  message,
  notification,
  Button,
  Select,
  Divider,
  Space,
  Input,
  Form,
  Upload,
  Tooltip,
  Image,
  ConfigProvider,
  StyleProvider,
  Spin,
  Card,
  Menu,
  Dropdown,
  Popconfirm,
  Tag,
  Table,
  FloatButton,
  Anchor,
  Modal,
  Checkbox,
  Result,
  Pagination,
  DatePicker,
  InputNumber,
  Radio,
  Popover,
  Drawer,
  Empty,
  Switch,
  Row,
  Col,
  Slider,
  Steps,
  Tabs,
  QRCode,
  Segmented,
  Skeleton,
  Collapse
} from 'ant-design-vue'

const components = [
  Button,
  Select,
  Divider,
  Space,
  Input,
  Form,
  Upload,
  Tooltip,
  Image,
  ConfigProvider,
  StyleProvider,
  Spin,
  Card,
  Menu,
  Dropdown,
  Popconfirm,
  Tag,
  Table,
  FloatButton,
  Anchor,
  Modal,
  Checkbox,
  Result,
  Pagination,
  DatePicker,
  InputNumber,
  Radio,
  Popover,
  Drawer,
  Empty,
  Switch,
  Row,
  Col,
  Slider,
  Steps,
  Tabs,
  QRCode,
  Segmented,
  Skeleton,
  Collapse
]

export default {
  install: (app: App) => {
    components.forEach((component) => {
      if (component.install) {
        app.use(component)
      }
    })

    app.config.globalProperties.$message = message
    app.config.globalProperties.$notification = notification
  },
}
