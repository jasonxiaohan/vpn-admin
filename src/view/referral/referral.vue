<style lang="less">
@import "../../assets/styles/common.less";
@import "../../assets/styles/table.less";
</style>

<template>
  <div>
    <h1>Referral setting</h1>
    <br />
    <Card shadow>
      <Row>
        <i-col>
          Every
          <Input v-model="friend" style="width: 100px" />friends completed the steps.
        </i-col>
        <i-col>
          Each referrer can get more
          <!-- <Dropdown @on-click="click">
            <a href="javascript:void(0)">
              plan
              <Icon type="ios-arrow-down"></Icon>
            </a>
           <DropdownMenu slot="list" on-click="click" v-model="month">
              <div v-for="item in items">
                <div v-if="item.id == month">
                  <DropdownItem :name="item.id" selected>{{item.plan}}</DropdownItem>
                </div>
                <div v-else>
                  <DropdownItem :name="item.id">{{item.plan}}</DropdownItem>
                </div>
              </div>
            </DropdownMenu>            
          </Dropdown>-->
         
            <Select class="search-col" v-model="planSelected" @change='getPlanSelected'>
              <Option
                v-for="item in items"
                :value="item.id"
                :key="item.key"
              >{{ item.plan }}</Option>
            </Select>month for free.
        </i-col>
        <i-col style="align:center">
          <Button type="primary" @click="update">{{$t("btn_update")}}</Button>
        </i-col>
      </Row>
    </Card>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "referralSetting",
  props: {
    referral: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      friend: 0,
      month: 2,
      planSelected: "",
      items: [
        { id: 1, plan: "1 month" },
        { id: 2, plan: "2 month" },
        { id: 3, plan: "3 month" },
        { id: 4, plan: "4 month" }
      ]
    };
  },
  mounted() {
    this.init();
    this.planSelected = this.items[0].id;
  },
  methods: {
    ...mapActions(["handleReferral", "handleUpdateReferral"]),
    init() {
      this.handleReferral().then(res => {
        if (res.code == 0) {
          this.friend = res.data.friend;
          this.month = res.data.month;
        }
      });
    },
    update() {
      var friend = this.friend;
      var month = this.month;
      this.handleUpdateReferral({ friend, month }).then(res => {
        if (res.code == 0) {
          this.$Message.success("修改成功");
        }
      });
    },
    getPlanSelected() {
      debugger
      console.log(this.planSelected);
    }
  },
  watch: {
    planSelected: function(val) {
        alert(val);
    }
  },
};
</script>

<style scoped>
.search-col {
  width: 168px;
  height: 30px;
}
</style>
