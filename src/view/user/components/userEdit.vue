<template>
  <div>
    <h1>用户编辑</h1>
    <br />
    <Form :label-width="80">
       <FormItem label="Email">
           <Col span="18">
            <Input v-model="course.email" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Plan name">
            <Col span="18">
            <Input v-model="course.planName" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Validity">
            <Col span="18">
            <Input v-model="course.validity" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Traffic">
            <Col span="18">
            <Input v-model="course.traffic" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Device">
            <Col span="18">
            <Input v-model="course.device" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Service Detail">
            <Col span="18">
            <Input v-model="course.serviceDetail" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Invited number">
            <Col span="18">
            <Input v-model="course.number" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
        <FormItem label="Referral detail">
            <Col span="18">
            <Input v-model="course.detail" placeholder="Enter something..."></Input>
            </Col>
        </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "userEdit",
  props: {
    course: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      user: []
    };
  }
};
</script>
<style scoped>
</style>
