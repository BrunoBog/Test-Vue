<template>
  <div>
    <div class="svg">
    <img src="https://www.flaticon.com/premium-icon/icons/svg/1923/1923078.svg" 
    width="64" height="64" alt="King premium icon" title="King premium icon">
    </div>
    <span class="cliente">{{nome}}</span>
  </div>
</template>

<script>
export default {
  props: ["Nome", "id"],
  data() {
    return {
      nome: this.Nome,
      Id: this.id
    };
  }
};
</script>

<style>
.svg{
  margin: auto;
  padding-top: 2px;
}
.icon {
  /* background: #845ec2; */
  height: inherit;
  width: inherit;
}
.cliente {
  color: #fbeaff;
}
</style>
