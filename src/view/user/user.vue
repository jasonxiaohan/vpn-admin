<style lang="less">
@import "../tables/components/common.less";
@import "../tables/components/table.less";
</style>

<template>
  <div>
    <p slot="title">
      <Icon type="mouse"></Icon>点击搜索进行搜索
    </p>
    <Row>
      <Input v-model="searchConName3" placeholder="请输入姓名搜搜..." style="width: 200px" />
      <span @click="handleSearch3" style="margin: 0 10px;">
        <Button type="primary" icon="search">搜索</Button>
      </span>
      <Button @click="handleCancel3">取消</Button>
    </Row>
    <Table :columns="columns1" :data="data3"></Table>
    <Page
      :total="dataCount"
      :page-size="pageSize"
      @on-change="changepage"
      @on-page-size-change="_nowPageSize"
      show-total
      show-sizer
      show-elevator
    />
  </div>
</template>

<script>
import { mapActions } from "vuex";
import * as table from "./data/search";
export default {
  name: "user",
  data() {
    return {
      data3: [],
      searchConName3: "",
      columns1: [
        {
          key: "email",
          title: "Email"
        },
        {
          key: "planName",
          title: "Plan name"
        },
        {
            key: "validity",
            title: "Validity"
        },
        {
            key: "traffic",
            title: "Traffic"
        },
        {
            key: "device",
            title: "Device"
        },
        {
            key: "serviceDetail",
            title: "Service Detail"
        },
        {
            key: "invitedNumber",
            title: "Invited number"
        },
        {
            key: "referralDetail",
            title: "Referral detail"
        }
      ],
      initTable3: [],
      // 分页
      pageSize: 10, //每页显示多少条
      dataCount: 0, //总条数
      pageCurrent: 1 //当前页F
    };
  },
  components: {},
  methods: {
    ...mapActions([]),
    init() {
      this.data3 = this.initTable3 = table.searchTable3;
    },
    search(data, argumentObj) {
      let res = data;
      let dataClone = data;
      for (let argu in argumentObj) {
        if (argumentObj[argu].length > 0) {
          res = dataClone.filter(d => {
            return d[argu].indexOf(argumentObj[argu]) > -1;
          });
          dataClone = res;
        }
      }
      return res;
    },
    handleSearch3() {
      this.data3 = this.initTable3;
      this.data3 = this.search(this.data3, { name: this.searchConName3 });
    },
    handleCancel3() {
      this.data3 = this.initTable3;
    },
    changepage() {},
    _nowPageSize() {}
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>
