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
      <Input v-model="searchConName3" placeholder="email address" style="width: 200px" />
      <span @click="handleSearch3" style="margin: 0 10px;">
        <Button type="primary" icon="search">{{$t('text_search')}}</Button>
      </span>
      <Modal v-model="showModal" @on-ok="success()" @on-cancel="cancel()">
        <userEdit :course="user"></userEdit>
      </Modal>
      <Modal v-model="showSubModal" :styles="{width: '720px'}">
        <subHistory :subs="subs" :pageSize="1"></subHistory>
      </Modal>
      <Modal v-model="showInviteModal" :styles="{width: '720px'}">
        <invite :invites="invites" :email="email" :pageSize="1"></invite>
      </Modal>
      <Button @click="handleCancel3">{{$t('text_cancel')}}</Button>
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
import userEdit from "./components/userEdit.vue";
import subHistory from "./components/subHistory.vue";
import invite from "./components/invite.vue";
export default {
  name: "user",
  data() {
    return {
      email: "",
      customerId: 0,
      user: {},
      // 编辑详情
      showModal: false,
      // 订阅详情
      showSubModal: false,
      // 邀请
      showInviteModal: false,
      data3: [],
      invites: {},
      subs: {},
      searchConName3: "",
      columns1: [
        {
          key: "email",
          title: "Email"
        },
        {
          key: "currentPlanName",
          title: "Plan name"
        },
        {
          key: "validity",
          title: "Validity",
          render: (h, params) => {
            var start =
              params.row.creationDateTime.slice(0, 3).join("/") +
              " " +
              params.row.creationDateTime.slice(3, 6).join(":");
            var end =
              params.row.expireTime.slice(0, 3).join("/") +
              " " +
              params.row.expireTime.slice(3, 6).join(":");
            return h("span", start + "-" + end);
          }
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
          key: "action",
          title: "Service Detail",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.user = params;
                      this.showSub(params.index);
                    }
                  }
                },
                this.$i18n.t("btn_look")
              )
            ]);
          }
        },
        {
          key: "number",
          title: "Invited number"
        },
        {
          key: "detail",
          title: "Referral detail"
        },
        {
          title: this.$i18n.t("text_operate"),
          key: "action",
          width: 230,
          // fixed: 'right',
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      //显示对应的对话框
                      this.user = params;
                      this.showSub(params.index);
                    }
                  }
                },
                this.$i18n.t("btn_look")
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.user = params;
                      this.showInvite(params.index);
                    }
                  }
                },
                this.$i18n.t("btn_gift")
              ),
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
                      this.handleDeleteUser({
                        email: this.data3[params.index].email
                      }).then(res => {
                        if (res.code == 0) {
                          this.remove(params.index);
                          this.init();
                          this.$Message.success("删除成功");
                        } else {
                          this.$Message.error("删除失败");
                        }
                      });
                      // vm.$emit('on-delete', params)
                      // vm.$emit('input', params.tableData.filter((item, index) => index !== params.row.initRowIndex))
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
    userEdit,
    subHistory,
    invite
  },
  methods: {
    ...mapActions([
      "handleUsersCard",
      "handleUpdateUser",
      "handleDeleteUser",
      "handleInviteList",
      "handleSubHistory"
    ]),
    init() {
      this.handleUsersCard({
        email: this.searchConName3,
        page: this.pageCurrent,
        size: this.pageSize
      }).then(res => {
        this.data3 = this.initTable3 = res.data;
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
        this.pageCurrent = 1;
        this.invites = res;
      });
    },
    initSubs(customerId) {
      this.customerId = customerId;
      this.handleSubHistory({
        customerId: customerId,
        page: 1,
        size: this.pageSize
      }).then(res => {
        this.pageCurrent = 1;
        this.subs = res;
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
        this.data3 = this.initTable3 = res.data;
        this.dataCount = res.total;
        this.$Message.success("搜索成功");
      });
    },
    handleSearch3() {
      this.data3 = this.initTable3;
      this.search(this.data3, { name: this.searchConName3 });
    },
    handleCancel3() {
      this.searchConName3 = "";
      this.init();
    },
    show(index) {
      this.user = this.data3[index];
      this.showModal = true;
    },
    showSub(index) {
      this.initSubs(this.data3[index].customerId);
      this.showSubModal = true;
    },
    showInvite(index) {
      this.initInvite(this.data3[index].email);
      this.showInviteModal = true;
    },
    remove(index) {
      this.data3.splice(index, 1);
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
    success() {
      var user = this.user;
      this.handleUpdateUser({ user }).then(res => {
        if (res.data.code == 0) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("修改失败");
        }
      });
      // alert(this.user.email);
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
