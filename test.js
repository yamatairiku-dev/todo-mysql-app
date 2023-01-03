const a = 'global'

const myapp = {
  myfunc: () => {
    return function () {
      const a = 'local'
      console.log(a) // local
    }
  }
}

myapp.myfunc()()

console.log(a) // global
