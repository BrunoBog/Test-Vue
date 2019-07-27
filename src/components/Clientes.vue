<template>
  <div>
    <div class="svg">
      <!-- <font-awesome-icon icon="user-secret" class="icon" /> -->
    <img src="https://image.flaticon.com/icons/png/128/80/80886.png" 
    srcset="https://image.flaticon.com/icons/png/512/80/80886.png 4x" 
    alt="Specialist User" title="Specialist User" width="64" height="64">
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
