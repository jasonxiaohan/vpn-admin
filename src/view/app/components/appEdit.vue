<template>
  <div>
    <h1>App setting</h1>
    <br />
    <Form ref="appEdit" :label-width="80" :rules="rules" @keydown.enter.native="handleSubmit">
      <FormItem label="Display name" prop="name">
        <Col span="16">
          <Input v-model="app.name" placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
      <FormItem label="OS legend">
        <Col span="16">
          <input type="hidden" v-model="app.osLegend"/>
          <Upload v-model="app.osLegend" action="http://localhost:8081/vpn/upload/upload" :on-success="upload1" :format="['jpg','jpeg','png']">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </Col>
      </FormItem>
      <FormItem label="URL">
        <Col span="16">
          <Input v-model="app.url" placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
      <FormItem label="App legend">
        <Col span="16">
        <input type="hidden" v-model="app.legend"/>
          <Upload v-model="app.legend" action="http://localhost:8081/vpn/upload/upload" :on-success="upload2" :format="['jpg','jpeg','png']">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
        </Col>
      </FormItem>
      <FormItem label="App Url">
        <Col span="16">
          <Input v-model="app.appUrl" placeholder="Enter something..."></Input>
        </Col>
      </FormItem>
      <FormItem label="Logo">
        <Col span="16">
          <input type="hidden" v-model="app.logo"/>
         <Upload v-model="app.logo" action="http://localhost:8081/vpn/upload/upload" :on-success="upload3" :format="['jpg','jpeg','png']">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload> 
        </Col>
      </FormItem>
      <FormItem label="switch">
        <Col span="16">
          <i-switch v-model="app.active" size="large">
            <span slot="open">{{$t('text_state_open')}}</span>
            <span slot="close">{{$t('text_state_close')}}</span>
          </i-switch>
        </Col>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "appEdit",
  props: {
    app: {
      type: Object,
      default: () => {}
    },
    nameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '名称不能为空', trigger: 'blur' }
        ]
      }
    },
  },
  data() {
    return {        
    };
  },
  computed: {
      rules() {
        return {
          name: this.nameRules,
        }
      }
  },
  methods: {
      upload1(res, file) {        
        this.app.osLegend = res.data.src;
      },
      upload2(res,file) {
          this.app.legend = res.data.src;
      },
      upload3(res,file) {
          this.app.logo = res.data.src;
      },
      handleSubmit() {
          this.$refs.appEdit.validate((valid) => {        
            if (valid) {

           }
        })
      }
  },
};
</script>
<style scoped>
</style>
