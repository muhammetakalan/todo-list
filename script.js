new Vue({
  el: '#app',
  data() {
    return {
      todoList: [],
      new_todo: ''
    };
  },
  mounted() {
    this.getTodos()
  },
  watch: {
    todoList: {
      handler: function(updatedList) {
        localStorage.setItem('todos', JSON.stringify(updatedList))
      },
      deep: true
    }
  },
  methods: {
    getTodos() {
      if (localStorage.getItem('todos')) {
        this.todoList = JSON.parse(localStorage.getItem('todos'))
      }
      if (localStorage.getItem('wall')) {
        document.body.style.backgroundImage = "url(" + localStorage.getItem("wall") + ")"
      }
    },
    changeWall() {
      var wallLink = "https://picsum.photos/id/" + Math.floor(Math.random() * 600) + "/1920/1080"
      document.body.style.backgroundImage = "url(" + wallLink + ")"
      localStorage.setItem('wall', JSON.stringify(wallLink))
    },
    selectImage(e) {
      var files = e.target.files || e.dataTransfer.files;
      this.createImage(files[0]);
    },
    createImage(file) {
      var reader = new FileReader();
      reader.onload = (e) => {
        document.body.style.backgroundImage = "url(" + e.target.result + ")"
        localStorage.setItem('wall', JSON.stringify(e.target.result))
      };
      reader.readAsDataURL(file);
    },
    addItem() {
      if (this.new_todo) {
        this.todoList.push({
          id: this.todoList.length,
          title: this.new_todo,
          done: false,
        });
      }
      this.new_todo = ''
      return true
    },
    deleteItem(item) {
      this.todoList.splice(this.todoList.indexOf(item), 1)
    }
  },
})