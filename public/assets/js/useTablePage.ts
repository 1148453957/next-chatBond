import { computed, reactive, ref } from 'vue'

import { type PaginationProps } from 'ant-design-vue'

type TbalePageParams = {
  tableChangeCB?: () => void
}

const defaultPageSize = 30

const useTablePage = ({ tableChangeCB }: TbalePageParams = {}) => {
  const pageSize = defaultPageSize

  const pagination = reactive({
    total: 0,
    current: 1,
    pageSize,
    pageSizeOptions: ['10', '20', '30', '50', '100', '150', '200'],
    showSizeChanger: true,
    showTotal: (t: number) => `共${t}条`,
  })

  const tableChange = (page = 1, pageSize = defaultPageSize) => {
    pagination.current = page || 1
    pagination.pageSize = pageSize || defaultPageSize

    tableChangeCB?.()
  }

  const setTotal = (total = 0) => {
    pagination.total = total
  }

  // 一般点击搜索按钮触发
  const setToFirstPage = () => {
    pagination.current = 1
  }

  return {
    pagination,
    tableChange,
    setTotal,
    setToFirstPage,
  }
}

export default useTablePage
