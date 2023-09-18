import { defineStore } from 'pinia'
export const useTaskStore = defineStore({
  id: 'task',
  state: () => ({
    tasks: [],
    task: null,
    sequence:  []

  }),
  getters: {
    getParentTasks: (state) => {
      return state.tasks.filter((task) => task.parentId === 0)
    },
    getChildTasks: (state) => id => {
      return state.tasks.filter((task) => task.parentId === id)
    },
    // getChildrenByParentId: (state) => t => {
    //   return state.tasks
    // }
    // getPostsPerAuthor: (state) => {
    //   return (authorId) => state.posts.filter((post) => post.userId === authorId)
    // }
  },
  actions: {
    addTask(title, parentId, level, isShown, isVisible) {
      console.log('addTask')
      const newTask = {
        id: Date.now(),
        title: title,
        parentId: parentId,
        level: level,
        isShown: isShown,
        isVisible: isVisible
      }

      if (level === 0) {
        // push to array list if parent row
        this.tasks.push(newTask)
      } else {
        // put child in certain index of the array
        this.changeSequence(newTask)
      }
    },
    updateShowChild(taskT) {
      let parentIndex = this.tasks.findIndex(task => task.id === taskT.id)
      this.tasks[parentIndex].isShown = !this.tasks[parentIndex].isShown

      // get all the parent task from the child
      let parentTasks = taskT.parentId === 0 ? this.getParentTasks : this.tasks.filter(task => task.parentId === taskT.parentId)
      let nextIndex = null
      let checkForNextIndex = false

      // get the next parent index from the current selected index
      for (let x of parentTasks) {
        // just want to get the next index from the parent task list
        if (checkForNextIndex) {
          nextIndex = this.tasks.findIndex(task => task.id === x.id)
          break
        }
        checkForNextIndex = ((this.tasks.findIndex(task => task.id === x.id) === this.tasks.findIndex(task => task.id === taskT.id)) ? true : false)
      }

      // set all children row to its opposite isVisible status
      for (let i = parentIndex + 1; i < (nextIndex != null ? nextIndex : this.tasks.length); i++) {
        this.tasks[i].isVisible = !this.tasks[i].isVisible
      }

      // if (taskT.parentId === 0) {
      //   let parentTasks = this.getParentTasks
      //   let nextIndex = null
      //   let checkForNextIndex = false

      //   // get the next parent index from the current selected index
      //   for (let x of parentTasks) {
      //     if (checkForNextIndex) {
      //       nextIndex = this.tasks.findIndex(task => task.id === x.id)
      //       break
      //     }
      //     checkForNextIndex = ((this.tasks.findIndex(task => task.id === x.id) === this.tasks.findIndex(task => task.id === taskT.id)) ? true : false)
      //   }

      //   // check if the index was the last item in the array
      //   if (nextIndex != null) {
      //     for (let i = parentIndex + 1; i < nextIndex; i++) {
      //       this.tasks[i].isVisible = !this.tasks[i].isVisible
      //     }
      //   } else {
      //     for (let i = parentIndex + 1; i < this.tasks.length; i++) {
      //       this.tasks[i].isVisible = !this.tasks[i].isVisible
      //     }
      //   }

      //   // console.log('this.tasks ', this.tasks )
      //   console.log('nextIndex: ', nextIndex)
      // } else {
      //   let parentTasks = this.tasks.filter(task => task.parentId === taskT.parentId)
      //   console.log('parentTasks, ', parentTasks)

      //   let nextIndex = null
      //   let checkForNextIndex = false

      //   // get the next parent index from the current selected index
      //   for (let x of parentTasks) {
      //     if (checkForNextIndex) {
      //       nextIndex = this.tasks.findIndex(task => task.id === x.id)
      //       break
      //     }
      //     checkForNextIndex = ((this.tasks.findIndex(task => task.id === x.id) === this.tasks.findIndex(task => task.id === taskT.id)) ? true : false)
      //   }

      //   // check if the index was the last item in the array
      //   if (nextIndex != null) {
      //     for (let i = parentIndex + 1; i < nextIndex; i++) {
      //       this.tasks[i].isVisible = !this.tasks[i].isVisible
      //     }
      //   } else {
      //     for (let i = parentIndex + 1; i < this.tasks.length; i++) {
      //       this.tasks[i].isVisible = !this.tasks[i].isVisible
      //     }
      //   }
      // }

      // for ( let x of this.tasks.filter((task) => task.parentId === taskT.id)) {
      //   x.isVisible = !x.isVisible

      //   for ( let y of this.tasks.filter((task) => task.parentId === x.id)) {
      //     y.isVisible = !y.isVisible
      //   }
      // }
    },
    changeSequence(tempTask) {
      console.log('changeSequence')
      //get the list of child, this will determine whether the parent have any child under it
      let temp = this.tasks.filter((task) => task.parentId === tempTask.parentId)
      let index = temp.length === 0 ? this.tasks.findIndex(task => task.id === tempTask.parentId) : this.tasks.findIndex(task => task.id === temp[temp.length - 1].parentId)
      this.tasks.splice(index + 1, 0, tempTask)

      // if (temp.length === 0) {
      //   // first child
      //   let index = this.tasks.findIndex((task) => task.id === tempTask.parentId)
      //   this.tasks.splice(index + 1, 0, tempTask)
      // } else {
      //   // more than 1 children
      //   let index = this.tasks.findIndex((task) => task.id === temp[temp.length - 1].parentId)
      //   this.tasks.splice(index + 1, 0, tempTask)
      // }
    },
    // async fetchPosts() {
    //   this.posts = []
    //   this.loading = true
    //   try {
    //     this.posts = await fetch('https://jsonplaceholder.typicode.com/posts')
    //     .then((response) => response.json()) 
    //   } catch (error) {
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },
    //     async fetchPost(id) {
    //       this.post = null
    //       this.loading = true
    //       try {
    //         this.post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
    //         .then((response) => response.json())
    //       } catch (error) {
    //         this.error = error
    //       } finally {
    //         this.loading = false
    //       }
    //     }
  }
})