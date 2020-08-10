<template>
    <a-modal
        title="Basic Modal"
        v-model="visible"
        @ok="handleOk"
        ref="modalSelf"
        @cancel="handleCancel"
        :maskClosable="false"
        :destroyOnClose="true"
        :width="modalWidth"
        :centered="true"
    >
        <a-form :autoFormCreate="(form)=>{this.form = form}" class="ant-advanced-search-form" @submit="submitModal"
                ref="modalForm">
            <a-row :gutter="16">
                <a-col :span='6' :key='`modal-span-${key}`' class='' v-for="(item,key) in formItems">
                    {{newData[key]}}
                    <a-form-item :label='item.name' :fieldDecoratorId="key" style="margin-bottom: 0">
                        <a-select
                            class="modalInputInsert"
                            v-if="item.type=='select' && modalData[key]"
                            :data-value="data[key] && data[key].toString()"
                        >
                            <a-select-option :value="flag.value" v-for="flag in modalData[key]"
                                             :key="`search-select-${flag.key}`">
                                {{flag}}
                            </a-select-option>
                        </a-select>
                        <a-input
                            v-else
                            :disabled="!item.editabled"
                            class="modalInputInsert"
                            :data-value="data[key]"
                            :fieldDecoratorOptions="{rules: [{ required: item.isNeed, message: `请输入${key}` }]}"
                        />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </a-modal>
</template>
<script>
import {baseData} from '@/api/baseData';
import {insertDefaultValue} from '@/libs/util';

export default {
  data () {
    return {
      visible: false,
      formItems: {},
      newData: {},
      modalWidth: '',
      needItem: []
    }
  },
  props: {
    data: {},
    url: '',
    modalVisible: {
      type: Boolean,
      default: false
    },
    modalData: {}
  },
  watch: {
    modalVisible (val) {
      if (val) {
        this.visible = true
                    this.changeData()
                }
    }
  },
  methods: {
    changeData () {
      const data = baseData[this.$route.name]
                this.formItems = baseData[this.$route.name]
                for (let key in data) {
        this.newData[key] = this.data[key]
                    if (data[key].isNeed) this.needItem.push(key)
                }
    },
    handleOk () {
      // this.visible = false;
      this.submitModal()
                // this.$emit("hide-modal");
            },
    handleCancel () {
      this.$emit('hide-modal')
            },
    submitModal () {
      this.form.validateFields((err, values) => {
        if (!err) {
        }
      })
      if (this.needItem.length) {
        this.needItem.forEach(item => {

        })
      }
    },
    getInput () {
      this.form.setFieldsValue(this.data)
      // insertDefaultValue(document.getElementsByTagName("input"), "modalInputInsert");
      // insertDefaultValue(document.getElementsByTagName("select"), "modalInputInsert");
    }
  },
  created () {
    this.visible = true
            this.changeData()
            this.modalWidth = document.body.clientWidth * 0.8 + 'px'
        },
  mounted () {
    this.getInput()
        }
}
</script>
<style lang="less">
    .ant-advanced-search-form .ant-form-item {
        display: flex;
    }

    .ant-advanced-search-form .ant-form-item-control-wrapper {
        flex: 1;
    }
</style>
