<template>
  <div class="container mt-2">
    <template v-if="isTasksEmpty">
        <div class="empty-data mt-3">
            <img src="../assets/img/img-home.svg" class="empty-data-image"/>
            <b-button 
            variant="outline-primary mt-3" 
            size="lg"
            to="/form"
            > Criar tarefa </b-button>
        </div>
    </template>

    <template v-else>
        <div v-for="(task) in tasks" :key="task.id">
            <b-card 
            :title="task.subject" 
            class="mb-2"
            :class=" { 'finished-task':isFinished(task) } ">
                <b-card-text>{{ task.description }}</b-card-text>

                <b-button 
                variant="outline-secondary" 
                class="mr-2" 
                @click="updateStatus(task.id, status.FINISHED)"
                > Concluir </b-button>

                <b-button 
                variant="outline-secondary" 
                class="mr-2" 
                @click="updateStatus(task.id, status.ARCHIVED)"
                > Arquivar </b-button>

                <b-button 
                variant="outline-secondary" 
                class="mr-2" 
                @click="edit(task.id)"
                > Editar </b-button>

                <b-button
                 variant="outline-danger" 
                 class="mr-2" 
                 @click="remove(task.id)"
                 > Excluir </b-button>
            </b-card>
        </div>
    </template>
    

    <b-modal ref="modalRemove" hide-footer title="Exclusão de tarefa">
      <div class="d-block text-center">
        Deseja realmente excluir essa tarefa? {{ taskSelected.subject }}
      </div>
      <div class="mt-3 d-flex justify-content-end">
        <b-button variant="outline-secondary" class="mr-2" @click="hideModal"> Cancelar </b-button>
        <b-button variant="outline-danger" class="mr-2" @click="confirmRemoveTask"> Excluir </b-button>
      </div> 
    </b-modal>
  </div>
</template>

<script>
import TasksModel from "@/models/TasksModel"
import Status from "@/valueObjects/status"
import ToastMixin from "@/mixins/toastMixin.js"

export default {
  name: "List",

  mixins: [ToastMixin], 

  data() {
    return {
      tasks: [],
      taskSelected: [],
      status: Status
    };
  },

  async created() {
    this.tasks = await TasksModel.params ({
      status: [
        this.status.OPEN,
        this.status.FINISHED,
      ]
    }).get();
    
  },

  methods: {
    edit(taskId) {
      this.$router.push({ name: "form", params: { taskId } });
    },

    async remove(taskId) { 
      this.taskSelected = await TasksModel.find(taskId)
      this.$refs.modalRemove.show();
    },

    hideModal() {
      this.$refs.modalRemove.hide();
    },

    async confirmRemoveTask() {
      this.taskSelected.delete();
      this.tasks = await TasksModel.params ({
      status: [
        this.status.OPEN,
        this.status.FINISHED,
      ]
    }).get();
      this.hideModal();
    },

    async updateStatus(taskId, status){
    let task = await TasksModel.find(taskId);
    task.status = status;
    await task.save();

    this.tasks = await TasksModel.params ({
      status: [
        this.status.OPEN,
        this.status.FINISHED,
      ]
    }).get();

    this.showToast("success", "Sucesso!", "Status da tarefa atualizado com sucesso!")
  },

  isFinished(task){
    return task.status === this.status.FINISHED
     
    }

  }, 

  computed: {
      isTasksEmpty() {
          return this.tasks.length === 0;
      }
  }
}
</script>

<style scoped>

    .empty-data {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 50px;
    }

    .empty-data-image {
        width: 300px;
        height: 300px;
    }

    .finished-task {
      opacity: 0.7;

    }

    .finished-task > .card-body > h4, .finished-task > .card-body > p {
      text-decoration: line-through;
    }
</style>