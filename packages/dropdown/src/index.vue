<template>
  <div :class="[className, {'is-disabled': disabled}]" :outer-touch-disabled="!visible" v-outerTouch="onOuterTouch">
    <div :class="[className + '-input' , {'is-open': visible}]" @click="trigger">
      <span :class="className + '-text'">{{text}}</span>
      <i :class="className + '-icon'"></i>
    </div>
    <transition name="slide-up">
      <div :class="className + '-box'" v-show="visible">
        <ol :class="className + '-options'">
          <li v-for="(item, index) in options" :class="[className + '-item', {'is-selected': selected === index}]" @click="select(item.value)">
            {{item.text}}
          </li>
        </ol>
      </div>
    </transition>
  </div>
</template>
<style>
</style>
<script>
  export default {
    name: 'drop-down',
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      className: {
        type: String,
        default: 'u-dropDown'
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 默认显示文本 当selected == -1 时才有效
      label: {
        type: String,
        default: '请选择'
      },
      // 下拉选项列表: [{text:'显示文本',value:'实际值',show:'选中时显示的文本'}]
      options: {
        type: Array,
        default: () => []
      }
    },
    data () {
      return {
        visible: false,
        selected: -1
      }
    },
    watch: {
      visible (val) {
        this.$emit(val ? 'open' : 'close') // 事件
      },
      value () {
        this.getSelectedIndex()
      }
    },
    methods: {
      getSelectedIndex () {
        // 根据设置value获取选中的下标
        for (let i = 0; i < this.options.length; i++) {
          if (this.options[i].value === this.value) {
            this.selected = i
            break
          }
        }
      },
      trigger () {
        if (!this.disabled) this.visible = !this.visible
      },
      select (value) {
        this.$emit('input', value)
        this.visible = false
      },
      onOuterTouch () {
        this.visible = false
      }
    },
    computed: {
      text () {
        if (this.selected === -1) {
          return this.label
        } else {
          const item = this.options[this.selected]

          return item.show || item.text
        }
      }
    },
    created () {
      this.getSelectedIndex()
    }
  }
</script>
