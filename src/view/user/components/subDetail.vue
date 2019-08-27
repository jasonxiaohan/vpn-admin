<template>
  <div>
    <h1>订阅详情</h1>
    <br />
    <Form :label-width="80">
       <FormItem label="Email">
           <Col span="18">
                {{sub.email}}
            </Col>
        </FormItem>
        <FormItem label="Plan name">
            <Col span="18">
            {{sub.planName}}
            </Col>
        </FormItem>
        <FormItem label="Validity">
            <Col span="18">
            {{sub.validity}}
            </Col>
        </FormItem>
        <FormItem label="Traffic">
            <Col span="18">
            {{sub.traffic}}
            </Col>
        </FormItem>
        <FormItem label="Device">
            <Col span="18">
            {{sub.device}}
            </Col>
        </FormItem>
        <FormItem label="Service Detail">
            <Col span="18">
            {{sub.serviceDetail}}
            </Col>
        </FormItem>
        <FormItem label="Invited number">
            <Col span="18">
            {{sub.number}}
            </Col>
        </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "userEdit",
  props: {
    sub: {
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
