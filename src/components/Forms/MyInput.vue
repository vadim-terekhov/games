<template>
  <div class="my-input">
    <label :for="config.id" class="my-input-title">{{ config.label }}</label>
    <input
      class="my-input-field"
      :type="config.type" 
      :id="config.id"
      :value="value"
      :placeholder="config.placeholder ? config.placeholder : '' "
      autocomplete="off"
      @input="$emit('input',$event.target.value)"
    >
  </div>
</template>

<script>
export default {
  name: 'MyInput',
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    value: {
      type: String,
      default: '',
    }
  }
}
</script>

<style scoped>
.my-input{
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.my-input-title{
  flex: 1 0 auto;
  line-height: 20px;
  align-self: center;
}
.my-input-field{
  height: 20px;
  line-height: 20px;
}
.my-input-field:focus{
  outline: none;
}
</style>