<template>
  <div>
    <h1>Referral setting</h1>
    <br />
    <!-- <Form :label-width="80">
      <FormItem label="Plan name">
        <Col span="16">
          <Input placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
      <FormItem label="Standard price per month">
        <Col span="16">
          <Input placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
    </Form> -->
    <Card shadow>
      <Row>
        <i-col>
          Every  <Input v-model="friend" style="width: 100px" /> friends completed the steps.
        </i-col>       
        <i-col>
          Each referrer can get more <Input v-model="month" style="width:100px;"/> month for free.
        </i-col> 
        <i-col style="align:center"><Button type="primary" @click="update">UPDATE</Button></i-col>
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
        month:0
    }
  },
  mounted() {
      this.init();
  },
  methods: {
      ...mapActions(["handleReferral","handleUpdateReferral"]),
      init() {
        this.handleReferral().then(res=>{
            if(res.code == 0) {
                this.friend = res.data.friend;
                this.month = res.data.month
            }
        })
      },
      update() {
          var friend = this.friend;
          var month = this.month;
          this.handleUpdateReferral({friend, month}).then(res => {
              if(res.code == 0) {
                  this.$Message.success('修改成功');
              }
          })
      }
  },
};
</script>
<style scoped>
</style>
