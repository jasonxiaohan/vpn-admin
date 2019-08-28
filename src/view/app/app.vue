<style lang="less">
@import "../../assets/styles/common.less";
@import "../../assets/styles/table.less";
</style>

<template>
  <div>
    <Row>
      <Button type="primary" icon="md-add" @click="addApp">{{$t("text_add")}}</Button>
      <Modal v-model="showAddModal" @on-ok="update()" @on-cancel="cancel()">
        <appEdit :app="app"></appEdit>
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
import appEdit from "./components/appEdit.vue";
export default {
  name: "user",
  data() {
    return {
      app: {},
      showAddModal: false,
      data1: [],
      searchConName3: "",
      columns1: [
        {
          key: "name",
          title: "Display name"
        },
        {
          key: "osLegend",
          title: "OS legend",
          render: (h, params) => {
             return h('img',{
                 attrs: {
                     src: params.row.osLegend,
                     alt: params.row.name
                 },
                 style: {
                     width:'150px',
                     height:'150px'
                 }
             }) 
          }
        },
        {
          key: "url",
          title: "URL"
        },
        {
          key: "legend",
          title: "App legend",
          render: (h, params) => {
             return h('img',{
                 attrs: {
                     src: params.row.legend
                 },
                 style: {
                     width:'150px',
                     height:'150px'
                 }
             }) 
          }
        },
        {
          key: "appUrl",
          title: "App Url"
        },
        {
          key: "logo",
          title: "Logo",
          render: (h, params) => {
             return h('img',{
                 attrs: {
                     src: params.row.logo
                 },
                 style: {
                     width:'150px',
                     height:'150px'
                 }
             }) 
          }
        },
        {
          key: "active",
          title: "Plan switch",
          render: (h, params) => {
            if (params.row.active == true) {
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
    appEdit
  },
  methods: {
    ...mapActions(["handleApps", "handleUpdateApp"]),
    init() {
      this.handleApps({
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
      this.app = this.data1[index];
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
      var app = this.app;
      if (app.active == undefined) {
        app.active = false;
      }
      if(app.key == undefined) {
          app.key = Math.random()*100000000000000000;
      }      
      this.handleUpdateApp({ app }).then(res => {
        if (res.data.code == 0) {
          this.$Message.success("修改成功");
          this.init();
        } else {
          this.$Message.error("修改失败");
        }
      });
      // alert(this.user.email);
    },
    addApp() {
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
