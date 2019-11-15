<style lang="less">
@import "../../../assets/styles/common.less";
@import "../../../assets/styles/table.less";
</style>

<template>
  <div>
    <h1>赠送列表</h1>
    <div>
      <Table :columns="columns1" :data="referrals.data"></Table>
      <Page
        :total="referrals.total"
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
  name: "referralHistory",
  props: {
    referrals: {
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
          key: "planName",
          title: "planName"
        },
        {
          key: "validity",
          title: "Validity",
          render: (h, params) => {
            var start =
              params.row.beginTime.slice(0, 3).join("/") +
              " " +
              params.row.beginTime.slice(3, 6).join(":");
            var end =
              params.row.endTime.slice(0, 3).join("/") +
              " " +
              params.row.endTime.slice(3, 6).join(":");
            return h("span", start + "-" + end);
          }
        },
        {
          key: "totalCharges",
          title: "Total amount"
        },
        {
          key: "traffic",
          title: "Traffic"
        },{
          key: "paymentMethod",
          title: "paymentMethod"
        },{
          key: "payTime",
          title: "payTime",
          render: (h,params) => {
            var payTime =
              params.row.payTime.slice(0, 3).join("/") +
              " " +
              params.row.payTime.slice(3, 6).join(":");
            return h("span", payTime);
          }
        }, {
          key: "devicesNum",
          title: "Device"
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
