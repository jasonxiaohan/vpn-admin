<style lang="less">
@import "../../assets/styles/common.less";
@import "../../assets/styles/table.less";
</style>

<template>
  <div>
    <!-- <p slot="title">
      <Icon type="mouse"></Icon>点击搜索进行搜索
    </p>-->
    <Row>
      <Button type="primary" icon="md-add" @click="addPrice">{{$t("text_add")}}</Button>
      <Modal v-model="showAddModal" @on-ok="update()" @on-cancel="cancel()">
        <priceEdit :price="price"></priceEdit>
      </Modal>
    </Row>
    <Table :columns="columns1" :data="data1"></Table>
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
import priceEdit from "./components/priceEdit.vue";
export default {
  name: "user",
  data() {
    return {
      price: {},
      // 编辑详情
      showModal: false,
      // 订阅详情
      showSubModal: false,
      // 邀请
      showAddModal: false,
      data1: [],
      invites: {},
      searchConName3: "",
      columns1: [
        {
          key: "name",
          title: "Plan name"
        },
        {
          key: "fee",
          title: "Standard Price"
        },
        {
          key: "actualFee",
          title: "Actual Price"
        },
        // 套餐时长
        {
          key: "cycle",
          title: "Plan circle"
        },
        {
          key: "switch",
          title: "Plan switch",
          render: (h, params) => {
            if (params.row.switch1 == true) {
              return h("span", this.$i18n.t("text_state_open"));
            }
            return h("span", this.$i18n.t("text_state_close"));
          }
        },
        {
          title: this.$i18n.t("text_operate"),
          key: "action",
          width: 220,
          // fixed: 'right',
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.user = params;
                      this.show(params.index);
                    }
                  }
                },
                this.$i18n.t("btn_update")
              ),
              //弹窗层-包含按钮
              h(
                "Poptip",
                {
                  props: {
                    //这个参数很重要，影响到是否被遮挡的问题
                    transfer: true,
                    // placement: 'bottom',
                    confirm: true,
                    title: "你确定要删除吗?"
                  },
                  on: {
                    "on-ok": () => {
                      this.handleDeletePrice({
                        plan: this.data1[params.index].plan
                      }).then(res => {
                        if (res.code == 0) {
                          this.remove(params.index);
                          this.init();
                          this.$Message.success("删除成功");
                        } else {
                          this.$Message.error("删除失败");
                        }
                      });
                    }
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      },
                      on: {
                        click: () => {
                          // this.deleteUser(params.row.USER_ID)
                        }
                      }
                    },
                    this.$i18n.t("btn_delete")
                  )
                ]
              )
            ]);
          }
        }
      ],
      initTable3: [],
      // 分页
      pageSize: 10, //每页显示多少条
      dataCount: 0, //总条数
      pageCurrent: 1 //当前页F
    };
  },
  components: {
    priceEdit
  },
  methods: {
    ...mapActions([
      "handlePriceList",
      "handleUpdatePrice",
      "handleDeletePrice"
    ]),
    init() {
      this.handlePriceList({
        email: this.searchConName3,
        page: this.pageCurrent,
        size: this.pageSize
      }).then(res => {
        this.data1 = this.initTable3 = res.data;
        this.dataCount = res.total;
      });
    },
    initInvite(email) {
      this.email = email;
      this.handleInviteList({
        email: email,
        page: 1,
        size: this.pageSize
      }).then(res => {
        this.invites = res;
      });
    },
    search(data, argumentObj) {
      // let res = data;
      // let dataClone = data;
      // for (let argu in argumentObj) {
      //   if (argumentObj[argu].length > 0) {
      //     res = dataClone.filter(d => {
      //       return d[argu].indexOf(argumentObj[argu]) > -1;
      //     });
      //     dataClone = res;
      //   }
      // }
      this.handleUsersCard({
        email: this.searchConName3,
        page: this.pageCurrent,
        size: this.pageSize
      }).then(res => {
        this.data1 = this.initTable3 = res.data;
        this.dataCount = res.total;
        this.$Message.success("搜索成功");
      });
    },
    handleSearch3() {
      this.data1 = this.initTable3;
      this.search(this.data1, { name: this.searchConName3 });
    },
    handleCancel3() {
      this.searchConName3 = "";
      this.init();
    },
    show(index) {
      this.price = this.data1[index];
      this.showAddModal = true;
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
      this.initInvite();
    },
    // 确定
    update() {
      var price = this.price;
      if (price.switch1 == undefined) {
        price.switch1 = false;
      }
      this.handleUpdatePrice({ price }).then(res => {
        if (res.data.code == 0) {
          this.$Message.success("修改成功");
          this.init();
        } else {
          this.$Message.error("修改失败");
        }
      });
      // alert(this.user.email);
    },
    addPrice() {
      this.price = {};
      this.showAddModal = true;
    },
    // 取消
    cancel() {
      // alert(this.user.email);
      // this.init();
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>
