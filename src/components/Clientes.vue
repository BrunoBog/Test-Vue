<template>
    <span class="cliente">
      <font-awesome-icon icon="user-secret" />
      <span> {{Id}}: {{nome}} </span>
    </span>
</template>

<script>

export default {
    props: ['Nome', 'id'],
  data() {
    return {
      nome : this.Nome,
      Id : this.id
    };
  }
};
</script>

<style>
.cliente {
  background: #4286ca;
  color: white;
  min-width: 100px;
  max-width: 200px;
  margin: 5px;
}
</style>
