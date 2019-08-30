<style lang="less">
@import "../../../assets/styles/common.less";
@import "../../../assets/styles/table.less";
</style>

<template>
  <div>
    <h1>订阅列表</h1>
    <div>
      <Table :columns="columns1" :data="subs.data"></Table>
      <Page
        :total="subs.total"
        :page-size="pageSize"
        @on-change="changepage"
        @on-page-size-change="_nowPageSize"
        show-total
        show-sizer
        show-elevator
      />
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "subHistory",
  props: {
    subs: {
      type: Object,
      default: () => {}
    },
    customerId: {
      type: Number
    }
  },
  data() {
    return {
      data1: [],
      columns1: [
        {
          key: "account",
          title: "Account"
        },
        {
          key: "plan",
          title: "Plan name"
        },
        {
          key: "registerTime",
          title: "Register Time"
        }
      ],
      // 分页
      pageSize: 10, //每页显示多少条
      dataCount: 0, //总条数
      pageCurrent: 1 //当前页F
    };
  },
  components: {},
  methods: {
    ...mapActions(["handleInviteList"]),
    init() {
      this.handleInviteList({
        customerId: this.customerId,
        page: this.pageCurrent,
        size: this.pageSize
      }).then(res => {
        this.pageCurrent = 1;
        this.invites.data = res.data;
        this.invites.total = res.total;
      });
    },
    show(index) {
      this.user = this.data1[index];
      this.showModal = true;
    },
    showSub(index) {
      this.user = this.data1[index];
      this.showSubModal = true;
    },
    remove(index) {
      this.data1.splice(index, 1);
    },
    changepage(page) {
      this.pageCurrent = page;
      this.init();
    },
    _nowPageSize(size) {
      this.pageSize = size;
      this.init();
    },
    // 取消
    cancel() {
      // alert(this.user.email);
      // this.init();
    }
  },
  mounted() {
    // this.init();
  }
};
</script>
<style>
</style>
