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
      <Input v-model="searchConName3" placeholder="email address" style="width: 200px" />
      <span @click="handleSearch3" style="margin: 0 10px;">
        <Button type="primary" icon="search">搜索</Button>
      </span>
      <Modal v-model="showModal" @on-ok="success()" @on-cancel="cancel()">
        <userEdit :course="user"></userEdit>
      </Modal>
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
import userEdit from "./components/userEdit.vue";
export default {
  name: "user",
  data() {
    return {
      user: {},
      showModal: false,
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
          key: "number",
          title: "Invited number"
        },
        {
          key: "detail",
          title: "Referral detail"
        },
        {
          title: "操作",
          key: "action",
          width: 200,
          // fixed: 'right',
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h('Button', {
              //   props: {
              //     type: 'primary',
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px'
              //   },
              //   on: {
              //     click: () => {
              //       // this.goodsInfoList[params.row._index] = dsiasdh
              //       // console.log(this.goodsInfoList[params.row._index])
              //       // this.currgoodsInfoList = params.row
              //       //显示对应的对话框
              //       // this.edit_goods_info_modal = true
              //     }
              //   }
              // }, '查看'),
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
                "修改"
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
                      this.handleDeleteUser({'user_id': this.data3[params.index].id}).then(res=>{
                        if(res.code==0) {
                          this.remove(params.index);
                          this.$Message.success("删除成功")
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
                    "删除"
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
    userEdit
  },
  methods: {
    ...mapActions(["handleUsersCard", "handleUpdateUser", "handleDeleteUser"]),
    init() {
      this.handleUsersCard({ email: this.searchConName3 }).then(res => {
        this.data3 = this.initTable3 = res.data;
        this.dataCount = res.data.length;
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
      this.handleUsersCard({ email: this.searchConName3 }).then(res => {
        this.data3 = this.initTable3 = res;
        this.dataCount = res.length;
        this.$Message.success("搜索成功");
      });
    },
    handleSearch3() {
      this.data3 = this.initTable3;
      this.search(this.data3, { name: this.searchConName3 });
    },
    handleCancel3() {
      this.data3 = this.initTable3;
    },
    show(index) {
      // this.$Modal.info({
      //   title: "用户编辑",
      //   content: `Name：${this.data3[index].email}`
      // });
      this.user = this.data3[index];
      this.showModal = true;
    },
    remove(index) {
      this.data3.splice(index, 1);
    },
    changepage() {
      alert(event.target.title);
    },
    _nowPageSize() {},
    success() {
      var user = this.user
      this.handleUpdateUser({user}).then(res => {
        if(res.data.code == 0) {
          this.$Message.success("修改成功");
        } else {
          this.$Message.error("修改失败");
        }
      });
      // alert(this.user.email);
    },
    cancel() {
      alert(this.user.email);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style>
</style>
