<template>
  <div>
    <h1>Prcing setting</h1>
    <br />
    <Form :label-width="80">
      <FormItem label="Plan name">
        <Col span="16">
          <Input v-model="price.plan" placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
      <FormItem label="Standard price per month">
        <Col span="16">
          <Input v-model="price.standard" placeholder="Enter something..."></Input>
        </Col>
        <Col span="6">$</Col>
      </FormItem>
      <FormItem label="Actual price per month">
        <Col span="16">
          <Input v-model="price.actual" placeholder="Enter something..."></Input>
        </Col>
        <Col span="6">$</Col>
      </FormItem>
      <FormItem label="Plan cycle">
        <Col span="16">
          <Input v-model="price.cycle" placeholder="Enter something..."></Input>
        </Col>
        <Col span="6">months</Col>
      </FormItem>
      <FormItem label="switch">
        <Col span="16">
          <i-switch v-model="price.switch1" size="large">
            <span slot="open">开启</span>
            <span slot="close">关闭</span>
          </i-switch>
        </Col>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "priceEdit",
  props: {
    price: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      
    };
  }
};
</script>
<style scoped>
</style>
